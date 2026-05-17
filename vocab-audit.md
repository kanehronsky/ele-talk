# ELE Talk — Vocab Audit
**Generated:** 2026-05-17
**Current total:** ~1,179 entries across home grid, sub-grids, tabbed panels, Academic, and Grammar.

---

## How to use this doc

Review with your co-developer. Mark up directly in this file:

- ~~Strikethrough~~ entries to **remove**
- Use `→` for renames (e.g. `Donut → Donut / Doughnut`)
- Use `+` prefix to **add** new entries
- Leave free-text notes wherever something needs discussion

When you're done, bring this file back and I'll apply every change to `index.html` in one pass.

**Important:** read the four **design-level questions** at the top *before* word-level edits. Some of them, if changed, will collapse hundreds of entries down to a smaller set — you don't want to spend an hour editing words inside a pattern you're going to scrap.

---

## Headline counts per surface

| Surface | Entries |
|---|---|
| Home grid (Core 36) | 36 |
| Home-button sub-grids (18 grids × ~29 entries) | 514 |
| Tabbed panel: People (4 tabs) | 76 |
| Tabbed panel: Food (4 tabs) | 95 |
| Tabbed panel: Places (4 tabs) | 100 |
| Tabbed panel: Toys / Play (5 tabs) | 101 |
| Tabbed panel: Academic (10 tabs) | 217 |
| Grammar overlay (2 tabs) | 40 |
| **Total vocab** | **~1,179** |

---

## DESIGN QUESTIONS — READ BEFORE WORD EDITS

### 1. Compound-entry pattern in home-button sub-grids (BIG ONE)

Right now, most home-button sub-grids contain **compound phrases** (parent word + noun/verb), not bare words that compose with the parent. Compare:

**SNUG pattern (Want, Go)** — sub-grid contains bare words. Tap `Want` → speak "Want" + open sub-grid → tap `Lego` (bare word) → strip says "Want Lego". 2 taps, child generates the phrase.

**Compound pattern (everything else)** — sub-grid contains pre-written phrases. Tap `More` → open sub-grid → tap `More music` (compound) → strip says "More music". 2 taps, but the phrase is pre-baked.

The compound pattern dominates: **More** has "More music / More TV / More iPad / More cuddles / More tickle" etc. **Big** has "Big dog / Big car / Big house". **In/Out/Up/Down/On/Off** are all compounds. **Stop** is all "Stop X" or "Need X". **Good** is all "Good X". **Bad** is all "X bad" or "Yucky X". **All Done** is all "Done X".

**Cost of the compound pattern:**
- **SNUG is hurt** — the child can only say compounds the designer pre-wrote, not freely generate "More + [any noun the child knows]"
- **Massive duplication** — "Music" lives standalone in Toys/Tech AND as "More music" in More AND as "Good singing" in Good AND as "Done singing" in alldone. Same concept, 4 tiles.
- **Vocab inflation** — most of the ~514 sub-grid entries are pre-baked phrases. If we switched to SNUG, we'd cut hundreds of redundant entries.

**Counter-argument (worth thinking about):**
- 2-tap fluency: "More music" in one tile is fast
- Cognitive load: complete phrases may be easier to read at a glance than compositional
- Some phrasal verbs **don't decompose** in English: "Stand up" ≠ "Up" + "Stand". So In/Out/Up/Down/On/Off legitimately use compounds (phrasal verbs).

**Recommendation to consider:**

