#!/usr/bin/env node
/*
  Build a single-page browser review tool for symbol QA.

  Usage:
    node bulk-gen/review.js                    # all SVGs in /symbols
    node bulk-gen/review.js want_              # filter by prefix
    node bulk-gen/review.js want_,go_,look_    # multiple prefixes

  Output: bulk-gen/review.html — open in any browser.
  Decisions persist in localStorage so you can stop and resume.
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
  .sort();

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
  }
  .progress { font-size: 14px; font-weight: 600; }
  .counts { color: #666; font-weight: 400; margin-left: 16px; }
  .top-buttons { display: flex; gap: 8px; }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px;
  }
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
  .btn-secondary { background: #fff; border-color: #80AADC; color: #1a4a7a; padding: 8px 14px; font-size: 13px; }
  .status {
    margin-top: 12px;
    font-size: 13px;
    font-weight: 600;
    min-height: 20px;
  }
  .status.pass { color: #28a745; }
  .status.fail { color: #dc3545; }
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
    <button class="btn btn-secondary" onclick="resetAll()" title="Clear all decisions">Reset</button>
    <button class="btn btn-secondary" onclick="jumpToUndecided()">Next unreviewed</button>
    <button class="btn btn-secondary" onclick="exportResults()">Export results</button>
  </div>
</div>

<div class="main">
  <div class="image-wrap"><img id="current-img" src="" alt="" /></div>
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

// On load, jump to the first undecided symbol (resume where left off)
function findFirstUndecided() {
  for (let i = 0; i < files.length; i++) {
    if (!state[files[i]]) return i;
  }
  return 0;
}

function render() {
  const file = files[idx];
  document.getElementById('current').textContent = idx + 1;
  document.getElementById('current-img').src = '../symbols/' + file;
  document.getElementById('current-img').alt = file;
  document.getElementById('word-id').textContent = file.replace(/\\.svg$/, '');

  const decision = state[file];
  document.getElementById('note-input').value = decision?.note || '';

  updateCounts();
  updateStatus(decision);
}

function updateCounts() {
  let passed = 0, failed = 0;
  for (const d of Object.values(state)) {
    if (d.decision === 'pass') passed++;
    else if (d.decision === 'fail') failed++;
  }
  const remaining = files.length - passed - failed;
  document.getElementById('counts').textContent =
    \`· ✓ \${passed} · ✗ \${failed} · \${remaining} to go\`;
}

function updateStatus(decision) {
  const s = document.getElementById('status');
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

function mark(decision) {
  const file = files[idx];
  const note = document.getElementById('note-input').value.trim();
  state[file] = { decision, note };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  navigate(1);
}

function navigate(delta) {
  const next = Math.max(0, Math.min(files.length - 1, idx + delta));
  idx = next;
  render();
}

function jumpToUndecided() {
  const next = findFirstUndecided();
  idx = next;
  render();
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
    const d = state[file];
    if (!d) continue;
    if (d.decision === 'fail') {
      failures.push({ word_id: file.replace(/\\.svg$/, ''), note: d.note || '' });
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

idx = findFirstUndecided();
render();
</script>

</body>
</html>
`;

fs.writeFileSync(OUTPUT, html);
console.log(`Written to ${OUTPUT}`);
console.log(`Open in browser: file://${OUTPUT.replace(/\\/g, '/')}`);
