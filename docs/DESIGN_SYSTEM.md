# Design System

This doc is the visual source of truth for the build. It pairs with the Figma file **RC-CC — Design System** (`yGDi4yDtptKttboTYV8on7`), which holds the canonical tokens, components, and frames. Where this doc disagrees with the Figma file, the Figma file wins for tokens and component definitions; this doc wins for the rules about how things are used, the bridge to the playful layer, and code-side conventions.

---

## 1. Philosophy

The system is **kit-aligned** (`DECISIONS.md` D-024), snapped to the RC UI Kit so the quiz, the dashboard, and every RC.org prototype read as one product. We modernize RC.org's existing Material-flavored identity without rebranding: the kit brand colors are exact, the Montserrat + Roboto type system is preserved, the spacing and radius conventions are honored. The experience reads as calm, warm, and plainspoken through the kit itself, not through a separate illustrated layer.

Three principles:

- **Evolution, not rebrand.** A user who has seen RC.org should recognize this as part of the same product. The kit's ARM Gold leads, Secondary Teal is the interactive voice, and the charcoal ink ramp carries text. (Full kit values: `REALIGNMENT.md` Appendix B and `career_dashboard`'s `DESIGN_SYSTEM.md` §3.5.)
- **One system, kit-aligned.** This repo subscribes to the same kit-aligned tokens as the dashboard. The earlier "two layers" model (a Material foundation plus a Goose-game playful scene) is a **documented cut**: the scene was never built, so there is one layer, the kit. The shared `rc-design-system` package (`@rc/ui`) that formalizes the subscription is **live** (`caelar/rc-design-system`, tag `v1` — ecosystem Pass 2, D-035); this repo still authors its tokens locally, and converting it to consume the package is a stretch item (`ECOSYSTEM_RUN.md`).
- **The Make.md neons are dead.** Anywhere in earlier brainstorm material that referenced neon teal `#06ffa5`, electric blue `#00d9ff`, or magenta `#ff006e`: ignored. Those colors do not appear anywhere in this build.

## 2. Token alignment with Figma

**The `@theme` block in `src/styles/globals.css` is canonical for this repo's tokens** (Tailwind v4 is CSS-first — tokens live in `@theme`, not a `tailwind.config.ts`), and the flow is code-outward. The old RC-CC file this section once named as the token source is dead (one blank cover, zero variables — verified live via MCP, `ECOSYSTEM_PLAN.md` §5); its "Figma wins for tokens" role is retired. The kit-aligned light values live in the Design System library (`afi5Q5nFtcnT9HJ04Cbylg`); the dark extension publishes there as **additional named variables, not a second mode** (code models dark as additive tokens, D-029) in ecosystem Pass 7, and screen captures land in a new Interest Quiz file (never RC-CC, never Kayla's file). Code-outward is the *pre-publication* state: once Pass 7 publishes, this section flips to the dashboard's three-artifact precedence (Figma wins values, this doc wins usage, code wins behavior) with a seeded `docs/figma/FIGMA_MAP.md` as the binding manifest (D-038; `ECOSYSTEM_RUN.md` Pass 7). The name mapping stays mechanical:

| Figma path | Tailwind name | Notes |
|---|---|---|
| `color/brand/gold` | `arm-gold` | The "ARM gold" (kit-aligned; renamed from `arm-yellow`, D-024) |
| `color/brand/gold-soft` | `arm-gold-soft` | CTA hover tint |
| `color/brand/orange` | `arm-orange` | Secondary Orange (kit `#BF5309`, AA-safe) |
| ~~`color/brand/blue`~~ | ~~`arm-blue`~~ | Retired (D-029, step 8 Phase A); removed from `globals.css`. Specialist is now teal; see §3.1. |
| `color/brand/teal` | `arm-teal` | Secondary Teal, the interactive voice |
| `color/semantic/page-bg` | `page-bg` | |
| `color/semantic/bg` | `bg` | |
| `color/semantic/bg-soft` | `bg-soft` | |
| `color/semantic/bg-section` | `bg-section` | |
| `color/semantic/text` | `text-default` | |
| `color/semantic/text-strong` | `text-strong` | |
| `color/semantic/text-muted` | `text-muted` | |
| `color/semantic/text-subtle` | `text-subtle` | |
| `color/semantic/text-faint` | `text-faint` | |
| `color/semantic/border` | `border-default` | |
| `color/semantic/overlay` | `overlay` | |
| `color/neutral/near-black` | `near-black` | |
| `color/neutral/black` | `black` | (overrides Tailwind default) |
| `color/neutral/white` | `white` | |
| `space/N` | `space-N` | 0-7 |
| `space/control-{sm/md/lg/xl/tap}` | `control-{sm/md/lg/xl/tap}` | Control heights, 24/32/36/40/44 (D-036; §5) |
| `container/{sm/md/lg/xl/px}` | `container-{sm/md/lg/xl/px}` | |
| `section/py` | `section-py` | |
| `radius/{sm/md/full}` | `rounded-{sm/md/full}` | (overrides defaults) |
| `font/heading` | `font-heading` | Montserrat |
| `font/body` | `font-body` | Roboto |
| `size/{h1..h5,body,small}` | `text-{h1..h5,body,small}` | |
| `lh/{h1..h5,body,small}` | `leading-{h1..h5,body,small}` | |

