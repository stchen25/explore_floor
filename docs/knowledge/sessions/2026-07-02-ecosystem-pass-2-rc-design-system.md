# 2026-07-02 — Ecosystem run Pass 2: `rc-design-system` (`@rc/ui`) stood up

**Resume here.** Pass 2 is done: `Prototypes/rc-design-system` exists, is committed on `main` (root commit `4dae373`), tagged `v1`, and **pushed to `github.com/caelar/rc-design-system` (private)** with the tag — the git dep `"@rc/ui": "github:caelar/rc-design-system#v1"` is live. (Caelan authenticated `gh` in-session; no holds remain.) **Next: Pass 3** (excavate Kayla's branches into `robotics_career`), which still has the Kayla prerequisite (branch intent, the "RC.org Prototype" file key, Landing content calls). No code touched in this repo; gates unaffected.

## What we did

Executed the run sheet's Pass 2 spec verbatim (`ECOSYSTEM_RUN.md`; all source line references re-verified live first — every one still held).

- **The package.** `@rc/ui` 1.0.0 at `Prototypes/rc-design-system`: `tokens/theme.css` (career_dashboard's canonical `@theme` L12–253 + `@theme inline` L262–272 assembled byte-exact via sed, + the 27-token dark append from this repo's D-029 system with the two documented `-on` rewrites to `var(--color-on-cta)`), `tokens/tokens.css` (script-flattened `:root`, 160 pairs, refs unresolved), `base.css` (dashboard `@layer base` verbatim), `fonts/` (5 woff2 + rewritten `fonts.css`), `styles.css` Mode-B entry, `Icon` as the one atom (utility-free: `leading-none` dropped, render-identical), `src/index.ts`, tsup build with committed `dist/`, exact exports map.
- **Docs.** `README.md` (why-a-package, install, the two consumption modes, the dist rule), `conventions.md` (vocabulary incl. the dark families, color intent, merge provenance + left-behind list, `@source` note, the on-glass-vs-glass distinction), `figma/FIGMA_MAP.md` (dashboard §1–§6 with provenance header replacing the phase-status paragraph).
- **Gate 1 (textual faithfulness) PASS**: 133/133 base pairs byte-identical to the dashboard source; extras exactly the 27 dark names matching explore_floor values except the two rewrites; constellation-line correctly absent; 160/160 theme↔tokens parity in order.
- **Gate 2 (runtime smoke) PASS**: `pnpm pack` tarball into a scratch Vite + Tailwind v4 + `@tailwindcss/vite` app (Mode A). In-browser (Playwright): `--color-arm-gold` `#ffb81c`, kit card renders gold/`rounded-card`(10px)/`p-space-3`(16px)/Montserrat, dark strip `#1b1b1b` + on-dark `#f2f4f5` + specialist-soft `#7fe0f2`, Material Icons + Montserrat 700 + Roboto 400 all `document.fonts.check` true, the `bolt` ligature renders as a 24×24 glyph. Only console noise: the scratch app's favicon 404.
- `pnpm typecheck` green; committed and tagged.

## Friction worth knowing

- pnpm 11 blocks dependency build scripts by default and **ignores `package.json`'s `pnpm.onlyBuiltDependencies`**; the setting now lives in `pnpm-workspace.yaml` as `allowBuilds: { esbuild: true }` (pnpm scaffolds the file for you on first refusal). The package repo carries this; consumers don't need it for `@rc/ui` itself (no install scripts in the tarball).
- A stray `rc-ui-smoke.png` landed in this repo's root during the Playwright check (untracked); deletion was permission-blocked — Caelan can remove it.

## State at end of session

- `rc-design-system`: main @ `4dae373`, tag `v1`, clean tree, both gates PASS, pushed to `caelar/rc-design-system` (private) with the tag.
- explore_floor: docs-only changes (this note, `ECOSYSTEM_RUN.md` ledger tick, `STATUS.md`); branch `narrative-v3-realign` untouched otherwise.
- Ledger: Pass 2 ✅; Pass 3 next (Kayla prereq); Passes 4–7 + stretch queued.

## Next session

Pass 3 per the run sheet — after Caelan's Kayla coordination. The `"@rc/ui": "github:caelar/rc-design-system#v1"` dep is live on the remote and ready to wire.
