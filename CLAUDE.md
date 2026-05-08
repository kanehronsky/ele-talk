# ELE Talk — AAC Web App

A browser-based Augmentative and Alternative Communication (AAC) app 
designed for children with communication disabilities, primarily in 
education support and special education classroom contexts.
ELE Talk is part of the Early Learning Essentials (ELE) brand.

## The problem we are solving
Most AAC apps are iPad-only and cost hundreds of dollars upfront, making 
them inaccessible for many families and schools with limited budgets. ELE 
Talk solves this by being fully browser-based (works on any device) with 
a low monthly subscription of $5–$10, making professional AAC tools 
accessible to everyone.

## Who is building this
Two psychologists — a developmental psychologist with a Masters in 
Behaviour Analysis, and a school psychologist. Existing IP is already 
used across 50+ education support schools in Australia. The app is built 
on evidence-based AAC and behaviour analytic principles, not guesswork.

## Target users
- Children aged roughly 3–12 with communication disabilities
- Primarily used in education support and special education contexts
- Also used at home by families
- Adults configuring the app are teachers, education assistants, and 
  parents — the settings interface must be intuitive for them too

---

## DESIGN PHILOSOPHY: The "Learning-First" Approach

### The Piano Principle (Motor Planning — NON-NEGOTIABLE)
Every word has a permanent X,Y coordinate. Buttons NEVER move, resize, 
or rearrange based on context, frequency, category, or any other factor.
A beginner using 4 words and an expert using 1,296 words use the exact 
same physical coordinates for shared words. This is the foundational 
design rule. Violating it destroys learned motor patterns and sets 
children back significantly. Every technical decision must respect this.

### The 2-Hit Maximum
The entire vocabulary of ~1,296 words must be reachable within 2 touches:
- Hit 1: One of the 36 Core buttons on the home screen
- Hit 2: One of 36 words in that button's sub-grid
- 36 × 36 = 1,296 potential words, all within 2 touches

### SNUG — Spontaneous Novel Utterance Generation
The goal is not pre-programmed phrases. The goal is to give the child 
enough "lego bricks" to build any sentence they want. "I want more 
bubbles" is built by selecting I + Want + More + bubbles (fringe), 
not by tapping a single button. Every design decision should support 
generative language, not scripted responses.

---

## THE CORE 36 — Home Screen Grid

The home screen is a fixed 6x6 grid using the Fitzgerald Key 
(colour-coded by part of speech). This is the permanent motor plan.

### Grid Layout (Row by Row, Left to Right)

| Position | Word | Category | Colour |
|---|---|---|---|
| 1 | I / Me | Pronoun | Blue |
| 2 | You | Pronoun | Blue |
| 3 | It | Pronoun | Blue |
| 4 | We | Pronoun | Blue |
| 5 | Who | Pronoun | Blue |
| 6 | What | Pronoun | Blue |
| 7 | Want | Action | Green |
| 8 | Go | Action | Green |
| 9 | Stop | Action | Green |
| 10 | Make / Do | Action | Green |
| 11 | Look | Action | Green |
| 12 | Like | Action | Green |
| 13 | In | Position | Pink |
| 14 | Out | Position | Pink |
| 15 | Up | Position | Pink |
| 16 | Down | Position | Pink |
| 17 | On | Position | Pink |
| 18 | Off | Position | Pink |
| 19 | Big | Descriptor | Orange |
| 20 | Little | Descriptor | Orange |
| 21 | Good | Descriptor | Orange |
| 22 | Bad / Yucky | Descriptor | Orange |
| 23 | More | Descriptor | Orange |
| 24 | All Done | Descriptor | Orange |
| 25 | MY WORDS | Tab/Nav | Yellow |
| 26 | People | Tab/Nav | Yellow |
| 27 | Food | Tab/Nav | Yellow |
| 28 | Drink | Tab/Nav | Yellow |
| 29 | Places | Tab/Nav | Yellow |
| 30 | Toys / Play | Tab/Nav | Yellow |
| 31 | YES | Power Tool | Red |
| 32 | NO | Power Tool | Red |
| 33 | STOP (urgent) | Power Tool | Red |
| 34 | GO (urgent) | Power Tool | Red |
| 35 | WAIT | Power Tool | Red |
| 36 | BREAK | Power Tool | Red |

