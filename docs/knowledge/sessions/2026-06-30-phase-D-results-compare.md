# Session handoff — 2026-06-30 — Phase D: the dark results compare screen

Fourth execution session of step 8 (the dark visual re-architecture, `VISUAL_REARCHITECTURE.md` / D-029). Phase D is done and green. Code changed; **no commit** (left for Caelan, on top of the prior uncommitted Phase A–C + fidelity work).

> **Read first for context.** `STATUS.md` (the index), then `VISUAL_REARCHITECTURE.md` §6 Phase D, the prior `sessions/2026-06-29-phase-C-results-role-cards.md`. This note is the delta for Phase D only.

## What we did

Built the **Compare** screen (screen 4 of the mockup's 5-screen results system; `design_handoff_quiz_to_results/Quiz to Results.dc.html`, imported via the claude_design MCP, project `df8d5f31…`). It was the stubbed Compare control on the `useResultsNav` seam; it now opens a real side-by-side.

- **Re-grounded in the north-star file first.** Read the canonical compare block line-by-line and found a **divergence vs the plan §6 / handoff README**: the *rendered* compare screen is just **"Back to {role}" + "Compare with {role}" dropdown + two role columns** — there is **no swap button and no recommendation line**. Those helpers (`swapCompare`, `qcRec`, `pickPills`, `comparePickRoles`) only fed the **removed "compare-pick" chooser** the README itself says not to build. Surfaced this to Caelan.

- **Two calls locked with Caelan (AskUserQuestion):** (1) keep **"no swap"** but **add a recommendation line** as a value-add for the deciding "maybe" user; (2) the recommendation **foregrounds the lower barrier when close** (not the mockup's higher-%-only `qcRec`) — lead with fit, but when the two roles are close, frame the lower-`educationLevel` role as the "start here" option and name the role to grow toward. Matches the product thesis (entry-as-a-rung). (3) Responsive = desktop-first, columns stack under `md` (full polish → Phase G).

- **Recommendation engine** (`lib/compareRecommendation.ts`, pure + 6 unit tests). Returns `{ leaned, other, close, lowerBarrier, growToward, variant }`. `leaned` = higher match % (ties → left); `close` = gap ≤ `COMPARE_CLOSE_THRESHOLD` (8 pts); `lowerBarrier` by `educationLevel` (Technician 0 < Specialist/Integrator 2; equal → null); `variant` ∈ `clearWinner` / `closeLowerBarrier` / `closeEqualBarrier`. The wording is templated copy, not in the lib.

- **Copy as data** (`data-author`). `ResultsCardsCopy` gained `backToRole`, `compareWithLabel`, `recommendationLabel` ("Our take"), and a `recommendation: { clearWinner, closeLowerBarrier, closeEqualBarrier }` block, authored in the narrative flow's `resultsCopy.cards` in the project voice (no em dashes). New `CompareRecommendationCopy` type. **Caelan to sign off on the recommendation wording** (drafts in `narrativeFlow.ts` + `VISUAL_REARCHITECTURE.md` §6).

- **State.** `useResultsNav` extended with `compareWith` (defaults to the role after the current, never == roleIndex), `setCompareWith` (guards self/out-of-range), `openCompare` (sets a sensible default target + resets expand + scroll-top), and per-column `compareExpanded: [boolean, boolean]` + `toggleCompareSide`. The cards `expanded` stays separate.

- **Components** (`src/screens/Results/cards/`, small files): `CompareView` (orchestrator: control bar with the back pill + `CompareTargetMenu`, the two-column layout with a `md:` divider, the "Our take" recommendation card; computes the full `categoryContributions` map + `ScreenerProfile` once and feeds both columns), `CompareColumn` (a role's overview-first-page — hero with neutral name/% + per-role `SignalBars` + inline `WhyYouMatched`, then description, salary/education `StatBox`es, `{heading,text}` duties; **no path-up callout**), `CompareTargetMenu` (the dropdown — accent dot + name + pct + a **per-row accent** check; excludes the left role; closes on select/outside/Escape; Motion-owned, reduced-motion-aware). `ResultsExperience` now renders `CompareView` for the `compare` view (map stays the Phase E stub); the Compare control calls `nav.openCompare`. Reused `SignalBars` / `WhyYouMatched` / `StatBox` / `ResultsPanel` / `ROLE_ACCENT` / `categoryContributions` / `screenerFit` unchanged. No scoring changes.

## State at end of session

- Branch `narrative-v3-realign`. **Gates all green:** lint, typecheck, **61 unit** (+6 `compareRecommendation`; `data-integrity` copy check updated to walk the nested `recommendation` object; the shared `fixtures.ts` `ResultsCardsCopy` got the new fields), **3 E2E** (`narrative` rewritten from the compare stub to real Phase D coverage: open → two columns + recommendation → switch target via dropdown → expand one column independently → back; `role-select`/`reduced-motion` unchanged), production build. Zero console errors. Verified live via Playwright (desktop / dropdown-open / one-column-expanded / mobile-stack screenshots, all faithful).

- **Graded `/design-review` (design-reviewer subagent): PASS on both rubrics.**
  - [p2 fixed] **role-accent-mapping** — the dropdown's selected check was hardcoded `text-role-specialist-soft` (teal) for every row; now binds to the row's own accent (`ROLE_ACCENT[opt.category].textSoft`).
  - [p2 fixed] **no-magic-px** — `top-[calc(100%+8px)]` → `top-full mt-space-1` (tokenized).
  - [p3 deferred → Phase F/G] **somewhere-to-go** — compare exits only via the top Back pill + dropdown (no outbound next-step like the cards screen's Explore/programs); revisit when programs/next-steps land (Phase F).
  - [p3 deferred → Phase F/G] **technician-is-a-rung on compare** — `CompareColumn` omits the path-up callout by design; a Technician-leaning `clearWinner` compare shows no upward path here (low-impact: Technician is the lowest match today).
  - Confirmed holding: tokens-only, AA on every dark pairing (incl. the `dark-surface` dropdown + glass rows), accent only in active bars (neutral names/%), sentence-case labels, per-column independent expand, reduced-motion neutralizes the dropdown + why-expand.

## Docs synced

- **`VISUAL_REARCHITECTURE.md` §6 Phase D** — marked DONE with the execution notes (the no-swap/recommendation divergence, the lower-barrier rule, the deferred p3s).
- **`DATA_MODEL.md` §17** — added the compare view paragraph + `useResultsNav` compare fields; added `compareRecommendation.ts` to the lib tree; test count 49 → **61**; "compare built (Phase D), map stubbed (Phase E)".
- **`docs/rubrics/results-screen.md`** — scope note extended to Phase C/D (compare added; judge cards + compare).

## Post-review iteration (same day, Caelan live feedback)

After Phase D landed, a round of live polish on the results shell (all gates re-green: lint, typecheck, **61 unit**, **3 E2E**, build):

- **Real top nav.** Replaced the Phase-A placeholder `AppHeader` with the **finalized RC TopNav ported from the dashboard repo** (`career_dashboard/src/shell/TopNav` + `ProfileMenu`): a 60px solid `bg-near-black` bar — the real `rc_logo_white_text.png` wordmark (copied into `/public`), a centered scoped search (placeholder chrome), and a gradient-gold profile pill ("Guest", no auth). New tokens: `--spacing-nav` (60px) and `--color-gold-deep` (#8a6500, the avatar gradient end); new `sliders` Icon (→ `tune`). "Just the top nav," not the dashboard's secondary page-nav. (Caelan first asked for it, then "ignore… I like the glass effect", then reversed back to the real nav — it's in.)
- **Results sheet scroll model.** The results `<main>` is now a **viewport-height scroll container** (`h: 100dvh − nav − top-gap`, `mt` = top gap, `rounded-t-lg overflow-y-auto`, `shadow-dark-panel`). `ResultsPanel` is split into a **sticky glass header** (`top-0`, the visible sheet top — pinned a constant gap below the nav AT ALL TIMES) and a **scrolling body** (rounded-b). Content scrolls UP UNDER the glass header (the blur effect Caelan wanted); the body fills to the viewport bottom while there's more, and only at the end scrolls up to reveal the rounded bottom + a bottom gap matching the top, no further. **Corner fix:** the scroll container's `rounded-t-lg overflow` clips the body so it can't fill the glass header's rounded-corner cutouts (the bug where same-dark body made the corners read square when scrolled). Several iterations to converge on this (internal-scroll ↔ page-scroll ↔ split-sticky) — the split-sticky-in-a-rounded-scroll-container is the keeper.
- **Compare "Our take" moved to the top** of the compare view (above the columns) so it isn't missed at the bottom.
- **Compare dropdown trigger** gained the role **accent dot** before the target name; the selected-row check now uses the **row's own accent** (was hardcoded teal — also the Phase-D p2 fix).
- **Salary standardized to the national median** across the results cards + compare (`RoleDetail.salaryMedian`, e.g. "National median $105,000/yr") so the stat boxes are a consistent height (Technician has no range); the fuller `salary` range stays for the `/select` sheet.
- **Retake copy** "Start over" → **"Retake quiz"** (`resultsCopy.retake`).
- **Dev shortcut.** A **dev-only** "Dev: skip to results" control on Landing (`import.meta.env.DEV`) calls a new `devSeedResults()` store action that seeds a believable mock run (rotating scene winners → ~64/36/18 spread) and jumps to `/results`, so the results screens can be iterated without running the quiz. **Must be removed before ship — noted in `VISUAL_REARCHITECTURE.md` Phase G.**

## Not done on purpose / next

- **Recommendation copy** is drafted and wired but **awaits Caelan's sign-off** (the variants live in `narrativeFlow.ts` `resultsCopy.cards.recommendation`).
- The **drag path** stays dormant. **Bridge programs** stay placeholder pending ARM.
- **Next is Phase E** (results map; decide the node map's final fate) per `VISUAL_REARCHITECTURE.md` §6 — the `useResultsNav` `map` view is still the "coming next" stub. Then Phase F (constellation + job overview, data-dependent), Phase G (polish/motion/responsive/a11y — folds in the deferred p3s above + the Phase C signal-bar contrast).
- **No commit** — left for Caelan.
