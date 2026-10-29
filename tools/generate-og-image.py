#!/usr/bin/env python3
"""
tools/generate-og-image.py
Generates the official 1200x630 OpenGraph / Twitter preview card for Halou Zhongwen.
Used by Google Search rich cards, Facebook, Zalo, Twitter, Messenger, and Telegram.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PATH = os.path.join(BASE_DIR, 'assets', 'icons', 'og-preview.png')
BRAND_LOGO = os.path.join(BASE_DIR, 'assets', 'icons', 'brand-logo.png')
MASCOT_PATH = os.path.join(BASE_DIR, 'assets', 'icons', 'app-icons', 'nihao-speech-bubble.png')

W, H = 1200, 630

def create_og_banner():
    # 1. Base Canvas & Gradient
    banner = Image.new('RGB', (W, H), (11, 15, 25))
    draw = ImageDraw.Draw(banner)

    # Gradient background
    for y in range(H):
        ratio = y / H
        r = int(14 + (24 - 14) * ratio)
        g = int(18 + (34 - 18) * ratio)
        b = int(32 + (58 - 32) * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Glow overlays
    glow_canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_canvas)
    # Royal blue radial glow top-left
    glow_draw.ellipse([(-100, -100), (600, 600)], fill=(0, 76, 245, 45))
    # Crimson radial glow bottom-right
    glow_draw.ellipse([(700, 250), (1400, 950)], fill=(232, 52, 78, 35))
    glow_canvas = glow_canvas.filter(ImageFilter.GaussianBlur(80))
    banner.paste(glow_canvas, (0, 0), glow_canvas)

    # Subtle modern border
    draw = ImageDraw.Draw(banner)
    draw.rounded_rectangle([(16, 16), (W - 16, H - 16)], radius=24, outline=(255, 255, 255, 30), width=2)

    # 2. Paste Brand Logo with Glow
    if os.path.exists(BRAND_LOGO):
        logo = Image.open(BRAND_LOGO).convert('RGBA')
        logo = logo.resize((140, 140), Image.Resampling.LANCZOS)
        
        # Logo drop shadow
        shadow = Image.new('RGBA', (170, 170), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(shadow)
        sdraw.rounded_rectangle([(15, 15), (155, 155)], radius=32, fill=(0, 76, 245, 90))
        shadow = shadow.filter(ImageFilter.GaussianBlur(16))
        banner.paste(shadow, (75, 75), shadow)
        banner.paste(logo, (90, 90), logo)

    # 3. Paste Mascot Illustration (Right side)
    if os.path.exists(MASCOT_PATH):
        mascot = Image.open(MASCOT_PATH).convert('RGBA')
        mascot = mascot.resize((360, 360), Image.Resampling.LANCZOS)
        
        # Mascot shadow
        mshadow = Image.new('RGBA', (400, 400), (0, 0, 0, 0))
        msdraw = ImageDraw.Draw(mshadow)
        msdraw.ellipse([(40, 40), (360, 360)], fill=(0, 76, 245, 60))
        mshadow = mshadow.filter(ImageFilter.GaussianBlur(24))
        banner.paste(mshadow, (740, 110), mshadow)
        banner.paste(mascot, (760, 130), mascot)

    # 4. Typography
    font_bold = None
    font_regular = None
    font_cn = None

    font_paths = [
        '/Library/Fonts/Arial Unicode.ttf',
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
        '/System/Library/Fonts/PingFang.ttc',
        '/System/Library/Fonts/Helvetica.ttc'
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                if not font_bold:
                    font_bold = ImageFont.truetype(fp, 52)
                if not font_regular:
                    font_regular = ImageFont.truetype(fp, 23)
                if not font_cn:
                    font_cn = ImageFont.truetype(fp, 26)
            except Exception:
                pass

    if not font_bold:
        font_bold = ImageFont.load_default()
        font_regular = ImageFont.load_default()
        font_cn = ImageFont.load_default()

    # Brand Title
    draw.text((254, 98), "Halou", fill=(255, 255, 255), font=font_bold)
    
    # Sub-badge next to brand
    badge_bg = [(395, 108), (560, 150)]
    draw.rounded_rectangle(badge_bg, radius=21, fill=(232, 52, 78, 220))
    draw.text((410, 116), "哈喽 中文", fill=(255, 255, 255), font=font_cn)

    # Main Headline
    try:
        font_headline = ImageFont.truetype('/System/Library/Fonts/PingFang.ttc', 38)
    except Exception:
        font_headline = font_bold
    draw.text((90, 260), "Trợ Thủ Tiếng Trung Thông Minh 2026", fill=(255, 255, 255), font=font_headline)

    # Sub-descriptions
    try:
        font_sub = ImageFont.truetype('/System/Library/Fonts/PingFang.ttc', 22)
    except Exception:
        font_sub = font_regular

    desc_lines = [
        "• Tra từ điển thông minh 119.000+ từ & phát âm chuẩn giọng bản xứ",
        "• Dịch văn bản hiểu ngữ cảnh & tự động gắn Pinyin, thanh điệu tức thì",
        "• Hệ thống Ngữ pháp HSK 1 - 9 & Tiếng Trung Thương mại (商务中文)"
    ]
    y_offset = 320
    for line in desc_lines:
        draw.text((90, y_offset), line, fill=(200, 210, 225), font=font_sub)
        y_offset += 38

    # Feature Pill Badges at bottom
    pills = [
        ("📚 HSK 1-9 & Ngữ pháp", 90),
        ("💼 商务中文", 340),
        ("📷 Quét OCR", 495),
        ("⚡ 100% Offline-First", 650)
    ]
    for text, x in pills:
        pill_w = len(text) * 14 + 20
        draw.rounded_rectangle([(x, 460), (x + pill_w, 498)], radius=12, fill=(30, 41, 65), outline=(65, 85, 120), width=1)
        draw.text((x + 12, 468), text, fill=(225, 235, 250), font=font_sub)

    # Author & License Footer
    draw.line([(90, 540), (1110, 540)], fill=(255, 255, 255, 25), width=1)
    try:
        font_footer = ImageFont.truetype('/System/Library/Fonts/PingFang.ttc', 17)
    except Exception:
        font_footer = font_regular

    draw.text((90, 560), "Tác giả: 聂诚忠 (Nie Thanh Trung) · halouzhongwen.com · Hoàn toàn miễn phí", fill=(140, 155, 175), font=font_footer)
    draw.text((900, 560), "PWA & Mobile Ready", fill=(0, 210, 160), font=font_footer)

    banner.save(OUT_PATH, format='PNG', optimize=True)
    print(f"🎉 Generated official OpenGraph preview card: {OUT_PATH} (1200x630)")

if __name__ == '__main__':
    create_og_banner()

