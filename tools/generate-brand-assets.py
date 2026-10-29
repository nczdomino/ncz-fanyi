#!/usr/bin/env python3
"""
tools/generate-brand-assets.py
Comprehensive Brand Identity & Icon Generator for 哈喽中文 (Halou Zhongwen).
Generates:
- assets/icons/favicon.svg (SVG Vector)
- assets/icons/logo.svg (Horizontal brand logo)
- assets/icons/brand-logo.png (512x512)
- assets/icons/icon-512.png (512x512)
- assets/icons/icon-192.png (192x192)
- assets/icons/apple-touch-icon.png (180x180)
- assets/icons/favicon-96x96.png (96x96 for Google Search)
- assets/icons/favicon-48x48.png (48x48 for Google Search)
- assets/icons/favicon-32x32.png (32x32)
- assets/icons/favicon-16x16.png (16x16)
- favicon.ico (multi-resolution ICO: 16, 32, 48, 64)
- manifest.json (Physical PWA Web App Manifest on disk)
- assets/icons/og-preview.png (1200x630 Social Preview)
"""

import os
import sys
import json
from PIL import Image, ImageDraw, ImageFilter, ImageFont

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(BASE_DIR, 'assets', 'icons')

def generate_svg_assets():
    os.makedirs(ASSETS_DIR, exist_ok=True)
    
    # 1. assets/icons/favicon.svg
    favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EB3349"/>
      <stop offset="50%" stop-color="#D92D43"/>
      <stop offset="100%" stop-color="#B81B34"/>
    </linearGradient>
    <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F6F6F8"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%\" height="125%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#700B1A" flood-opacity="0.32"/>
    </filter>
  </defs>
  <!-- Apple-inspired Squircle Container -->
  <rect width="512" height="512" rx="115" fill="url(#bgGrad)"/>
  <rect x="3" y="3" width="506" height="506" rx="112" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="3"/>
  
  <!-- Central Emblem: Chinese '中' intersecting Open Book & Learning Star -->
  <g filter="url(#shadow)" fill="url(#whiteGrad)">
    <!-- Central Vertical Axis (Pillar & Bookmark Spine) -->
    <path d="M256,86 C264,86 271,93 271,102 L271,396 C271,406 261,414 256,418 C251,414 241,406 241,396 L241,102 C241,93 248,86 256,86 Z"/>
    
    <!-- Outer Rounded Enclosure of '中' -->
    <path fill-rule="evenodd" d="M174,166 C150,166 132,184 132,208 L132,268 C132,292 150,310 174,310 L338,310 C362,310 380,292 380,268 L380,208 C380,184 362,166 338,166 L174,166 Z M174,196 L338,196 C344,196 350,202 350,208 L350,268 C350,274 344,280 338,280 L174,280 C168,280 162,274 162,268 L162,208 C162,202 168,196 174,196 Z"/>
    
    <!-- Open Book Foundation Wings -->
    <path d="M140,336 C180,336 220,348 245,364 L245,384 C216,368 175,356 136,356 C131,356 128,351 128,346 C128,340 132,336 140,336 Z" opacity="0.95"/>
    <path d="M372,336 C332,336 292,348 267,364 L267,384 C296,368 337,356 376,356 C381,356 384,351 384,346 C384,340 380,336 372,336 Z" opacity="0.95"/>
    
    <!-- Golden Accent Spark (Wisdom & Bilingual Intelligence) -->
    <circle cx="372" cy="142" r="11" fill="#FFE082"/>
  </g>
