# Session — 2026-05-29 · Docs reconciliation + harness bootstrap

First working session. Two threads: (1) reconcile contradictions found across the planning docs, (2) stand up the project's agent + design harness from scratch — before any app code. This note is the setup write-up and the handoff for the next session.

## What we did

### 1. Doc reconciliation
Read all six docs in full, reported the build phase plan / stack / non-goals, and fixed seven cross-doc inconsistencies (all logged in `DECISIONS.md` D-001…D-006, plus framing in D-005):
- **Innovator weights sum to 27, not 24** — corrected the stated maxes (B 22 / I 27 / A 25) and clarified that scoring normalizes per archetype, so maxes need not match. Fixed in `DATA_MODEL.md` (×3 spots). *This was a real, load-bearing catch* — Phase 0's data sanity test would have failed otherwise.
- File-size re-check threshold standardized to **~250 lines** (`CLAUDE.md`).
- **Vitest** named explicitly in the stack + verify steps (`CLAUDE.md`).
- Landing scene → **Phase 1 GSAP `DrawSVG` reveal** (`DESIGN_SYSTEM.md`, `ROADMAP.md`).
- **Project timeframes removed** (`ROADMAP.md` §0, `PRD.md` §3) — ship when criteria are met.
- **Demo affordances** (`?demo=true`, skip-to-results) documented as allowed (`PRD.md` §14).
- `CLAUDE.md` location corrected in the `ARCHITECTURE.md` file tree.

### 2. Harness bootstrap
Designed and built a bespoke, lean harness (plan: `~/.claude/plans/all-sounds-good-before-binary-conway.md`). Grounded in Anthropic's harness-design guidance (planner/generator/evaluator, structured handoff artifacts, evaluation rubrics) and the BilLogic five-layer frame + rubric schema — adapted, not installed (D-007).

Created:
- **Onboarding (Layer 0):** `.mcp.json` (figma/playwright/firecrawl), `.env.example`, `.gitignore` (and untracked the stray `.DS_Store`), onboarding `README.md`, `.nvmrc` (Node 22).
- **Knowledge (Layer 5):** `docs/knowledge/` — this file plus `README`, `STATUS`, `DECISIONS` (seeded), `LESSONS` (reframed), `CASESTUDY`.
- **Evaluation (Layer 4):** `docs/rubrics/` — `design-system-compliance`, `goose-game-aesthetic`, `motion-quality`.
- **Skills (Layer 2):** `.claude/skills/` — `data-author`, `scene-motion`.
- **Orchestration (Layer 3):** `.claude/commands/` — `phase-check`, `design-review`, `compound`, `capture-figma`, `pull-figma`.
- **Subagents:** `.claude/agents/` — `verifier`, `design-reviewer`.
- **Settings:** `.claude/settings.json` (permission allowlist).
- **Context (Layer 1):** `CLAUDE.md` + `ARCHITECTURE.md` updated to point at the harness.
- **Memory:** durable facts mirrored into built-in memory.

### 3. Toolchain decisions
- Animation skills: GSAP (`greensock/gsap-skills`) + Motion (`C-Jeril/framer-motion-skills`, free MIT — *not* the paywalled `npx motion-ai`; D-010).
- RC.org live capture deferred to aesthetic-rubric authoring (D-011).

## State at end of session
- Harness in place; Phase 0 app code **not started**.
- Open: confirm GSAP + Motion skills installed/discoverable; first real exercise of `/design-review` + `/phase-check` happens against the first Phase 0 screen.

## Update (same day) — toolchain + plugins installed
- GSAP + Framer Motion agent skills installed by the user via `npx skills add` (the agent is blocked from self-installing external skills — see `LESSONS.md` L-003). They live in `.agents/skills/`, are symlinked into `.claude/skills/`, and pinned in `skills-lock.json` — all committable and portable (a teammate can also run `npx skills experimental_install`).
- `.mcp.json` servers (figma / playwright / firecrawl) connected; `enabledMcpjsonServers` auto-enables them.
- User also installed general-purpose plugins (commit-commands, hookify, ralph-wiggum) — not part of the core harness; noted for awareness.
- Harness bootstrap complete and verified discoverable (our 2 skills + 5 commands load; MCP servers connected).

## Update — harness reference + verified wiring
- Added `docs/knowledge/HARNESS.md`: a full reference for the harness (Claude Code primitives glossary; every skill/command/subagent/rubric/MCP server with purpose + usage; "how it fits together" workflows; how to extend). Linked from `README.md` (overview table), `docs/knowledge/README.md` (index), and `CLAUDE.md`.
- Ran `/phase-check` as a smoke test: it dispatched the `verifier` subagent, which returned `PARTIAL (pre-scaffold)` — confirming the command → subagent → `STATUS.md` wiring works end to end. No gates runnable yet (no `package.json`/`src/`), which is the correct Phase 0 starting line.

## State at end of session (final)
- Harness complete and verified: 2 project skills (`data-author`, `scene-motion`) + installed GSAP/Framer Motion packs, 5 slash commands, 2 subagents, 3 rubrics, knowledge layer (+ `HARNESS.md`), settings, memory mirror. MCP servers (figma/playwright/firecrawl) connected.
- App **not scaffolded** — Phase 0 has not begun.
- Open action: **commit** the work (docs reconciliation + harness) as a clean checkpoint — not yet done.

## Next session
1. **Commit the harness** if not already done (one clean checkpoint: docs reconciliation + harness bootstrap).
2. Begin **Phase 0** (`ROADMAP.md` §1): Vite + React + TS + Tailwind scaffold → Tailwind tokens (mirror the Figma variables) → `/src/data` (watch the **B 22 / I 27 / A 25** sums — the `data-author` skill assists) → pure logic (`scoring` / `robotAssembly` / `programSelection`) + Vitest → four stubbed screens → happy-path Playwright.
3. Re-run `/phase-check` to start ticking `STATUS.md` for real; run `/design-review` once the first screen renders.
