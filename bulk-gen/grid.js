#!/usr/bin/env node
/*
  Build an HTML grid page of all SVGs in /symbols/ for visual review.

  Usage:
    node bulk-gen/grid.js                # all SVGs
    node bulk-gen/grid.js want_           # only files starting with want_
    node bulk-gen/grid.js want_,go_,look_ # multiple prefixes (comma-separated)

  Output: bulk-gen/grid.html  — open in any browser to see thumbnails.
*/

const fs   = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SYMBOLS_DIR  = path.join(PROJECT_ROOT, 'symbols');
const OUTPUT       = path.join(__dirname, 'grid.html');

const filterArg = process.argv[2] || '';
const prefixes  = filterArg ? filterArg.split(',').map(s => s.trim()) : [];

const files = fs.readdirSync(SYMBOLS_DIR)
  .filter(f => f.toLowerCase().endsWith('.svg'))
  .filter(f => !prefixes.length || prefixes.some(p => f.startsWith(p)))
  .sort();

console.log(`Found ${files.length} SVGs to display`);

const tiles = files.map(f => {
  // The HTML lives in bulk-gen/, so the relative path back to symbols/ is ../symbols/
  const rel = `../symbols/${f}`;
  // Strip .svg for the label
  const label = f.replace(/\.svg$/i, '');
  return `<div class="tile">
    <div class="img-wrap"><img src="${rel}" alt="${label}" loading="lazy" /></div>
    <div class="label">${label}</div>
  </div>`;
}).join('\n');

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ELE Talk symbol grid — ${files.length} tiles${filterArg ? ` (filter: ${filterArg})` : ''}</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; margin: 16px; background: #f5f7fb; color: #1a1a1a; }
  h1 { font-size: 18px; margin: 0 0 16px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
  .tile { background: #fff; border: 1px solid #dde2eb; border-radius: 8px; padding: 8px; }
  .img-wrap { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; background: #fff; }
  .img-wrap img { width: 100%; height: 100%; object-fit: contain; }
  .label { font-size: 10px; word-break: break-all; margin-top: 4px; color: #555; text-align: center; line-height: 1.3; }
</style>
</head>
<body>
<h1>${files.length} symbols${filterArg ? ` &mdash; filter: ${filterArg}` : ''}</h1>
<div class="grid">
${tiles}
</div>
</body>
</html>
`;

fs.writeFileSync(OUTPUT, html);
console.log(`Written to ${OUTPUT}`);
console.log(`Open in browser: file://${OUTPUT.replace(/\\/g, '/')}`);
