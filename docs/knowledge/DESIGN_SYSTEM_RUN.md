# Design-System Run: the queue for the shared-tokens effort

_Snapshot 2026-07-01. Branch `narrative-v3-realign`._

The **`rc-design-system` shared package** and the **`/capture-figma`** of the final dark screens were both **deferred out of the 2026-07-01 hygiene pass** and belong to a dedicated **design-system run**. This doc is that run's reference: everything queued for it, in one place, so the run doesn't have to re-discover scope.

> **GO — 2026-07-02 (D-035).** The run is committed and folded into the wider **ecosystem run**: `ECOSYSTEM_RUN.md` is the execution ledger (the package is its Pass 2, with the full build spec; the Figma capture is Pass 7), and `ECOSYSTEM_PLAN.md` holds the rationale. Scope call: **tokens-first** — the backbone (kit `@theme` + dark extension + fonts + base + `Icon`) ships first; the full atom tier comes later; step 5 (consumer conversion) is stretch-only. This doc stays as the §10 pointer + queue detail.

The authoritative build sheet is **`archive/REALIGNMENT.md` §10** (with §6 Rec B, §7 Rec C, and D-024/D-029 for the "kit-align in-repo now, defer the package" call). This is a pointer + checklist, not a re-spec.

---

## 1. Stand up the `rc-design-system` package (`archive/REALIGNMENT.md` §10, steps 0–6)

The whole package extraction stayed deferred by decision until the GO above (Caelan overrode §10's "the trigger is now" framing: kit-align in-repo first, package after). What remained unbuilt at this snapshot, all by design:

- **Step 0 — store-free atom audit.** Pre-extraction pass to confirm the candidate atoms are decoupled from any store.
- **Step 1 — scope atoms by intersection.** The intersection-scoped atom list: `CtaButton`, `Card`/`CardHead`, `Chip`, `StatusPill`, `Ring`, `Meter`, `MetaRow`, `Icon`. Tokens, fonts, and base styles ship; **not** a full component library.
- **Step 2 — create the repo** with a real `package.json` exports map (the JSON block in §10).
- **Step 3 — move canonical tokens in:** the kit `@theme` + a flattened `tokens.css` + `FIGMA_MAP.md`.
- **Step 4 — (folded into 3).**
- **Step 5 — convert consumers.** Point both `career_dashboard` **and** `explore_floor` at the package (`"@rc/ui": "github:caelar/rc-design-system#v1"`, the recommended git-dependency distribution), delete their local token authorship, and repoint `/design-sync` to source from it. Also bundle the real React atoms (`componentSrcMap` + esbuild) into the Claude Design project so exploration renders real components, and rename that project to "RC Design System".
- **Step 6 — scaffold the three unborn prototypes** (Homepage, Sign-Up Flow, Explore Jobs & Trainings) on `@rc/ui` from the first commit. §10 calls this the largest payoff.

**Source-of-truth roles:** owned by `DESIGN_SYSTEM.md` §2 (the three-artifact model, live since the Pass-7 publication, D-039): the Figma Design System library wins for values, the `@theme` block mirrors it, the doc holds usage, and `docs/figma/FIGMA_MAP.md` is the binding manifest. (The interim code-outward framing, D-037, was the pre-publication state; §10's original "library = canonical for values" framing holds again.)

**Explicit consequence to undo here:** `explore_floor/src/styles/globals.css` still **authors its own dark `@theme` locally** — an intentional artifact of the deferral. Rec C's "one canonical source" end-state is only partially realized until step 5 repoints this repo at the package.

## 2. `/capture-figma` the final dark screens — resolved (ecosystem Pass 7, 2026-07-02)

The team-demand gate is answered: Caelan confirmed the screens belong in the Figma handoff (2026-07-02). Reference stills of all 8 final screens are captured into the Interest Quiz file (`pjgrRJS5YYII1iciW7Pak2`) as image fills; the editable variable-bound rebuilds are the pass's recorded remainder in `ECOSYSTEM_RUN.md`, and `/capture-figma` now reads `docs/figma/FIGMA_MAP.md` first. Still open from this entry: reconciling `/capture-figma` output against the shared-package components (System A Figma / System B Claude Design) once the editable rebuilds land.

## 3. Smaller optional alignments (from `archive/REALIGNMENT.md` §8 Rec D)

- **`.claude/launch.json`** to pin dev/preview ports. Not present on disk; explicitly optional.
- A **conscious MCP/plugin-delta decision** (this repo enables firecrawl + the commit-commands plugin; the dashboard does not). Never formally actioned.
- **Reuse the dashboard's Session Setup researcher test-bench pattern.** Likely moot now that the June study concluded (the narrative won); recorded for completeness.

---

## Go / no-go — answered: GO (2026-07-02, D-035)

The call is made: the package goes, scoped tokens-first, because the trigger changed — Kayla's two pushed branches mean a third repo is about to exist, and without the package it becomes a fifth token source. The §10 warning ("the package never happens") is answered: the package exists and the new UX repo is born on it. The consciously accepted residual: the two existing repos may keep their local token authorship through handoff (step 5 is stretch-only; zero client-visible payoff, real regression risk). Sequencing and the build spec: `ECOSYSTEM_RUN.md` Pass 2.
