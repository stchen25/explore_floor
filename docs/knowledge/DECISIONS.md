# Decisions

ADR-lite log of non-obvious calls. Newest first. One entry per decision: **what · why · alternatives · affected**. Capture with `/compound decision`.

This is the highest-value handoff artifact: when ARM's dev team (or future-you) asks "why is it like this?", the answer lives here.

---

## 2026-05-30

### D-015 — Phase 1 sort interaction is drag + tap only (no arrow-key/Enter mechanic)
- **Decision:** The Phase 1 Sort screen is sorted by **dragging the card into a bin or tapping a bin**. The bespoke "arrow keys to focus a bin, Enter to choose" mechanic (built then removed) is dropped. The two bins remain native `<button>`s, so basic keyboard operability (Tab to a bin, Enter/Space to activate) still exists for free — what's gone is the custom arrow-navigation layer.
- **Why:** User call during the Slice 1 checkpoint — the arrow/Enter layer added UI state and a focus model that didn't fit the intended drag-first interaction, and it foreshadows the Phase 2 conveyor where sorting is purely drag-off-the-belt. Native button semantics keep the experience keyboard-reachable without the bespoke layer.
- **Alternatives:** Keep the arrow/Enter mechanic (rejected per user); remove keyboard entirely incl. button activation (rejected — needlessly drops the free native a11y).
- **Affected:** `src/screens/Sort/Sort.tsx`, `src/screens/Sort/SortBin.tsx`; `ROADMAP.md` §2.2 (keyboard bullet) + the round-beat copy example. Full keyboard-nav polish remains a Phase 3 a11y item.

### D-014 — Phase 2 sort model: user drags parts off the belt; the arm assembles from the keep bin
- **Decision:** Refine the Phase 2 conveyor interaction. **The user drags interest parts directly off the moving belt into one of two bins set in front of the line (downscreen in 2D): "That's me" / "Not my thing." A robot arm then lifts each kept part from the "That's me" bin and assembles it onto the robot standing behind/above the belt.** A second arm — or a trash chute — clears the "Not my thing" bin (exact treatment is a Phase 2 authoring choice, TBD). This supersedes the earlier "user controls the arm to push items to bins" framing.
- **Why:** User's articulated vision at the Slice 1 checkpoint. Dragging parts directly is more legible and direct than puppeteering an arm; reserving the arm for *assembly* gives the robot-build payoff a clear, visible cause (kept part → arm → robot). Engine ownership stays clean: Motion owns the user's drag-off-belt gesture; GSAP owns the belt, the assembling arm(s), and the part-to-robot snap.
- **Alternatives:** User-controlled sorting arm (the prior doc model; rejected — indirect, more interaction-design risk); auto-sorting with the user only watching (rejected — removes agency, the core "half-real decision" the PRD is built on).
- **Affected:** `ROADMAP.md` §3.2/§3.3, `PRD.md` §5.2/§5.3, `DESIGN_SYSTEM.md` §10.3, `ARCHITECTURE.md` §5. Phase 2 builds to this model; Phase 1 stays the plain card-sort.

## 2026-05-29

### D-013 — Tailwind v4 (CSS-first): design tokens live in `@theme`, not `tailwind.config.ts`
- **Decision:** Phase 0 scaffolds on **Tailwind v4** via the `@tailwindcss/vite` plugin. The design-token source of truth is the `@theme` block in `src/styles/globals.css`; there is no `tailwind.config.ts` and no `postcss.config.js`/`autoprefixer`. Token **names are unchanged** (`arm-yellow`, `space-4`, `text-h1`, …) so the Figma-variable mirror and the tokens-not-literals rule are unaffected. Easing curves are mirrored into `@theme` (`ease-soft`/`ease-snap`); motion **durations** + the spring stay in `/src/lib/motion.ts` (v4 has no duration token namespace).
- **Why:** The user chose v4 explicitly during Phase 0 planning. v4 is the current major and a fresh scaffold pulls it by default; it moves tokens into CSS-first `@theme`, which is the idiomatic v4 model. Keeping token names identical preserves every downstream convention.
- **Alternatives:** Tailwind v3 with `tailwind.config.ts` (the original doc assumption; rejected per the user's call — would pin to the prior major); v4 in legacy `@config` compat mode loading a `tailwind.config.ts` (rejected — fights the v4 grain for no benefit once names are preserved).
- **Affected:** `src/styles/globals.css` (the `@theme` block), `package.json` (`tailwindcss@4` + `@tailwindcss/vite`, no postcss/autoprefixer), `vite.config.ts`. Docs reconciled to point at `@theme`: `CLAUDE.md`, `docs/ARCHITECTURE.md` §1/§3/§7, `docs/DESIGN_SYSTEM.md` §2/§8, `docs/ROADMAP.md` §1.2, `docs/rubrics/design-system-compliance.md`.

### D-012 — Don't ship a project `.mcp.json`; configure MCP servers globally (supersedes D-009)
- **Decision:** Remove the committed `.mcp.json`. MCP servers (`figma` / `playwright` / `firecrawl`) are expected to be configured globally (`claude mcp add` or an existing global setup). `.claude/settings.json` keeps `enabledMcpjsonServers` as a name-whitelist so a teammate with no global config can drop in their own local `.mcp.json` and have it auto-enable.
- **Why:** A project `.mcp.json` whose server names collide with the owner's global config caused duplicate-server issues in Claude Code. The app never depends on the file (it's dev-time tooling, not runtime), so removing it is the clean fix; the whitelist preserves the per-clone fallback.
- **Alternatives:** Keep `.mcp.json` and rename project servers to avoid collisions (rejected — churns the docs + still double-registers tools); `git update-index --skip-worktree` to keep it tracked but locally deleted (rejected — fragile, hides the file's absence from teammates).
- **Affected:** `.mcp.json` (deleted), `README.md`, `docs/ARCHITECTURE.md`, `docs/knowledge/HARNESS.md`. Historical refs in `STATUS.md` + the 2026-05-29 session note are left as-dated.

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

### D-009 — Declare project MCP servers in `.mcp.json` for onboarding — *superseded by D-012*
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
