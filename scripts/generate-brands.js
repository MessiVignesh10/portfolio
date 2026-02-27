#!/usr/bin/env node
/**
 * Scans static/images/brand_logo/ and generates data/brands.json
 * Run: node scripts/generate-brands.js
 * Add new logo files to the folder, run this script, then refresh the page.
 */

const fs = require('fs');
const path = require('path');

const BRAND_LOGO_DIR = path.join(__dirname, '..', 'static', 'images', 'brand_logo');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'brands.json');
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']);

function filenameToName(filename) {
  const name = path.basename(filename, path.extname(filename));
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

try {
  const files = fs.readdirSync(BRAND_LOGO_DIR);
  const brands = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext);
    })
    .sort()
    .map(file => ({
      name: filenameToName(file),
      logo: `static/images/brand_logo/${file}`
    }));

  const output = { brands };
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`Generated brands.json with ${brands.length} logos`);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
