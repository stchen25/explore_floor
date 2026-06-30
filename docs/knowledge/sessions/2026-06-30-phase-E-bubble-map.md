# Session handoff — 2026-06-30 — Phase E: the ambient bubble map

Fifth execution session of step 8 (the dark visual re-architecture, `VISUAL_REARCHITECTURE.md` / D-029). Phase E is done and green. Code changed; **no commit** (left for Caelan, on top of the prior uncommitted Phase A–D + fidelity work).

> **Read first for context.** `STATUS.md` (the index), then `VISUAL_REARCHITECTURE.md` §6 Phase E, the prior `sessions/2026-06-30-phase-D-results-compare.md`. This note is the delta for Phase E only.

## What we did

Built the **bubble map** (screen 5 of the mockup's 5-screen results system; `design_handoff_quiz_to_results/Quiz to Results.dc.html`, the `screen: 'map'` view, re-imported via the claude_design / DesignSync MCP, project `df8d5f31…`). It replaces the stubbed `map` view on the `useResultsNav` seam.

- **Re-grounded in the north-star file first.** Pulled the canonical `Quiz to Results.dc.html` map markup, `ambientData()`, `BUBBLE_POS`, and the `qrFloat`/`qrPulse` keyframes via DesignSync (read-only), plus the README + project `CLAUDE.md` (sentence-case rule). The mockup positions **four** bubbles; we score **three** roles.

- **Three calls locked with Caelan (AskUserQuestion):** (1) **scope = Phase E only** — the constellation + job-overview (Phase F) stay parked since they need ARM's per-job/program data; (2) **layout = rank-based** — the top match is the largest bubble, high and centred, the 2nd/3rd flank below, size by match % (not the role-fixed `/select` triangle); (3) **delete the dead node-map** now that the bubble map supersedes it.

- **Pure layout** (`lib/bubbleLayout.ts`, +4 unit tests). `bubbleLayout(ranking, matchPercentages)` → `{category, rank, cx, cy, r}[]` in a fixed `BUBBLE_VIEW` (1040×600) space: per-rank slot positions + radius scaled by match % between `R_MIN`/`R_MAX`. No React. Tests: distinct cats, rank-0 largest, radius monotonic with %, in-bounds. Barrel-exported.

- **Components** (`src/screens/Results/cards/`, small files, on-dark/glass tokens): `ResultsMap` (`data-testid="results-map"`, the full-bleed orchestrator: `AmbientField` behind, the glass "Your results" intro card, `BubbleField`, a "Back to your matches" pill); `AmbientField` (`aria-hidden`, six large blurred role-tinted orbs that breathe via Motion, reduced-motion-gated); `BubbleField` (the three bubbles from `bubbleLayout`, fill `ROLE_ACCENT.bg`, name+% in `onAccent`, role `glow` drop-shadow, gentle float on an outer wrapper so it never fights the inner hover lift, `data-testid="map-bubble-${cat}"`).

- **State.** `useResultsNav` gained `fromMap: boolean` + `diveToRole(i)` (mirrors `openCompare`: runs the private `goToRole` body, sets `fromMap`, switches to `cards`). The cards control bar shows a **"Back to the map"** pill when `fromMap` (faithful to the mockup's `fromMap` chrome), otherwise the existing Skip-to-map / Explore. `ResultsExperience`'s `<main>` className is now conditional — full-bleed (`h-[calc(100dvh-nav)] overflow-hidden`, no rounded panel) for the `map` view, the constrained scroll panel for cards/compare. The `key="stub"` branch became the real `ResultsMap`.

- **Copy as data** (`data-author`). `ResultsCardsCopy` gained `backToMap` + a nested `map: {title, intro, hint, back}` block, authored in the narrative flow's `resultsCopy.cards` in the project voice (no em dashes, sentence case): "Your results" / "Each role's score comes from how often your answers leaned its way." / "Tap any role to dive into your match." / "Back to your matches". The `data-integrity` copy-walk was extended to pull the nested `map` block out (like `recommendation`).

- **Node map deleted.** `CategoryResults.tsx` / `NodeMap.tsx` / `FitNote.tsx` removed (all three were dead — only `CategoryResults` referenced the other two, and nothing referenced it but a stale `Results.tsx` comment). `FitRadar` + `RoleDetailSheet` + `lib/nodeLayout.ts` stay live in `/select`. `fanPoints` (only used by the deleted `NodeMap`) is now an unused-but-harmless barrel export.

## State at end of session

- Branch `narrative-v3-realign`. **Gates all green:** lint, typecheck, **65 unit** (+4 `bubbleLayout`; `data-integrity` 15 with the `map`-copy walk; `fixtures.ts` got the new fields), **3 E2E** (`narrative` opens the map → asserts 3 bubbles → forced dive into the top match → role-name updates + `back-to-map` present; `reduced-motion` opens the map with static bubbles + a normal-click dive; `role-select` unchanged), production build. Zero console errors. Verified live via Playwright (desktop map screenshot — rank-based layout, circular bubbles, role-tinted glows, AA labels, ambient orbs faint behind).

- **Graded `/design-review` (design-reviewer subagent): PASS on both rubrics, zero p1/p2.** Reduced-motion verified live (float + ambient pulse both pin static from a clean mount); AA computed on every label (gold→near-black ink; white-on-teal ≈ 5.6:1; white-on-orange ≈ 4.7:1; glass hint ≈ 6.4:1). Polish fixed this session:
  - [p2 fixed] idle-loop motion used a bare `ease: 'easeInOut'` → swapped to the on-token `easings.soft` (bubble float + ambient pulse).
  - [p2 fixed] off-scale fluid bubble text + the decorative glow/orb literals now carry comments marking them intentional (no token home for fluid-bubble text / multi-second ambient durations / a colored bubble glow), mirroring `AmbientField`'s existing pattern.
  - [p3 deferred → Phase G] an optional `ambient`/`breathe` duration token; the map echoing the cards' "moments" framing; full responsive (the field is desktop-first, height-driven so it fits the viewport without clipping).

## Layout note (the one fiddly bit)

The mockup map is full-bleed; cards/compare live in a `max-w-lg` rounded scroll panel. First cut had the fixed-aspect bubble field overflow the viewport bottom (the `flex-1` area wasn't constraining it). Fix: the field area is `flex min-h-0 flex-1`, and `BubbleField` is **height-driven** (`h-full` + `aspect-ratio` + `width:auto`, capped at `min(100%, --container-map)`), so it always fits the available vertical space and stays circular. Desktop-first; full responsive is Phase G.

## Docs synced

- **`VISUAL_REARCHITECTURE.md` §6 Phase E** — marked DONE with execution notes (rank-based layout, dive-to-cards + `fromMap` loop, node-map deleted, reduced-motion-gated motion, the review verdict + deferred p3s).
- **`DATA_MODEL.md` §17** — bubble-map paragraph; `useResultsNav` `fromMap`/`diveToRole`; node map deleted; `bubbleLayout.ts` added to the lib tree; test count 61 → **65**.
- **`docs/rubrics/results-screen.md`** — scope bumped to Phase C/D/E (the bubble-map criteria); the deleted `FitNote` reference corrected; application + cross-refs de-node-mapped.
- **`DESIGN_SYSTEM.md`** — a Phase E bubble-map usage note (bubble fill/onAccent/glow, ambient orbs, reduced-motion + `easings.soft`, fluid label sizing) + the `container-map-card` (640) / `container-map` (1040) tokens.
- **`STATUS.md`** — Phase E ticked DONE; gate count 65; Next = Phase F then G; session handoff listed.
- **`DECISIONS.md`** — D-029 Phase E entry (the three locked calls + the node-map deletion).
- The `doc-steward` swept `PRD`/`ARCHITECTURE`/`ROADMAP`/`CONTEXT_BRIEF`/`CLAUDE.md`/`README` for ripples.

## Not done on purpose / next

- **Recommendation copy** (Phase D's "Our take") is **signed off by Caelan (2026-06-30) — final**, no change.
- The **drag path** stays dormant. **Bridge programs** stay placeholder pending ARM. The **dev "skip to results"** control **stays until Phase G** (confirmed by Caelan 2026-06-30).
- **Next is Phase F** (constellation + job overview, data-dependent on ARM job/program content per the `Job_Program_Data_Request.md` template), then Phase G (polish/motion/responsive/a11y — folds in the deferred p3s + removing the dev control).
- **No commit** — left for Caelan.
