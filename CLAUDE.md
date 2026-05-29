# CLAUDE.md

This file is the operating manual for this repo. Read it fully at the start of every session before touching code. It is intentionally short. When you need depth, follow the pointers to `/docs`.

---

## What this is

An interactive, gamified career-discovery experience for **RoboticsCareer.org** (RC.org), the ARM Institute's workforce platform. A user sorts interests on a stylized assembly line, watches a custom robot get built from their choices, and lands on a results screen that recommends how they match the three robotics manufacturing role families. It replaces three weak existing tools on the site (Explore the Floor, My Goal, Interest Quiz) with one focused, engaging flow.

This is a **high-fidelity prototype**, not production code. It exists to (a) prove the concept to the ARM client and (b) be tested with real users. ARM's dev team would rebuild from it later. Optimize for clarity, feel, and iteration speed, not for production hardening.

## What this is NOT

Do not build any of the following unless explicitly asked:

- Authentication, accounts, login, or sign-up. None.
- A backend, database, or real API. All data is local and mocked.
- Real ARM platform integration, SkillsMatch wiring, or live job/training feeds.
- Heavy accessibility or i18n work. Basic semantic HTML and keyboard sanity only.
- The "professional track" (adult job-seeker version). It is a documented stub only. See `PRD.md`.
- 3D / WebGL. The prototype is 2D. A future 3D path is documented in `ARCHITECTURE.md` but is not in scope now.

If a task seems to require any of the above, stop and flag it rather than building it.

## Who it is for

Late-stage high school students looking at training programs after graduation. Not middle schoolers. Not adult career switchers (that is the stub track). Tone is encouraging, plainspoken, and a little playful. Never childish, never corporate. Reading level around 9th grade.

## The "why" in three sentences

Research found the barrier to robotics manufacturing careers is not lack of interest, it is lack of specificity: a large "maybe" group can't picture what the work actually looks like, so they never convert. RC.org's current quizzes make this worse by shoving people into a single prescriptive role bucket with no sense of what the work is or how they'd grow into it. This experience fixes that by letting users *try on* the field through concrete interests and see themselves across multiple real roles, with an honest read on what fits and what they'd build. Full context in `CONTEXT_BRIEF.md`.

---

## Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Build | Vite | Fast dev loop. |
| Language | TypeScript | Strict mode on. |
| UI | React 18 | Function components and hooks only. |
| Styling | Tailwind CSS (v4, CSS-first) | All design tokens live in the `@theme` block in `src/styles/globals.css` (loaded via `@tailwindcss/vite`). No magic hex values in components. |
| Animation (UI) | Motion (ex-Framer Motion) | React-state-driven motion: screen transitions, gestures, drag-to-bin, the results compare interaction, `prefers-reduced-motion`. |
| Animation (scene) | GSAP + plugins | Scene choreography and the cinematic build beat. MorphSVG, DrawSVG, MotionPath, plus `@gsap/react`. Fully free since 2025. The two libraries share a motion-token file and never animate the same property on the same node. |
| Scene rendering | SVG (React components) | The assembly line is composed SVG, not canvas, not WebGL. Inspectable and diffable. |
| State | Zustand | One store per domain. No Redux. |
| Audio | Howler.js | Subtle SFX only. Muted by default with a visible toggle. |
| Testing | Vitest + Playwright | Vitest for pure-function units (the scoring engine especially); Playwright for the E2E happy path and visual regression. Set up in Phase 0. |
| Package manager | pnpm | |
| Lint/format | ESLint + Prettier | Run before considering a task done. |

If you want to add a dependency, check `ARCHITECTURE.md` first. Prefer the stack above over reaching for new libraries.

## Repo structure

```
/docs                 All planning docs (read these, do not duplicate their content in code comments)
/public               Static assets, audio files, fonts
/src
  /app                App shell, routing, top-level providers
  /screens            One folder per screen (Landing, Sort, Build, Results)
  /scene              The SVG assembly-line scene and its parts (conveyor, arms, bins, robot)
  /components         Shared UI (buttons, cards, layout, motion primitives)
  /state              Zustand stores
  /data               Mock data: roles, competencies, interest items, archetype mappings, scoring
  /lib                Pure helpers (scoring engine, mappers, formatters)
  /styles             Tailwind v4 entry + the @theme design-token block (globals.css)
/tests                Playwright specs and fixtures
src/styles/globals.css  Design tokens via Tailwind v4 @theme. Single source of truth for color/type/spacing (motion tokens live in src/lib/motion.ts).
```

## Core conventions

