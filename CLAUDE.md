# ELE Talk — AAC Web App

A browser-based Augmentative and Alternative Communication (AAC) app 
designed for children with communication disabilities in education support 
contexts. ELE Talk is part of the Early Learning Essentials (ELE) brand.

## The problem we are solving
Most AAC apps are iPad-only and cost hundreds of dollars upfront, making 
them inaccessible for many families and schools with limited budgets. ELE 
Talk solves this by being fully browser-based (works on any device) with 
a low monthly subscription of $5–$10, making professional AAC tools 
accessible to everyone.

## Target users
- Children aged roughly 3–12 with communication disabilities
- Primarily used in education support and special education classroom contexts
- Also used at home by families
- The adults configuring the app are teachers, education assistants, 
  speech therapists, and parents — design must be intuitive for them too

## Core concept
A symbol-based communication board. Children tap large, clear symbols 
(image + word label) to communicate. The app speaks the word or phrase 
out loud when a symbol is tapped. Symbols are organised into categories.

## AAC Theory — This is critical, read carefully

### Core Vocabulary vs Fringe Vocabulary
AAC research shows that approximately 80% of everything we say consists 
of "core words" — versatile, high-frequency words that work across any 
topic or situation. These are words like "want", "go", "more", "help", 
"stop". Fringe words are topic-specific nouns like "dinosaur" or "pizza".

The goal of ELE Talk is SNUG — Spontaneous Novel Utterance Generation. 
We give the child enough core word "lego bricks" to build any sentence 
they want, rather than pre-programmed phrases. "I want more bubbles" 
should be built by the child selecting "I" + "want" + "more" + "bubbles" 
(fringe), not by tapping a single pre-made button.

### The Starting 20 — Highest priority, always on home screen
These must always be immediately accessible on the main board:
I, You, Me, My, Mine, It, That, Want, Go, Stop, Like, Help, Play, Look,
More, All gone, Up, Down, On, Off

### The 200 Core Word List by category

**Pronouns**
I, you, me, my, mine, it, that, we, us, he, she, they, them, your, 
yours, some, all, who, what, where

**Verbs (Actions)**
want, go, stop, play, help, look, get, put, do, make, see, come, take, 
give, think, know, say, tell, feel, eat, drink, sleep, sit, stand, walk, 
run, jump, push, pull, turn, open, close, wash, color, draw, watch, read, 
listen, need, love, like, work, wait, find, lose

**Position and Space**
up, down, on, off, in, out, here, there, under, over, top, bottom, front, 
back, next to, away, with, for, to, from, about

**Descriptors**
good, bad, happy, sad, mad, big, little, hot, cold, hungry, thirsty, 
tired, sick, dirty, clean, fast, slow, loud, quiet, hard, soft, easy, 
same, different, more, all, some, none, again, enough, long, short, 
wet, dry, pretty, yucky

**Time and Order**
now, later, soon, today, tomorrow, yesterday, morning, night, first, 
last, again, before, after, always, never, sometimes

**Social and Power words**
yes, no, please, thanks, sorry, hello, goodbye, wait, my turn, your 
turn, more, finished, all gone, ready, go away, help me

**General Nouns**
thing, stuff, people, person, man, woman, boy, girl, baby, friend, 
teacher, home, school, house, room, water, food, clothes, money, 
time, way, name

**Connecting Words**
and, but, because, if, or, so, then, when, why

### Fringe vocabulary — organised into folders
Fringe words live inside category folders, not on the main board:
Animals, Food, Toys, Places, Body Parts, Colors, Clothes, Feelings

### Motor planning — CRITICAL RULE
Once a symbol is placed on the screen, its position must NEVER change. 
Children develop muscle memory for symbol locations just like touch-typing. 
If "Want" is top-left on a 4-button grid, it must remain top-left when 
the grid grows to 60 buttons. Repositioning symbols as the board grows 
destroys learned motor patterns and sets the child back significantly. 
This is non-negotiable.

### Grid scaling
The app should support multiple grid sizes to suit different ability levels:
- 4 buttons (very early/emerging communicators)
- 9 buttons
- 16 buttons
- 25 buttons
- 60 buttons (advanced users)
Motor planning positions must be preserved as grids scale up.

### Grammar support for older users (ages 7–12)
When a verb is selected, offer morphological variants:
- Select "go" → offer "going", "gone", "went"
- Select "eat" → offer "eating", "ate", "eaten"
This supports sentence building for more advanced communicators.

### Example sentence construction
"I want more bubbles" is constructed as:
- "I" (core, home screen)
- "want" (core, home screen)  
- "more" (core, home screen)
- "bubbles" (fringe, inside Toys folder)
Build the UI to make this kind of multi-word construction fast and natural.

## Build order (do not skip ahead)
1. Working symbol board — grid of Starting 20 core words that speak when tapped
2. Category folders for fringe vocabulary
3. Sentence strip — words queue up at the top as tapped, then spoken together
4. Multiple grid size options
5. Symbol customisation — edit labels, upload custom images
6. Grammar morphology support for verbs
7. User profiles — different board setups saved per child
8. Login and account system
9. Subscription and payments (Stripe)
10. Admin dashboard for teachers to manage multiple student profiles

## Design principles
- Child-facing interface must be extremely simple and uncluttered
- Symbols must be large with high contrast — accessibility is non-negotiable
- Bright, friendly, and engaging for children without being chaotic
- The adult/settings interface can be more detailed but still intuitive
- Mobile and tablet first — most use will be on iPads and tablets in 
  classrooms, even though it runs in a browser
- Fast — there must be zero perceptible delay when a symbol is tapped 
  and the voice plays. Lag destroys the communication experience.
- No ads, no distracting animations on the main board

## Voice and speech
- Use the Web Speech API for text-to-speech (built into all modern browsers,
  no external API needed at this stage)
- Voice should be clear and natural sounding
- Eventually allow voice selection (male, female, child-like options)

## Tech approach
- Start as a pure HTML, CSS, and JavaScript single file for prototyping
- Keep it simple until the core experience is validated
- No frameworks or complex dependencies at this stage
- When ready to scale, consider moving to React and a proper backend

## Branding
- App name: ELE Talk
- Part of the Early Learning Essentials (ELE) brand family
- Colour palette: warm, friendly, and accessible — bright primary colours 
  work well for the child-facing interface
- Logo and brand assets to be developed later

## Technical rules
- Write clean, well-commented code throughout
- Accessibility is a core requirement, not an afterthought — this app 
  serves children with disabilities
- Motor planning rule must be respected in every build decision
- Ask before making large structural changes
- Explain significant decisions as you make them
- The developer is learning to code alongside this build — keep 
  explanations clear when making non-obvious choices
- Commit working versions to Git regularly

## Current goal
Build a prototype symbol board using the Starting 20 core words. A clean 
grid of 20 symbols, each showing a simple icon and word label. Tapping 
a symbol adds it to a sentence strip at the top of the screen. A "Speak" 
button reads the sentence aloud using the Web Speech API. A "Clear" button 
resets the strip. Include a simple folder button to hint at future fringe 
vocabulary navigation. Make it feel like a real app — polished, bright, 
and fast.