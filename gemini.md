# AI AVLOKAN 2k26 — Technical Fest Website Build Prompt

Build a **fully responsive, premium, single-page (with two extra sub-pages) website** for a college National Technical Fest called **"AI AVLOKAN 2k26"**, organized by the **AIML Department**. This must feel like a top-tier IIT/NIT technical fest website — polished, modern, fast, and "expensive-looking."

---

## 1. Tech Stack (Strict Constraints)

- **Pure Vanilla HTML5, CSS3, and JavaScript (ES6+) only.**
- **No frameworks/libraries** (no React, no Bootstrap, no Tailwind, no jQuery, no GSAP unless explicitly using lightweight vanilla JS animation via `IntersectionObserver`, CSS `@keyframes`, and `requestAnimationFrame`).
- No build tools — must run directly by opening `index.html`, no bundlers.
- Use **CSS custom properties (variables)** for the entire design system (colors, spacing, shadows, radii, fonts) defined in `:root`.
- Use **CSS Grid + Flexbox** for all layouts. No table-based or float-based layouts.
- Fonts: Load via Google Fonts `<link>` — a modern **display/heading font** (e.g., "Space Grotesk" or "Orbitron" for a techy feel) + a clean **body font** (e.g., "Inter" or "Poppins").
- Icons: Use a lightweight inline SVG icon set (no external icon library dependency causing load lag) — hand-craft small SVGs for socials, arrows, phone, chevrons, etc.

## 2. File / Folder Structure

```
/
├── index.html
├── events.html
├── team.html
├── /css
│   ├── style.css        (global variables, reset, layout, components)
│   └── animations.css   (keyframes, transitions, reveal classes)
├── /js
│   ├── main.js           (nav, countdown, scroll reveal, FAQ accordion, modals)
│   ├── background.js     (shared deep-space particle/starfield canvas — included on every page)
│   ├── events.js         (EVENTS JSON data array + render logic)
│   └── team.js            (TEAM JSON data array + render logic)
├── /assets
│   ├── /images
│   ├── /posters
│   └── /team
└── README.md
```

- `events.js` and `team.js` must export a **plain JS array of objects (JSON-like)** at the top of the file, followed by render functions that inject the data into the DOM. Editing content should require **zero HTML edits** — just editing the array.

## 3. Design System — Premium Dark Tech Theme

Use a **dark, glassmorphic, techy aesthetic** (this is what makes fest sites look premium — avoid plain white/light corporate look).

### Color Palette (define as CSS variables)

```css
:root {
  /* Base — deliberately NOT pure/pitch black (#000), uses a soft charcoal/off-black tone so depth, shadows, and glows read properly */
  --bg-primary: #0c0d13;        /* charcoal off-black base */
  --bg-secondary: #14151f;      /* section alt background */
  --bg-elevated: #1a1c28;       /* card background */
  --bg-glass: rgba(255, 255, 255, 0.04);

  /* Accent — electric violet + cyan duo for "AI" feel */
  --accent-primary: #7c3aed;    /* violet */
  --accent-secondary: #22d3ee;  /* cyan */
  --accent-gradient: linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%);
  --accent-gold: #facc15;       /* used sparingly for prize/highlight */

  /* Text */
  --text-primary: #f5f5f8;
  --text-secondary: #a3a7bd;
  --text-muted: #6b6f85;

  /* Borders / Lines */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(124, 58, 237, 0.4);

  /* Status */
  --success: #22c55e;
  --live-red: #ef4444;

  /* Shadows */
  --shadow-soft: 0 8px 30px rgba(0,0,0,0.35);
  --shadow-glow: 0 0 40px rgba(124, 58, 237, 0.25);

  /* Radii */
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 28px;

  /* Spacing scale */
  --space-1: 8px; --space-2: 16px; --space-3: 24px;
  --space-4: 40px; --space-5: 64px; --space-6: 96px;
}
```

### Global Animated Background — Deep-Space Particle Field (Applies to ALL Pages)

The entire site (`index.html`, `events.html`, `team.html`) shares **one consistent, dense animated deep-space background** — not just the hero. Reference look: a dark charcoal/off-black sky densely scattered with small glowing dots in **teal/cyan and soft warm gold/amber tones**, denser and brighter toward one region and fading into sparse single-pixel white stars elsewhere, with occasional **shooting stars** streaking across with a fading tail.

