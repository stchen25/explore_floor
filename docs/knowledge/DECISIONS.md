# Decisions

ADR-lite log of non-obvious calls. Newest first. One entry per decision: **what · why · alternatives · affected**. Capture with `/compound decision`.

This is the highest-value handoff artifact: when ARM's dev team (or future-you) asks "why is it like this?", the answer lives here.

---

## 2026-05-29

### D-011 — Defer the live RC.org capture until aesthetic-rubric authoring
- **Decision:** Don't scrape/screenshot RoboticsCareer.org yet. Capture it (Firecrawl + Playwright) when we author the aesthetic/design-system rubrics, ~Phase 1.
- **Why:** RC.org's brand tokens are already in `DESIGN_SYSTEM.md` verbatim; a live capture mainly grounds the *aesthetic* rubric and the before/after narrative, which we don't need until visual work starts.
- **Alternatives:** Capture now (rejected — premature); skip entirely (rejected — loses before/after + rubric grounding).
- **Affected:** `docs/rubrics/goose-game-aesthetic.md` (carries a TODO to add RC.org reference stills).

### D-010 — Motion skills via the free MIT community package (no Motion+)
- **Decision:** Install Motion (Framer) agent skills from `C-Jeril/framer-motion-skills` (MIT). Do **not** use `npx motion-ai`.
- **Why:** The official Motion AI Kit requires a paid Motion+ subscription, which we don't have. The community skills are free, open-source, Claude-Code-compatible, and cover our surface (components, variants, gestures, layout/shared transitions).
- **Alternatives:** `npx motion-ai` (rejected — paywalled); no Motion skills (rejected — leaves a gap vs GSAP).
- **Note:** It references legacy `framer-motion` imports; we use `motion/react`. Identical API; our `scene-motion` skill is authoritative for conventions.
- **Affected:** `README.md`, `.claude/skills/scene-motion`, toolchain setup.

### D-009 — Declare project MCP servers in `.mcp.json` for onboarding
- **Decision:** Add `figma` (remote HTTP), `playwright`, `firecrawl` to `.mcp.json`.
- **Why:** A teammate cloning the repo has none of the owner's global plugins; project-scoped servers get them productive immediately.
- **Alternatives:** Rely on each person installing plugins (rejected — slow onboarding, undocumented).
- **Affected:** `.mcp.json`, `.env.example`, `README.md`.

### D-008 — Knowledge lives in-repo; mirror durable facts to built-in memory
- **Decision:** `docs/knowledge/` is the version-controlled source of truth; a few durable agent-preference facts are mirrored into Claude built-in memory.
- **Why:** In-repo knowledge is reviewable in diffs, travels to the ARM handoff, and seeds the portfolio case study. Built-in memory adds auto-recall without re-reading files.
- **Alternatives:** Built-in memory only (rejected — invisible to handoff/portfolio).
- **Affected:** `docs/knowledge/*`, built-in memory.

### D-007 — Build a bespoke harness; don't install the BilLogic plugin
- **Decision:** Author our own harness. Borrow only the BilLogic plugin's five-layer frame and its rubric YAML+prose schema. Cut its heavy ritual (SHA-256 rule-consent, `ideations/`/`preferences/` taxonomy, `hd-config.md`, auto-generated reports).
- **Why:** The plugin is more prescriptive than we want; authoring our own is leaner, fits the project, and is the stronger portfolio story (a practice we built, not installed).
- **Alternatives:** Install the plugin wholesale (rejected — prescriptive, generic).
- **Affected:** `.claude/`, `docs/knowledge/`, `docs/rubrics/`.

### D-006 — Allow demo affordances despite "no undocumented steps"
- **Decision:** Permit a `?demo=true` pre-filled-results mode and a hidden skip-to-results link (Phase 3 tooling).
- **Why:** Demos and user-test setup are much faster with them; they're not user-facing flow steps.
- **Alternatives:** Strict adherence to the PRD screen list (rejected — friction for demos).
- **Affected:** `PRD.md` §14 (note added), `ROADMAP.md` §4.5/§4.7.

### D-005 — Remove project timeframes from the docs
- **Decision:** Strip schedule estimates (phase durations, "six weeks") from `ROADMAP.md`/`PRD.md`. Keep UX/animation timings.
- **Why:** Work ships when acceptance criteria are met, not on a fixed calendar; the dates added noise and false precision.
- **Alternatives:** Keep estimates (rejected — not how this project actually runs).
- **Affected:** `ROADMAP.md` §0, `PRD.md` §3.

### D-004 — Landing scene gets a Phase 1 GSAP `DrawSVG` reveal
- **Decision:** Move the landing-scene entrance animation earlier — a gentle `DrawSVG` reveal in Phase 1 as a low-risk test of the scene-animation approach (was "no animation yet").
- **Why:** Cheap to do, de-risks the GSAP path before Phase 2 leans on it heavily.
- **Affected:** `DESIGN_SYSTEM.md` §10.3, `ROADMAP.md` §2.1.

### D-003 — Vitest is part of the stack and `pnpm test`
- **Decision:** Name Vitest explicitly alongside Playwright (`CLAUDE.md` stack + verify); `pnpm test` = Vitest units + Playwright E2E.
- **Why:** The scoring engine and other pure functions need fast unit tests; `CLAUDE.md` had under-stated this.
- **Affected:** `CLAUDE.md`.

### D-002 — Standardize the file-size re-check threshold at ~250 lines
- **Decision:** Use ~250 lines across all docs as a soft "re-check responsibilities" signal (not a hard limit).
- **Why:** `CLAUDE.md` said ~200 and `ARCHITECTURE.md` said ~250; one number, framed as steering against drift.
- **Affected:** `CLAUDE.md`.

### D-001 — Innovator archetype max = 27; scoring normalizes per archetype
- **Decision:** The Innovator weight column sums to **27** (not the previously stated 24). Document the true sums (Builder 22 / Innovator 27 / Architect 25) and the fact that maxes need not be equal.
- **Why:** The scoring engine normalizes each archetype against its **own** max (`raw[A]/max[A]*100`), so unequal maxes don't favor any archetype. The "balanced maxes" claim was both numerically wrong and conceptually unnecessary. Chose to fix the docs, not re-tune 24 weights (it's a prototype; the dev team owns real tuning).
- **Alternatives:** Re-tune weights so Innovator = 24/25 (rejected — busywork with no scoring benefit).
- **Affected:** `DATA_MODEL.md` §3 (×2) + §15; relevant to Phase 0 `items.ts` + the Vitest sanity check.