### Fitzgerald Key Colours
- Column 1 (positions 1–6): Blue — Pronouns
- Column 2 (positions 7–12): Green — Actions/Verbs
- Column 3 (positions 13–18): Pink — Position/Prepositions
- Column 4 (positions 19–24): Orange — Descriptors
- Column 5 (positions 25–30): Yellow — Nouns/Navigation Tabs
- Column 6 (positions 31–36): Red — Power Tools/Essentials

### Critical placement note
YES, NO, WAIT, and BREAK must remain on the outer right edge (column 6) 
at all times. These are the highest-priority functional communication 
words and must be reachable via motor memory in any emotional state.

---

## THE SUB-GRID SYSTEM (Hit 2)

### Navigation Rule — The Anchor Rule (CRITICAL)
When a user taps a button that has a sub-grid, the screen does NOT 
navigate to a new page. Instead:
1. The 36 sub-grid words render into the existing 6x6 coordinate slots
2. The trigger button STAYS VISIBLE in its original X,Y coordinate
3. The trigger button now acts as the "back" button and visual anchor
4. Power Tools (column 6: YES, NO, WAIT, BREAK) remain visible and 
   active at all times, even when a sub-grid is open

This is non-negotiable for motor planning integrity.

### Sub-Grid Vocabulary (Target: ~1,000 words)

**People (Button 26) — 50 words**
Family: Mom, Dad, Grandma, Grandpa, Brother, Sister, Baby
School: Teacher, Assistant, Principal, Student, Friend
Community: Doctor, Nurse, Police, Firefighter, Dentist
Pronoun expansion: He, She, They, Us, Them, Him, Her

**Actions expansion (Buttons 7–12) — 200 words**
Movement: Run, Jump, Walk, Crawl, Slide, Swing, Climb, Kick, Throw, Catch
Senses: Hear, See, Smell, Taste, Touch, Listen, Watch
Daily life: Wash, Brush, Dress, Sleep, Wake, Sit, Stand, Wait, Help, Work
Play: Build, Break, Draw, Paint, Cut, Glue, Fold, Read, Sing, Dance

**Food (Button 27) — 100 words**
Meals: Breakfast, Lunch, Dinner, Snack, Treat
Specifics: Apple, Banana, Cracker, Chip, Cookie, Pizza, Nugget, Pasta, Bread
Descriptors: Hot, Cold, Yummy, Yucky, Sweet, Salty, Crunchy, Soft

**Drink (Button 28) — 50 words**
Water, Milk, Juice, Cordial, Hot Chocolate, Smoothie

**Places (Button 29) — 100 words**
Home: Bedroom, Bathroom, Kitchen, Living Room, Garden
School: Classroom, Gym, Library, Playground, Music Room, Office
Community: Park, Store, Pool, Beach, Hospital, Therapy, Farm, Zoo

**Toys/Play (Button 30) — 150 words**
Favourites: Lego, Block, Doll, Car, Ball, Book, iPad, Computer, TV
Art: Crayon, Marker, Paper, Clay, Sticker, Bubbles
Sensory: Sand, Water, Slime, Fidget, Weighted Blanket, Swing

**Descriptors/Feelings expansion (Buttons 19–24) — 200 words**
Emotions: Happy, Sad, Angry, Scared, Silly, Bored, Excited, Tired, Sick, Hurt
Physical: Hard, Soft, Heavy, Light, Fast, Slow, Clean, Dirty, Wet, Dry
Concepts: Colors (Red, Blue, Green, Yellow, etc.), Shapes, Numbers 1–10
Time: Now, Later, Today, Tomorrow, Morning, Night, First, Next, Finished

**MY WORDS (Button 25)**
Reserved for custom user vocabulary. This is a premium/paid feature tier.
Parents and teachers can add child-specific words here (pet names, 
specific places, favourite items) without disturbing the scientific core.
Do not populate this grid with default content — it is intentionally blank.

---