- Implement as a **single fixed full-viewport `<canvas>` element** (`position: fixed; inset: 0; z-index: -1; pointer-events: none`) injected once via a shared `js/background.js` file and included on every HTML page, so behavior/appearance is identical everywhere and there's no duplicated code.
- **Star field**: generate a pool of small particles (mostly 1–2px, a smaller number 3–5px "glow" stars) randomly positioned across the canvas, with color randomly weighted between cyan (`--accent-secondary`), soft gold (`--accent-gold`), and plain white — matching the reference image's teal/amber speckled-galaxy look. Glow stars get a soft radial blur (`shadow-blur` on canvas or a CSS `filter: blur()` layer) and a slow independent **twinkle** (opacity oscillating gently via `sin()` timing, not random flicker).
- Optionally bias particle density to be **denser in one corner/region** (e.g., top-left) and gradually sparser outward, echoing the reference image's cluster-fading-into-empty-space effect, for a more organic "galaxy" feel rather than uniform even spacing.
- **Shooting stars**: periodically (randomized interval, roughly every 4–9s) spawn a bright particle that travels in a straight diagonal line across a portion of the screen with a **fading gradient tail** (drawn as a short line/gradient behind the moving point, opacity fading to 0), then despawns — should feel rare and elegant, not constant or distracting.
- **Performance discipline**: cap total star count based on viewport size (fewer on mobile), use a single `requestAnimationFrame` loop for the whole canvas (not per-star intervals), pause the loop entirely when `document.visibilityState === 'hidden'` or when the canvas is scrolled far out of view, and skip/simplify the animation under `prefers-reduced-motion: reduce` (render a static star field with no shooting stars/twinkle in that case).
- The canvas sits behind all page content and section backgrounds; sections with a solid/alt background (`--bg-secondary`) can sit above it normally, so the starfield is most visible through the hero and any semi-transparent/glass sections.
- Because this is truly global (not hero-only), remove any page-specific "particle background" duplication — the hero, events page, and team page all simply render on top of this shared canvas.
- Cards use **glassmorphism**: `background: var(--bg-glass); backdrop-filter: blur(12px); border: 1px solid var(--border-subtle);`
- Use **gradient text** (`background-clip: text`) for key headings like the event name and section titles.
- Add a **soft glow border** on hero elements using layered `box-shadow` + a rotating conic-gradient border trick (pure CSS, GPU-friendly using `transform`, not layout-triggering properties).

### Typography Scale
- H1: 56–72px (clamp for responsiveness), H2: 36–44px, H3: 24px, Body: 16–18px, Small: 14px.
- Use `clamp()` for all major headings so text scales fluidly instead of jumping at breakpoints.

## 4. Performance & UX Rules (Non-Negotiable)

- **No layout-shift / ghost divs**: every image must have explicit `width`/`height` or `aspect-ratio` set, and use `loading="lazy"` + a low-opacity skeleton/shimmer placeholder (CSS gradient shimmer, not JS) until loaded.
- **All animations must be GPU-accelerated**: only animate `transform` and `opacity`. Never animate `top/left/width/height/margin` for motion.
- Add `will-change: transform` sparingly only on actively-animating elements, remove after animation completes.
- Respect `prefers-reduced-motion: reduce` — disable/shorten all decorative animations for users who request it.
- Scroll-reveal animations via a single reusable `IntersectionObserver` (not one observer per element) — add a `.reveal` class to elements, toggle `.is-visible` on intersect, unobserve after first trigger.
- Debounce/throttle scroll and resize listeners (e.g., navbar shrink-on-scroll) using `requestAnimationFrame`.
- Keep total custom JS lightweight — no heavy libraries, target sub-1s interactive time on a decent connection.
- Smooth scrolling for nav anchor links (`scroll-behavior: smooth` + JS fallback for offset due to sticky navbar).
- All buttons/cards have refined **hover + active micro-interactions** (subtle scale `1.02–1.05`, glow shadow increase, 200–300ms `cubic-bezier(0.4, 0, 0.2, 1)` easing) — nothing jumpy or elastic/bouncy.
- Fully responsive: **mobile-first**, breakpoints at `480px`, `768px`, `1024px`, `1280px`. Test that nothing overflows horizontally at any width.

