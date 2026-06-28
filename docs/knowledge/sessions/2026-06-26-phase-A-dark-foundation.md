# Session handoff — 2026-06-26 — Phase A: dark token foundation + shell + Landing (step 8)

First execution session of step 8 (the dark visual re-architecture, `VISUAL_REARCHITECTURE.md` / D-029). Phase A is done and green. Code changed; no commit (left for Caelan).

## What we did

Confirmed the §9 Phase-A open questions with Caelan, then built the dark foundation:

- **Q&A first.** Locked the four Phase-A calls: (1) **adopt the mockup's exact dark values now** (canvas `#1B1B1B`, surface `#292929`, header `#262626`; off-white text `#F2F4F5/#C4C8CC/#9AA0A5`; teal-soft `rgb(127,224,242)` + derived gold/orange softs), verify AA in review; (2) **local woff2 + Material Icons** (not CDN); (3) header = **logo + inert search + generic "Guest" account pill** (nothing fake-functional); (4) Landing = **type-only dark hero** (Caelan overrode the "new hero illustration" rec — remove the line-art entirely, no replacement art).
- **Dark token layer** in `src/styles/globals.css` `@theme`: dark neutral ramp (`--color-dark-canvas/-surface`, `--color-dark-panel` aliased to existing `#262626` via `var()` — no duplicate value, ground-rule 6), off-white text ramp (`--color-text-on-dark/-muted/-faint`), glass tokens (`--color-glass-fill/-fill-strong/-border/-border-soft/-panel`), blur tokens (`--blur-bar` 8px / `--blur-panel` 14px), dark shadows, and **role accents** `--color-role-{technician,specialist,integrator}` each with `-soft`/`-on`/`-glow` (accent base reuses the brand token via `var()`).
- **Retired `arm-blue`.** Rewrote `categoryAccent.ts` from `CATEGORY_ACCENT_TEXT` → richer **`ROLE_ACCENT`** map (`text`/`textSoft`/`bg`/`onAccent`/`glow`), repointed its one consumer (`NodeMap`) and the two result-screen links (`RoleDetailSheet`, `CategoryResults`) to teal, deleted the token. Zero residual refs.
- **Fonts** self-hosted: copied Montserrat-700, Roboto-400/500/700, Material-Icons woff2 from the sibling `career_dashboard/public/fonts` (same kit files, keeps the repos consistent) into `public/fonts`, added 5 `@font-face` + the `.material-icons` ligature class, and ported a typed **`Icon.tsx`** wrapper (semantic name → Material ligature), mirroring the dashboard.
- **App shell.** New `src/app/AppLayout.tsx` (dark canvas + on-dark text default + sticky header over an `<Outlet/>`) wired as a parent route in `router.tsx`; new `src/components/AppHeader.tsx` (RC gold wordmark, inert `aria-hidden` search affordance, "Guest" account pill — uses `Icon`). Body bg flipped to `--color-dark-canvas`.
- **Landing** rewritten type-led dark: on-dark text, **sentence-case overline** (dropped the `uppercase` — D-029 rule 8), removed the GSAP `DrawSVG` block + `LandingSceneHint` (deleted the file + the `src/scene/` dir + the five `--color-scene-*` tokens). Gave `SegmentedControl` a dark "quiet active" treatment (glass fill, not gold). Updated the now-stale `reduced-motion.spec` comment.

## State at end of session

- Branch `narrative-v3-realign`. **Gates all green:** lint, typecheck, **49 unit**, **3 E2E** (`narrative`/`role-select`/`reduced-motion`), production build. Zero console errors on the dark Landing.
- **Graded `/design-review` (design-reviewer subagent): clean** — zero p1/p2 on `design-system-compliance` + `results-screen`. AA measured on every dark pairing (H1 15.6:1, description 10.2:1, overline 6.5:1, CTA-on-gold 8.7:1, glass composites ≥5.7:1). Full token discipline (no inline hex / no magic px / no arm-blue residue), real Montserrat/Roboto faces, reduced-motion wired. One p3 *observation* (not a defect): the segmented control's active state is deliberately quiet (intentional for a researcher control) — watch in user testing.

## Doc-sync — DONE this session (`/revise-doc` + `doc-steward`)

- **`DESIGN_SYSTEM.md`** (canonical owner): added **§3.5 Dark system** (dark ramp, off-white text, glass/blur, dark shadows, role-accent `-soft`/`-on`/`-glow`); §3.3 rewritten to the finalized **gold/teal/orange** palette + `ROLE_ACCENT`; §3.1 + §2 mark **`arm-blue` retired**; §3.4 scene tokens marked removed; §4.1/§9 fonts now self-hosted + `Icon.tsx`; §10 the Landing `DrawSVG` reveal removed; §14 out-of-scope fixed (the stale "light-mode only / no glassmorphism / four brand colors" lines now agree with the dark system).
- **`CLAUDE.md`** (repo): GSAP stack row = **no live use** (Landing DrawSVG gone; `lib/gsap.ts` a future seam); repo tree `/scene` removed; conventions dropped `/scene`; `/components` lists AppHeader + Icon; `/app` notes the AppLayout dark shell.
- **`doc-steward` reconciled the rest:** `ARCHITECTURE.md` (GSAP zero-live-use + `/src/scene` removed + self-hosted fonts in the file tree + the full role↔kit Figma-sync mapping), `PRD.md` (§5.1 Landing type-led dark, §10 finalized palette + GSAP seam), `ROADMAP.md` (Phase 0/1 scene + DrawSVG tasks marked superseded), `DATA_MODEL.md` (§17 file tree `/scene` removed; `CATEGORY_ACCENT_TEXT`→`ROLE_ACCENT` note). `CONTEXT_BRIEF.md` + root `README.md` clean. **§17 invariants unaffected** (no scoring/scene/flow change this phase).

## Not done on purpose / follow-ups

- **GSAP now has zero live consumers.** `lib/gsap.ts` still registers `DrawSVGPlugin` at app start (a future seam). Decide in a later step-8 phase whether the ambient map/constellation adopts GSAP or stays on Motion; if Motion-only wins, remove GSAP + `@gsap/react` + `DrawSVGPlugin` then. (`howler`/`@types/howler` were already trimmed in D-028; GSAP is the remaining now-unused animation dep.)
- **Transitional, expected:** `/flow` and `/results` still render their light internals on the dark canvas — they get re-skinned in **Phase B** (quiz) and **Phase C** (results). E2E stays green (visibility ignores contrast); don't read the interim as broken.
- **No commit** — left for Caelan.

## Next session — Phase B (quiz re-skin)

Read `VISUAL_REARCHITECTURE.md` (plan), this note, and D-029 first. Then **Phase B** — re-skin the **intro MC** (`MCQuestion`) as the dark question card + answer rows (auto-advance, "Question N of M", gold hover→fill with dark text), and the **7 scenes** (`SceneSortView` + `BucketSort`) as the scene context card + per-choice rating card sliding in one-at-a-time, rated into the 3 buckets (keep **That's me / Kinda me / Not me**, D-018; drag dormant). Confirm the §9 **Phase-B** questions first (slide direction/feel; the "Continue to reveal choices" two-beat; three-bucket rows vs the mockup's single-select rating). Update the narrative E2E to the new DOM; scoring unchanged.
