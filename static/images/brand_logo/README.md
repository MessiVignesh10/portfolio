# Brand logos

Add your brand logo files here. All image formats are supported: PNG, JPEG, SVG, WebP, GIF.

**To display new logos on the page:**

1. Add your logo file(s) to this folder
2. Run the generate script:
   ```bash
   node scripts/generate-brands.js
   ```
   Or with Python:
   ```bash
   python3 scripts/generate-brands.py
   ```
3. Refresh the page

The script scans this folder and updates `data/brands.json` automatically. Brand names are derived from filenames (e.g. `acme-corp.png` → "Acme Corp").
