# 2026-07-02 — Ecosystem run Pass 4: harness ported into `robotics_career` + baseline design review

**Resume here.** Pass 4 is done: `robotics_career` carries the full harness (main @ `5899ca0`, **local — push awaits Caelan**, git-push deny rule: existing remote, so it's his one-liner `git push` from that repo). All exit gates verified: lint/typecheck green, the guard hook fires on both violation classes, cross-references clean, and a **baseline `/design-review`** graded the excavated screens against the new normative rubric — its findings are the Pass-5 worklist. **Next: Pass 5 (tokenization), largely mechanical** — 75 of the 82 project-owned hex literals map value-exactly to `@rc/ui` tokens. Also still pending from Pass 3: the career_dashboard archive-tag push + branch deletion (commands in that pass's note). No code touched in this repo; gates unaffected.

## Caelan's rulings this session (now in the run sheet)

- A small `docs/ROADMAP.md` joins the UX repo's fresh knowledge layer so `/phase-check` keeps the sibling shape.
- The `design-system-compliance` rubric is authored **normatively against the target `@rc/ui`/kit-aligned system**, not around Kayla's current screens — he judged the screens more divergent than they should be and wants the rubric pushing toward where the system ends up; its failures become the tokenization + refinement worklist. The separate taste/screen-quality rubric is **deferred** until his Figma/Claude Design refinement direction exists.

## What we did

- **Ported best-of-both** (per the run-sheet spec, `ECOSYSTEM_PLAN.md` §4): career_dashboard's `capture-figma`/`pull-figma`/`phase-check` + `compound`/`design-review`/`revise-doc`, its three subagents, `knowledge-guard.sh` + `settings.json` (thresholds unchanged; `settings.local.json` not copied; no `.mcp.json`); this repo's README shape. Everything re-authored to the repo's reality: gates are lint + typecheck + console-clean (no test suite by design), verifier checks the six-role/competency content invariants, `capture-figma` **hard-stops** until a capture-target file exists (Kayla's `k3AjijocJEmzrvlKTd9vJM` is pull-only, their D-004).
- **Regenerated per-project:** `CLAUDE.md` (hard rules: six roles verbatim, zero local token authorship, pull-only Figma, the seam-stub boundary), the `content-data` skill (six-role invariants + the extraction rule for the inline jobs/FAQ/auth-options debt), `docs/ROADMAP.md` (4 phases mirroring the repo-touching passes), the seeded `FIGMA_MAP.md` (DS library + Kayla's known node IDs; token table points at `@rc/ui` conventions rather than duplicating 160 pairs), and the knowledge layer (their D-001–D-005 seeded from the standing rulings; L-001/L-002 lessons).
- **Verified the exit gates:** guard hook silent on the real STATUS/DECISIONS, warns on crafted violations of both classes; the cross-reference sweep's only hits were the deliberate `explore_floor/`-prefixed cross-repo refs.
- **Baseline `/design-review`** (design-reviewer subagent, all routes, desktop + 390px, console-clean everywhere): hex census **87 — 75 mechanical 1:1, 7 unmapped needing snap-or-package calls, 5 exempt brand SVGs**; `font-montserrat`×3 confirmed; footer `text-white` on ink → on-dark ramp; ~14 `text-black` → ink; the one near-new item (`text-[#757575]` re-minted in the six-role rail); and **two design-intent questions routed to the refinement, not fixed**: gold-as-primary-CTA vs teal-acts, red requirement feedback vs the no-red status system. Findings recorded in their ROADMAP §2 + session note; zero source changes.
- **Workflow note:** the first design-reviewer dispatch stalled on the cold Playwright-MCP browser start; warming the browser inline (one navigate) before re-dispatching fixed it. Worth remembering for future subagent+Playwright runs.

## State at end of session

- `robotics_career`: main @ `5899ca0` (23 files, docs/harness only), clean tree, **unpushed**; dev server verified on 5186 and stopped.
- explore_floor: docs-only changes (this note, `ECOSYSTEM_RUN.md` Pass-4 tick + rulings, `STATUS.md`).
- Ledger: Passes 1–4 ✅; Pass 5 (tokenization) next; 6–7 + stretch queued.

## Next session

Pass 5 per the run sheet, in `robotics_career` (its ROADMAP §2 carries the graded criteria): mechanical hex→token substitution starting with `Explore.tsx` (62 of 79 offending lines), `font-montserrat` → `font-heading`, faux `font-semibold` sites, spacing/radius/type snapping, opportunistic content extraction, screens visually unchanged, `/design-review` re-run. The 7 unmapped values and the two design-intent questions go to Caelan before or during.
