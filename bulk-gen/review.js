#!/usr/bin/env node
/*
  Build a single-page browser review tool for symbol QA.

  Usage:
    node bulk-gen/review.js                    # all SVGs in /symbols
    node bulk-gen/review.js want_              # filter by prefix
    node bulk-gen/review.js want_,go_,look_    # multiple prefixes

  Output: bulk-gen/review.html — open in any browser.
  Decisions persist in localStorage so you can stop and resume.

  STALE DETECTION (added 2026-05-18):
    Each decision is stored with the SVG file's mtime at time of decision.
    Next time the page loads, if any SVG has been modified (regenerated)
    SINCE its decision, that decision is flagged as STALE and shown first
    for re-review. This means after a regen run, you just open the review
    page and the tool jumps straight to the regenerated symbols.

  Export button gives a JSON blob to paste back into the chat.
*/

const fs   = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SYMBOLS_DIR  = path.join(PROJECT_ROOT, 'symbols');
const OUTPUT       = path.join(__dirname, 'review.html');

const filterArg = process.argv[2] || '';
const prefixes  = filterArg ? filterArg.split(',').map(s => s.trim()) : [];

const files = fs.readdirSync(SYMBOLS_DIR)
  .filter(f => f.toLowerCase().endsWith('.svg'))
  .filter(f => !prefixes.length || prefixes.some(p => f.startsWith(p)))
  .sort()
  .map(name => ({
    name,
    mtime: fs.statSync(path.join(SYMBOLS_DIR, name)).mtimeMs,
  }));