**Dark system** (§3.5; these are the variable names the Pass-7 publication creates in the DS library):

| Figma path (to publish) | Tailwind name | Notes |
|---|---|---|
| `color/dark/{canvas/surface/panel}` | `dark-{canvas/surface/panel}` | Dark surfaces; `panel` references `near-black` |
| `color/dark/text-on-dark{/-muted/-faint}` | `text-on-dark{,-muted,-faint}` | Off-white text ramp |
| `color/dark/glass-{fill/fill-strong/border/border-soft/panel}` | `glass-*` | Glass fills + hairlines |
| `color/dark/constellation-line` | `constellation-line` | Constellation edge stroke |
| `color/role/{technician/specialist/integrator}{/-soft/-on/-glow}` | `role-*` | The 12 role-accent derivatives (§3.3/§3.5) |
| — (effect styles, not variables) | `shadow-dark-{panel/card}` | Dark elevation; publishes as effect styles like the light tiers (§7) |
| — (code-only) | `blur-{bar/panel}` | `backdrop-blur` steps; no clean Figma variable home |

Variable names align by the mapping above so Figma Variables and Tailwind tokens stay legible to each other and the code-to-canvas round-trip (see `ARCHITECTURE.md` section 7) produces clean captures. Only values Figma Variables can hold are synced (color, type, spacing, radii). Motion is code-only. There is no Code Connect.

## 3. Color

### 3.1 Brand (kit-aligned)

Snapped to the RC UI Kit, matching `career_dashboard` (D-024 here; its D-026). Values are canonical against the kit; the old archetype→accent assignments are retired (see §3.3).

| Token | Hex | Role |
|---|---|---|
| `arm-gold` | `#FFB81C` | Primary brand color, the "ARM gold." Primary CTA fill + brand signature (a fill, not a text color on white). Renamed from `arm-yellow`. |
| `arm-gold-soft` | `#FDC547` | CTA hover tint. |
| `gold-deep` | `#8A6500` | Deep gold — the nav profile-avatar gradient end (`arm-gold → gold-deep`); matches the dashboard TopNav. D-029 Phase D. |
| `arm-teal` | `#117289` | Secondary Teal — the single interactive voice: links, CTAs, the match indicator. |
| `arm-orange` | `#BF5309` | Secondary Orange — rare attention, AA-safe as text at 4.71:1 (was `#F56A00`, which failed AA at 3.02:1). |
| ~~`arm-blue`~~ | ~~`#38A5EE`~~ | **Retired (D-029, step 8 Phase A).** Was the specialist accent + legacy link voice; failed AA as text (2.7:1). The token is removed from `globals.css`; specialist is now teal and the result-screen links read `arm-teal`. |

### 3.2 Semantic (light mode foundation)

Inherited verbatim from RC-CC. The product is light-mode by default.

| Token | Hex |
|---|---|
| `page-bg` | `#F4F4F4` |
| `bg` | `#FFFFFF` |
| `bg-soft` | `#FAFAFA` |
| `bg-section` | `#F5F5F5` |
| `text-default` | `#262626` (charcoal; kit Neutral Dark — was navy-slate `#2D3A4A`) |
| `text-strong` | `#000000DE` (87% black) |
| `text-muted` | `#00000099` (60% black) |
| `text-subtle` | `#595959` |
| `text-faint` | `#757575` |
| `border-default` | `#E0E0E0` (kit Neutral Border; opaque — was 12% black, visually ~same on white) |
| `overlay` | `#262626F2` |
| `near-black` | `#262626` |

### 3.3 Role accents (live)