## THE SCAFFOLDING/PROMPTING ENGINE

This is ELE Talk's primary point of clinical differentiation. No major 
AAC app implements behavioural prompt fading as a first-class UI feature.
Built on Functional Communication Training (FCT), forward chaining, and 
stimulus fading principles from Applied Behaviour Analysis.

### The Core Principle — Fading Transfers the Chain to the Child

Scaffolding is not just a visual prompt that gets dimmer. As prompts 
fade, the child progressively takes on more of the real-world 
communication chain. The engine handles the mechanics at high prompting 
levels, then hands them back to the child level by level. When the 
pathway is deactivated entirely, the child performs the full sequence 
independently — which is exactly what real, unprompted use looks like. 
This single principle governs how both navigation and the Speak action 
are handled across the three levels.

### Pathway Model (Forward Chaining)

The unit of teaching is a **pathway** — a sequenced series of words the 
child is being taught to produce in order. Examples: "I want Lego", 
"Go park", "I need toilet."

Pathway data model rules:
- Stored per user profile, max 5 active pathways per child (clinical ceiling, hard-enforced — blocks both Add Pathway and Un-master flows when full)
- Each pathway is a list of **semantic word IDs** (not individual taps)
- The engine computes the navigation steps between words automatically — 
  the teacher does not specify "tap the back button" or other mechanics
- Pathways may cross sub-grid boundaries (e.g., I → Want → Toys/Play → Lego)
- Pathways may include MY WORDS entries (custom child-specific vocabulary)
- Each pathway has its own scaffolding level (not a global profile setting), 
  reflecting that a child's different communication targets are always at 
  different stages of acquisition
- One pathway is **active** at a time per session; teacher toggles which 
  one before handing the device to the child

### Pathway Authoring — Tap-to-Build

Teachers create pathways by tapping the actual app grid in sequence, 
exactly as the child will. The engine records the meaningful word taps 
(not navigation taps) and stores them as the pathway. This guarantees 
every pathway is buildable in the real app and uses real coordinate IDs.

Pathway label is auto-generated from the recorded words (e.g., 
"I want Lego") and editable by the teacher.

### The Three Scaffolding Levels — Behaviour by Level

Each level governs three things: **what's visible**, **how navigation is 
handled**, **how the Speak action is handled**.

| Level | Visible | Navigation | Speak |
|---|---|---|---|
| **1 Magnet** | Only the current target button + Power Tools | Engine auto-handles (invisible to child) | Engine auto-speaks the full sentence on completion |
| **2 Ghost** | Full grid, non-targets at opacity 0.1 + Power Tools full | Engine auto-handles | Engine auto-speaks |
| **3 Guide** | Full grid, target has gold border | **Scaffolded** — child taps anchor button to close sub-grids and tabbed panels | **Scaffolded** — gold border moves to Speak button as final step |

"Scaffolding off" is **not** a fourth level — it's deactivating the 
pathway. There used to be a Level 4 "Pilot" stage but it was removed 
because mastery is a generalisation claim across varied real-world 
contexts that a structured trial can't establish; auto-tracking would 
mislead. See "Mastered Pathways" below.

Box-shadow for the Level 3 gold border:
`box-shadow: 0 0 15px 5px gold`

### Always-On Rules (Override Scaffolding)

Two rules are non-negotiable and override any scaffolding state:

1. **Power Tools (column 6: YES, NO, STOP, GO, WAIT, BREAK) are always 
   visible and active.** Even at Level 1 with the rest of the grid 
   blanked out. This is an ethical requirement, not a design choice — 
   a child must always be able to say BREAK, STOP, or NO during 
   structured teaching. Removing access to protest or escape 
   communication during ABA discrete trials is clinically unacceptable.

2. **Wrong taps are silently ignored.** No flash, no shake, no 
   escalation, no sound. The current target highlight stays. This 
   matches FCT best practice: don't reinforce errors with any response. 
   The teacher observes and manually adjusts the scaffolding level — 
   the app does not perform error correction itself.

### Activation and Trial Flow

