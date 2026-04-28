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
This is built on Functional Communication Training (FCT) and stimulus 
fading principles from Applied Behaviour Analysis.

A User Profile setting controls the global visual state of the entire grid:

### Level 1 — The Magnet (Stimulus Isolation)
Only the specific target button (targetId) is rendered and visible.
All other 36 grid slots are completely blank/empty.
Use case: Introducing a single new word to an emerging communicator.

### Level 2 — The Ghost (Stimulus Fading — Step 1)
All 36 buttons are rendered and visible.
Non-target buttons are set to opacity: 0.1 and pointer-events: none.
The target button is fully visible and clickable.
Use case: Building spatial awareness of the grid while maintaining focus.

### Level 3 — The Guide (Stimulus Fading — Step 2)
All 36 buttons are fully visible and all are clickable.
The target button has a high-contrast gold border highlight.
Use case: Guided practice with full grid access — the child can explore 
but is visually directed to the target.

### Level 4 — The Pilot (Independent Use)
Full grid visible. All buttons active. No visual prompts of any kind.
Use case: Independent communication. This is the goal state.

### Scaffolding implementation notes
- The scaffolding level is set per user profile, not per session
- Teachers/parents set the level in a settings panel, not the child
- The gold border in Level 3 should use box-shadow for visibility:
  box-shadow: 0 0 15px 5px gold
- When building, implement Level 4 first, then add the other levels

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

## BUILD ORDER

1. Core 36 grid as PWA — static, no sub-grids, speech on tap
2. Sentence strip (accumulate words, speak, clear, backspace)
3. Fitzgerald Key colour coding
4. Sub-grid navigation with anchor rule
5. Scaffolding engine (all 4 levels)
6. High contrast accessibility toggle
7. User profiles (saved locally first, then cloud)
8. MY WORDS custom vocabulary
9. Login and account system
10. Stripe subscription and payment tiers
11. Teacher/admin dashboard
12. School licence model

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
Rebuild the existing prototype as a proper 6x6 PWA with the Core 36 
words, Fitzgerald Key colour coding, sentence strip, and speech. 
This replaces the earlier Starting 20 prototype entirely.
Do not add sub-grids or scaffolding yet — get the core grid right first.