The live narrative flow scores ARM's three RC.org roles, and each carries an accent. **Never invent a new color for a role** and never hardcode a hex per screen; the mapping lives in one place, `src/components/categoryAccent.ts` (`ROLE_ACCENT`), so a screen reads the token, not a literal. `ROLE_ACCENT` exposes five class/value fields per role: `text` (the saturated accent), `textSoft` (the legible soft tint for large role names on dark), `bg` (accent as a fill), `onAccent` (text drawn on the fill), and `glow` (a raw value for bubbles/nodes). The underlying tokens are the `--color-role-*` set in §3.5.

| Role | Accent | Token |
|---|---|---|
| Technician (entry) | gold | `arm-gold` |
| Specialist (mid) | teal | `arm-teal` |
| Integrator (planning) | orange | `arm-orange` |

The accent shows up in the match indicator and the centered-role chrome (narrative node map). _(It also drove the category bars on the cut exam dashboard.)_

> **Finalized (D-029, step 8 Phase A).** The role palette is now kit-only **gold / teal / orange**, mirroring the Claude Design mockup (Operate→gold, Program→teal, Plan→orange). This retires `arm-blue` (it failed AA as text) and drops the mockup's green, satisfying the realignment's "restrained, teal-led role palette" target with no new hues. Because saturated brand colors are illegible as large text on the dark canvas, each role also carries a `-soft` tint (role names), an `-on` color (text on the accent fill), and a `-glow` (results bubbles / constellation nodes); see §3.5. _(Phase 5, D-028, collapsed the study's four categories to these three roles; the entry Technician inherits the old Operate's gold.)_

**Documented cut — classic archetype accents.** The dormant Classic flow tied three archetypes to brand colors (Builder→`arm-orange`, Innovator→`arm-blue`, Architect→`arm-teal`), driving the robot color scheme (`DATA_MODEL.md` §7, `colorSchemes.ts`). Parked with the rest of the classic pipeline.

`arm-gold` is the global product signature (the "this is RC.org" gold) and the primary CTA fill.

### 3.4 Playful layer palette additions — documented cut

> **Removed (D-029, step 8 Phase A).** The five `scene-*` tokens and their only consumer, `LandingSceneHint`, are deleted (`src/scene/` is gone). The Landing was redesigned as a type-led dark hero with no scene illustration, so the playful-scene palette is fully retired. The table below is kept for the record only.

For the assembly-line scene specifically, we add a few muted, warm fills that work with the Goose-game aesthetic. These are scene-specific and live under a `scene/` token namespace so they don't bleed into the foundation surfaces.

| Token | Hex (proposed) | Role |
|---|---|---|
| `scene-paper` | `#F5EFE3` | Soft cream background for the conveyor scene. Less clinical than `page-bg`. |
| `scene-paper-warm` | `#EFE4CE` | Slightly warmer tone for layering. |
| `scene-line` | `#2D3A4A` | Same as `text-default`. The Goose-style line color for SVG outlines. |
| `scene-line-soft` | `#5C6975` | Lighter outline for de-emphasized scene parts. |
| `scene-shadow` | `#2D3A4A1A` | 10% slate for soft ground shadows. |

These are starter values. Refine in Figma's `scene/` collection once we begin Phase 2. Adjust here in tandem.

### 3.5 Dark system (live — step 8, D-029)

The quiz renders **dark-only** (no theme toggle); the light semantic tokens in §3.2 stay defined but unused by the quiz. The dark layer lives in the `@theme` block of `src/styles/globals.css`. The neutral ramp is **additive but never duplicates an existing token**: it reuses `near-black` / `text-subtle` / `text-faint` / `white` / `black` already defined, and adds only the two genuinely-new ARM-site greys plus an off-white text ramp.

**Dark neutral ramp** (elevation: canvas < surface < panel):

| Token | Value | Use |
|---|---|---|
| `dark-canvas` | `#1B1B1B` (new) | Page background. |
| `dark-surface` | `#292929` (new) | Elevated cards / answer-row base. |
| `dark-panel` | `= near-black #262626` (reused via `var()`) | Deep panel / the app-header. |

**Off-white text ramp on dark** (new; adopted from the mockup, AA-verified on `#1B1B1B`):

| Token | Value | Use |
|---|---|---|
| `text-on-dark` | `#F2F4F5` | Primary text. |
| `text-on-dark-muted` | `#C4C8CC` | Secondary text. |
| `text-on-dark-faint` | `#9AA0A5` | Tertiary / captions. |

**Glass + blur** (keeps a four-grey palette from going flat):

