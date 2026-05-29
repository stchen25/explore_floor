# Session: 2026-05-29 · Phase 0 — scaffold & foundation

## What we did

Built Phase 0 end to end against `ROADMAP.md` §1. The repo went from docs-and-harness-only to a clickable, tested app.

- **Scaffold (1.1):** Hand-authored `package.json` (pinned **React 18**, not 19), `pnpm install`. Activated pnpm via Corepack (11.5.0). esbuild build-script approval moved to `pnpm-workspace.yaml` (`allowBuilds: esbuild: true` — pnpm 11 no longer reads the package.json `pnpm` field).
- **Config (1.1):** `tsconfig.json` (strict, `@/` alias; config files added to `include` so the IDE resolves `@tailwindcss/vite`'s exports-only types), `vite.config.ts` (react + `@tailwindcss/vite`, ESM `import.meta.url` alias, embedded Vitest with `include`/`exclude` split from e2e), flat `eslint.config.js` (+ `simple-import-sort`, `_`-prefix unused-arg convention), `.prettierrc` (+ `*.md` ignored so Prettier doesn't churn the prose docs), `index.html`, `public/favicon.svg` (avoids a 404 console error in the e2e).
- **Tailwind v4 (1.2) — see D-013:** Per the user's call we use **Tailwind v4, CSS-first**. All tokens live in the `@theme` block in `src/styles/globals.css` (no `tailwind.config.ts`, no postcss/autoprefixer). Token names unchanged from `DESIGN_SYSTEM.md`. Reconciled CLAUDE.md, ARCHITECTURE, DESIGN_SYSTEM, ROADMAP, and the design-system-compliance rubric to point at `@theme`.
- **Data (1.4):** Full `/src/data` — types, 24 items (weights verbatim; sums **B22/I27/A25**), 3 roles, 26 competencies, 14 skills, 6 programs, 26 placeholder robot parts, color schemes. `data-author` discipline.
- **Logic + tests (1.5/1.6):** `scoring.ts`, `robotAssembly.ts`, `programSelection.ts`, `audio.ts` (no-op), `motion.ts`. **30 Vitest tests** incl. `data-integrity.test.ts` that recomputes the §15 invariants from live data.
- **State + screens (1.7/1.8):** Zustand `sessionStore`; four token-only stub screens wired through react-router (`/ → /sort → /build → /results`). Sort auto-advances once all 24 are decided.
- **E2E (1.11):** `playwright.config.ts` + happy-path spec (asserts 3 role cards + zero console errors). Chromium installed.
- **Figma gate (1.9):** MCP authenticated (Caelan). Code-to-canvas capture of Landing succeeded into the existing **`explore_floor`** file (`kyE6BWBfDQuElveDYSa6FS`, node `6:2`). Temporary capture script was removed from `index.html` after.
- **GSAP skills (1.10):** Already installed/discoverable — confirmed only.

## State at end of session

- **`/phase-check`: Phase 0 complete — 10/10.** `verifier` PASS on lint, typecheck, 30 unit tests, e2e, and all §15 data invariants.
- **Token spot-check closed:** brand colors + type scale in `@theme` match `DESIGN_SYSTEM.md` §2–§4, which the file owner confirmed were pulled from the Design System file (`yGDi4yDtptKttboTYV8on7`) variables. A live MCP variable read was attempted but blocked — the `figma` MCP's variable/context tools (`get_variable_defs`, `get_design_context`) are **selection-based** (need the Foundations frame selected in the Figma desktop app), and `get_metadata` served a stale page snapshot (only "Cover", though the file actually has multiple pages incl. Foundations). Tooling limit, not a discrepancy.
- Working tree has uncommitted Phase 0 work (not committed — user commits on request).

## Next session

1. **Commit** the Phase 0 scaffold as a clean checkpoint when ready (currently uncommitted).
2. _(Optional)_ Byte-level live Figma-variable diff: open the Design System file in the Figma desktop app, select the Foundations frame, then `get_variable_defs` reads it directly. Not required — values already verified against the doc source.
3. **Begin Phase 1** (`ROADMAP.md` §2): real one-at-a-time drag-to-bin sort with rounds + progress indicator, the Results compare interaction (drag robot to a ghosted card), surface top-3 programs per role, and the Phase 1 Playwright tests. First build put in front of MHCI users — run `/design-review` once the first real screen lands.