| Sub-grid | Suggested pattern | Reasoning |
|---|---|---|
| Want | **SNUG (keep)** | Already SNUG, works |
| Go | **SNUG (keep)** | Already SNUG, works (some bare verbs + some places) |
| Stop | Hybrid — keep "Need X" / protest phrases; review "Stop X" entries | Stop is unique — it's a protest verb, often-compound is meaningful |
| Look | **SNUG (switch)** — bare verbs (See/Watch/Find/Read/Listen…) | Currently has random non-perception verbs, needs cleanup either way |
| Make | **SNUG (already)** — bare verbs | Already bare verbs, no change |
| Like | **SNUG (already)** — bare nouns | Already bare nouns, no change |
| In, Out, Up, Down, On, Off | **Compound (keep)** | Phrasal verbs don't decompose in English |
| Big, Little | **SNUG (switch)** — bare nouns | "Big dog" = Big + Dog. Compositional. Bare nouns work; this collapses ~58 entries to ~6 base nouns each |
| Good, Bad | **Hybrid** — keep phrases like "Good morning", "Bad mood" that ARE idiomatic compounds; remove "Good X-ing" compositions | "Good morning" is one unit; "Good drawing" should be "Good" + "Drawing" |
| More | **SNUG (switch)** — but with carefully chosen base words | "More" is the highest-frequency mand modifier in AAC; making it generative is huge |
| All Done | **SNUG (switch)** | Same reasoning as More |

**Decision needed:** do you want to take on this restructure as part of the audit, or accept the current compound pattern and just edit individual entries?

---

### 2. Cross-panel duplication

Even within the current pattern, the same concept appears in many places. Examples:

- **TV**: Toys/Tech, like sub-grid, More sub-grid (`More TV`)
- **iPad**: Toys/Tech, like sub-grid, More sub-grid (`More iPad`)
- **Music**: Toys/Tech (`Music toy`), like sub-grid, More sub-grid (`More music`), Good sub-grid (`Good singing`)
- **Bedroom**: Places/Home, in_ sub-grid (`In bedroom`)
- **School**: Places/School (panel), Places/School tab name, go sub-grid, like sub-grid, In sub-grid, More sub-grid, alldone sub-grid
- **Family**: People panel tab, like sub-grid, More sub-grid
- **Home**: go sub-grid, like sub-grid, More sub-grid, alldone sub-grid
- **Run, Jump, Walk, Climb, Swim, Slide, Dance, Sing**: appear in want, go, make, and Academic-actions sub-grids

**The Piano Principle says a word's *home* (its motor coordinate) should be stable.** But here, the same word has *multiple* coordinates — child taps `More music` at one location, then `Music` at another, and these are conceptually the same word at different addresses. That's the opposite of what motor-planned AAC wants.

**Recommendation:** during the audit, for any duplicated word, decide which is its **canonical home** and remove the others. The compound version usually loses ("More music" goes; child says "More" then navigates to "Music").

---

### 3. Look sub-grid has non-perception verbs

The Look sub-grid mixes perception verbs (See/Watch/Find/Listen/Hear/Smell/Taste/Touch) with random general verbs (Help/Try/Check/Wait/Draw/Count/Learn/Play/Make/Eat/Drink/Sleep/Open/Close/Give/Take/Share/Here). The non-perception verbs probably belong in `make` or `want`, not under Look.

**Recommendation:** trim Look down to perception verbs only (~12 entries); redistribute the rest to `want` or `make`.

---

### 4. alldone speak/label mismatch

The alldone sub-grid has labels like `Done eating` but the speech says `All done eating`. The strip will show what's spoken. Either:
- Change labels to match (`All done eating`) — long labels, may clip on tiles
- Change speech to match (`Done eating`) — shorter, but loses the "all done" canonical phrase

**Recommendation:** change labels to `All done eating` etc. to match speech, accept the longer labels.

---

## SECTION 1 — Home Grid (Core 36)

This is the motor-planned permanent vocabulary. **Changes here are very high-stakes** — they alter coordinates that everything else depends on. Generally, don't change these unless there's a strong clinical reason.

### Row 1 — Pronouns (Blue)
1. I / Me
2. You
3. It
4. We
5. Who
6. What

### Row 2 — Actions (Green)
7. Want *(addToStrip — SNUG pattern)*
8. Go *(addToStrip — SNUG pattern)*
9. Stop
10. Make / Do
11. Look
12. Like