| Token | Value | Use |
|---|---|---|
| `glass-fill` / `glass-fill-strong` | `rgb(255 255 255 / 0.045)` / `0.06` | Card / answer-row / active-segment fills. |
| `glass-border` / `glass-border-soft` | `rgb(255 255 255 / 0.10)` / `0.07` | Hairline borders. |
| `glass-panel` | `rgb(38 38 38 / 0.85)` | Panel-tinted glass (the app-header). |
| `blur-bar` / `blur-panel` | `8px` / `14px` | `backdrop-blur` for sticky bars / map + results cards. |

**Dark elevation shadows:** `shadow-dark-panel` (`0 20px 70px rgb(0 0 0 / 0.35)`), `shadow-dark-card` (`0 10px 40px rgb(0 0 0 / 0.28)`).

**Role accents on dark.** Each of the three roles (§3.3) carries four derivatives. The base reuses the brand token via `var()`; `soft` / `on` / `glow` are genuinely-new values:

| Role | `--color-role-*` | `-soft` | `-on` | `-glow` |
|---|---|---|---|---|
| Technician | `= arm-gold #FFB81C` | `#FFD27A` | `= near-black` | `rgb(255 184 28 / 0.3)` |
| Specialist | `= arm-teal #117289` | `#7FE0F2` | `white` | `rgb(127 224 242 / 0.3)` |
| Integrator | `= arm-orange #BF5309` | `#F2965A` | `white` | `rgb(242 150 90 / 0.3)` |

Consumed through `ROLE_ACCENT` (§3.3), never as literals.

