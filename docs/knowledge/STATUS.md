# Status

**Read this first.** Live snapshot of where the build is. Updated as acceptance criteria clear (by `/phase-check` or by hand).

- **Last updated:** 2026-05-29
- **Current focus:** Agent + design harness bootstrap — **complete**. Ready for Phase 0.
- **Next up:** Phase 0 — app scaffold (Vite + React + TS + Tailwind), data model, pure logic, stubbed screens.

---

## Harness bootstrap (this session)

- [x] Reconcile cross-doc contradictions (see `DECISIONS.md` 2026-05-29).
- [x] Onboarding substrate: `.mcp.json`, `.env.example`, `.gitignore`, root `README.md`, `.nvmrc`.
- [x] Knowledge layer scaffolded (`docs/knowledge/`).
- [x] Rubrics authored (`docs/rubrics/`: design-system-compliance, goose-game-aesthetic, motion-quality).
- [x] Subagents (`.claude/agents/`: verifier, design-reviewer).
- [x] Skills (`.claude/skills/`: data-author, scene-motion).
- [x] Slash commands (`.claude/commands/`: phase-check, design-review, compound, capture-figma, pull-figma).
- [x] `.claude/settings.json` permission allowlist.
- [x] `CLAUDE.md` + `ARCHITECTURE.md` updated for the harness.
- [x] Toolchain skills installed — GSAP + Framer Motion skills present (stored in `.agents/skills/`, symlinked into `.claude/skills/`, pinned in `skills-lock.json`).
- [x] Built-in memory mirror written.

---

## Phase 0 — Scaffold & foundation (not started)

_Last `/phase-check`: 2026-05-29 — `verifier` confirmed pre-scaffold (no `package.json`/`src/`); no gates runnable yet. All criteria below are not-yet-runnable, not failing._

Acceptance criteria (from `ROADMAP.md` §1):

- [ ] `pnpm dev` runs without errors.
- [ ] `pnpm lint` passes.
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm test:unit` passes scoring, assembly, program-selection tests.
- [ ] `pnpm test:e2e` passes the happy-path Playwright test.
- [ ] A human can click `/` → `/results` with no console error.
- [ ] Tailwind tokens match the Figma file's variables (spot-check brand colors + type scale).
- [ ] Figma MCP connects, a read works, one code-to-canvas capture succeeds.
- [ ] GSAP AI skills installed and discoverable.
- [ ] Every data sanity check from `DATA_MODEL.md` §15 passes (incl. per-archetype sums **B 22 / I 27 / A 25**).

## Phase 1 — Testable flow (not started)
Tracked when Phase 0 closes. Criteria in `ROADMAP.md` §2.

## Phase 2 — Feel pass (not started)
Criteria in `ROADMAP.md` §3.

## Phase 3 — Polish (not started)
Criteria in `ROADMAP.md` §4.
