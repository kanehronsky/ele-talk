#!/usr/bin/env node
/*
  Copy existing canonical SVGs into duplicate word_id slots.

  When the same word appears in multiple sub-grids (e.g. "Wait" exists as
  CORE_36 slot 34 AND in the stop sub-grid as stop_wait), Piano Principle
  says the visual should be IDENTICAL. Rather than re-generate, just copy
  the canonical version into the duplicate word_id filename.

  This script defines a list of (source_filename → target_word_id) mappings
  and copies them in one shot. Idempotent (overwrites target each run).

  Usage: node bulk-gen/apply-canonicals.js
*/

const fs   = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SYMBOLS_DIR  = path.join(PROJECT_ROOT, 'symbols');

// Each entry: { source: Recraft-auto-named SVG that is the canonical visual,
//               target: word_id that should use the canonical visual }
//
// Adding new canonical-copy mappings: append to this list. The script handles
// the rest. Add a comment describing the conceptual relationship for the
// audit trail.
const mappings = [
  // Wait: canonical is CORE_36 Power Tools slot 34 (WAIT, hand + hourglass).
  // The stop sub-grid contains "Wait" as a protest phrase — same word, same visual.
  {
    source: 'a-hand-held-up-palm-out-in-a--wait--gesture--with-.svg',
    target: 'stop_wait.svg',
    note: 'CORE_36 WAIT → stop sub-grid Wait (identical visual per Piano Principle)',
  },
  // Help: canonical is the Step 2 seed-set "Help" (two hands meeting in helping
  // gesture, regenerated 2026-05-17 with tightened prompt). The want sub-grid
  // contains "Help" as a mand — same word, same visual.
  {
    source: 'two-cartoon-hands-clasping-in-a-helping-gesture---.svg',
    target: 'want_help.svg',
    note: 'Seed set Help → want sub-grid Help',
  },
  // Sleep: canonical is the PoC "Sleep" (child sleeping in bed, eyes closed,
  // Z above). The want sub-grid contains "Sleep" as a mand — same word.
  {
    source: '--a-child-sleeping-peacefully-in-bed-with-eyes-clo.svg',
    target: 'want_sleep.svg',
    note: 'PoC Sleep → want sub-grid Sleep',
  },
  // Park: canonical is the Step 2 seed-set "Park" (tree + bench + grass scene).
  // The go sub-grid contains "Park" as a destination — same concept.
  {
    source: '-a-cartoon-park-scene-with-a-single-large-green-tr.svg',
    target: 'go_park.svg',
    note: 'Seed set Park → go sub-grid Park',
  },
  // Tired: canonical is the Step 2 seed-set face-only Tired (droopy half-closed
  // eyes). The stop sub-grid contains "Too tired" as a protest — visually the
  // same tired-face concept.
  {
    source: '-a-face-only-emotion-symbol-showing-droopy-half-cl.svg',
    target: 'stop_too-tired.svg',
    note: 'Seed set Tired face → stop sub-grid Too tired',
  },
  // Break: canonical is the CORE_36 Power Tools slot 35 (BREAK, bench/chair
  // resting symbol). The stop sub-grid contains "Need break" — same concept.
  {
    source: 'a-simple-wooden-bench-or-comfortable-resting-chair.svg',
    target: 'stop_need-break.svg',
    note: 'CORE_36 BREAK → stop sub-grid Need break',
  },
];

let copied = 0, failed = 0;
const failures = [];

for (const m of mappings) {
  const srcPath = path.join(SYMBOLS_DIR, m.source);
  const dstPath = path.join(SYMBOLS_DIR, m.target);

  if (!fs.existsSync(srcPath)) {
    console.log(`  SKIP: source not found: ${m.source}`);
    failed++;
    failures.push({ ...m, reason: 'source not found' });
    continue;
  }

  try {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`  COPIED: ${m.source}  →  ${m.target}`);
    console.log(`          (${m.note})`);
    copied++;
  } catch (e) {
    console.log(`  FAILED: ${m.target}: ${e.message}`);
    failed++;
    failures.push({ ...m, reason: e.message });
  }
}

console.log('');
console.log(`═══ Summary ═══`);
console.log(`Copied: ${copied}`);
console.log(`Failed: ${failed}`);
if (failures.length) {
  console.log('');
  console.log('Failures:');
  for (const f of failures) console.log(`  ${f.target}: ${f.reason}`);
}