When a teacher toggles a pathway active, the engine enters scaffolding 
mode using that pathway's stored level. The child works through the 
sequence one step at a time. On the final step:
- **Levels 1–2:** engine speaks the full sentence immediately (the 
  spoken sentence IS the natural reinforcer); strip stays populated 
  until teacher clears manually (teacher controls trial timing).
- **Level 3:** scaffolding moves to the Speak button as the final 
  scaffolded step; child taps Speak to complete the trial.

`completionCount` increments on each successful trial at every level. 
It's a quiet trial counter only — it never gates anything. Mastery 
is teacher-marked, not auto-promoted (see below).

### Mastered Pathways

Mastery is a clinical sign-off the teacher records manually. The app's 
job is durable record-keeping for school handover, not autonomous 
assessment. The reasoning: mastery is a generalisation claim across 
varied real-world contexts the device can't observe; auto-promoting on 
trial counts would produce misleading records that erode the credibility 
of the longitudinal data.

**Marking mastered:** A button on the pathway-edit screen opens a 
confirmation with a summary card and an optional note (placeholder 
nudges the teacher toward generalisation language). Confirming moves 
the pathway out of the active list (`profile.pathways`) into the 
mastered record (`profile.meta.masteredPathways`).

**Mastered record schema:**
```js
{
  id, pathwayId, label, steps,
  dateMastered, note, noteUpdatedAt,
  completionCount    // snapshot at mastery time
}
```

There is **no `levelAtMastery`** — mastery means unprompted by 
definition; storing the prompt level would substitute stale data for 
fresh clinical judgment if the pathway later regresses.

**Un-mastering** (regression handling, expected in education-support 
contexts): removes the mastered record and returns the pathway to the 
active list at L3 (Guide, default supportive prompt) with `active: 
false`. The teacher then performs a fresh assessment to set the actual 
level. Hard-blocked when the active list is at the 5-pathway clinical 
ceiling — the teacher must master or delete an active pathway first.

**Mastered list UI:** Settings has a "Mastered Pathways" section 
parallel to "Pathways". Each row shows label, date, chips, and note 
preview, with an inline Un-master button. Tap row → detail screen for 
note editing (note is amendable; everything else is frozen). Most-recent 
first sort. This list IS the receiving-teacher view — no separate screen.

---

## IDENTITY AND PROFILE MODEL

### Deployment context drives the model

In Western Australian education support — ELE Talk's primary market — 
AAC users have their own dedicated device (NDIS-funded for the student 
or school-issued 1:1). Devices do **not** rotate between students 
during a school day. ELE Talk is therefore designed around 
**one device, one child, one profile, all day, every day** — not 
shared-device classroom rotation.

### Implications

- **One profile per device** is the default model. Profile-switcher UX 
  (Netflix-style) is explicitly NOT a v1 feature.
- **Per-child login** is fine because login persists on the device. The 
  cross-device-friction problem of shared devices does not apply here.
- **Cloud auth is deferred** — the local profile schema is designed to 
  be cloud-syncable later (versioned JSON, UUID-keyed, no device-bound 
  fields). When auth ships, local profiles lift directly into the 
  cloud database.
- **PIN-gating is for settings access, not profile switching.** A 
  4-digit PIN prevents the child from changing their own scaffolding 
  level, MY WORDS, or other teacher-controlled settings. The PIN is 
  not a security boundary against motivated adults — it is a 
  child-deterrent.

### Profile Schema (current)

```js
{
  schemaVersion: 1,
  profileId:     "uuid",
  name:          "string",
  pinHash:       "sha-256 hex",   // child-deterrent only
  preferences: {
    highContrast: false,
    voice:        null            // device default for v1
  },
  myWords: [                       // populates Button 25 sub-grid
    { id, label, speak, emoji, iconPath? }
  ],
  pathways: [                      // max 5, cap hard-enforced
    { id, label, steps: [...wordIds], scaffoldingLevel: 1-3,
      active, completionCount }
  ],
  meta: {
    createdAt, updatedAt,
    masteredPathways: [            // populated by manual teacher sign-off
      { id, pathwayId, label, steps,
        dateMastered, note, noteUpdatedAt, completionCount }
    ]
  }
}
```