</svg>'''
    with open(os.path.join(ASSETS_DIR, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(favicon_svg)
    print('  ✓ Created assets/icons/favicon.svg')

    # 2. assets/icons/logo.svg (Horizontal Logo)
    logo_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64" width="320" height="64">
  <defs>
    <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EB3349"/>
      <stop offset="100%" stop-color="#B81B34"/>
    </linearGradient>
  </defs>
  <!-- 48x48 Squircle Emblem -->
  <g transform="translate(8, 8)">
    <rect width="48" height="48" rx="12" fill="url(#logoBg)"/>
    <!-- Central Emblem -->
    <g fill="#FFFFFF" transform="scale(0.09375)">
      <path d="M256,86 C264,86 271,93 271,102 L271,396 C271,406 261,414 256,418 C251,414 241,406 241,396 L241,102 C241,93 248,86 256,86 Z"/>
      <path fill-rule="evenodd" d="M174,166 C150,166 132,184 132,208 L132,268 C132,292 150,310 174,310 L338,310 C362,310 380,292 380,268 L380,208 C380,184 362,166 338,166 L174,166 Z M174,196 L338,196 C344,196 350,202 350,208 L350,268 C350,274 344,280 338,280 L174,280 C168,280 162,274 162,268 L162,208 C162,202 168,196 174,196 Z"/>
      <path d="M140,336 C180,336 220,348 245,364 L245,384 C216,368 175,356 136,356 C131,356 128,351 128,346 C128,340 132,336 140,336 Z"/>
      <path d="M372,336 C332,336 292,348 267,364 L267,384 C296,368 337,356 376,356 C381,356 384,351 384,346 C384,340 380,336 372,336 Z"/>
      <circle cx="372" cy="142" r="11" fill="#FFE082"/>
    </g>
  </g>
  <!-- Typography -->
  <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Noto Sans SC', sans-serif" font-size="20" font-weight="800" fill="#111827" letter-spacing="-0.3">哈喽中文</text>
  <text x="69" y="48" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif" font-size="11" font-weight="700" fill="#D92D43" letter-spacing="0.5">HALOU CHINESE</text>
</svg>'''
    with open(os.path.join(ASSETS_DIR, 'logo.svg'), 'w', encoding='utf-8') as f:
        f.write(logo_svg)
    print('  ✓ Created assets/icons/logo.svg')