- **Small files, split by responsibility.** A screen orchestrates: layout, state reads, event handlers. It does not hold a reusable sub-element's JSX, inline business logic, or more than one distinct UI concern. When any of those appear, extract them (logic into `/lib`, data into `/data`, sub-UI into `/components` or `/scene`). A file crossing ~250 lines is a signal to re-check it against this rule, not an automatic split. Do not pad or fragment to hit a number; split because the responsibilities are distinct.
- **Data is data, not code.** Interest items, role definitions, archetype scoring weights, and results copy live in typed objects under `/src/data`. Changing content must never require editing component logic. This is the single most important convention in the repo: the team will be tuning content constantly.
- **The scoring engine is pure and isolated.** It lives in `/src/lib/scoring.ts`, takes the user's sorted selections, and returns a normalized match score for all three archetypes. Scores are normalized per archetype against that archetype's own maximum, so the three archetype weight totals need not be equal. No React, no side effects, fully unit-testable. Treat it as the brain.
- **Tokens, not literals.** Colors, spacing, radii, type, and motion durations come from Tailwind config. No inline hex, no random pixel values.
- **Types first.** Define the shape in `/src/data/types.ts` (or local types) before wiring UI. Avoid `any`.
- **Comment the why, not the what.** The docs explain intent; code comments should only clarify non-obvious decisions.

## How to verify your work

Before calling any task complete:

1. `pnpm dev` runs with no console errors.
2. `pnpm lint` and `pnpm typecheck` pass.
3. `pnpm test` passes — Vitest unit tests (the scoring engine) and the Playwright happy-path spec.
4. The change matches the acceptance criteria for the current phase in `ROADMAP.md`.

Use Playwright to self-check visual and flow changes rather than asking the user to manually verify. Screenshot the relevant screen and inspect it.

## Harness & session protocol

This repo carries a small, owned agent + design harness. Use it; don't work around it.

- **Session start.** Read `docs/knowledge/STATUS.md` (where we are) and the newest note in `docs/knowledge/sessions/` (what last happened) before touching anything. Built-in memory mirrors a few durable facts, but `docs/knowledge/` is the source of truth.
- **Layer map.** Context = the six `docs/` files (cited, never duplicated). Skills (`.claude/skills/`): `data-author` for `/src/data`, `scene-motion` for the Motion-vs-GSAP rule, plus the installed GSAP + Motion skills. Commands (`.claude/commands/`): `/phase-check`, `/design-review`, `/compound`, `/capture-figma`, `/pull-figma`. Evaluation = `docs/rubrics/`, graded by the `design-reviewer` subagent; `verifier` runs the gates.
- **Gates.** Run `/design-review` for visual work; run `/phase-check` at phase boundaries (it ticks `STATUS.md`). A task isn't done until lint + typecheck + test pass.
- **Compounding.** Capture non-obvious calls with `/compound decision`, workflow/craft learnings with `/compound lesson`, and a handoff note at the end of a large change with `/compound session`. A lesson that recurs gets promoted to a rule here in `CLAUDE.md`.
- **Full reference.** `docs/knowledge/HARNESS.md` documents every piece (skills, commands, subagents, rubrics, MCP servers) — what it's for, how to use it, and how to extend it.

## Phasing

Build in order. Do not jump ahead. Each phase has acceptance criteria in `ROADMAP.md`.

- **Phase 0** — Scaffold, tokens, mock data, all screens stubbed, clickable end to end, one Playwright test green.
- **Phase 1** — Real flow content. Simple drag-and-drop sorting into bins (no conveyor animation yet). Working scoring engine. Results screen with three role cards. **This is the first build put in front of users.**
- **Phase 2** — The conveyor scene, the robotic-arm interaction, the robot-build payoff. The "feel" pass.
- **Phase 3** — Polish, copy, sound, mobile responsiveness, light a11y, Figma sync.

Phase 1 ships a working flow. Phase 2 gives it soul. Protect that order so users always have something to react to.

## Hard rules

- Never invent the ARM role taxonomy. There are exactly three role families: **Robotics Integrator, Robotics Specialist, Robotics Technician.** Their competencies are fixed mock data in `/src/data`. Do not add or rename roles.
- Never make the result a single prescriptive role. Always a weighted match across all three. See `PRD.md` scoring section.
- Never use the neon palette from early brainstorm docs. Palette is defined in `DESIGN_SYSTEM.md` and the `@theme` block in `src/styles/globals.css`.
- Never add a screen, step, or feature not described in `PRD.md` without flagging it first.
- When in doubt about scope, content, or direction, stop and ask. The user is driving and prefers to be consulted before you expand scope.

## Doc map

- `PRD.md` — what we're building and why, screen by screen. The spec.
- `CONTEXT_BRIEF.md` — the research story, compressed. The why.
- `DESIGN_SYSTEM.md` — tokens, components, motion, the Goose-game-meets-ARM visual direction.
- `ARCHITECTURE.md` — stack rationale, file structure, state, scoring engine, the future 3D path.
- `DATA_MODEL.md` — every schema: roles, competencies, interests, archetypes, scoring, session state.
- `ROADMAP.md` — the phases with verifiable acceptance criteria.
- `docs/knowledge/` — living project memory: status, decisions, lessons, case study, session handoffs. **Read `STATUS.md` first each session.**
- `docs/rubrics/` — design-quality rubrics the `design-reviewer` subagent grades against.
- `README.md` (root) — teammate onboarding + MCP/toolchain setup.