### Row 3 — Position / Prepositions (Pink)
13. In
14. Out
15. Up
16. Down
17. On
18. Off

### Row 4 — Descriptors (Orange)
19. Big
20. Little
21. Good
22. Bad / Yucky
23. More
24. All Done

### Row 5 — Nouns / Navigation Tabs (Yellow)
25. MY WORDS *(custom, navigation-only, never spoken)*
26. People
27. Food
28. Academic *(navigation-only, never spoken — note: replaces CLAUDE.md's "Drink" slot)*
29. Places
30. Toys / Play

### Row 6 — Power Tools (Red) — always visible, never hidden
31. YES
32. NO
33. STOP *(urgent — different from row 2's Stop)*
34. GO *(urgent — different from row 2's Go)*
35. WAIT
36. BREAK

**FLAGS for review:**
- `It` (slot 3) — low utility for AAC compared to e.g. `My` or `Here`. Worth keeping?
- `Look` (slot 11) — does the child use this enough to justify a Core 36 slot? Could be replaced with `Help` or `Feel`.
- `Academic` (slot 28) replaces the original `Drink` slot from CLAUDE.md. `Drink` is now a tab inside Food panel. Verify this remains the right call — Drink is a high-frequency 2-tap mand category.

---

## SECTION 2 — Home-button sub-grids (514 entries)

⚠️ **If you adopt the SNUG restructure in design question 1, large parts of this section get scrapped.** Do design question 1 first.

### Want (30 entries) — SNUG pattern
Eat, Sleep, Help, Play, Drink, Read, Sing, Dance, Wash, Sit, Stand, Run, Jump, Walk, Swim, Climb, Build, Draw, Write, Hug, Watch, Listen, Cook, Try, Choose, Open, Close, Share, Fix

**FLAGS:**
- Duplicates verbs in `make` (Draw, Build, Cook, Sing, Dance) and `look` (Watch, Listen, Read, Try)
- Missing high-frequency mands: `Toilet`, `Snack`, `Hug` is there ✓, `Cuddle`, `Break`, `Tickle`, `Outside`

### Go (29) — SNUG-ish (verbs + places + adverbs)
Run, Jump, Walk, Crawl, Slide, Swing, Climb, Skip, Hop, Dance, Swim, Back, Forward, Outside, Inside, Home, School, Park, Fast, Slow, Together, Away, Upstairs, Downstairs, Now, Stand, Carefully, Again, Alone

**FLAGS:**
- Verb duplications with `want` (Run/Jump/Walk/Climb/Swim/Dance)
- `Home` and `School` are also Places-panel tab names — duplication

### Look (29) — currently mixed perception + general (see design Q3)
See, Watch, Find, Show, Point, Read, Listen, Hear, Smell, Taste, Touch, Help, Try, Check, Wait, Draw, Count, Learn, Play, Make, Eat, Drink, Sleep, Open, Close, Give, Take, Share, Here

**FLAGS:** non-perception verbs (Help/Try/Check/Wait/Draw/Count/Learn/Play/Make/Eat/Drink/Sleep/Open/Close/Give/Take/Share/Here) probably belong in `want` or `make`. Trim Look to perception-only.

### Stop (29) — protest + escape phrases
Stop hitting, Stop talking, Stop music, Stop video, Stop running, Stop please, Finished, Enough, Too tired, Too loud, Too much, Hurts, Don't like, Go away, Leave me, My turn, Wait, Calm down, Too fast, Too close, Too bright, Too dark, Scared, Angry, Sad, Frustrated, Need break, Need help, Need quiet

**FLAGS:**
- `Stop talking` — clinically tricky (child telling adult to stop talking; may be undesirable in some contexts). Educators may want to flag this for case-by-case.
- `Scared/Angry/Sad/Frustrated` — also in Academic/Emotions. Confirmed earlier as intentional dual-purpose (protest context vs general expression), but worth re-confirming during audit.
- Missing: `Time out`, `Move away`, `Wrong`

### Make (29) — bare verbs ✓ (already SNUG)
Draw, Paint, Cut, Build, Cook, Bake, Clean, Write, Read, Sing, Dance, Jump, Run, Climb, Swing, Slide, Kick, Throw, Catch, Push, Pull, Fold, Colour, Pour, Mix, Open, Stand, Pick Up, Toilet

**FLAGS:**
- `Toilet` here is odd — it's not really a "make" verb. Move to `want` (Want toilet)?
- Heavy verb duplication with `want`, `go`, Academic/actions

### Like (29) — bare nouns ✓ (already SNUG-ish)
Music, Dancing, Swimming, Running, Drawing, Painting, Reading, Singing, Cooking, Playing, Hugging, Laughing, Animals, Outside, Inside, School, Home, Friends, Family, Food, Sweets, Games, TV, iPad, Videos, Books, Sports, Lego, Dolls

**FLAGS:**
- Many duplications with Toys panel (TV, iPad, Lego, Dolls, Games)
- `-ing` verb forms (Dancing, Drawing) are gerunds — fine but stylistically different from the bare-noun entries

### In_ (29) — compound preposition (keep per design Q1)
In school, In class, In bed, In bath, In car, In house, In garden, In kitchen, In bedroom, In bathroom, In lounge, In pool, In park, In shop, In hospital, In therapy, In gym, In library, In office, In playground, In hall, In toilet, In chair, In corner, In box, In bag, In pocket, In hand, In mouth

**FLAGS:**
- 25/29 entries duplicate locations in Places panel. Consider whether the compound preposition pattern justifies this duplication.

### Out_ (29) — compound preposition
Outside, Out here, Out there, Get out, Come out, Out of bed, Out of class, Out of car, Out of bath, Out of pool, Out of way, Out of time, Out please, Reach out, Stay out, Spread out, Watch out, Help out, Left out, Worn out, Tired out, Run out, Time out, Miss out, Find out, Work out, Breathe out, Step out, Walk out

**FLAGS:**
- Mix of literal "out of X" prepositions and phrasal verbs ("Watch out", "Find out", "Work out") — different grammatical roles
- `Left out / Worn out / Tired out / Miss out` — these are abstract emotional states, may not be Tier 1

### Up_ (28) — compound preposition
Up please, Stand up, Get up, Sit up, Wake up, Climb up, Jump up, Lift up, Hold up, Tidy up, Wash up, Come up, Up high, Up there, Up here, Up stairs, Up hill, Up tree, Grow up, Speed up, Turn up, Open up, Light up, Fill up, Build up, Back up, Give up, Keep up

### Down_ (28) — compound preposition
Down please, Sit down, Lie down, Get down, Come down, Lay down, Slow down, Turn down, Put down, Fall down, Kneel down, Step down, Down here, Down there, Down stairs, Down hill, Down low, Quiet down, Cool down, Settle down, Count down, Wind down, Write down, Hand down, Bend down, Lean down, Reach down, Press down

### On_ (29) — compound preposition
On please, Turn on, Put on, Come on, Try on, Hold on, Move on, On here, On there, On top, On floor, On chair, On table, On bed, On lap, On shoulder, On hand, On foot, On head, On back, On front, On side, Carry on, Log on, Switch on, Jump on, Climb on, Sit on, Stand on

### Off_ (29) — compound preposition
Off please, Turn off, Take off, Get off, Show off, Come off, Back off, Far off, Off here, Off there, Off chair, Off table, Off bed, Off floor, Off lap, Switch off, Log off, Cool off, Drop off, Fall off, Jump off, Climb off, Step off, Walk off, Run off, Drive off, Float off, Fly off, Peel off

### Big (29) — compound modifier (consider SNUG switch per design Q1)
Big please, Very big, Too big, So big, Really big, Biggest, Big one, Big dog, Big car, Big house, Big school, Big tree, Big ball, Big box, Big bed, Big chair, Big table, Big room, Big pool, Big park, Big noise, Big mess, Big hug, Big smile, Big laugh, Big cry, Big jump, Big run, Big eat

### Little (29) — compound modifier
Little please, Very little, Too little, So little, Really little, Littlest, Little one, Little bit, Little dog, Little cat, Little baby, Little child, Little car, Little box, Little room, Little house, Little chair, Little table, Little ball, Little bird, Little bug, Little hand, Little foot, Little nose, Little ear, Little mouth, Little smile, Little laugh, Little cry

### Good (29) — mixed idiomatic + compositional
Good job, Good work, Good try, Good idea, Good morning, Good night, Good day, Good doggy, Good times, Good sleep, Good news, Good friend, Good helper, Good listener, Good sharing, Good waiting, Good sitting, Good walking, Good talking, Good reading, Good drawing, Good building, Good singing, Good dancing, Good jumping, Good running, Good catching, Good throwing, Good climbing

**FLAGS:**
- "Good morning/night/day" are idiomatic — keep
- "Good job/work/try/idea" are praise idioms — keep
- "Good [-ing verb]" entries are compositional ("Good drawing" = Good + Drawing) — consider SNUG switch

### Bad (27) — compound modifier
Bad please, Very bad, Too bad, So bad, Really bad, Feels bad, Tastes bad, Smells bad, Looks bad, Sounds bad, Bad dream, Bad mood, Yucky smell, Yucky taste, Yucky feeling, Not good, Not nice, Not fair, Not okay, Not right, Not safe, Hurts bad, Too smelly, Too scratchy, Too tight, Too hot, Too cold

**FLAGS:**
- `Bad please` doesn't make sense semantically. Remove.

### More (29) — compound mand (CRITICAL design Q1 candidate)
More please, More turn, More tickle, More cuddles, More time, More help, More hugs, More music, More TV, More iPad, More games, More reading, More drawing, More building, More singing, More dancing, More jumping, More running, More swimming, More outside, More inside, More friends, More family, More school, More home, More sleep, More rest, More quiet, More noise

**FLAGS:**
- 25/29 entries are "More + [noun/verb that exists elsewhere]". Strongest case for SNUG switch.
- `More turn` is grammatically off — "Another turn" or "My turn" is more natural

### All Done (29) — compound terminator
Done eating, Done drinking, Done playing, Done working, Done reading, Done drawing, Done building, Done singing, Done dancing, Done jumping, Done running, Done swimming, Done outside, Done inside, Done school, Done home, Done bath, Done toilet, Done dressing, Done cleaning, Done tidying, Done helping, Done waiting, Done sitting, Done standing, Done talking, Done listening, Done watching, Done sleeping

**FLAGS:**
- Label/speak mismatch (see design Q4)
- Almost-perfect parallel to More — same SNUG decision

---

## SECTION 3 — Tabbed panels

### People (76 entries across 4 tabs)

**Family (20):** Mum, Dad, Mummy, Daddy, Brother, Sister, Baby, Grandma, Grandpa, Nan, Pop, Aunty, Uncle, Cousin, Stepmum, Stepdad, Halfbrother, Halfsister, Family, Twin

- ⚠️ Mum/Mummy and Dad/Daddy both included — duplicate? Or intentional (Mum = formal, Mummy = casual)?
- ⚠️ Nan + Grandma + Pop + Grandpa — same redundancy concern (some kids use Nan, some Grandma)
- `Halfbrother / Halfsister` — labels missing space. Should be `Half brother / Half sister` (matches speak)
- Missing: `Friend's mum`, `Friend's dad` (high-frequency in school context)

**School (18):** Teacher, Assistant, Helper, Principal, Deputy, Friend, Best friend, Classmate, Buddy, Boy, Girl, Student, Coach, Therapist, Bus driver, Cleaner, Librarian, Music teacher

- Missing: `Class teacher`, `Specialist teacher`, `Speech therapist` (NDIS-context relevance)

**Community (21):** Doctor, Nurse, Dentist, Police, Firefighter, Paramedic, Pharmacist, Postie, Driver, Shopkeeper, Waiter, Chef, Hairdresser, Barista, Vet, Builder, Electrician, Plumber, Stranger, Neighbour, Babysitter

- `Stranger` — clinically important (stranger danger language), keep
- Strong coverage. Maybe add `Tradie` (Aus term)?

**Pronouns (17):** He, She, They, Him, Her, Them, Us, Lady, Man, Adult, Kid, Person, Everyone, Nobody, Someone, Anyone, Group

- ⚠️ `We` is on home grid but `Us` is here — intentional (per memory rule "no home pronouns in tabs"). Verify Us is genuinely different (object form of We) and worth keeping.

### Food (95 entries across 4 tabs)

**Meals (25):** Breakfast, Lunch, Dinner, Pizza, Pasta, Rice, Bread, Sandwich, Soup, Noodles, Burger, Hot dog, Nuggets, Fish and chips, Chicken, Steak, Tacos, Wrap, Salad, Stir fry, Curry, Roast, Pancakes, Waffles, Cereal

- Strong list. Maybe `Sushi`?

**Snacks (25):** Snack, Treat, Cookie, Cake, Chips, Crackers, Lollies, Chocolate, Ice cream, Donut, Muffin, Cupcake, Yoghurt, Cheese, Pretzel, Popcorn, Jelly, Gummy, Marshmallow, Lollipop, Brownie, Custard, Pie, Sausage roll, Fruit

- ⚠️ `Cookie` vs `Biscuit` — Australian English typically says "biscuit" for what Americans call a cookie. Decide.
- `Donut` — could be `Doughnut` for Australian. Or accept Americanism (kids say "donut").
- `Fruit` is also in `fruitveg` tab — redundant

**Fruit & Veg (25):** Apple, Banana, Orange, Strawberry, Grapes, Watermelon, Pineapple, Mango, Pear, Peach, Kiwi, Cherry, Lemon, Carrot, Broccoli, Tomato, Cucumber, Corn, Potato, Pumpkin, Lettuce, Capsicum, Mushroom, Avocado, Onion

- Strong list, Australian-correct (`Capsicum` not "bell pepper")

**Drinks (20):** Water, Milk, Juice, Cordial, Hot Choc, Smoothie, Tea, Lemonade, Fizzy, Apple juice, Orange juice, Milo, Coconut water, Soft drink, Iced tea, Iced coffee, Cup, Bottle, Straw, Refill

- `Hot Choc` label vs `Hot Chocolate` speak — minor inconsistency
- `Cup / Bottle / Straw / Refill` — these aren't drinks, they're vessels/actions. Move to a different category or keep as practical mealtime vocab?

### Places (100 entries across 4 tabs)

**Home (25):** Bedroom, Bathroom, Kitchen, Lounge, Dining Room, Hallway, Stairs, Garden, Backyard, Front yard, Driveway, Garage, Shed, Laundry, Pantry, Office, Study, Playroom, Toilet, Shower, Bath, Couch, Bed, Table, Door

- `Bath` and `Bathroom` overlap; `Couch` and `Lounge` overlap (Aus uses Lounge for room AND couch)

**School (25):** Classroom, Library, Gym, Music Room, Art Room, Hall, Canteen, Tuckshop, Playground, Oval, Sandpit, Sports court, Therapy room, Sensory room, Quiet room, Bathroom, Sick bay, Bus stop, Carpark, Front gate, Reception, Staff room, Assembly, Office, School bus

- `Canteen` and `Tuckshop` — Aus terms, both used regionally
- `Bathroom` here AND in Home tab — duplicate (intentional? school bathroom vs home)
- Missing: `Crossing`, `Pickup zone`

**Community (25):** Park, Beach, Pool, Zoo, Farm, Shop, Supermarket, Mall, Cafe, Restaurant, McDonald's, Hospital, Doctor, Dentist, Therapy, Church, Library, Cinema, Aquarium, Museum, Bowling, Mini golf, Trampoline park, Friend's house, Grandma's

- ⚠️ `McDonald's` — brand-specific. Inclusive? Or generic `Fast food`?
- ⚠️ `Church` — single religion. Consider `Mosque`, `Temple` or generic `Place of worship`?
- `Library` also in School tab — duplicate
- `Doctor / Dentist / Therapy` are also in People panel as roles — slight redundancy (here as place, there as person)

**Travel (25):** Car, Bus, Train, Tram, Plane, Boat, Ferry, Bike, Scooter, Skateboard, Truck, Helicopter, Motorbike, Taxi, Train station, Airport, Petrol station, Trip, Holiday, Camping, Caravan, Hotel, Long way, Short way, Roadtrip

- `Long way / Short way` are descriptors, not places — possibly misfit here
- Missing: `Uber`, `Walking`

### Toys / Play (101 entries across 5 tabs)

**Active (20):** Ball, Trampoline, Bike, Scooter, Skateboard, Swing, Slide, Hula hoop, Skipping rope, Frisbee, Kite, Climbing frame, Cubby house, Sandpit, Pool toy, Footy, Basketball, Tennis, Cricket, Netball

- ⚠️ `Bike / Scooter / Skateboard` also in Places/Travel — duplicate
- `Sandpit` also in Places/School — duplicate
- ⚠️ `Footy` (Aus generic for AFL/Rugby) — keep, very Australian

**Quiet & Art (22):** Lego, Blocks, Puzzle, Doll, Teddy, Action figure, Train set, Crayon, Marker, Paper, Pencil, Paint, Paintbrush, Glue, Sticker, Clay, Playdough, Colouring book, Stamp, Scissors, Card game, Board game

**Sensory (14):** Sand, Water play, Slime, Bubbles, Fidget, Squishy, Stress ball, Spinner, Weighted blanket, Body sock, Sensory bottle, Pop tube, Light up toy, Music toy

- ⚠️ Education-support specific (sensory tools) — clinically strong
- Smallest tab; could expand if needed

**Tech (20):** iPad, Phone, Computer, Laptop, TV, Game, Video, YouTube, Movie, Music, Song, Headphones, Speaker, Camera, Show, Cartoon, App, Photo, Tablet, Remote

- `iPad / TV / Music / Video / Game` heavily duplicated in Like sub-grid and More sub-grid
- `Tablet` vs `iPad` — same thing? Keep both or pick one?

**Animals (25):** Dog, Cat, Bird, Fish, Rabbit, Horse, Cow, Sheep, Pig, Chicken, Duck, Lion, Elephant, Monkey, Bear, Penguin, Snake, Frog, Turtle, Dinosaur, Shark, Dolphin, Kangaroo, Koala, Emu

- Good Aus coverage (Kangaroo, Koala, Emu). Missing: `Wombat`, `Possum`, `Magpie`, `Cockatoo`, `Goanna`, `Echidna`
- `Chicken` here as animal, also in Food/Meals — same word, different meaning (intentional)

---

## SECTION 4 — Academic (217 entries across 10 tabs)

### Numbers (36) ✓
1–20, +, −, ×, ÷, first, second, third, last, next, none, some, many, few, whole, half

### Colours (11) ✓
Red, Blue, Green, Yellow, Orange, Purple, Pink, Brown, Black, White, Grey

### Shapes (8) ✓
Circle, Square, Triangle, Rectangle, Star, Heart, Diamond, Oval

- Could add: Hexagon, Pentagon, Crescent (advanced shapes)

### Letters (26) — A-Z ✓

### Actions (35) — classroom verbs
Write, Read, Count, Draw, Cut, Paste, Colour, Match, Sort, Find, Point, Show, Tell, Answer, Question, Correct, Wrong, Try again, Well done, Finished, Help me, I know, I don't know, My turn, Your turn, Wait, Listen, Look, Sit down, Stand up, Line up, Come here, Go there, Pack up

- ⚠️ MAJOR DUPLICATION with many home-button sub-grids:
  - Write/Read/Draw/Cut also in `make` sub-grid
  - Listen/Look also in `look` sub-grid (or are home-grid)
  - Help me, My turn, Wait also in `stop` sub-grid
  - Sit down, Stand up also in `down_`/`up_` sub-grids
- Recommendation: pick canonical home (Academic actions = classroom-context, others = general); ruthlessly deduplicate

### Body (28) — anatomy ✓
Body, Head, Hair, Face, Eye, Ear, Nose, Mouth, Tongue, Teeth, Lips, Cheek, Chin, Neck, Shoulder, Arm, Elbow, Hand, Finger, Thumb, Chest, Tummy, Back, Leg, Knee, Foot, Toe, Bottom

- Strong list. Missing: `Wrist`, `Ankle`, `Hip`

### Clothing (28) — Australian ✓
Shirt, T-shirt, Jumper, Jacket, Pants, Shorts, Skirt, Dress, Tracksuit, Shoes, Runners, Socks, Boots, Thongs, Hat, Cap, Beanie, Pyjamas, Undies, Singlet, Uniform, Bathers, Raincoat, Umbrella, Glasses, Backpack, Tie, Scarf

- Strong Aus vocabulary (Jumper/Thongs/Bathers/Runners/Undies)
- `Umbrella` is an accessory not clothing — misfit?

### Time (18) — NEW
Now, Later, Soon, Before, After, Today, Tomorrow, Yesterday, Morning, Afternoon, Night, Day, Week, Weekend, Early, Late, Hour, Minute

- Strong baseline. Future: Days-of-week sub-tab as discussed.

### Emotions (14) — NEW, face-only style locked
Happy, Sad, Angry, Scared, Excited, Tired, Silly, Bored, Calm, Worried, Surprised, Proud, Shy, Love

- Confirmed face-only composition for AI symbol generation
- Missing: `Confused`, `Lonely`, `Jealous`, `Embarrassed`. Consider for Tier 2 expansion?

### Weather (13) — NEW
Sunny, Cloudy, Rainy, Windy, Stormy, Snowy, Hot, Cold, Warm, Cool, Foggy, Rainbow, Sky

- `Hot/Cold` also exists in `bad` sub-grid (Too hot/Too cold) — but functionally distinct (weather descriptor vs sensation complaint)

---

## SECTION 5 — Grammar overlay (40 entries across 2 tabs)

### Words (27) — function words
the, a, an, to, with, and, or, but, is, are, was, were, my, your, his, her, their, our, not, can, can't, will, won't, do, don't, did, didn't, have, has, had

- Strong functional set. Missing: `am`, `be`, `been`, `me` (object pronoun)

### Doing (13) — progressive verbs
going, doing, eating, drinking, playing, sleeping, running, jumping, watching, reading, making, helping, waiting

- Limited set — only 13 of dozens of common -ing forms. Should this expand or stay tight?

---

## DECISIONS THIS AUDIT NEEDS TO PRODUCE

For each of these, the audit doc above gives you the data; you and your co-developer need to land on answers:

1. **Compound vs SNUG pattern** in descriptor sub-grids — restructure or keep?
2. **Cross-panel duplication** — for each duplicated word, what's canonical home?
3. **Look sub-grid scope** — trim to perception-only?
4. **alldone label/speak mismatch** — change labels?
5. **Per-panel additions** — any missing high-frequency vocab to add?
6. **Per-panel removals** — any vocab to cut (cultural, brand-specific, low utility)?

Bring this file back with markup and I'll apply every change to `index.html` in one pass.
