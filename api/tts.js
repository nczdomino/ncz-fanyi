// api/tts.js - Node/Vercel serverless proxy for Azure AI Speech TTS
import { applyCors, rejectDisallowedOrigin, enforceRateLimit, readBody, noStore } from './_lib/http.js';

const DEFAULT_VOICE = 'zh-CN-Xiaoxiao2:DragonHDFlashLatestNeural';
const FALLBACK_VOICE = 'zh-CN-XiaoxiaoNeural';
const ALLOWED_VOICES = [
  'zh-CN-Xiaoxiao2:DragonHDFlashLatestNeural',
  'zh-CN-Xiaoxiao:DragonHDFlashLatestNeural',
  'zh-CN-XiaoxiaoNeural',
  'zh-CN-YunxiNeural',
  'zh-CN-YunyangNeural'
];

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

export default async function handler(req, res) {
  applyCors(req, res, process.env);
  noStore(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (rejectDisallowedOrigin((req.headers && req.headers.origin) || '', req, process.env)) {
    return res.status(403).json({ error: 'ORIGIN_NOT_ALLOWED' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  if (enforceRateLimit(req, res, 'tts', 60, 60000)) return;

  const apiKey = process.env.AZURE_SPEECH_KEY || '';
  const region = process.env.AZURE_SPEECH_REGION || 'eastus';

  if (!apiKey) {
    return res.status(503).json({
      error: 'AZURE_SPEECH_KEY_NOT_CONFIGURED',
      message: 'AZURE_SPEECH_KEY is not configured in environment variables'
    });
  }

  let body = req.body;
  if (!body || typeof body !== 'object') {
    try {
      const parsed = readBody(req, 65536);
      if (!parsed.ok) {
        return res.status(parsed.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 400).json({ error: parsed.reason });
      }
      body = parsed.value;
    } catch (e) {
      return res.status(400).json({ error: 'INVALID_JSON_BODY' });
    }
  }

  const rawText = body && body.text;
  if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
    return res.status(400).json({ error: 'INVALID_TEXT', message: 'text must be a non-empty string' });
  }

  const text = rawText.trim();
  if (text.length > 1000) {
    return res.status(400).json({ error: 'TEXT_TOO_LONG', message: 'text exceeds maximum 1000 characters limit' });
  }

  const speed = typeof body.speed === 'number' ? body.speed : 1.0;
  let targetVoice = typeof body.voice === 'string' && ALLOWED_VOICES.includes(body.voice)
    ? body.voice
    : DEFAULT_VOICE;

  let ssml = buildSsml(text, targetVoice, speed);
  let azureRes;

  try {
    azureRes = await callAzureSpeech(apiKey, region, ssml);
  } catch (err) {
    const isTimeout = err && (err.name === 'AbortError' || err.message?.includes('abort'));
    return res.status(isTimeout ? 504 : 502).json({
      error: isTimeout ? 'AZURE_TIMEOUT' : 'AZURE_NETWORK_ERROR'
    });
  }

  if (azureRes && azureRes.status === 400 && targetVoice.includes('DragonHD')) {
    targetVoice = FALLBACK_VOICE;
    ssml = buildSsml(text, targetVoice, speed);
    try {
      azureRes = await callAzureSpeech(apiKey, region, ssml);
    } catch (e) {}
  }

  if (!azureRes || !azureRes.ok) {
    const status = azureRes ? azureRes.status : 502;
    let errCode = 'AZURE_UPSTREAM_ERROR';
    if (status === 401) errCode = 'AZURE_AUTH_ERROR';
    else if (status === 403) errCode = 'AZURE_QUOTA_EXCEEDED';
    else if (status === 429) errCode = 'AZURE_RATE_LIMITED';

    return res.status(status >= 400 && status < 500 ? status : 502).json({
      error: errCode,
      status: status,
      voice: targetVoice
    });
  }

  const buffer = Buffer.from(await azureRes.arrayBuffer());
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.setHeader('X-TTS-Voice', targetVoice);
  res.setHeader('X-TTS-Length', String(text.length));
  return res.status(200).send(buffer);
}

