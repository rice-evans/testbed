#!/usr/bin/env node
/**
 * add-photos.mjs
 *
 * Drop any new photos into raw-photos/ then run:
 *   node add-photos.mjs
 *
 * It will:
 *  1. Convert each photo to two WebP files inside src/assets/images/:
 *       GalleryN-thumb.webp  — small (~640px), for the grid and masonry wall
 *       GalleryN.webp        — large (2400px, quality 90), only loaded when opened in lightbox
 *  2. Print the exact lines to copy-paste into src/components/sections/Media.jsx
 *  3. Skip any file that has already been processed (so it's safe to re-run)
 *
 * Requirements: Node 18+, sharp  (already in devDependencies)
 *   npm install        — installs sharp if you haven't yet
 *
 * Supported input formats: jpg / jpeg / png / webp / heic / avif / tiff
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RAW_DIR    = path.join(__dirname, 'raw-photos');
const OUT_DIR    = path.join(__dirname, 'src', 'assets', 'images');
const THUMB_SIZE = 640;   // px on the long edge — shown in grid tiles, keep small
const FULL_SIZE  = 2400;  // px on the long edge — shown in lightbox, should look great
const FULL_Q     = 90;    // WebP quality for lightbox images (0–100)
const THUMB_Q    = 68;    // WebP quality for thumbnails

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.avif', '.tiff', '.tif']);

// ── helpers ──────────────────────────────────────────────────────────────────

function nextGalleryIndex(outDir) {
  // Find the highest GalleryN.webp already in the output folder so we can continue numbering.
  if (!fs.existsSync(outDir)) return 1;
  const existing = fs.readdirSync(outDir)
    .map(f => {
      const m = f.match(/^Gallery(\d+)\.webp$/);
      return m ? parseInt(m[1], 10) : 0;
    });
  return existing.length ? Math.max(...existing) + 1 : 1;
}

function alreadyProcessed(outDir, baseName) {
  return (
    fs.existsSync(path.join(outDir, `${baseName}-thumb.webp`)) &&
    fs.existsSync(path.join(outDir, `${baseName}.webp`))
  );
}

async function processOne(inputPath, baseName, outDir) {
  const resizeTo = (size) =>
    sharp(inputPath)
      .rotate()                      // honour EXIF orientation
      .resize(size, size, { fit: 'inside', withoutEnlargement: true });

  const thumbPath = path.join(outDir, `${baseName}-thumb.webp`);
  const fullPath  = path.join(outDir, `${baseName}.webp`);

  await resizeTo(THUMB_SIZE).webp({ quality: THUMB_Q, effort: 6 }).toFile(thumbPath);
  await resizeTo(FULL_SIZE).webp({ quality: FULL_Q,  effort: 6 }).toFile(fullPath);

  const thumbKB = (fs.statSync(thumbPath).size / 1024).toFixed(1);
  const fullKB  = (fs.statSync(fullPath).size  / 1024).toFixed(1);

  return { thumbPath, fullPath, thumbKB, fullKB };
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(RAW_DIR)) {
    console.log(`\n  Creating raw-photos/ — drop your original images in there, then re-run.\n`);
    fs.mkdirSync(RAW_DIR, { recursive: true });
    process.exit(0);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const inputs = fs.readdirSync(RAW_DIR)
    .filter(f => SUPPORTED.has(path.extname(f).toLowerCase()))
    .sort();

  if (inputs.length === 0) {
    console.log(`\n  No supported images found in raw-photos/. Add some and re-run.\n`);
    process.exit(0);
  }

  let nextIdx = nextGalleryIndex(OUT_DIR);
  const results = [];

  for (const file of inputs) {
    const inputPath = path.join(RAW_DIR, file);
    const baseName  = `Gallery${nextIdx}`;

    if (alreadyProcessed(OUT_DIR, baseName)) {
      // A GalleryN pair already exists — find the next free slot
      // (Handles the re-run-after-partial case gracefully.)
      while (alreadyProcessed(OUT_DIR, `Gallery${nextIdx}`)) nextIdx++;
    }

    const gallery = `Gallery${nextIdx}`;
    process.stdout.write(`  Processing ${file} → ${gallery}... `);

    try {
      const { thumbKB, fullKB } = await processOne(inputPath, gallery, OUT_DIR);
      console.log(`✓  thumb ${thumbKB} KB  |  full ${fullKB} KB`);
      results.push({ file, gallery, nextIdx });
      nextIdx++;
    } catch (err) {
      console.log(`✗  ERROR: ${err.message}`);
    }
  }

  if (results.length === 0) {
    console.log('\n  Nothing new to process.\n');
    return;
  }

  // ── print the copy-paste snippet ──────────────────────────────────────────
  console.log('\n' + '─'.repeat(72));
  console.log('  Done! Copy the lines below into src/components/sections/Media.jsx\n');

  // import lines
  const importLines = results.map(({ gallery }) => {
    const g = gallery;
    const varBase = g.toLowerCase(); // e.g. "gallery9"
    return [
      `import ${varBase}Thumb from '../../assets/images/${g}-thumb.webp';`,
      `import ${varBase}Full  from '../../assets/images/${g}.webp';`
    ].join('\n');
  }).join('\n');

  console.log('── IMPORTS (add near the top with the other import lines) ─────────────\n');
  console.log(importLines);

  // PREVIEW_PHOTOS entries
  const previewLines = results.map(({ gallery }) => {
    const v = gallery.toLowerCase();
    return `  { id: "${gallery}", thumb: ${v}Thumb, img: ${v}Full },`;
  }).join('\n');

  console.log('\n── PREVIEW_PHOTOS (add inside the array) ───────────────────────────────\n');
  console.log(previewLines);

  // MASONRY_ITEMS entries  — height is set to a placeholder; user can tweak
  const masonryLines = results.map(({ gallery, nextIdx: idx }) => {
    const v = gallery.toLowerCase();
    return `  { id: "m${idx}", thumb: ${v}Thumb, img: ${v}Full, url: "#", height: 420 },`;
  }).join('\n');

  console.log('\n── MASONRY_ITEMS (add inside the array) ────────────────────────────────\n');
  console.log(masonryLines);
  console.log('\n' + '─'.repeat(72) + '\n');
}

main().catch(err => {
  console.error('\nFatal:', err);
  process.exit(1);
});
