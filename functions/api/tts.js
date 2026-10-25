// functions/api/tts.js - Cloudflare Pages Function Proxy for Azure AI Speech TTS
// Hardened with origin validation, rate limiting, SSML sanitisation, and resilient voice fallback.
import { optionsResponse, jsonCorsHeaders, resolveOrigin, rejectOrigin, enforceRate, readJson } from '../_lib/http.js';

const DEFAULT_VOICE = 'zh-CN-Xiaoxiao2:DragonHDFlashLatestNeural';
const FALLBACK_VOICE = 'zh-CN-XiaoxiaoNeural';
const ALLOWED_VOICES = [
  'zh-CN-Xiaoxiao2:DragonHDFlashLatestNeural',
  'zh-CN-Xiaoxiao:DragonHDFlashLatestNeural',
  'zh-CN-XiaoxiaoNeural',
  'zh-CN-YunxiNeural',
  'zh-CN-YunyangNeural'
];

export async function onRequestOptions(context) {
  return optionsResponse(context.request, context.env);
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSsml(text, voice, speed) {
  const clean = escapeXml(text);
  const s = typeof speed === 'number' && isFinite(speed) ? Math.min(2.0, Math.max(0.5, speed)) : 1.0;
  const ratePct = Math.round((s - 1.0) * 100);
  const rateStr = (ratePct >= 0 ? '+' : '') + ratePct + '%';

  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="zh-CN">` +
    `<voice name="${voice}">` +
    `<prosody rate="${rateStr}">` +
    `${clean}` +
    `</prosody>` +
    `</voice>` +
    `</speak>`;
}

async function callAzureSpeech(apiKey, region, ssml) {
  const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        'User-Agent': 'HalouZhongwen-TTS/1.1'
      },
      body: ssml,
      signal: controller.signal
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = jsonCorsHeaders(request, env);

  if (rejectOrigin(request, env)) {
    return new Response(JSON.stringify({ error: 'ORIGIN_NOT_ALLOWED' }), {
      status: 403,
      headers: corsHeaders
    });
  }

  // Rate limit: max 60 requests per minute per IP
  const limited = enforceRate(request, env, 'tts', 60, 60000);
  if (limited) return limited;

  const apiKey = (env && env.AZURE_SPEECH_KEY) || '';
  const region = (env && env.AZURE_SPEECH_REGION) || 'eastus';

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'AZURE_SPEECH_KEY_NOT_CONFIGURED',
        message: 'AZURE_SPEECH_KEY is not configured in Cloudflare Pages Environment Variables'
      }),
      { status: 503, headers: corsHeaders }
    );
  }

  // Parse JSON body
  let body;
  try {
    const parsed = await readJson(request, 65536);
    if (!parsed.ok) {
      return new Response(JSON.stringify({ error: parsed.reason }), {
        status: parsed.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 400,
        headers: corsHeaders
      });
    }
    body = parsed.value || {};
  } catch (e) {
    return new Response(JSON.stringify({ error: 'INVALID_JSON_BODY' }), { status: 400, headers: corsHeaders });
  }

  const rawText = body.text;
  if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
    return new Response(JSON.stringify({ error: 'INVALID_TEXT', message: 'text must be a non-empty string' }), {
      status: 400,
      headers: corsHeaders
    });
  }

  const text = rawText.trim();
  if (text.length > 1000) {
    return new Response(JSON.stringify({ error: 'TEXT_TOO_LONG', message: 'text exceeds maximum 1000 characters limit' }), {
      status: 400,
      headers: corsHeaders
    });
  }

  const speed = typeof body.speed === 'number' ? body.speed : 1.0;
  let targetVoice = typeof body.voice === 'string' && ALLOWED_VOICES.includes(body.voice)
    ? body.voice
    : DEFAULT_VOICE;

  // First attempt with target voice (e.g. Dragon HD Flash)
  let ssml = buildSsml(text, targetVoice, speed);
  let azureRes;

  try {
    azureRes = await callAzureSpeech(apiKey, region, ssml);
  } catch (err) {
    const isTimeout = err && (err.name === 'AbortError' || err.message?.includes('abort'));
    return new Response(JSON.stringify({
      error: isTimeout ? 'AZURE_TIMEOUT' : 'AZURE_NETWORK_ERROR',
      message: isTimeout ? 'Azure TTS request timed out after 7000ms' : 'Failed to connect to Azure Speech endpoint'
    }), {
      status: isTimeout ? 504 : 502,
      headers: corsHeaders
    });
  }

  // Resilient fallback: if requested voice is Dragon HD Flash and Azure returned 400
  // (which happens if the specific region or subscription tier lacks Dragon HD models),
  // immediately retry with universal standard zh-CN-XiaoxiaoNeural.
  if (azureRes.status === 400 && targetVoice.includes('DragonHD')) {
    targetVoice = FALLBACK_VOICE;
    ssml = buildSsml(text, targetVoice, speed);
    try {
      azureRes = await callAzureSpeech(apiKey, region, ssml);
    } catch (e) {
      // ignore retry network error, will be handled below
    }
  }

  if (!azureRes || !azureRes.ok) {
    const status = azureRes ? azureRes.status : 502;
    let errCode = 'AZURE_UPSTREAM_ERROR';
    if (status === 401) errCode = 'AZURE_AUTH_ERROR';
    else if (status === 403) errCode = 'AZURE_QUOTA_EXCEEDED';
    else if (status === 429) errCode = 'AZURE_RATE_LIMITED';

    return new Response(JSON.stringify({
      error: errCode,
      status: status,
      voice: targetVoice
    }), {
      status: status >= 400 && status < 500 ? status : 502,
      headers: corsHeaders
    });
  }

  // Success: stream audio/mpeg back to caller
  const allow = resolveOrigin(request, env);
  const audioHeaders = {
    'Content-Type': 'audio/mpeg',
    'Cache-Control': 'public, max-age=86400',
    'X-Content-Type-Options': 'nosniff',
    'X-TTS-Voice': targetVoice,
    'X-TTS-Length': String(text.length)
  };
  if (allow) {
    audioHeaders['Access-Control-Allow-Origin'] = allow;
    if (allow !== '*') audioHeaders['Vary'] = 'Origin';
  }

  return new Response(azureRes.body, {
    status: 200,
    headers: audioHeaders
  });
}