**Results role-cards usage (D-029 Phase C).** On the results role cards the role name (H2) and the match % are **neutral on-dark** (`text-on-dark`), not accent-colored; the role accent appears in the **active signal bar** (`bg` derivative) — faithful to the mockup. The `-soft` name tint is therefore reserved for later results screens (compare/map), not the cards hero. Inactive signal bars use the neutral `text-subtle` fill (an intentional subdued treatment; the bar's value is also printed as text, so the read never depends on bar contrast alone — graphical-contrast polish is a Phase G a11y item).

**Results bubble-map usage (D-029 Phase E).** The ambient bubble map is where the role `glow` finally earns its keep. Each role bubble fills with `ROLE_ACCENT[cat].bg`, names the role + match % in `onAccent` (so the gold bubble carries dark ink, teal/orange carry white — all AA), and casts a soft role-tinted drop glow built from `glow` (the colored glow has no `--shadow-dark-*` equivalent; only its offset/blur are literals). The decorative `AmbientField` orbs use the base `--color-role-*` tokens at low opacity behind a heavy blur. Bubble size encodes match % (pure `lib/bubbleLayout`, rank-based); the float + ambient pulse are reduced-motion-gated and use `easings.soft` (the long idle-loop durations are intentionally off the UI motion scale, which has no multi-second home). Bubble label sizing is fluid (`clamp()`, anchored toward the type scale) since the text scales with the viewport-sized bubble.

**Results constellation usage (D-029 Phase F).** The job constellation reuses the bubble-map accent language. The role **center** fills with `ROLE_ACCENT[cat].bg` + `onAccent` and casts the same colored `glow` (offset/blur are the documented decorative literals; center label sizing is fluid `clamp()` like the bubbles). **Job nodes** are glass (`glass-fill-strong` + `glass-border`); the **inactive star glyph uses `textSoft`** (not the saturated `text`) so it clears the 3:1 graphical-contrast bar on the glass fill — the saturated teal `#117289` was only 2.64:1. An **active** node (the open job) fills with `bg`/`onAccent` + `glow`; the others dim via opacity. Dashed center→node edges stroke `--color-text-on-dark-faint` at low opacity (neutral, like the mockup); node labels sit below each node (`text-on-dark-muted`, the active one in `textSoft`). The `AmbientField` is reused behind the field. Node float + entrance + hover are reduced-motion-gated. The `TrajectoryViz` ladder (job-overview "How you fit" tab) lights the current role's rung with its accent and leaves the others neutral.

## 4. Typography

### 4.1 Type pairing (locked)

- **Headings:** Montserrat. Bold for all H1–H5 by default.
- **Body:** Roboto. Regular / Medium / Bold available.
- **Icon font:** Material Icons.

All three are **self-hosted** as local `woff2` in `/public/fonts` (Montserrat 700; Roboto 400/500/700; Material Icons), declared via `@font-face` in `globals.css` and copied from the kit-aligned `career_dashboard` set (D-029, step 8 Phase A). Previously only system fallbacks loaded. No CDN dependency.

### 4.2 Type scale

From the Figma `Typography` collection, verbatim:

| Style | Font | Weight | Size | Line height |
|---|---|---|---|---|
| `Heading/H1` | Montserrat | Bold | 56 | 64 |
| `Heading/H2` | Montserrat | Bold | 40 | 48 |
| `Heading/H3` | Montserrat | Bold | 32 | 38 |
| `Heading/H4` | Montserrat | Bold | 24 | 32 |
| `Heading/H5` | Montserrat | Bold | 20 | 28 |
| `Body/Default` | Roboto | Regular | 16 | 22 |
| `Body/Strong` | Roboto | Bold | 16 | 22 |
| `Body/Medium` | Roboto | Medium | 16 | 22 |
| `Label/Small` | Roboto | Regular | 14 | 22 |
| `Label/Small-Medium` | Roboto | Medium | 14 | 22 |
| `Label/Overline` | Roboto | Medium | 14 | 22, 1px tracking, UPPERCASE |
| `Display/Quote-Mark` | Montserrat | Regular | 96 | 96 |
| `Display/Quote` | Montserrat | Bold | 24 | 34 |
| `Display/Event-Day` | Montserrat | Bold | 32 | 38 |

### 4.3 Tailwind class names

```ts
fontFamily: {
  heading: ['Montserrat', 'system-ui', 'sans-serif'],
  body: ['Roboto', 'system-ui', 'sans-serif'],
}
fontSize: {
  h1:   ['56px', { lineHeight: '64px', fontWeight: '700' }],
  h2:   ['40px', { lineHeight: '48px', fontWeight: '700' }],
  h3:   ['32px', { lineHeight: '38px', fontWeight: '700' }],
  h4:   ['24px', { lineHeight: '32px', fontWeight: '700' }],
  h5:   ['20px', { lineHeight: '28px', fontWeight: '700' }],
  body: ['16px', { lineHeight: '22px' }],
  small: ['14px', { lineHeight: '22px' }],
}
```

### 4.4 Usage

- Hero / landing headline: H1.
- Screen titles: H2.
- Section titles: H3 or H4.
- Role / category titles on results: H4.
- Scene choice labels (and the cut exam's statement labels): Body/Medium (the kid reads it easily, doesn't shout).
- Match percentage on results: H2 in the role accent color (`categoryAccent.ts`).
- Overlines (`Label/Overline`) for short labels, rendered **sentence case** (D-029 rule 8 — no uppercase eyebrows or stat labels; the Figma style's `UPPERCASE` transform is dropped in the dark system). _(The classic "ROUND 2 OF 4" round indicator is a documented-cut use.)_

### 4.5 Playful layer additions

For occasional character (the landing CTA, friendly result framing), we leave room for a single playful display font added later. Candidates: a slightly-irregular geometric like **Recoleta** or **Fraunces**, used at small scale for accent words only. Treat this as a Phase 3 polish, not a Phase 0 dependency. The build works fully with just Montserrat + Roboto.

## 5. Spacing

Inherited verbatim. The 0-indexed scale where `space/0 = 4px` is deliberate; it gives a meaningful "tight but visible" gap rather than zero.

| Token | Value (px) |
|---|---|
| `space-0` | 4 |
| `space-1` | 8 |
| `space-2` | 12 |
| `space-3` | 16 |
| `space-4` | 24 |
| `space-5` | 32 |
| `space-6` | 48 |
| `space-7` | 64 |

### Control heights (D-036)

Intentional interactive-element heights, distinct from the space scale even where values coincide. The ladder is the dashboard's (`career_dashboard` / `@rc/ui`: `control-sm/md/lg`) adopted verbatim, plus two steps minted here on the same ladder (`xl`, `tap` — `@rc/ui` v1.1 candidates):

| Token | Value (px) | Use here |
|---|---|---|
| `control-sm` | 24 | Reserved (dashboard ladder; zero uses yet) |
| `control-md` | 32 | Reserved (dashboard ladder; zero uses yet) |
| `control-lg` | 36 | Results pill buttons (compare / map / back / set-target) |
| `control-xl` | 40 | The nav search field |
| `control-tap` | 44 | Minimum comfortable tap target — the results hero's prev/next arrows (`size-control-tap`) |

The remaining numeric Tailwind steps in components are **ratified as raw, non-control sizing** (D-036): the nav logo image (`h-10`), the profile-pill avatar (`h-7 w-7`), and meter/dot/tile geometry (signal bars, menu dots, program-logo tiles, min-widths). They're layout and decoration, not interactive heights; don't token them.

### Container widths

| Token | Value |
|---|---|
| `container-sm` | 564 |
| `container-md` | 912 |
| `container-lg` | 1248 |
| `container-xl` | 1500 |
| `container-results` | 760 (the results role-cards reading column; D-029 Phase C) |
| `container-map-card` | 640 (the glass "your results" intro card on the bubble map; D-029 Phase E) |
| `container-map` | 1040 (the bubble field on the results map; matches `BUBBLE_VIEW.width`; D-029 Phase E) |
| `container-constellation` | 1040 (the job-constellation field; matches `CONSTELLATION_VIEW.width`; D-029 Phase F) |
| `container-job-panel` | 404 (the glass job side-panel beside the constellation; D-029 Phase F) |
| `container-px` | 16 (horizontal padding) |
| `section-py` | 48 (vertical section padding) |
| `nav` | 60 (app top-nav height; the results sheet sizes off it — D-029 Phase D) |

The experience targets desktop primarily. Use `container-lg` (1248) as the typical layout max-width; the live flows and results panel sit within it. The results role cards center a narrower **`container-results`** (760) reading column inside the `container-lg` panel, so the hero's prev/next arrows sit in the side gutter (D-029 Phase C). _(The wider `container-xl` (1500) was sized for the documented-cut conveyor scene.)_

**App top nav (D-029 Phase D).** A 60px (`--spacing-nav`) solid `near-black` bar shared across routes — the real RC `rc_logo_white_text.png` wordmark, a centered scoped search (placeholder chrome), and a gradient-gold profile pill (`arm-gold → gold-deep`, no auth). Ported from the dashboard repo's `TopNav`; the dashboard's secondary page-nav is intentionally not carried over. The results `<main>` is a viewport-height scroll container sized `calc(100dvh − nav − space-5)` so its sticky glass header pins a constant `space-5` gap below the nav and the sheet bottom is revealed (with a matching gap) only at the end of scroll.

## 6. Radius

| Token | Value (px) | Use |
|---|---|---|
| `rounded-sm` | 6 | Inputs, small chips, secondary surfaces (kit Refined; was 4) |
| `rounded-md` | 8 | Buttons, answer + rating rows, small surfaces |
| `rounded-lg` | 16 | Dark quiz/result cards — question + scene-context + rating surfaces (D-029 Phase B; mockup 14–16) |
| `rounded-full` | 9999 | Pills, badges, the node-map nodes |

Minimal by design. `rounded-lg` is the one dark-system addition (the larger card radius the mockup uses); don't add others.

## 7. Shadow / elevation

Kit soft tiers (DEF-013 R1 — these replaced the old RC-CC Material triple-stacks; the code moved in the realignment and this section now matches it):

| Token | Value | Use |
|---|---|---|
| `shadow-card` | `0 1px 2px rgb(38 38 38 / 0.06)` | Light diffuse resting lift |
| `shadow-elev-2` | `0 1px 2px rgb(38 38 38 / 0.05)`, `0 4px 14px rgb(38 38 38 / 0.07)` | Clear hover lift, raised dialogs |
| `shadow-dark-panel` | `0 20px 70px rgb(0 0 0 / 0.35)` | Dark: the results sheet/panel (§3.5) |
| `shadow-dark-card` | `0 10px 40px rgb(0 0 0 / 0.28)` | Dark: floating cards on the dark canvas (§3.5) |

Use sparingly. The dark quiz leans on glass fills and hairline borders (§3.5) rather than shadow stacks; the role-tinted bubble/constellation glows are decorative one-offs built from `-glow` tokens, not elevation.

## 8. Motion

Motion tokens live in code, not in Figma. Figma Variables can't model easing curves or springs, so these are defined once in `/src/lib/motion.ts`. The easing curves are mirrored into the `@theme` block in `src/styles/globals.css` as `ease-soft` / `ease-snap` utilities; durations stay in code only (Tailwind v4 has no first-class duration token namespace). Both animation engines (Motion and GSAP) read these same values so the feel is consistent across the two. See `ARCHITECTURE.md` section 1.

| Token | Value | Use |
|---|---|---|
| `duration-instant` | 100ms | Hover state changes, taps |
| `duration-snap` | 200ms | A card settling into a bucket, segment switches |
| `duration-glide` | 400ms | Flow-step and card transitions |
| `duration-pour` | 700ms | Node-map swap, slower content reflow |
| `duration-reveal` | 1000ms | Result entrance, the Landing reveal |

Easing curves (also new):

| Token | Curve | Use |
|---|---|---|
| `ease-soft` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Most UI |
| `ease-snap` | `cubic-bezier(0.5, 0, 0.1, 1.5)` | A card settling into a bucket, the node-map swap (slight overshoot) |
| `ease-physical` | spring `{ stiffness: 200, damping: 20 }` | Motion physical springs for UI; GSAP scene uses its own eases/`ease-snap`. |

### Motion principles

- Nothing instant unless it's a tap. Even fast things get 100ms.
- Spring physics for gesture motion (the bucket-sort drag); tweens for UI and flow-step transitions.
- Respect `prefers-reduced-motion`. Motion-sensitive users get fast crossfades instead of physical motion.

## 9. Iconography

- Use **Material Icons** as defined in the Figma file (the `font/icon` token). Self-hosted as local `woff2` (§4.1) and consumed through a typed wrapper, `src/components/Icon.tsx` (a design-semantic name maps to a Material ligature in one place), mirroring `career_dashboard` (D-029, step 8 Phase A).
- Component set in Figma: `Icon/Material` with size variants 16/18/24/32/40/56/72.
- For the playful layer, the assembly-line scene uses bespoke SVG illustrations, not Material Icons. The two are kept distinct: Material Icons in UI chrome, custom SVG in the scene.

## 10. The playful layer — documented cut

> **Parked.** The illustrated Goose-game scene (conveyor, robotic arm, robot) was never built. The live experience differentiates through the narrative content and the kit-aligned dark results screens, not an illustrated scene layer. The Landing `DrawSVG` reveal (the last surviving piece of "playful" motion) was removed in step 8 Phase A when the Landing went type-led dark, so GSAP now has **no live animation** (it stays registered in `lib/gsap.ts` as a future seam). This section is the original direction, kept for the record. Its retired evaluation rubric (`goose-game-aesthetic.md`) is replaced by the results-screen rubric.

This is what makes the experience feel different from a typical RC.org screen.

### 10.1 Aesthetic anchor

Untitled Goose Game. Specifically:

- Confident, slightly imperfect outlines. Not super tight vector. Stroke widths around 1.5–2.5px on a 1500px canvas. Slight stroke variation gives "drawn" quality.
- Warm, muted fills. The `scene-paper` background, soft mid-tones, the brand accents at slightly desaturated tints when they appear in the scene.
- Negative space is used. Backgrounds aren't decorated to death.
- Characters and objects have a small "weight" to them via subtle ground shadows (`scene-shadow`) rather than hard outlines pinning them to a grid.

### 10.2 What the playful layer is NOT

- Not childish. The user is 16-18, not 9. Avoid cartoon overload, no smiley faces on robots unless asked.
- Not video-game-y in the saturated-neon sense. The Make.md neons stay dead.
- Not corporate. The foundation handles that; the scene leans warm.

### 10.3 Specific applications

- **Landing scene**: a partial view of the assembly-line scene visible behind the CTA card. Stylized and soft, with a gentle entrance reveal (GSAP `DrawSVG` linework drawing itself in) introduced in Phase 1 as an early, low-risk test of the scene-animation approach. Hints at what's coming.
- **Conveyor scene**: the central artifact. Goose-style line + fill, slight motion as ambient state (small ambient idle on the arm, the conveyor surface texture not moving fast enough to be distracting). Spatial model (in 2D, per `DECISIONS.md` D-014): the belt runs across the middle carrying interest-labeled parts; **two bins sit in front of it (downscreen)** — "That's me" / "Not my thing"; the **robot stands behind/above the belt**; a robot arm reaches from the keep bin up to the robot to assemble each kept part (a second arm or a trash chute clears the pass bin).
- **Robot**: stylized, friendly without being twee. Limbs and parts have visible "joints" (small circles), pieces look attached rather than seamlessly merged. The robot reads as built, not 3D-rendered. It is assembled by the arm lifting kept parts from the "That's me" bin, so each part visibly *arrives* rather than fading in.
- **Results pedestal**: a soft circular plinth, slight shadow, the robot standing on it. The role cards behind it have the same warm fill quality.

## 11. Component categories

The Figma file organizes components into Foundation and Composite categories:

**Foundation:**
- Icons (Material set, size variants 16-72)
- Buttons (Primary, Stroked, Text, Icon, Nav-Link) each with state/size variants
- Links (Text, Chevron) with state/context variants
- Disclosure & Tabs (Accordion, Tab/Item)
- Media & Interactive
- Cards
- Forms
- Layout

**Composite:**
- Banners
- Header
- Footer
- Dialog

For this build, we reach into the foundation for buttons, links, cards, forms, layout. We do **not** use the existing Header/Footer/Banner composites because the experience is intentionally chromeless (no site header on the gamified flow) but the build does need basic interactive elements that match RC-CC's existing patterns.

### Variant conventions

Figma components use property names like `State`, `Size`, `Context`, `Style`. These map cleanly to React prop names:

```tsx
// Button/Primary: State=default|hover, Size=md|lg
<Button.Primary state="default" size="md" />

// Link/Chevron: State=default|hover, Style=default|inline
<LinkChevron state="default" style="default" />
```

Figma variant names map to React prop values by the same convention (`Primary` to `variant="primary"`). Keep them aligned by hand; there's no Code Connect enforcing it.

## 12. Component additions for this build

Components specific to this experience. Each is named identically in code and (when captured) in Figma, by convention, so the code-to-canvas round-trip stays legible.

**Live (the narrative flow):**
- `SegmentedControl` — the researcher-facing flow switcher on Landing (live segments Narrative / Select)
- `BucketSort` — the shared one-card-at-a-time sort into That's me / Kinda me / Not me (used by the narrative scenes)
- The flow-step views — `MCQuestion`, `SceneSortView` under the `FlowRunner`
- The narrative node map (`Results/category/`) — the centered top-match node, the behind-nodes, the job-title branches
- `RoleDetailSheet` — the shared role sheet (RC.org role content + three-axis fit radar)
- `FitNote` — the always-on education/pay fit line (D-020)

**Documented cut (deleted Phase 4, D-027):** the exam dashboard (`Results/exam/` — `ExamResults`, the four `CategoryBars`, `ScoreBreakdown`, `YourRoles`) and `StatementSortView`, deleted with the cut Exam flow; and the conveyor scene (`ConveyorBelt`, `ConveyorItem`, `RoboticArm`, `SortBin`, `Robot`, `RobotPart`, `Pedestal`, the classic `RoleCard` / `ProgramList` / `MatchIndicator` / `RoundIndicator`, and `SoundToggle`), parked with the classic pipeline and never authored as Figma components. Recoverable at git tag `archive/pre-narrative-only`.

Capture the live components into Figma at settled checkpoints (`/capture-figma`), grouped under a `Quiz Experience` page, named to match the React components.

## 13. Bridging the two layers — documented cut

> The two-layer model (a Material foundation plus a Goose-game illustrated scene) assumed a scene that was never built, so there is one layer now: the kit. The durable discipline from this section survives and applies to the whole build:

- **Type is constant.** Montserrat headings, Roboto body. Always.
- **Brand color usage stays consistent.** ARM Gold is the brand signature and CTA fill; the three role accents come from `categoryAccent.ts` (§3.3). No invented colors.
- **Surfaces use kit conventions** (white cards on light surface, kit radii, the two soft shadow tiers, used sparingly).

The retired two-layer rules (foundation-vs-scene namespacing, scene-on-top-of-foundation transitions) are parked with the conveyor vision.

## 14. What is explicitly out of scope

- A light/dark **toggle**. As of step 8 Phase A (D-029) the quiz renders **dark-only** (§3.5); the light semantic tokens (§3.2) stay defined but unused, and there is no theme switch. Don't build a toggle or per-mode variants in the Figma collections.
- New brand colors. The three live ARM brand colors (gold, teal, orange; `arm-blue` retired, D-029), the semantic/neutral set, and the §3.5 dark system are complete. Don't add new brand hues.
- New typefaces. Montserrat + Roboto are it for now. The Phase 3 display-font addition is optional and small-scoped.
- A third animation paradigm. The model is two engines, defined in `ARCHITECTURE.md` section 1: Motion for state-driven UI, GSAP (free, with MorphSVG/DrawSVG/MotionPath) for scene choreography and the cinematic moments. No anime.js (overlaps GSAP) and no Lottie (passive, can't drive the interactive robot). Rive is a documented future exploration for the robot only, not part of this build.
- Heavy glassmorphism. The dark system (§3.5) does use restrained `glass-*` fills/borders and `backdrop-blur` to keep the four-grey dark palette from going flat, but that's a light touch, not the frosted-panel aesthetic earlier brainstorm material proposed. Don't push past the §3.5 tokens.

## 15. Source-of-truth precedence

When the team disagrees on a token or component:

1. Figma file is the source for values (colors, sizes, spacing, type, components themselves).
2. This doc is the source for usage rules (which token in which context, which archetype gets which accent, what the playful layer is and isn't).
3. Code is the source for behavior (interaction, state, animation specifics).

If a conflict appears between Figma and this doc on a value, fix the doc; on a usage rule, fix the Figma. They should always agree.