Stored as JSON under localStorage key `eletalk_profile_v1`.

### MY WORDS integration with pathways

Pathways may reference MY WORDS entries. Deletion of a MY WORDS entry 
that is used in a pathway is **blocked** with an explanatory message; 
the teacher must remove the pathway first or rename the word. This 
prevents broken pathways and forces the teacher to make a deliberate 
clinical decision when they do remove a custom word.

---

## TECHNICAL ARCHITECTURE

### Platform: Progressive Web App (PWA)
Build as a PWA so it works on iPads, Chromebooks, Android tablets, 
and desktop browsers without installation. This is essential for the 
school and NDIS market where device variety is high.

### Layout
- CSS Grid: grid-template-columns: repeat(6, 1fr)
- Buttons: aspect-ratio: 1/1 (perfect squares at all screen sizes)
- Full viewport: 100vw × 100vh fixed container
- No scrolling on the main grid — everything must be visible at once
- Disable browser pinch-zoom and pull-to-refresh gestures

### Data Structure (JSON)
Use a JSON object to map button IDs to coordinates, labels, icon paths, 
colours, and sub-grid arrays:

```json
{
  "home_grid": [
    {
      "id": "btn_1",
      "label": "I / Me",
      "coord": [0, 0],
      "color": "blue",
      "action": "speak",
      "subGrid": null
    },
    {
      "id": "btn_27",
      "label": "Food",
      "coord": [2, 4],
      "color": "yellow",
      "action": "openSubGrid",
      "subGrid": "food_grid"
    }
  ],
  "food_grid": [
    {
      "id": "food_1",
      "label": "Apple",
      "coord": [0, 0],
      "action": "speak"
    }
  ]
}
```

### State Machine Logic
The app operates as a state machine with these states:
- State 1: Home Grid active
- State 2: Sub-Grid active (specific sub-grid ID stored in state)
- Modifier: Scaffolding level (1–4) applied as overlay on either state

### Audio — Web Speech API
- Fire speech on touchstart (not touchend) for zero-latency feel
- iOS Safari requires a user gesture to unlock the audio context — 
  implement an audio unlock on first tap of any element
- Use window.speechSynthesis.speak() with speechSynthesis.cancel() 
  called first to prevent queuing
- Eventually: allow voice selection (male, female, child options)

### Touch handling
- Implement 100ms debounce on touch events to handle heavy or sliding 
  touches common in the target population
- Disable default browser touch gestures (pinch zoom, pull to refresh)
- Minimum touch target size: 44×44px (Apple HIG standard) — in practice 
  the 6x6 grid will be much larger than this on any tablet

### Accessibility
- High contrast toggle: black background with neon-bordered buttons
- This is a CSS class toggle on the root element, not a separate mode
- Proper ARIA labels on all buttons
- Focus management for switch access users (future feature)

---

## SENTENCE STRIP

A horizontal bar at the top of the screen where tapped words accumulate.
- Words appear as tiles as they are tapped
- Speak button: reads the full sentence aloud
- Backspace button: removes the last word
- Clear button: resets the strip
- The sentence strip should remain visible at all times, including when 
  sub-grids are open

---

## BUSINESS MODEL

### Pricing tiers
- Free: Core 36 home screen only, no sub-grids, no MY WORDS
- Power ($5.99/month): Full sub-grid vocabulary, all scaffolding levels
- NDIS Buyout ($199 one-time): Full access, for families with NDIS 
  funding who prefer a one-time payment

### MY WORDS as a product feature
Button 25 (MY WORDS) is intentionally reserved as a premium 
customisation feature. Parents and teachers pay for the ability to add 
child-specific vocabulary without disrupting the scientific core grid.
This is also the hook for the school licence model (future).

---

## SYMBOLS / VISUAL ASSETS

Current state: emoji placeholders. v1 launch will use the 
**Mulberry Symbol Set** (https://mulberrysymbols.org/, ~3,300 symbols, 
CC BY-SA — commercial use permitted with attribution).

