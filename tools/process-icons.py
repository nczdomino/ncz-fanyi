#!/usr/bin/env python3
"""
tools/process-icons.py
Processes halou_zhongwen_icon_pack into transparent web-optimized PNGs,
favicons, PWA icons, and brand graphics.
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(BASE_DIR, 'assets', 'icons')

def make_transparent(im, thresh=240):
    im = im.convert('RGBA')
    w, h = im.size
    pixels = im.load()
    visited = set()
    queue = []
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))

    for pt in queue:
        r, g, b, a = pixels[pt[0], pt[1]]
        if r >= thresh and g >= thresh and b >= thresh:
            visited.add(pt)

    head = 0
    q = list(visited)
    while head < len(q):
        cx, cy = q[head]
        head += 1
        for nx, ny in [(cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)]:
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                r, g, b, a = pixels[nx, ny]
                if r >= thresh and g >= thresh and b >= thresh:
                    visited.add((nx, ny))
                    q.append((nx, ny))

    mask = Image.new('L', (w, h), 255)
    m_pix = mask.load()
    for x, y in visited:
        m_pix[x, y] = 0

    im.putalpha(mask)
    return im

def make_squircle_icon(in_path, out_path, size=512, radius_ratio=0.22):
    im = Image.open(in_path).convert('RGBA')
    gray = im.convert('L')
    pixels = gray.load()
    w, h = im.size
    min_x, max_x, min_y, max_y = w, 0, h, 0
    for y in range(h):
        for x in range(w):
            if pixels[x, y] < 245:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    cw = max_x - min_x + 1
    ch = max_y - min_y + 1
    side = max(cw, ch)
    cx = (min_x + max_x) // 2
    cy = (min_y + max_y) // 2

    # Center cropped square with slight padding
    pad = int(side * 0.02)
    side_padded = side + pad * 2
    sq = Image.new('RGBA', (side_padded, side_padded), (255, 255, 255, 255))
    crop_x1 = max(0, cx - side // 2)
    crop_y1 = max(0, cy - side // 2)
    crop_x2 = min(w, cx + side // 2)
    crop_y2 = min(h, cy + side // 2)
    sq.paste(im.crop((crop_x1, crop_y1, crop_x2, crop_y2)), (pad, pad))
    sq = sq.resize((size, size), Image.Resampling.LANCZOS)

    # High-resolution squircle mask
    scale = 4
    mask = Image.new('L', (size * scale, size * scale), 0)
    draw = ImageDraw.Draw(mask)
    r = int(size * scale * radius_ratio)
    draw.rounded_rectangle((0, 0, size * scale, size * scale), radius=r, fill=255)
    mask = mask.resize((size, size), Image.Resampling.LANCZOS)

    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(sq, (0, 0), mask)
    out.save(out_path, format='PNG', optimize=True)
    return out

def main():
    print('🎨 Processing Halou Zhongwen Icon Pack...')

    # 1. Process UI Icons (Transparent)
    ui_dir = os.path.join(ASSETS_DIR, 'ui-icons')
    if os.path.isdir(ui_dir):
        for f in os.listdir(ui_dir):
            if f.endswith('.png'):
                p = os.path.join(ui_dir, f)
                im = Image.open(p)
                t_im = make_transparent(im, thresh=240)
                t_im.save(p, format='PNG', optimize=True)
                print(f'  ✓ UI Icon: {f}')

    # 2. Process Extras (Transparent)
    extras_dir = os.path.join(ASSETS_DIR, 'extras')
    if os.path.isdir(extras_dir):
        for f in os.listdir(extras_dir):
            if f.endswith('.png'):
                p = os.path.join(extras_dir, f)
                im = Image.open(p)
                t_im = make_transparent(im, thresh=240)
                t_im.save(p, format='PNG', optimize=True)
                print(f'  ✓ Extra Icon: {f}')

    # 3. Process App Illustrations (Mascots & Concepts)
    app_dir = os.path.join(ASSETS_DIR, 'app-icons')
    illustrations = [
        'nihao-speech-bubble.png', 'mascot-reading.png', 'mascot-headphones.png',
        'chinese-book.png', 'city-pagoda.png', 'global-learning.png',
        'zhong-character.png', 'halou-hanzi.png'
    ]
    for name in illustrations:
        p = os.path.join(app_dir, name)
        if os.path.exists(p):
            im = Image.open(p)
            t_im = make_transparent(im, thresh=240)
            t_im.save(p, format='PNG', optimize=True)
            print(f'  ✓ App Illustration: {name}')

    # 4. Generate Brand Logo & Squircles
    main_icon_src = os.path.join(app_dir, 'halou-zhongwen-main.png')
    brand_logo_out = os.path.join(ASSETS_DIR, 'brand-logo.png')
    make_squircle_icon(main_icon_src, brand_logo_out, size=512, radius_ratio=0.22)
    print('  ✓ Generated brand-logo.png (512x512)')

    # Also make a squircle version of the main icon
    main_squircle_out = os.path.join(app_dir, 'halou-zhongwen-main.png')
    make_squircle_icon(main_icon_src, main_squircle_out, size=1024, radius_ratio=0.22)
    print('  ✓ Refined halou-zhongwen-main.png (1024x1024 squircle)')

    # 5. Generate Web Favicons & PWA Icons
    fav_src = os.path.join(ASSETS_DIR, 'favicons', 'favicon-square-h.png')
    if not os.path.exists(fav_src):
        fav_src = main_icon_src

    fav_base = make_squircle_icon(fav_src, os.path.join(ASSETS_DIR, 'favicon-base.png'), size=512, radius_ratio=0.22)

    # Favicon 32x32 & 16x16
    fav32 = fav_base.resize((32, 32), Image.Resampling.LANCZOS)
    fav32.save(os.path.join(ASSETS_DIR, 'favicon-32x32.png'), format='PNG', optimize=True)
    fav16 = fav_base.resize((16, 16), Image.Resampling.LANCZOS)
    fav16.save(os.path.join(ASSETS_DIR, 'favicon-16x16.png'), format='PNG', optimize=True)
    print('  ✓ Generated favicon-32x32.png & favicon-16x16.png')

    # Apple Touch Icon (180x180)
    apple_touch = fav_base.resize((180, 180), Image.Resampling.LANCZOS)
    apple_touch.save(os.path.join(ASSETS_DIR, 'apple-touch-icon.png'), format='PNG', optimize=True)
    print('  ✓ Generated apple-touch-icon.png (180x180)')

    # PWA Icons (192x192 & 512x512)
    icon192 = fav_base.resize((192, 192), Image.Resampling.LANCZOS)
    icon192.save(os.path.join(ASSETS_DIR, 'icon-192.png'), format='PNG', optimize=True)
    icon512 = fav_base.resize((512, 512), Image.Resampling.LANCZOS)
    icon512.save(os.path.join(ASSETS_DIR, 'icon-512.png'), format='PNG', optimize=True)
    print('  ✓ Generated icon-192.png & icon-512.png')

    # Root favicon.ico (multi-size: 16, 32, 48)
    fav48 = fav_base.resize((48, 48), Image.Resampling.LANCZOS)
    ico_path = os.path.join(BASE_DIR, 'favicon.ico')
    fav_base.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print(f'  ✓ Generated root {ico_path} (16, 32, 48)')

    # Clean up temp base
    temp_base = os.path.join(ASSETS_DIR, 'favicon-base.png')
    if os.path.exists(temp_base):
        os.remove(temp_base)

    print('\n🎉 Icon processing completed successfully!')

if __name__ == '__main__':
    main()