def render_master_icon(size=2048):
    """Renders pixel-perfect 2048x2048 master icon with PIL."""
    S = size
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))

    # Background gradient: #EB3349 -> #B81B34
    bg = Image.new('RGBA', (S, S))
    pixels = bg.load()
    for y in range(S):
        t = y / (S - 1)
        r = int(235 * (1 - t) + 184 * t)
        g = int(51 * (1 - t) + 27 * t)
        b = int(73 * (1 - t) + 52 * t)
        for x in range(S):
            pixels[x, y] = (r, g, b, 255)

    # Squircle mask (corner radius ~ 22.4%)
    mask = Image.new('L', (S, S), 0)
    d_mask = ImageDraw.Draw(mask)
    r_corner = int(S * 0.224)
    d_mask.rounded_rectangle((0, 0, S, S), radius=r_corner, fill=255)
    im.paste(bg, (0, 0), mask)

    # Subtle inner border
    d_im = ImageDraw.Draw(im)
    bw = int(S * 0.007)
    d_im.rounded_rectangle((bw//2, bw//2, S - bw//2, S - bw//2), radius=r_corner - bw, outline=(255, 255, 255, 45), width=bw)

    # Overlay for Emblem
    overlay = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    def sc(v): return int(v * (S / 512.0))

    cx = sc(256)
    top_y = sc(92)
    bot_y = sc(400)
    hw = sc(15)

    # A. Central vertical axis
    d.rounded_rectangle((cx - hw, top_y, cx + hw, sc(385)), radius=hw, fill=(255, 255, 255, 255))
    d.polygon([(cx - hw, sc(380)), (cx + hw, sc(380)), (cx, bot_y)], fill=(255, 255, 255, 255))

    # B. Rounded outer rectangle of '中'
    x1, y1 = sc(134), sc(172)
    x2, y2 = sc(378), sc(308)
    box_r = sc(30)
    d.rounded_rectangle((x1, y1, x2, y2), radius=box_r, fill=(255, 255, 255, 255))

    # Cut out inner hole of the box
    inner_hw = sc(28)
    inner_x1, inner_y1 = x1 + inner_hw, y1 + inner_hw
    inner_x2, inner_y2 = x2 - inner_hw, y2 - inner_hw
    inner_r = max(4, box_r - inner_hw)

    hole = Image.new('L', (S, S), 0)
    d_hole = ImageDraw.Draw(hole)
    d_hole.rounded_rectangle((inner_x1, inner_y1, inner_x2, inner_y2), radius=inner_r, fill=255)

    pix_over = overlay.load()
    pix_hole = hole.load()
    for y in range(inner_y1, inner_y2 + 1):
        for x in range(inner_x1, inner_x2 + 1):
            if pix_hole[x, y] == 255:
                if abs(x - cx) <= hw:
                    pix_over[x, y] = (255, 255, 255, 255)
                else:
                    pix_over[x, y] = (0, 0, 0, 0)

    # C. Open Book lower wings
    d_leaf = ImageDraw.Draw(overlay)
    leaf_h = sc(18)
    pts_left = [
        (sc(140), sc(338)),
        (sc(195), sc(342)),
        (sc(242), sc(358)),
        (sc(242), sc(358) + leaf_h),
        (sc(195), sc(342) + leaf_h),
        (sc(140), sc(338) + leaf_h),
    ]
    d_leaf.polygon(pts_left, fill=(255, 255, 255, 245))

    pts_right = [
        (sc(372), sc(338)),
        (sc(317), sc(342)),
        (sc(270), sc(358)),
        (sc(270), sc(358) + leaf_h),
        (sc(317), sc(342) + leaf_h),
        (sc(372), sc(338) + leaf_h),
    ]
    d_leaf.polygon(pts_right, fill=(255, 255, 255, 245))

    # D. Golden smart learning accent spark
    spark_x, spark_y = sc(372), sc(146)
    spark_r = sc(12)
    d.ellipse((spark_x - spark_r, spark_y - spark_r, spark_x + spark_r, spark_y + spark_r), fill=(255, 224, 130, 255))

    # Soft drop shadow for emblem
    shadow = overlay.copy()
    shadow = shadow.filter(ImageFilter.GaussianBlur(sc(8)))
    sh_pix = shadow.load()
    for y in range(S):
        for x in range(S):
            a = sh_pix[x, y][3]
            if a > 0:
                sh_pix[x, y] = (90, 8, 20, int(a * 0.38))

    sh_offset = sc(8)
    im.paste(shadow, (0, sh_offset), shadow)
    im.paste(overlay, (0, 0), overlay)

    return im

def export_all_raster_icons(master):
    """Exports all standard raster sizes from master 2048x2048 image."""
    targets = {
        'brand-logo.png': 512,
        'icon-512.png': 512,
        'icon-192.png': 192,
        'apple-touch-icon.png': 180,
        'favicon-96x96.png': 96,  # Crucial multiple of 48 for Google Search
        'favicon-48x48.png': 48,  # Crucial baseline for Google Search
        'favicon-32x32.png': 32,
        'favicon-16x16.png': 16,
    }

    for filename, sz in targets.items():
        out_path = os.path.join(ASSETS_DIR, filename)
        resized = master.resize((sz, sz), Image.Resampling.LANCZOS)
        resized.save(out_path, format='PNG', optimize=True)
        print(f'  ✓ Generated {filename} ({sz}x{sz})')

    # Multi-resolution favicon.ico at root
    ico_path = os.path.join(BASE_DIR, 'favicon.ico')
    # Generate dedicated frames
    frames = [
        master.resize((16, 16), Image.Resampling.LANCZOS),
        master.resize((32, 32), Image.Resampling.LANCZOS),
        master.resize((48, 48), Image.Resampling.LANCZOS),
        master.resize((64, 64), Image.Resampling.LANCZOS),
    ]
    frames[0].save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)], append_images=frames[1:])
    print('  ✓ Generated root favicon.ico with (16, 32, 48, 64) multi-res frames')

