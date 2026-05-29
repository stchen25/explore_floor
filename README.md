# RC.org Career Discovery — "Explore the Floor" (prototype)

An interactive, gamified career-discovery experience for **RoboticsCareer.org** (the ARM Institute's workforce platform). A user sorts concrete interests on a stylized assembly line, watches a custom robot get built from their choices, and lands on a results screen that recommends how they match the three robotics manufacturing role families.

This is a **high-fidelity prototype** for an MHCI capstone with ARM as client — built to prove the concept and be user-tested, not to ship to production. ARM's dev team would rebuild from it later.

> **New here? Read [`CLAUDE.md`](./CLAUDE.md) first** — it's the operating manual. Then skim [`docs/`](./docs).

---

## Quick start

**Prereqs**
- **Node 22** (`.nvmrc` pins it — run `nvm use`).
- **pnpm** (`corepack enable` or `npm i -g pnpm`).

**Setup**
```bash
nvm use                 # Node 22
corepack enable         # provides pnpm
cp .env.example .env     # then fill in keys (see below)
pnpm install             # available after the Phase 0 scaffold
```

> The app itself is scaffolded in **Phase 0** (Vite + React + TS + Tailwind). Until then this repo is docs + the agent/design harness. After Phase 0, the scripts below work.

**Run / verify** (post-Phase 0)
```bash
pnpm dev          # Vite dev server
pnpm test         # Vitest unit tests + Playwright E2E
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Tooling / MCP setup

Project MCP servers are declared in [`.mcp.json`](./.mcp.json) so a fresh clone is prompted to connect them. After cloning:

- **Figma** — run `/mcp` in Claude Code and authenticate the `figma` server (OAuth, one-time).
- **Firecrawl** — set `FIRECRAWL_API_KEY` in `.env` ([get a key](https://www.firecrawl.dev/app/api-keys)).
- **Playwright** — no setup needed.

Animation skills for the agent (free, open-source):
```bash
npx skills add greensock/gsap-skills          # GSAP (scene choreography)
npx skills add C-Jeril/framer-motion-skills    # Motion (state-driven UI)
```

## Where things live

| Path | What |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Operating manual — read first every session. |
| [`docs/`](./docs) | The spec: `PRD`, `CONTEXT_BRIEF`, `ARCHITECTURE`, `DATA_MODEL`, `DESIGN_SYSTEM`, `ROADMAP`. |
| [`docs/knowledge/`](./docs/knowledge) | Living project memory: `STATUS`, `DECISIONS`, `LESSONS`, `CASESTUDY`, `sessions/`. **Start at [`STATUS.md`](./docs/knowledge/STATUS.md).** |
| [`docs/rubrics/`](./docs/rubrics) | Design-quality rubrics the `design-reviewer` grades against. |
| `.claude/` | The harness: `skills/`, `agents/`, `commands/`, `settings.json`. |
| `src/` | App code (created in Phase 0). |

## The agent harness

This project is built with Claude Code using a small, owned **harness** — the layer that makes the build coherent, reviewable, and resumable across sessions and teammates. It's itself a deliverable (the "agentic design practice" the case study is about). Quick map:

| Piece | Where | What it's for | How you use it |
|---|---|---|---|
| **Context** | `docs/`, `CLAUDE.md`, `docs/knowledge/` | What's always true about the project | Read automatically each session |
| **Skills** | `.claude/skills/` | Recurring jobs — `data-author` (`/src/data`), `scene-motion` (animation), + GSAP/Motion packs | Auto-fire when your task matches |
| **Slash commands** | `.claude/commands/` | Things you kick off (see below) | Type `/name` in the prompt |
| **Subagents** | `.claude/agents/` | `verifier` (gates) + `design-reviewer` (UI critique) in isolated contexts | Dispatched by the commands |
| **Rubrics** | `docs/rubrics/` | Checkable design-quality bars | Graded by `design-reviewer` |
| **MCP servers** | `.mcp.json` | figma (round-trip), playwright (review/E2E), firecrawl (scrape) | `/mcp` to connect/authenticate |
| **Knowledge** | `docs/knowledge/` | Status, decisions, lessons, case study, session handoffs | `/compound`; read `STATUS.md` first |

Commands: `/phase-check` (verify the phase's criteria + tick STATUS), `/design-review` (screenshot the UI and grade it vs rubrics), `/compound` (capture a decision/lesson/session note), `/capture-figma` & `/pull-figma` (the Figma round-trip).

**→ Full reference: [`docs/knowledge/HARNESS.md`](./docs/knowledge/HARNESS.md)** — every piece, what it's for, how to use it, and how to extend it. How it was set up: [`docs/knowledge/sessions/`](./docs/knowledge/sessions).