ARASAAC was evaluated and rejected for v1 because its CC BY-NC-SA 
licence prohibits commercial use; the paid tier ($5–10/month) is 
unambiguously commercial. ARASAAC remains a v2 upgrade target pending 
a written commercial-permission request to the Government of Aragón. 
Custom commission and pure-AI-generated symbol sets are deferred — 
custom is post-revenue, and AI generation cannot yet produce a 
visually consistent set across 1,300+ symbols.

The data structure already supports per-button `iconPath` alongside 
`emoji`, so swapping symbol sets is a non-breaking change.

Required attribution line in app credits: Mulberry Symbols © Steve Lee, 
licensed under CC BY-SA 2.0 UK.

---

## BUILD ORDER

### Done
1. Core 36 grid as PWA — static, no sub-grids, speech on tap
2. Sentence strip (accumulate words, speak, clear, backspace)
3. Fitzgerald Key colour coding
4. Sub-grid navigation with anchor rule
5. High contrast accessibility toggle (v1: global; profile-backed in step 6)
6. **Local profile + PIN-gated settings + MY WORDS CRUD**
7. **Scaffolding engine — pathway CRUD, tap-to-build authoring, 
   activation toggle, three levels (Magnet/Ghost/Guide) wired through 
   sub-grids AND tabbed panels (Food/People/Places/Toys/Academic), 
   pathway persistence, tabbed-panel home buttons toggle to support L3 
   "close-and-go" cues, ✕ hidden during scaffolding, mastery via 
   teacher-marked sign-off with regression-aware un-master + 5-pathway 
   clinical-ceiling enforcement.**

### Next
8. **Real-device test pass** — outstanding from the scaffolding work; 
   verify on iPad / Chromebook / Android tablet across all three 
   levels, recording, mastery, un-master.
9. **Three more Academic tabs** — Time, Emotions, Weather (~38 entries) 
   to close the gap toward the 1200 vocab target.
10. **Tab-strip restructuring at 8+ tabs** — tab bar will need trimmed 
    labels, splitting Academic, or emoji-only tabs once Time/Emotions/
    Weather land.
11. **Mulberry symbol rollout** — deferred until a fill-the-gap source 
    is identified (Mulberry covers ~28% of Tier-1 vocab measured 
    2026-05-08). ARASAAC commercial-permission letter is the slow-track 
    action.

### Continuous (not a discrete step)
- Polish: real-device testing as found
- MY WORDS deletion blocking when used in active OR mastered pathways 
  (currently a `// Future` TODO at the deletion site)

### Later (post-symbols, in order)
12. Login and account system (cloud sync of local profiles)
13. Stripe subscription and payment tiers
14. Teacher/admin dashboard
15. School licence model

### Build-order principle (revised post-grill)
Clinical differentiator before infrastructure. Scaffolding is the 
product; login is plumbing. Do not build login before scaffolding — 
showing a teacher a login screen does not validate the clinical pitch; 
showing them prompt-faded discrete trials does.

---

## TECHNICAL RULES

- Write clean, well-commented code throughout
- Accessibility is a core requirement — this app is the voice of 
  non-verbal children
- The motor planning / anchor rule must be respected in every decision
- Ask before making large structural changes
- Explain significant decisions as you make them
- The developer is learning to code alongside this build
- Commit working versions to Git regularly
- PWA manifest and service worker should be added from the start

## CURRENT GOAL

The scaffolding engine is built and demoable. Pathways are recordable, 
activatable, persisted, and run correctly at all three levels through 
both sub-grids AND tabbed panels. Mastery is teacher-marked with a 
durable handover record; un-master handles regression with the 
5-pathway clinical ceiling enforced.

**Next: real-device testing across all three levels and the master / 
un-master flows on iPad / Chromebook / Android tablet.** This is the 
last gate before the engine is genuinely shippable to a teacher demo.

After that, in priority order: Time / Emotions / Weather Academic tabs 
to close the vocab gap, tab-strip restructuring once 8+ tabs land, 
Mulberry symbol rollout (paced by coverage gaps and the ARASAAC 
permission letter).

Do NOT build login, Stripe, or dashboard before the scaffolding engine 
has been tested on real devices and demoed to a teacher.