## 5. Site Structure & Section-by-Section Behavior

### 5.1 Navbar
- Sticky/fixed top navbar with **frosted-glass background** (`backdrop-filter: blur`) that becomes more opaque + gains a bottom border/shadow once scrolled (toggle a `.scrolled` class via scroll listener).
- Left: small circular/hex logo mark + "AI AVLOKAN 2k26" wordmark (logo can be a placeholder SVG initial).
- Center/Right: nav links — Home, About, Events, Team, Schedule, FAQ, Contact.
- Right-most: a prominent gradient **"Register Now"** pill button.
- Hamburger menu on mobile → slides in a full-height glass overlay menu with staggered fade-in link animations.
- make the Navbar to look premium and attractive not a single strip of section with links.

### 5.2 Hero Section
- Full-viewport height (`min-height: 100svh` to avoid mobile URL-bar jump issues).
- Center-aligned: event **logo/emblem** with a **slow floating animation** (`@keyframes float { 0%,100% translateY(0); 50% translateY(-12px) }`, ~4–6s ease-in-out infinite) and a **cool aesthetic rotating gradient ring/border** around it (conic-gradient spinning slowly, ~20s linear infinite, GPU-only).
- **3D depth effect on the logo/emblem**: layer the emblem with CSS `perspective`/`transform-style: preserve-3d` on a wrapping container so the logo appears to sit in 3D space — combine the floating `translateY` with a subtle continuous `rotateX`/`rotateY` tilt oscillation (a few degrees each way, slow ~8–10s ease-in-out loop) for a gentle "hologram hovering" feel, plus a **mouse/pointer-tracking parallax tilt** on desktop (logo tilts slightly toward the cursor position using `rotateX`/`rotateY` mapped from pointer offset, clamped to a small max angle, smoothed with easing/lerp — disabled on touch devices and under `prefers-reduced-motion`). Add a soft drop shadow beneath the logo that shrinks/grows subtly in sync with the float to reinforce the sense of depth (elevation illusion), plus the same layered glow (`box-shadow`) treatment already used elsewhere for consistency.
- **Event wordmark image (replaces plain text title)**: directly below the logo/emblem, leave a dedicated, clearly-marked **image slot for the event name wordmark** (a transparent-background PNG/SVG reading "AI AVLOKAN 2k26" in custom typography/graphic style) instead of rendering the title as live text.
  - Reference/default asset size: **2172 × 724px** (~3:1 aspect ratio), but the container must be built to gracefully accept **any reasonably similar wide-format image** without breaking layout — implement it as a responsive `<img>` (or `background-image`) inside a container sized with `width: min(90vw, 720px)` (or similar fluid clamp) and `aspect-ratio: 3 / 1` (computed from the reference dimensions), with `object-fit: contain` so the image always scales proportionally and centers within its slot regardless of the exact pixel dimensions of whatever wordmark image is ultimately supplied — no cropping, no distortion, no forced stretching.
  - Provide a sensible `alt="AI AVLOKAN 2k26"` for accessibility/SEO even though the title is now an image.
  - Give the wordmark image the same shimmer/skeleton loading placeholder treatment as other images (see Section 4) so there's no flash/ghost-box before it loads.
  - Below the wordmark: a short tagline (e.g., "A National Level Technical Fest by Dept. of AIML") and small metadata row (date badge, venue badge), styled as before.
- The dense **global particle/starfield background** (see Section 3 → "Global Animated Background") shows through the entire hero — no separate hero-only background is needed; the hero simply renders its content on top of the shared canvas, optionally with a soft radial vignette/gradient overlay near the center to keep the logo and wordmark legible against the busy star field.
- Scroll-down indicator (animated mouse/chevron bounce) at the bottom center.

