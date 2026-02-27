#!/usr/bin/env python3
"""
Scans static/images/brand_logo/ and generates data/brands.json
Run: python3 scripts/generate-brands.py
Add new logo files to the folder, run this script, then refresh the page.
"""

import os
import json

BRAND_LOGO_DIR = os.path.join(os.path.dirname(__file__), '..', 'static', 'images', 'brand_logo')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'brands.json')
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'}


def filename_to_name(filename):
    name = os.path.splitext(filename)[0]
    return name.replace('-', ' ').replace('_', ' ').title()


def main():
    files = sorted(os.listdir(BRAND_LOGO_DIR))
    brands = []
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in IMAGE_EXTENSIONS:
            brands.append({
                "name": filename_to_name(f),
                "logo": f"static/images/brand_logo/{f}"
            })

    with open(OUTPUT_FILE, 'w') as out:
        json.dump({"brands": brands}, out, indent=2)

    print(f"Generated brands.json with {len(brands)} logos")


if __name__ == '__main__':
    main()
