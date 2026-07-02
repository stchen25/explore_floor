# 2026-07-02 — Ecosystem run Pass 6: explore_floor pre-sync pass (D-036/D-037)

**Resume here.** Pass 6 is done and committed on `main`: the code half (control-height ladder, the full Montserrat weight-honesty sweep, the `typeScale.ts` mirror) and the docs half (`DESIGN_SYSTEM.md` reconciled code-outward, D-037). All gates green — lint / typecheck / 82 unit / 3 E2E — and the `/design-review` re-run has **both rubrics PASS**. **Next: Pass 7** (Figma: dark variables into the DS library as additive named variables, the new Interest Quiz file, capture), for which this pass was the prerequisite — §2's mapping now tells the capture run exactly what to publish. One item awaits Caelan below (§ Flags). Pass 5 closed concurrently from `robotics_career` (its commit `4ef1c78` here ticked the ledger mid-session; no collision).

## Caelan's ruling this session

The run-sheet's sizing preference call went the other way from its default (ratify-as-raw): **snap to the dashboard's existing token ladder where anything is close; mint on the same ladder where nothing is.** Result (D-036): `control-sm/md/lg` (24/32/36) adopted verbatim from `@rc/ui`, `control-xl` (40) + `control-tap` (44) minted as on-ladder extensions (`@rc/ui` v1.1 candidates).

## What we did

- **Code, planned:** the two faux-600 `font-semibold` sites (`BucketSort`, `SceneSortView`) → `font-bold` (only the Montserrat 700 face is loaded — the dashboard's L-011 bug class); the `SceneSortView` animated fontSize/lineHeight literals now read `src/lib/typeScale.ts`, a px-string mirror of the @theme type steps (same pattern as `motion.ts` easings — Motion needs concrete px, not `var()`).
- **Code, ruling:** nine control sites swept onto the ladder — six results pills `h-9`→`h-control-lg`, the nav search field `h-10`→`h-control-xl`, the hero prev/next arrows `h-11 w-11`→`size-control-tap`. Non-control steps (logo, avatar, meter/dot/tile geometry) ratified raw. Measured live post-sweep: 36 / 40 / 44px, pixel-identical, console clean.
- **Docs (D-037, via `/revise-doc` + doc-steward):** `DESIGN_SYSTEM.md` §2 retires "RC-CC is the source for tokens" — the `@theme` block is canonical, flow is code-outward, dark publishes to the DS library (`afi5Q5nFtcnT9HJ04Cbylg`) in Pass 7, captures land in the new Interest Quiz file; §2's table gained the full dark system (~30 tokens) + control rows; §7 rewritten from the stale Material triple-stacks to the live kit soft tiers + dark shadows; §1's "package is deferred" corrected (`@rc/ui` is live); §5 gained the control-heights subsection. Steward reconciled `ARCHITECTURE.md` §3/§7, `ROADMAP.md` §4.6, `HANDOFF_GUIDE.md` §6, `DESIGN_SYSTEM_RUN.md` §1; the compliance rubric's space-scale check now names the ladder.
- **Scope-add from review:** the `/design-review` re-run confirmed nothing regressed (controls exactly 36/40/44; weights render 700 as before) and surfaced the same weight-honesty class as **faux-500** at nine more Montserrat sites — seven `font-heading … font-medium` and the two tab rows (`RoleTabs`, `JobOverview`) whose bold/medium active-contrast never actually rendered (both resolve to the 700 face; the real contrast is color + border). All swept: `font-medium`→`font-bold`, tabs hoist `font-bold` to the static class. Render-identical; remaining `font-medium` sites are all Roboto (500 face loaded, legit).
- **Catalogued, not fixed (pre-existing p3s → `DEFERRED_DIRECTIONS.md`):** mid-session OS reduced-motion flips don't cancel the running ambient loops (on-load behavior is correct and E2E-covered); `TrajectoryViz` ring `rgba()` literals (same one-token treatment as `--color-constellation-line`).

## Flags for Caelan

- **Two harness files carry the retired "Figma wins for token values" precedence line:** `.claude/commands/revise-doc.md` (step 1) and `.claude/agents/doc-steward.md` (doc map). The steward flagged them and the permission classifier blocked self-editing harness files, correctly. Two one-line edits when you're in: swap to "the `@theme` block in `globals.css` is canonical for token values, code-outward (DESIGN_SYSTEM §2)".

## State at end of session

- explore_floor `main`: Pass-6 commit (code + docs), clean tree, gates green, both rubrics PASS. Dev server stopped.
- Ledger: Passes 1–6 ✅ (Pass-5 row also ticked here — its close-out commit had updated the section but missed the table row); Pass 7 next; stretch queued.
- Still pending from earlier passes: Caelan's robotics_career Pass-5 push + the career_dashboard archive-tag push/branch deletion.

## Next session

Pass 7 per the run sheet: publish the dark extension into the DS library (`afi5Q5nFtcnT9HJ04Cbylg`) as additional named variables (never a mode — D-029), create the Interest Quiz Figma file, seed this repo's per-project FIGMA_MAP, capture the final dark screens (results 5-screen set + quiz steps), and confirm the team-demand gate on capture once before defaulting to capture. `DESIGN_SYSTEM.md` §2's dark table is the publication worklist.