### 5.3 Countdown Timer Section
- Event Date: **25 September 2026**.
- Four glass cards in a row: **Days / Hours / Minutes / Seconds**, large gradient numbers, small uppercase labels.
- JS `setInterval` (1000ms) recalculating remaining time; numbers should **flip/fade smoothly** on change (small `transform` + `opacity` transition per digit — no full re-render flash).
- **Logic states**:
  1. If countdown > 0 → show the 4-unit countdown grid.
  2. If current date == event day (25 Sept 2026) → replace countdown with a **"🔴 LIVE — Event is happening now!"** banner: pulsing red "LIVE" badge (CSS pulse animation on `opacity`/`box-shadow`), with the date "25 September 2026" shown below it.
  3. If countdown has fully passed (event day is over) → show a **"Event Concluded — See you next year!"** state with the same date shown, softly styled (muted colors, no pulse).
- All three states share the same container to avoid layout shift when switching.

### 5.4 Stats Section (Events Count & Prize Pool)
- Two (expandable to more, e.g. add "Participants" or "Colleges" if desired — see Section 11) glass stat cards side-by-side (stack on mobile):
  - **"8+ Events"**
  - **"₹48,000 Prize Pool"**
- Use large gradient numbers with an optional **count-up animation** on scroll-into-view (JS `requestAnimationFrame` counting from 0 to target over ~1.2s, eased).
- Icon above each stat (trophy for prize, calendar/flag for events).

### 5.5 CTA Buttons
- Two buttons centered below stats:
  - **"Explore Events"** (primary, gradient-filled, scrolls to Events section)
  - **"Register Now"** (secondary, outlined with gradient border, links to registration form/Google Form placeholder `#`)
- Both have hover glow + scale micro-interaction.

### 5.6 About the Event Section
- Two-column layout (image/illustration + text on desktop, stacked on mobile).
- Heading: "About AI AVLOKAN 2k26", 2–3 paragraph placeholder description (editable placeholder lorem-style copy about the fest's vision, scale, and who it's for).
- Optionally 3–4 small feature/highlight chips ("Live Workshops", "Hackathons", "Guest Speakers", "Networking").

### 5.7 About the Department Section
- Similar layout, reversed image/text order for visual rhythm.
- Heading: "About the Department — AIML", placeholder description about the Dept. of Artificial Intelligence & Machine Learning, its mission, achievements, and role in organizing the fest.

### 5.8 Events Section
- Section heading "Flagship Events" + subtitle.
- **Home page**: show **1 featured event card** (large, premium "spotlight" style — bigger poster, more padding, maybe a "Featured" badge) pulled dynamically from `events.js` (first item, or an item flagged `featured: true`).

#### Card Visual Design — "Sci-Fi Holo Card" (Default → Hover Morph)

The event card must follow a **futuristic collectible sci-fi trading-card aesthetic**: an angular, hex-cut card frame with a full-bleed poster image, a category tab, a vertical side label, small index/stat markers, and a title — which **morphs into a richer detail-preview state on hover**, similar to a physical holo-card lighting up.