console.log(`Found ${files.length} SVGs to review`);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ELE Talk symbol review — ${files.length} tiles${filterArg ? ` (${filterArg})` : ''}</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, system-ui, sans-serif;
    margin: 0;
    background: #f5f7fb;
    color: #1a1a1a;
    -webkit-user-select: none;
    user-select: none;
  }
  .top-bar {
    padding: 14px 24px;
    background: #fff;
    border-bottom: 1px solid #dde2eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
    flex-wrap: wrap;
    gap: 10px;
  }
  .progress { font-size: 14px; font-weight: 600; }
  .counts { color: #666; font-weight: 400; margin-left: 16px; }
  .counts .stale-count { color: #d97706; font-weight: 600; }
  .top-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px;
  }
  .stale-badge {
    background: #fef3c7;
    border: 1.5px solid #d97706;
    color: #92400e;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .stale-badge.hidden { display: none; }
  .image-wrap {
    width: 420px;
    height: 420px;
    background: #fff;
    border: 2px solid #dde2eb;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .image-wrap.stale {
    border-color: #d97706;
    box-shadow: 0 2px 12px rgba(217, 119, 6, 0.25);
  }
  .image-wrap img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
  .word-id {
    font-size: 22px;
    font-weight: 700;
    margin-top: 20px;
    color: #1a1a1a;
    font-family: ui-monospace, 'SF Mono', Consolas, monospace;
  }
  .help-text {
    font-size: 13px;
    color: #666;
    margin-top: 6px;
  }
  kbd {
    background: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 3px;
    padding: 1px 6px;
    font-family: ui-monospace, monospace;
    font-size: 12px;
  }
  .notes {
    width: 420px;
    margin-top: 20px;
  }
  .notes input {
    width: 100%;
    padding: 12px 14px;
    font-size: 14px;
    border: 1.5px solid #dde2eb;
    border-radius: 8px;
    font-family: inherit;
  }
  .notes input:focus {
    outline: none;
    border-color: #80AADC;
  }
  .button-row {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }
  .btn {
    padding: 14px 24px;
    font-size: 15px;
    font-weight: 700;
    border: 2px solid;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    transition: transform 0.08s, filter 0.08s;
    min-width: 110px;
  }
  .btn:active { transform: scale(0.97); filter: brightness(0.95); }
  .btn-pass { background: #d4edda; border-color: #28a745; color: #155724; }
  .btn-fail { background: #f8d7da; border-color: #dc3545; color: #721c24; }
  .btn-nav  { background: #e9ecef; border-color: #adb5bd; color: #495057; }
  .btn-secondary { background: #fff; border-color: #80AADC; color: #1a4a7a; padding: 8px 14px; font-size: 13px; min-width: 0; }
  .btn-stale-jump { background: #fef3c7; border-color: #d97706; color: #92400e; padding: 8px 14px; font-size: 13px; min-width: 0; }
  .status {
    margin-top: 12px;
    font-size: 13px;
    font-weight: 600;
    min-height: 20px;
  }
  .status.pass { color: #28a745; }
  .status.fail { color: #dc3545; }
  .status.stale { color: #d97706; }
  .export-output {
    margin-top: 24px;
    width: 600px;
    max-width: 100%;
  }
  .export-output textarea {
    width: 100%;
    height: 240px;
    padding: 12px;
    font-family: ui-monospace, monospace;
    font-size: 12px;
    border: 1.5px solid #dde2eb;
    border-radius: 8px;
  }
  .hidden { display: none; }
</style>
</head>
<body>

<div class="top-bar">
  <div class="progress">
    Symbol <span id="current">1</span> of <span id="total">${files.length}</span>
    <span class="counts" id="counts"></span>
  </div>
  <div class="top-buttons">
    <button class="btn btn-stale-jump" id="stale-jump-btn" onclick="jumpToStale()">Next stale →</button>
    <button class="btn btn-secondary" onclick="jumpToUndecided()">Next unreviewed</button>
    <button class="btn btn-secondary" onclick="resetAll()" title="Clear all decisions">Reset</button>
    <button class="btn btn-secondary" onclick="exportResults()">Export results</button>
  </div>
</div>

<div class="main">
  <div class="stale-badge hidden" id="stale-badge">⚠️ STALE — this symbol was regenerated since you last reviewed it. Please re-review.</div>
  <div class="image-wrap" id="image-wrap"><img id="current-img" src="" alt="" /></div>
  <div class="word-id" id="word-id">—</div>
  <div class="help-text">
    <kbd>P</kbd> pass &nbsp;·&nbsp; <kbd>F</kbd> fail &nbsp;·&nbsp; <kbd>←</kbd>/<kbd>→</kbd> navigate
  </div>
  <div class="notes">
    <input id="note-input" placeholder="Optional note (e.g. 'use original CORE WAIT', 'unclear, regen', 'looks like dog not cat')" />
  </div>
  <div class="button-row">
    <button class="btn btn-nav" onclick="navigate(-1)">← Back</button>
    <button class="btn btn-pass" onclick="mark('pass')">✓ Pass</button>
    <button class="btn btn-fail" onclick="mark('fail')">✗ Fail</button>
    <button class="btn btn-nav" onclick="navigate(1)">Skip →</button>
  </div>
  <div class="status" id="status"></div>

  <div class="export-output hidden" id="export-output">
    <p style="font-size:13px;color:#555;margin-bottom:6px">
      Copy this JSON and paste it back in the chat:
    </p>
    <textarea id="export-text" readonly></textarea>
  </div>
</div>

<script>
const files = ${JSON.stringify(files)};
const STORAGE_KEY = 'eletalk-review-' + ${JSON.stringify(filterArg || 'all')};

let state = {};
try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch {}
let idx = 0;

/* A decision is STALE when the SVG was modified after the decision was made.
   We compare the file's current mtime (embedded at generator-time) against
   the mtime recorded with the decision. Older decisions stored before this
   feature was added won't have an mtime — those are treated as fresh. */
function isStale(fileObj) {
  const d = state[fileObj.name];
  if (!d || d.mtime === undefined) return false;
  return fileObj.mtime > d.mtime;
}

/* Priority for jumping on load:
   1. Stale decisions (regenerated since reviewed)
   2. Completely unreviewed
   3. Fall back to index 0
*/
function findStartIndex() {
  for (let i = 0; i < files.length; i++) if (isStale(files[i])) return i;
  for (let i = 0; i < files.length; i++) if (!state[files[i].name]) return i;
  return 0;
}

function findNextStale(fromIdx) {
  for (let i = (fromIdx + 1) % files.length; i !== fromIdx; i = (i + 1) % files.length) {
    if (isStale(files[i])) return i;
  }
  return -1;
}

function findNextUndecided(fromIdx) {
  for (let i = (fromIdx + 1) % files.length; i !== fromIdx; i = (i + 1) % files.length) {
    if (!state[files[i].name]) return i;
  }
  return -1;
}

function render() {
  const file = files[idx];
  const stale = isStale(file);
  document.getElementById('current').textContent = idx + 1;
  document.getElementById('current-img').src = '../symbols/' + file.name;
  document.getElementById('current-img').alt = file.name;
  document.getElementById('word-id').textContent = file.name.replace(/\\.svg$/, '');
  document.getElementById('image-wrap').classList.toggle('stale', stale);
  document.getElementById('stale-badge').classList.toggle('hidden', !stale);

  const decision = state[file.name];
  document.getElementById('note-input').value = decision?.note || '';

  updateCounts();
  updateStatus(decision, stale);
  updateStaleJumpButton();
}

function updateCounts() {
  let passed = 0, failed = 0, staleCount = 0;
  for (const f of files) {
    const d = state[f.name];
    if (isStale(f)) staleCount++;
    else if (d?.decision === 'pass') passed++;
    else if (d?.decision === 'fail') failed++;
  }
  const remaining = files.length - passed - failed - staleCount;
  const stalePart = staleCount > 0
    ? ' · <span class="stale-count">⚠ ' + staleCount + ' stale</span>'
    : '';
  document.getElementById('counts').innerHTML =
    \`· ✓ \${passed} · ✗ \${failed} · \${remaining} to go\${stalePart}\`;
}

function updateStatus(decision, stale) {
  const s = document.getElementById('status');
  if (stale) {
    const prev = decision?.decision === 'pass' ? 'previously passed' : 'previously failed';
    s.textContent = '⚠ Stale: ' + prev + (decision?.note ? ' — note: ' + decision.note : '');
    s.className = 'status stale';
    return;
  }
  if (!decision) {
    s.textContent = '';
    s.className = 'status';
  } else if (decision.decision === 'pass') {
    s.textContent = '✓ Passed' + (decision.note ? ' — note: ' + decision.note : '');
    s.className = 'status pass';
  } else if (decision.decision === 'fail') {
    s.textContent = '✗ Failed' + (decision.note ? ' — note: ' + decision.note : '');
    s.className = 'status fail';
  }
}

function updateStaleJumpButton() {
  let staleCount = 0;
  for (const f of files) if (isStale(f)) staleCount++;
  const btn = document.getElementById('stale-jump-btn');
  if (staleCount === 0) {
    btn.style.display = 'none';
  } else {
    btn.style.display = '';
    btn.textContent = \`Next stale (\${staleCount}) →\`;
  }
}

function mark(decision) {
  const file = files[idx];
  const note = document.getElementById('note-input').value.trim();
  state[file.name] = { decision, note, mtime: file.mtime };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  // After marking, prefer next stale; else next undecided; else next sequential
  const nextStale = findNextStale(idx);
  if (nextStale >= 0) { idx = nextStale; render(); return; }
  const nextUnreviewed = findNextUndecided(idx);
  if (nextUnreviewed >= 0) { idx = nextUnreviewed; render(); return; }
  navigate(1);
}

function navigate(delta) {
  idx = Math.max(0, Math.min(files.length - 1, idx + delta));
  render();
}

function jumpToStale() {
  for (let i = 0; i < files.length; i++) {
    if (isStale(files[i])) { idx = i; render(); return; }
  }
}

function jumpToUndecided() {
  for (let i = 0; i < files.length; i++) {
    if (!state[files[i].name]) { idx = i; render(); return; }
  }
}

function resetAll() {
  if (!confirm('Clear all ' + Object.keys(state).length + ' decisions?')) return;
  state = {};
  localStorage.removeItem(STORAGE_KEY);
  idx = 0;
  render();
}

function exportResults() {
  const failures = [];
  let passed = 0;
  for (const file of files) {
    const d = state[file.name];
    if (!d || isStale(file)) continue;  // stale decisions excluded from export
    if (d.decision === 'fail') {
      failures.push({ word_id: file.name.replace(/\\.svg$/, ''), note: d.note || '' });
    } else if (d.decision === 'pass') {
      passed++;
    }
  }
  const result = {
    chunk: ${JSON.stringify(filterArg || 'all')},
    total: files.length,
    reviewed: passed + failures.length,
    passed,
    failed: failures.length,
    failures,
  };
  const json = JSON.stringify(result, null, 2);
  const out = document.getElementById('export-output');
  document.getElementById('export-text').value = json;
  out.classList.remove('hidden');
  document.getElementById('export-text').select();
}

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'p' || e.key === 'P') { e.preventDefault(); mark('pass'); }
  else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); mark('fail'); }
  else if (e.key === 'ArrowLeft')  { e.preventDefault(); navigate(-1); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1); }
});

idx = findStartIndex();
render();
</script>

</body>
</html>
`;

fs.writeFileSync(OUTPUT, html);
console.log(`Written to ${OUTPUT}`);
console.log(`Open in browser: file://${OUTPUT.replace(/\\/g, '/')}`);
