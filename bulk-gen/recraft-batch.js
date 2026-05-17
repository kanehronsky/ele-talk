#!/usr/bin/env node
/*
  Recraft batch SVG generator for ELE Talk.

  Reads a CSV produced by the bulk-gen prompt-authoring step (e.g.
  chunk-2-ask.csv, chunk-2a-verbs.csv) and generates one SVG per row
  via Recraft's Vector 4.1 model. Outputs to ../symbols/<word_id>.svg.

  Usage:
    node bulk-gen/recraft-batch.js bulk-gen/chunk-2-ask.csv
    node bulk-gen/recraft-batch.js bulk-gen/chunk-2a-verbs.csv

  Behaviour:
    - Loads RECRAFT_API_KEY from ../ele.env (kept out of git via .gitignore).
    - Resumable: if symbols/<word_id>.svg already exists, the row is skipped.
      So if a run partially fails, just re-run — only the missing ones generate.
    - 300ms politeness delay between requests.
    - Logs progress per row and a summary at the end. Failures are listed
      but don't abort the run.

  Cost:
    Vector 4.1 (recraftv4_1_vector) = $0.08 / image / 80 API units.
*/

const fs   = require('fs');
const path = require('path');

const PROJECT_ROOT   = path.join(__dirname, '..');
const ENV_PATH       = path.join(PROJECT_ROOT, 'ele.env');
const SYMBOLS_DIR    = path.join(PROJECT_ROOT, 'symbols');
const API_URL        = 'https://external.api.recraft.ai/v1/images/generations';
const MODEL          = 'recraftv4_1_vector';
const REQUEST_DELAY  = 300;   // ms between requests; polite to the API

/* ─── env loader (no dotenv dep) ─────────────────────────────────── */
function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) {
    console.error(`Missing env file at ${ENV_PATH}`);
    console.error(`Create it with: RECRAFT_API_KEY=your-key-here`);
    process.exit(1);
  }
  const env = {};
  for (const raw of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    env[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  return env;
}

/* ─── CSV parser handling quoted fields with embedded commas ─────── */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"' && field === '') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* ignore */ }
      else field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  const headers = rows[0];
  const out = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].length === 1 && rows[i][0] === '') continue;  // blank line
    const obj = {};
    for (let j = 0; j < headers.length; j++) obj[headers[j]] = rows[i][j] ?? '';
    out.push(obj);
  }
  return out;
}

/* ─── Recraft API ─────────────────────────────────────────────────── */
async function generateImageUrl(apiKey, prompt) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({ prompt, model: MODEL }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  const url = data?.data?.[0]?.url;
  if (!url) throw new Error(`No URL in response: ${JSON.stringify(data).slice(0, 200)}`);
  return url;
}

async function downloadSVG(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status} for ${url}`);
  return await res.text();
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ─── main ────────────────────────────────────────────────────────── */
async function main() {
  const csvArg = process.argv[2];
  if (!csvArg) {
    console.error('Usage: node bulk-gen/recraft-batch.js <csv-path>');
    process.exit(1);
  }
  const csvPath = path.isAbsolute(csvArg) ? csvArg : path.join(PROJECT_ROOT, csvArg);
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV not found: ${csvPath}`);
    process.exit(1);
  }

  const env = loadEnv();
  const apiKey = env.RECRAFT_API_KEY;
  if (!apiKey) {
    console.error('RECRAFT_API_KEY not set in ele.env');
    process.exit(1);
  }

  if (!fs.existsSync(SYMBOLS_DIR)) fs.mkdirSync(SYMBOLS_DIR, { recursive: true });

  const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'));
  console.log(`Loaded ${rows.length} prompts from ${path.basename(csvPath)}`);
  console.log(`Cost estimate: $${(rows.length * 0.08).toFixed(2)} (${rows.length} × $0.08)`);
  console.log(`Output: ${SYMBOLS_DIR}`);
  console.log('');

  const failures = [];
  let done = 0, skipped = 0, failed = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const wordId = row.word_id;
    const prompt = row.full_prompt;
    const idx = `[${(i + 1).toString().padStart(3)}/${rows.length}]`;

    if (!wordId || !prompt) {
      console.log(`${idx} (skipped: missing word_id or full_prompt)`);
      continue;
    }

    const outPath = path.join(SYMBOLS_DIR, `${wordId}.svg`);
    if (fs.existsSync(outPath)) {
      console.log(`${idx} ${wordId} — already exists, skip`);
      skipped++;
      continue;
    }

    process.stdout.write(`${idx} ${wordId} — `);
    try {
      const url = await generateImageUrl(apiKey, prompt);
      const svg = await downloadSVG(url);
      fs.writeFileSync(outPath, svg);
      console.log(`saved (${svg.length.toLocaleString()} bytes)`);
      done++;
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
      failures.push({ wordId, error: e.message });
      failed++;
    }

    if (REQUEST_DELAY > 0 && i < rows.length - 1) await sleep(REQUEST_DELAY);
  }

  console.log('');
  console.log('═══ Summary ═══');
  console.log(`Generated: ${done}`);
  console.log(`Skipped:   ${skipped} (already existed)`);
  console.log(`Failed:    ${failed}`);
  console.log(`Total cost approx: $${(done * 0.08).toFixed(2)}`);
  if (failures.length) {
    console.log('');
    console.log('Failed rows (re-run the script to retry — successful ones will be skipped):');
    for (const f of failures) console.log(`  ${f.wordId}: ${f.error}`);
  }
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