**Card shape & frame (applies to both states):**
- Card outline uses **cut/chamfered corners** (not simple rounded corners) — achieve this with CSS `clip-path: polygon(...)` cutting the **top-left** and **bottom-right** corners at a 20–24px diagonal, so the card silhouette reads as an angular "tech panel" rather than a soft rectangle.
- A **1–1.5px hairline border** traces the card edge, matching the clipped polygon shape (use a pseudo-element or an SVG/`background` trick since `border` doesn't follow `clip-path` natively — e.g., a slightly larger wrapper with the accent color behind, clipped to the same polygon, creating a crisp outline).
- Card is fully rounded-corner-free, tall aspect ratio (~3:4 to 4:5), with the poster image filling the entire card as the background layer (`object-fit: cover`, `position: absolute; inset: 0`), and all text/UI elements layered above it with a dark gradient scrim at the bottom for legibility.

**Top category tab:**
- A small pill/tab shape sits centered at the very top edge, slightly overlapping the card's top border — dark background, thin border matching the card's current accent color, containing a short **letter-spaced uppercase category label** (e.g., "TECH", "GAMING", "CORE EVENT") in a small monospace or condensed font with generous `letter-spacing` (e.g., `0.3em`).

**Vertical side label:**
- On the card's right edge, a slim vertical strip/tab (background slightly tinted with the accent color) displays the **event's short-code name rotated 90°** (`writing-mode: vertical-rl` or `transform: rotate(90deg)`), letter-spaced, echoing the card title in condensed form — this is a pure decorative "spec-sheet" detail.

**Index markers (left edge):**
- A stack of **3–4 small square outline icons** near the top-left (representing rarity/tier or event-index markers — purely decorative, can just be numbered squares or small dot/square icons) plus, below them, a **thin vertical striped/segmented bar** (like a battery or charge-level indicator) rendered with a repeating linear-gradient — accent-colored in the hover state, muted/gray in the default state.

**Default (idle) state:**
- Muted, monochrome/desaturated color treatment: gray-white border, gray tab text, gray side-label, gray index bar — poster image shown with a subtle dark overlay (slightly desaturated via `filter: grayscale(15%) brightness(0.9)`).
- Only the **event title** is shown, bottom-center, in bold, wide-tracked uppercase letters, sitting on a dark gradient scrim — no description, no prize, no button visible yet.
- Card sits with a soft ambient shadow, no glow.

**Hover / active state (smooth morph, ~350–450ms `cubic-bezier(0.4,0,0.2,1)` transition on all properties below):**
- Border, tab outline, side-label background, and index bar **shift to the card's accent color** (each event can define its own `accentColor` in `events.js`, e.g., crimson/red, cyan, violet, gold — so different event cards glow differently) — animate via `border-color`, `background-color`, and `filter` transitions, not by swapping elements.
- A **soft colored glow** appears around the card edge (`box-shadow: 0 0 40px -10px var(--card-accent)`), and the poster's grayscale/dim filter animates back to full saturation/brightness.
- The bottom scrim area **expands upward** (animate `height`/`transform: translateY()` on an inner panel, not `max-height`, to keep it GPU-smooth) to reveal additional content that fades/slides in with a slight stagger:
  - Event title (already visible, may enlarge slightly)
  - A short one-line **tagline** (e.g., "Unleash Your Creation. Dominate The Air.")
  - A **"VIEW DETAILS"** button with bracket-style corner accents (small `┐ └` corner marks framing the button, drawn via small absolutely-positioned pseudo-element borders) — this button opens the details modal described below
  - A **"PRIZES WORTH"** label (small, muted, letter-spaced) followed by the **prize amount** in large bold accent-colored text (e.g., "RS. 6,000 *")
- A thin **gradient nebula/glow strip** along the bottom edge of the card (radial/linear gradient in the accent color, low opacity, blurred) intensifies on hover for extra "premium holo-card" flair.
- On touch devices (no real hover), tapping the card should trigger the same expanded/hover visual state (toggle a `.is-active` class on tap) so mobile users still see the tagline/prize/button.

**Data-driven theming:** each event object in `events.js` should include a `categoryLabel` (top tab text), `shortCode` (vertical side label text), and `accentColor` field so the card's glow/border/tab colors are fully data-driven per event, not hardcoded — e.g.:
```js
categoryLabel: "TECH",
shortCode: "CODESTORM",
accentColor: "#ef4444" // crimson — can vary per event (cyan, violet, gold, etc.)
```

- Card contents overall: poster image (fixed `aspect-ratio: 3/4` or `4/5`, `object-fit: cover`, shimmer placeholder while loading), category tab, vertical side label, index markers, event name, one-line teaser (hover-revealed), prize tag (hover-revealed), and **"View Details"** button (hover-revealed).
- Below the featured card: a centered **"View All Events"** button linking to `events.html`.
- **Details behavior**: clicking "View Details" opens a **modal (or expandable panel)** — not full navigation — showing:
  - Event name & full description
  - A image previewer (All types ot images horizontal scaled).
  - Timings (From → To)
  - Cash prize (₹6,000 default)
  - 2 organizer contacts (name + phone number, click-to-call `tel:` links)
  - Two buttons: **"View Rulebook"** (link/PDF placeholder `#`) and **"Register Now"** (link placeholder `#`)
  - Modal must have a dimmed blurred backdrop, close on outside-click/`Esc`, smooth scale+fade entrance (~250ms), and trap focus for accessibility.
- **`events.html`** page: same navbar/footer, grid of **all events** as cards (same style, smaller), each opening the same modal with its own data.

#### `events.js` structure (example — replicate with 8 total)

```js
const EVENTS = [
  {
    id: "evt-01",
    name: "CodeStorm — Competitive Programming",
    categoryLabel: "TECH",
    shortCode: "CODESTORM",
    accentColor: "#ef4444",
    tagline: "Crack the code before the clock runs out.",
    poster: "assets/posters/codestorm.jpg",
    description: "A high-intensity competitive programming contest testing algorithmic thinking, speed, and accuracy across multiple rounds of increasing difficulty.",
    timings: "10:00 AM – 1:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    featured: true,
    organizers: [
      { name: "Rohan Sharma", phone: "+91 90000 00001" },
      { name: "Ananya Rao", phone: "+91 90000 00002" }
    ],
    rulebookLink: "#",
    registerLink: "#"
  },
  {
    id: "evt-02",
    name: "AI Hackfest — 12hr Hackathon",
    categoryLabel: "CORE EVENT",
    shortCode: "AI HACKFEST",
    accentColor: "#22d3ee",
    tagline: "Build. Break. Ship. Repeat.",
    poster: "assets/posters/aihackfest.jpg",
    description: "A 12-hour on-site hackathon where teams build AI/ML powered solutions to real-world problem statements, judged by industry mentors.",
    timings: "9:00 AM – 9:00 PM",
    prize: "₹6,000",
    date: "25 Sept 2026",
    featured: false,
    organizers: [
      { name: "Kavya Nair", phone: "+91 90000 00003" },
      { name: "Aditya Verma", phone: "+91 90000 00004" }
    ],
    rulebookLink: "#",
    registerLink: "#"
  }
  // ...add remaining 6 events following the same structure
];
```

- Include a `renderEventCard(event)` function and a `renderEvents(containerEl, list)` function so both `index.html` (1 featured item) and `events.html` (all items) reuse the same rendering logic.

### 5.9 Team Section
- Heading "Meet the Team" + subtitle.
- **Home page**: grid/carousel of **7 team member cards**.

#### Card Visual Design — "Combat-Arena Panel Card" (Default → Hover Reveal)

The team card follows the same **angular sci-fi panel aesthetic** as the events cards (Section 5.8), reusing the visual language for consistency across the site, adapted for a member photo + identity reveal instead of an event poster + prize reveal.

**Card shape & frame:**
- Outer card silhouette uses **chamfered/cut top corners** (top-left and top-right corners sliced diagonally via `clip-path: polygon(...)`), giving the card a hexagonal-panel "ID badge" shape rather than a plain rectangle — matching the angular frame style used elsewhere on the site.
- Card background is a deep, near-black gradient panel (`var(--bg-elevated)` → darker), with a **thin hairline border** in a neutral muted tone by default.
- Inside the outer frame, the **member photo sits in its own inset panel** with slightly smaller chamfered corners than the outer card (nested angular-frame effect), `object-fit: cover`, fixed `aspect-ratio` (e.g., `1/1` or `4/5`), with the shimmer/skeleton loading placeholder from Section 4.
- Below the photo panel, a **bottom gradient glow strip** (radial/linear gradient in the card's accent color, blurred, low opacity by default) sits along the card's bottom edge — this is the "ambient light source" that intensifies on hover, exactly like the reference sci-fi card style.

**Default (idle) state:**
- Only the **member name** is shown, bottom-center, bold uppercase, wide letter-spacing, sitting just below the photo panel.
- Border, glow strip, and any button outlines stay **muted/desaturated** (soft gray or low-opacity accent color) — calm, not glowing.
- No role, department, or social buttons visible yet — kept minimal, like the "8KG" / "15KG" idle label state in the reference.

**Hover / active state (smooth transition, ~300–400ms `cubic-bezier(0.4,0,0.2,1)`, GPU-only via `transform`/`opacity`/`filter`):**
- Border and bottom glow strip **animate to the card's full accent color** and intensify (`box-shadow` glow increases, gradient strip brightens/expands slightly) — same "power-on" feeling as the reference card lighting up red on hover.
- Below the name, **role and department fade/slide in** (e.g., "Event Head — AIML"), revealed via the same expanding-panel technique used on the event cards (animate `transform: translateY()`/`opacity` on an inner reveal panel, not `max-height`).
- Two **bracket-bordered pill buttons** appear side-by-side below the role/department, styled exactly like the reference image's "REGISTER" / "EXPLORE" buttons: rectangular outline buttons with small corner-bracket accents, one **solid/filled on hover-highlight** (e.g., "LinkedIn") and one **outline-only** (e.g., "Instagram") — swap these two buttons per-card based on whichever `socials` links exist in `team.js` (fall back to a single "View Profile" button linking to that member's section on `team.html` if no socials are provided).
- Photo panel gets a subtle `scale(1.04)` zoom (contained via `overflow: hidden` on the photo wrapper so it never shifts layout) and a slight brightness/saturation lift to feel more "alive" on hover, mirroring the vividness increase seen in the reference card's right (hovered) state.
- On touch devices, tapping the card toggles the same `.is-active` revealed state (since there's no real hover) so mobile users can still see role/department/social buttons.

**Data-driven theming:** each team member in `team.js` can optionally include an `accentColor` field (defaulting to `--accent-primary` if omitted) so faculty vs. student cards, or different sub-teams, can each glow with a distinct accent color on hover, consistent with the per-event theming approach in Section 5.8.

- Card contents overall: photo (inset angular panel, shimmer placeholder + graceful fallback initials-avatar if image missing), name (always visible), role + department (hover-revealed), and one or two bracket-style buttons/social links (hover-revealed).
- Below the grid: centered **"View All Members"** button linking to `team.html`.
- **`team.html`** page: contains two distinct sections:
  - **"Faculty Section"** — faculty coordinators/mentors, styled slightly more formal (e.g., name, designation, department), using the same card design.
  - **"Student Section"** — full student core team, using the same card style as the homepage, grouped optionally by sub-teams (Tech, Design, Management, PR) if desired.
- Both pages pull from the same `team.js` data source, filtered by `category` field.

#### `team.js` structure (example — replicate with your full team size)

```js
const TEAM = [
  {
    id: "mem-01",
    name: "Dr. Priya Deshmukh",
    role: "Faculty Coordinator",
    department: "AIML",
    category: "faculty",       // "faculty" | "student"
    accentColor: "#facc15",
    photo: "assets/team/priya.jpg",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    id: "mem-02",
    name: "Arjun Mehta",
    role: "Event Head",
    department: "AIML",
    category: "student",
    showOnHome: true,          // controls the 7 shown on homepage
    accentColor: "#7c3aed",
    photo: "assets/team/arjun.jpg",
    socials: { linkedin: "#", instagram: "#" }
  }
  // ...add remaining members following the same structure
];
```

### 5.10 Event Schedule Section
- Heading "Event Day Schedule" + the date.
- A clean **vertical timeline** (desktop: alternating left/right or a single left-aligned line with time-nodes; mobile: single column) connected by a gradient vertical line with glowing dot markers per item.
- Each item: **Time range (From → To)** + activity label + short description/icon.
- Default schedule data (as a JS array in `main.js` or its own `schedule.js`, same JSON-editable pattern):

```js
const SCHEDULE = [
  { from: "08:00 AM", to: "09:00 AM", title: "Registration & Check-in" },
  { from: "09:00 AM", to: "09:30 AM", title: "Inaugural Ceremony" },
  { from: "09:30 AM", to: "10:00 AM", title: "Breakfast" },
  { from: "10:00 AM", to: "01:00 PM", title: "Event 1 — CodeStorm" },
  { from: "01:00 PM", to: "02:00 PM", title: "Lunch Break" },
  { from: "02:00 PM", to: "05:00 PM", title: "Event 2 — AI Hackfest" },
  { from: "05:00 PM", to: "06:00 PM", title: "Prize Distribution & Valedictory" }
];
```

### 5.11 FAQ Section
- Heading "Frequently Asked Questions".
- **Accordion pattern**: each question is a full-width row with a chevron icon that rotates 180° on open; clicking smoothly expands using a max-height/grid-rows transition (avoid the classic `max-height: 9999px` jank — prefer CSS Grid `grid-template-rows: 0fr → 1fr` trick for buttery smooth height animation).
- Only one item open at a time (optional, configurable), smooth close of previously open item.
- 5–6 default placeholder Q&As (e.g., "Is there a registration fee?", "Can I participate in multiple events?", "Is accommodation provided for outstation participants?", "Will certificates be provided?", "What should I bring on the event day?").

### 5.12 Contact Us Section
- Sits **directly above the footer**, heading "Get In Touch" / "Contact Us" + a short subtitle (e.g., "Have a question? Send us a message.").
- A centered, glass-panel **contact form card** (same glassmorphic card style as the rest of the site) containing:
  - **Name** field (text input)
  - **Email** field (`type="email"`, browser-validated)
  - **Query/Message** field (`<textarea>`, multi-line)
  - A **"Send Message"** button
- **No backend/server** — since this is a static vanilla HTML/CSS/JS site, submission works via a **`mailto:` link**, opening the user's default mail client:
  - On form submit, prevent default form submission (`e.preventDefault()`), read the Name/Email/Query field values, then construct and open a `mailto:` URL, e.g.:
    ```js
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const query = queryInput.value.trim();
      const targetEmail = "aiavlokan2k26@gmail.com"; // replace with actual fest email
      const subject = encodeURIComponent(`AI AVLOKAN 2k26 — Query from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nQuery:\n${query}`);
      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    });
    ```
  - Basic client-side validation (required fields, valid email pattern) before triggering the `mailto:` redirect, with inline error styling (red-tinted border + small helper text) matching the theme.
  - After triggering `mailto:`, show a brief inline confirmation note (e.g., "Opening your email app…") since the actual send happens in the user's mail client, not on the page.
- Keep the target email address as an **easily editable constant** (e.g., a `const TARGET_EMAIL = "..."` at the top of `main.js`) so it can be swapped without digging through the rest of the code.
- Include the same card frame/border treatment used elsewhere (chamfered corners or soft glass border) so this section feels native to the rest of the site rather than a plain generic form.

### 5.13 Footer
- Multi-column layout (stacks on mobile): 
  - Column 1: Logo + fest name + 1-line tagline + social icon row (Instagram, LinkedIn, YouTube, X placeholders).
  - Column 2: Quick Links (Home, About, Events, Team, Schedule, FAQ).
  - Column 3: Contact — email, phone, college address, embedded/linked Google Maps placeholder.
  - Column 4: "Organized by Dept. of AIML, [College Name]" + college logo placeholder.
- Bottom bar: "© 2026 AI AVLOKAN — All Rights Reserved" + "Made by [Your Name/Team]" credit line.

## 6. Additional Recommended Sections/Components (Add These Too)

Since these weren't explicitly listed but elevate the site to a genuine top-tier fest standard:

- **Loading screen**: brief animated logo/spinner on first load (max ~800ms–1s, skip on repeat visits via `sessionStorage`) to avoid an abrupt content pop-in.
- **Scroll progress bar**: thin gradient bar at the very top of the viewport indicating scroll depth.
- **Back-to-top button**: appears after scrolling past hero, smooth-scrolls to top.
- **Meta tags & SEO/social preview**: proper `<title>`, `<meta description>`, Open Graph tags, and a favicon.
- **Accessibility**: semantic HTML5 tags (`<nav>`, `<main>`, `<section>`, `<footer>`), proper heading hierarchy, `alt` text on all images, visible focus states (`:focus-visible`) styled to match the theme (glow outline, not browser default), sufficient color contrast for body text.
- **Custom scrollbar styling** (thin, gradient thumb) for a cohesive premium feel on desktop.
- **Custom cursor glow effect** on desktop (optional, subtle radial gradient following the cursor at low opacity) — must be disabled on touch devices.
- **404-safe internal linking**: ensure `events.html` and `team.html` share the exact same navbar/footer partial pattern (even though it's vanilla HTML, keep structure identical for easy copy-paste consistency).

## 7. Deliverable Expectations

- Clean, well-commented code across all files.
- Consistent BEM-ish or clear class naming convention (e.g., `.event-card`, `.event-card__poster`, `.event-card__title`).
- No inline styles or inline `onclick` — all JS behavior attached via `addEventListener` in the JS files.
- Everything above the fold on both desktop and mobile must render with **zero layout shift** and feel **instant and smooth**, matching the polish of professional fest websites like those from IITs/NITs.
- Add Dummy image links wherever images tags (like logos, events, team, and about sections).