def generate_static_manifest():
    """Writes physical manifest.json to disk."""
    manifest_data = {
        "name": "Halou – Chinese Dictionary & Smart Translator with Pinyin",
        "short_name": "Halou",
        "description": "The ultimate Chinese smart dictionary and context-aware translator with instant Pinyin annotation for learners and readers.",
        "start_url": "/",
        "scope": "/",
        "display": "standalone",
        "orientation": "any",
        "background_color": "#F8F9FA",
        "theme_color": "#D92D43",
        "icons": [
            {
                "src": "assets/icons/favicon-48x48.png",
                "sizes": "48x48",
                "type": "image/png"
            },
            {
                "src": "assets/icons/favicon-96x96.png",
                "sizes": "96x96",
                "type": "image/png"
            },
            {
                "src": "assets/icons/icon-192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "assets/icons/icon-512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any maskable"
            }
        ]
    }
    manifest_path = os.path.join(BASE_DIR, 'manifest.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest_data, f, indent=2, ensure_ascii=False)
    print('  ✓ Generated root manifest.json')

def generate_og_preview(master):
    """Generates 1200x630 Open Graph / Twitter Card preview with new brand identity."""
    W, H = 1200, 630
    og = Image.new('RGBA', (W, H), (248, 249, 250, 255))
    d = ImageDraw.Draw(og)

    # Subtle top accent bar (Crimson Red)
    d.rectangle([(0, 0), (W, 6)], fill=(217, 45, 67, 255))

    # Subtle decorative circular watermark at right
    for rad in range(320, 480, 40):
        d.ellipse((W - 240 - rad, H//2 - rad, W - 240 + rad, H//2 + rad), outline=(217, 45, 67, 10), width=2)

    # Paste squircle brand emblem
    emblem_sz = 260
    emblem = master.resize((emblem_sz, emblem_sz), Image.Resampling.LANCZOS)
    
    # Shadow under emblem
    em_shadow = Image.new('RGBA', (emblem_sz + 40, emblem_sz + 40), (0, 0, 0, 0))
    d_sh = ImageDraw.Draw(em_shadow)
    d_sh.rounded_rectangle((20, 20, emblem_sz + 20, emblem_sz + 20), radius=int(emblem_sz * 0.224), fill=(0, 0, 0, 50))
    em_shadow = em_shadow.filter(ImageFilter.GaussianBlur(16))
    og.paste(em_shadow, (80, (H - emblem_sz)//2 + 8), em_shadow)
    og.paste(emblem, (100, (H - emblem_sz)//2), emblem)

    # Right side typography & feature cards
    card_x1 = 430
    card_y1 = 110

    # Badge: "OFFICIAL WEB APP"
    badge_w, badge_h = 160, 30
    d.rounded_rectangle((card_x1, card_y1, card_x1 + badge_w, card_y1 + badge_h), radius=15, fill=(217, 45, 67, 20), outline=(217, 45, 67, 60))
    # Dot
    d.ellipse((card_x1 + 14, card_y1 + 11, card_x1 + 22, card_y1 + 19), fill=(217, 45, 67, 255))

    # Module Pills
    pills = [
        ("Từ Điển HSK 1-9", (217, 45, 67)),
        ("Dịch & Gắn Pinyin", (2, 132, 199)),
        ("Ngữ Pháp HSK 3.0", (16, 185, 129)),
        ("商务中文 Thương Mại", (217, 119, 6)),
    ]
    pill_x = card_x1
    pill_y = card_y1 + 290
    for name, col in pills:
        pw = len(name) * 11 + 26
        d.rounded_rectangle((pill_x, pill_y, pill_x + pw, pill_y + 36), radius=18, fill=(255, 255, 255, 255), outline=(col[0], col[1], col[2], 70), width=1)
        d.ellipse((pill_x + 12, pill_y + 14, pill_x + 20, pill_y + 22), fill=col)
        pill_x += pw + 12
        if pill_x > W - 180:
            pill_x = card_x1
            pill_y += 46

    og_path = os.path.join(ASSETS_DIR, 'og-preview.png')
    og.save(og_path, format='PNG', optimize=True)
    print('  ✓ Generated assets/icons/og-preview.png (1200x630)')

def main():
    print('🎨 Generating Complete Red Brand Identity & Favicon Suite for 哈喽中文...')
    generate_svg_assets()
    master = render_master_icon(2048)
    export_all_raster_icons(master)
    generate_static_manifest()
    generate_og_preview(master)
    print('\n🎉 All brand assets generated successfully!')

if __name__ == '__main__':
    main()
