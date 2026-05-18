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
  // Food: canonical is the CORE_36 slot 27 (Food, plate with assorted items).
  // The like sub-grid contains "Food" as a bare noun — same concept.
  {
    source: 'a-plate-viewed-from-above-with-assorted-food-items.svg',
    target: 'like_food.svg',
    note: 'CORE_36 Food plate → like sub-grid Food',
  },

  // ─── Chunk 2b preposition canonicals (added 2026-05-18) ───
  // "In bed" = lying in bed = identical to Sleep visual
  {
    source: '--a-child-sleeping-peacefully-in-bed-with-eyes-clo.svg',
    target: 'in_in-bed.svg',
    note: 'PoC Sleep → in sub-grid In bed',
  },
  // "In park" = being in park = identical to seed-set Park scene
  {
    source: 'go_park.svg',
    target: 'in_in-park.svg',
    note: 'go_park (seed-set Park) → in sub-grid In park',
  },
  // "Lie down" = lying down horizontally = identical to Sleep visual
  {
    source: '--a-child-sleeping-peacefully-in-bed-with-eyes-clo.svg',
    target: 'down_lie-down.svg',
    note: 'PoC Sleep → down sub-grid Lie down',
  },
  // "Lay down" = regional variant of "lie down", identical concept
  {
    source: '--a-child-sleeping-peacefully-in-bed-with-eyes-clo.svg',
    target: 'down_lay-down.svg',
    note: 'PoC Sleep → down sub-grid Lay down (variant of lie down)',
  },
  // "Down stairs" = descending stairs = identical to go_downstairs
  {
    source: 'go_downstairs.svg',
    target: 'down_down-stairs.svg',
    note: 'go_downstairs → down sub-grid Down stairs',
  },
  // "Climb up" = climbing action = identical to go_climb
  {
    source: 'go_climb.svg',
    target: 'up_climb-up.svg',
    note: 'go_climb → up sub-grid Climb up',
  },
  // "Jump up" = vertical jump = identical to go_jump
  {
    source: 'go_jump.svg',
    target: 'up_jump-up.svg',
    note: 'go_jump → up sub-grid Jump up',
  },
  // "Up stairs" = ascending stairs = identical to go_upstairs
  {
    source: 'go_upstairs.svg',
    target: 'up_up-stairs.svg',
    note: 'go_upstairs → up sub-grid Up stairs',
  },
  // "Worn out" = tired-emotion identical to face-only Tired
  {
    source: 'stop_too-tired.svg',
    target: 'out_worn-out.svg',
    note: 'Tired face (via stop_too-tired) → out sub-grid Worn out',
  },
  // "Tired out" = same concept as "Worn out", identical visual
  {
    source: 'stop_too-tired.svg',
    target: 'out_tired-out.svg',
    note: 'Tired face (via stop_too-tired) → out sub-grid Tired out',
  },
  // Note: out_find-out previously canonicalled to look_find (magnifying glass)
  // but user review 2026-05-18 said it doesn't read as "finding out".
  // Now regenerated fresh in chunk-2b-regen.csv with lightbulb-realization framing.

  // "Slow down" = same iconic tortoise as go_slow (user explicitly stated
  // the existing go_slow tortoise reads better than chunk-2b generation)
  {
    source: 'go_slow.svg',
    target: 'down_slow-down.svg',
    note: 'go_slow tortoise → down sub-grid Slow down (per user spec)',
  },

  // ─── Chunk 2c descriptor canonicals (added 2026-05-18) ───
  // "Good night" = bedtime farewell = bedtime visual (child sleeping)
  {
    source: '--a-child-sleeping-peacefully-in-bed-with-eyes-clo.svg',
    target: 'good_good-night.svg',
    note: 'PoC Sleep → good sub-grid Good night (bedtime concept)',
  },
  // "Hurts bad" = same pained-face visual as stop_hurts (chunk 2a)
  {
    source: 'stop_hurts.svg',
    target: 'bad_hurts-bad.svg',
    note: 'stop_hurts → bad sub-grid Hurts bad (same pain concept)',
  },
  // "Yucky smell" = same visual as Smells bad (chunk 2c intra)
  {
    source: 'bad_smells-bad.svg',
    target: 'bad_yucky-smell.svg',
    note: 'bad_smells-bad → bad_yucky-smell (intra-chunk: same concept)',
  },
  // "Yucky taste" = same visual as Tastes bad (chunk 2c intra)
  {
    source: 'bad_tastes-bad.svg',
    target: 'bad_yucky-taste.svg',
    note: 'bad_tastes-bad → bad_yucky-taste (intra-chunk: same concept)',
  },
  // "Yucky feeling" = same visual as Feels bad (chunk 2c intra)
  {
    source: 'bad_feels-bad.svg',
    target: 'bad_yucky-feeling.svg',
    note: 'bad_feels-bad → bad_yucky-feeling (intra-chunk: same concept)',
  },

  // ─── Chunk 3a People canonicals (added 2026-05-18) ───
  // Mum/Dad/Teacher/Friend/Family — seed-set generations are the canonical
  // visuals for these people-panel entries (Piano Principle: same word = same
  // motor coordinate regardless of which sub-grid it's reached via).
  {
    source: 'a-smiling-mother-figure-with-warm-colours-and-a-si.svg',
    target: 'people_family_mum.svg',
    note: 'Seed-set Mum → people_family_mum',
  },
  {
    source: 'a-smiling-father-figure-with-warm-colours-and-a-si.svg',
    target: 'people_family_dad.svg',
    note: 'Seed-set Dad → people_family_dad',
  },
  {
    source: 'a-friendly-teacher-figure-with-glasses-holding-a-b.svg',
    target: 'people_school_teacher.svg',
    note: 'Seed-set Teacher → people_school_teacher',
  },
  {
    source: '-a-friendly-child-of-peer-age-waving--head-and-sho.svg',
    target: 'people_school_friend.svg',
    note: 'Seed-set Friend → people_school_friend',
  },
  {
    source: 'like_family.svg',
    target: 'people_family_family.svg',
    note: 'like_family (chunk 2a) → people_family_family',
  },
  // Nan = Grandma (Australian regional variant, same visual)
  {
    source: 'people_family_grandma.svg',
    target: 'people_family_nan.svg',
    note: 'Grandma → Nan (intra-chunk: Australian regional variant)',
  },
  // Pop = Grandpa (Australian regional variant, same visual)
  {
    source: 'people_family_grandpa.svg',
    target: 'people_family_pop.svg',
    note: 'Grandpa → Pop (intra-chunk: Australian regional variant)',
  },
  // Object-form pronouns share visuals with their subject forms
  {
    source: 'people_roles_he.svg',
    target: 'people_roles_him.svg',
    note: 'He → Him (intra-chunk: same person, object form)',
  },
  {
    source: 'people_roles_she.svg',
    target: 'people_roles_her.svg',
    note: 'She → Her (intra-chunk: same person, object form)',
  },
  {
    source: 'people_roles_they.svg',
    target: 'people_roles_them.svg',
    note: 'They → Them (intra-chunk: same persons, object form)',
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
