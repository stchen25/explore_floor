# Ecosystem plan: design-system run, UX repo, harness template, Figma

_Proposal for discussion, 2026-07-01. Grounded in a multi-agent read of both repos, the two career_dashboard UX branches, the Figma files (live MCP verification), and the Capstone planning docs. Companion to `DESIGN_SYSTEM_RUN.md` (the standing queue) and `REMAINING_WORK.md` (the router)._

> **RATIFIED 2026-07-02 (D-035).** The direction holds; this doc is now the rationale archive. Execution lives in **`ECOSYSTEM_RUN.md`** (single-session passes — Caelan's restructure of the §6 sequence). Pass 1 is done: the 10 expiring assets are rescued into `robotics_career/public/figma-assets/` + manifest. Flag §7.1 is resolved: the deletions were intentional, nothing to recover, and **the ARM UI-kit handoff is the Figma files alone** (revises REALIGNMENT §10's artifact list). Flags §7.2–7.4 (Kayla, the capture gate, the repo name) remain open and are tracked in the run sheet.

**The short version.** Go on the `rc-design-system` package, scoped tokens-first, because the UX repo you want to excavate is exactly the consumer REALIGNMENT §10 designed it for. Sequence: rescue the expiring Figma assets this week (hard deadline ~July 7), stand up the package (about a day), excavate the two branches into the new repo on `@rc/ui` from the first commit, hand-port the harness in one session (no template repo before handoff), then run the Figma work: no token-consolidation campaign needed here (explore_floor's sprawl is low), just a half-session cleanup, dark tokens published into the DS library, and a new Interest Quiz Figma file. All the infrastructure fits in roughly the first week of the 20 days left before July 21.

---

## 1. What changed today (the facts that reshape the questions)

**The two branches are the "three unborn prototypes," already born.** `origin/homepage-and-explore` (47d41b9, +2,836 lines, 17 files) and `origin/sign-up-flow` (6a70826, +1,169 lines, 11 files) were pushed by Kayla this morning (11:52 and 12:12, the first co-authored by Cursor), both forked from dashboard main's 6-30 tip. Together they cover, name for name, the three prototypes `Prototype Planning/UI UX Improvements.md` lists and REALIGNMENT §10 step 6 calls the package's "largest payoff": Homepage, Sign-Up Flow, Explore Jobs/Trainings. "Search" is the Explore page (the nav search navigates to `/explore?q=`, no separate screen). Neither branch appears anywhere in career_dashboard's knowledge layer.

**They only work as a pair.** Each imports files that exist only on the other (`App.tsx` imports `@/screens/auth`; `AuthLayout.tsx` imports `TopNavV2` from `@/shell`). Their file sets are fully disjoint, so merging the two together is clean with zero conflicts. Excavation must take both.

**They're near-standalone already.** The marketing/auth surface renders entirely outside the dashboard board and touches zero Zustand stores, no dashboard widgets, no `@/lib`. The full dependency surface on dashboard main: `Icon.tsx`, `competencies.ts` plus one type, the `globals.css` tokens, the fonts, and one new npm dep (`react-simple-maps`). It's the RC.org public-site light theme expressed in the dashboard's kit tokens, nothing shared with this repo's dark theme.

**Hard deadline inside the branches: ~July 7.** Ten hot-linked `figma.com/api/mcp/asset/...` URLs (hero background, quiz image, logos, FAQ icons) were captured June 30 and are valid about 7 days. When they expire, the Landing page loses its imagery. The sign-up branch dodged this by inlining SVGs; the homepage branch didn't.

**The designs live in a fourth, unregistered Figma file.** Branch comments name it: "RC.org Prototype" (nodes 815:3564 NavBar, 815:3201 homepage, 796:1949 competencies, 555:1262 sign-up filter panel). The same file holds the June 22 quiz results hi-fi mockup (360:1018). Its file key is recorded nowhere in either repo or the Capstone folder, and it is none of the three registered files (we verified the nodes miss in all three via MCP).

**Today's Finder reorg deleted things worth confirming.** Between ~13:03 and 13:30 today, `RC_Proto`, `style_guide` (the Angular `rc-ui-kit`), `Floor_Explore_v1_superseded`, and `career_dashboard_design` disappeared from `Prototypes/`, the Trash is empty, and an empty `robotics_career/` dir appeared at 13:09 (presumably the intended UX-repo home). Two flags: REALIGNMENT §10 names the Angular `rc-ui-kit` under `style_guide/` as one of the July 21 handoff artifacts, so if that deletion wasn't a deliberate move-with-backup it matters; and `Capstone/CLAUDE.md` still describes RC_Proto as the active homepage sandbox, now stale. If the reorg was intentional (the branches functionally supersede RC_Proto), both are quick fixes, but say so before we treat them as settled.

**Kayla's code needs a hygiene pass before any Figma sync.** About 90 hard-coded hex literals, almost all token values pasted instead of token names (20× `#E0E0E0` = border, 17× `#595959` = ink-2, etc.), a `font-montserrat` class that doesn't exist as a token (silently renders Roboto), and a stray `;;`. It also mirrors the live site's content, not ours: the Landing role tabs show the old four categories (Operate/Repair/Program/Plan) and a "NOW FEATURING AI ROLES" hero badge. That's faithful live-site recreation, but it sits against the three-role hard rule and needs a mirror-vs-reconcile decision before handoff.

---

## 2. Q1, the design-system run: go, scoped tokens-first

**Recommendation: make the go/no-go call a go, but scope it.** Stand up `caelar/rc-design-system` now with the backbone only: the kit `@theme` (lifted from career_dashboard's `globals.css`, which is canonical and just stabilized after D-044/D-045), this repo's additive dark extension (D-029: two dark surfaces, the on-dark text ramp, glass, role derivatives), a flattened `tokens.css`, fonts, `base.css`, the real `package.json` exports map from §10, the shared-foundations `FIGMA_MAP.md` (the DS-library variable-to-token table) moved in per §10 (per-project maps stay in each repo), and `Icon` as the first atom (the UX screens need it day one). Distribute as the git dependency `"@rc/ui": "github:caelar/rc-design-system#v1"` per §10's ranking. That's about a day of mostly mechanical work.

**What moves later in the queue:**

- **The full atom tier** (CtaButton, Chip, StatusPill, Ring, Meter, MetaRow, Card/CardHead): second pass, after the UX repo is running. The branches built their own buttons and form controls, so nothing blocks on these.
- **Step 5 consumer conversion** (repointing career_dashboard and explore_floor at the package and deleting their local token authorship): stretch goal, only if the last week is calm. Both repos are green and effectively frozen for handoff; conversion has real regression risk and zero client-visible payoff, since Fivestar receives the Figma file and prototypes, not our import statements. This consciously accepts that the two existing repos may keep local authorship through handoff. The package still exists and the UX repo is born on it, so the §10 warning ("the package never happens") is answered either way.
- **The Claude Design esbuild atoms bundle**: see §5. Default to the conscious skip.

**Why go at all, given you've deferred it twice?** Because the trigger changed. D-024 and D-029 deferred the package when the only payoff was retiring duplicate token authorship, and kit-aligning in-repo was faster. Today there's a third repo about to exist. Without the package it either copies `globals.css` (a fifth token source, the exact sprawl §10 exists to prevent) or imports nothing and drifts. With it, the excavated repo is "born on-system," which §10 always called the largest payoff. The Claude-Design-ingestion framing you mentioned is real but it's the smallest slice of the package's value now; the token backbone for the UX repo is the big one. So yes, this folds into the excavation rather than competing with it. It goes first because it's the foundation.

---

## 3. Q2, the UX repo excavation: package first, then excavate onto it

**Recommendation: stand up the package (day 1), then excavate both branches together into the new repo as its first consumer (day 2).** Not the other way around, and not excavate-then-retrofit: retrofitting tokens into a repo that already copied them is exactly the churn the one-day package avoids.

**Destination.** The empty `Prototypes/robotics_career/` you created today, renamed if you want something sharper (`rc_ux`, `rc_site`). It needs `git init` and a GitHub remote; nothing exists under `caelar/` yet for it (verified by remote probes).

**Mechanics** (from the branch deep-read; roughly a day, plus the half-day token pass in step 5):

1. **Rescue the assets first, even before the repo exists.** Download the 10 expiring Figma asset URLs into `public/` on the branch or during excavation. This is an hour of work with a ~July 7 deadline and it protects Kayla's build regardless of what else we decide.
2. Merge the two branches (clean, zero conflicts) in a scratch worktree; copy over: config files (new dev port; the dashboard pins 5180 and this repo 5174), a trimmed `package.json` (drop zustand and vitest, nothing uses them; add `react-simple-maps`), `competencies.ts` + its type, `src/shell/`, `src/screens/{Landing,Explore}.tsx`, `src/screens/auth/*`, and a fresh minimal `App.tsx` with only the marketing and auth routes. Tokens, fonts, and `Icon` come from `@rc/ui` rather than local copies; that's the point of going package-first.
3. Stub the dashboard seams: the `/dashboard` back-links in Profile/Saved (those screens stay behind), and the sign-up completion `navigate` target.
4. Vendor or accept the `us-atlas` CDN topojson for the Explore map.
5. **Tokenize Kayla's hex literals (about half a day, mostly mechanical 1:1) before any Figma capture from this repo**, so captures bind to variables. Fix `font-montserrat` → `font-heading` while in there. This is the mini version of the dashboard's DEF-008, at 1/6 the size.
6. Run the gates. The branch code has never been through lint/typecheck/tests (the stray `;;` and undefined utility suggest it wasn't).

**What not to do: merge the branches into career_dashboard main.** It would couple the marketing site to the dashboard repo, and the branch's `competencies.ts` renames ripple into dashboard widgets and its data-integrity tests. Leave the branches in place untouched for provenance and let the new repo be their home.

**Coordinate with Kayla before excavating.** The branches are undocumented, so her intent (merge to dashboard main? already meant as excavation seeds?) is unrecorded. She also holds the "RC.org Prototype" file key we need (§5). And the content questions in her Landing (four categories, AI-roles badge) are hers to weigh in on.

---

## 4. Q3, the harness template repo: yes eventually, not now

**Recommendation: don't stand up a template repo before handoff. Hand-port the harness into the UX repo in one session, and extract the template afterwards as a post-handoff/portfolio artifact.**

The research settled the scoping question: the two harnesses are ~85% identical, the port has been done twice (explore_floor → dashboard on 6-01, conventions flowing back since), and the 6-01 port took exactly one session of deliberate re-authoring, not copying. A template repo saves that one session on the fourth-plus project. With 20 days to handoff and zero client value in the template, building it first would cost the UX repo a day to save a fraction of one.

**For the UX repo port, take the best-of-both, which is now mapped:**

- career_dashboard's versions of `capture-figma.md` / `pull-figma.md` (FIGMA_MAP-aware, a full generation newer than this repo's) and `phase-check.md` (has the spec-consistency step this repo's lacks).
- The twin 7-01 token-slimdown conventions (STATUS snapshot, DECISIONS index, guard hook), using the dashboard's STATUS shape and guard thresholds (simpler, shape-agnostic).
- This repo's root `README.md` onboarding/harness sections (the dashboard has no root README at all).
- Regenerate per-project: the two skills (a data-discipline skill for the inline mock content, an interaction skill only if the repo grows a footgun), the taste rubrics beyond design-system-compliance, and the seeded FIGMA_MAP.
- `settings.json` ships nearly as-is; no `.mcp.json` by policy (D-012); skill packs are a human install (`npx skills add`, L-002).

When we do build the template, the full artifact-by-artifact classification (ship-as-is / placeholder / regenerate) and a 13-question init interview are already drafted from this research; the port session for the UX repo doubles as its final proving ground. Worth capturing then as its own small repo with a `/init-harness` command.

---

## 5. Q4, Figma: no consolidation campaign here, dark tokens to the DS library, one new file

**First, the question you actually asked: does explore_floor need the dashboard-style token-sprawl reduction before syncing? No.** The audit verdict is low sprawl on every axis, and the numbers are stark: 5 arbitrary Tailwind values in the whole repo against the dashboard's ~550 pre-pass, zero inline hex, spacing 100% on the token scale, all colors token-routed through `categoryAccent.ts`. The dashboard needed a 14-session campaign because its Phase-4 port bypassed the token system (L-004); this repo was built token-first and shows it. What it needs instead is a half-session pre-sync pass:

- Fix the two faux-600 `font-semibold` sites (no 600 face is loaded, the exact bug class the dashboard's L-011 fixed) and the `SceneSortView` animated `fontSize` literals.
- Reconcile two doc drifts via `/revise-doc`: `DESIGN_SYSTEM.md` §7 still documents the old Material triple-stack shadows (code moved to kit soft tiers), and §2's Figma mapping omits the entire dark system, about 30 tokens. The doc gap is the actual sync blocker.
- One preference call: the ~18 Tailwind-default sizing steps (`h-9`, `h-10` control heights). Recommend ratifying them as raw rather than minting control-height tokens; the dashboard precedent exists if you'd rather name them.

**The Figma reality we verified live** (MCP, authenticated as you):

| File | Key | State |
|---|---|---|
| Design System (library) | `afi5Q5nFtcnT9HJ04Cbylg` | Live and healthy: 25 text styles verified exactly, 73/81 variables directly observed, published, subscribed by the dashboard file. Single mode, no dark anything (darkest value `#262626`; its On Dark/On Glass alphas differ from our glass ramp). |
| Dashboard (mirror) | `7t46ROAv93lIQRspgaslgz` | Live, matches FIGMA_MAP §7. The handoff artifact for the dashboard side. |
| RC-CC (this repo's "canonical") | `yGDi4yDtptKttboTYV8on7` | Effectively dead via MCP: one blank Cover reachable, zero variables, subscribes to a different "Design System (Ripped)" library. Predates the dark re-architecture entirely. |
| "RC.org Prototype" (unregistered) | unknown | Holds Kayla's homepage/sign-up/explore designs and the June 22 quiz hi-fi mockup. Key recorded nowhere. |

The dark theme exists only in `globals.css`. No Figma file anywhere carries `#1B1B1B`, `#292929`, or the glass ramp.

**Recommendations, in order:**

1. **Publish the dark extension into the DS library as additional named variables, not a second mode.** The code models dark as distinct additive tokens (D-029), not a light/dark toggle, so distinct variables (`Dark Canvas`, `Dark Surface`, the on-dark text ramp, the glass set, the role glow derivatives) are the faithful mapping, they follow the §3.5 lineage discipline the library already uses, and they sidestep any tier limit on modes. This makes the handoff library "the kit, completed" for both light and dark surfaces.
2. **Create a new "Interest Quiz" Figma file in the ARM team, subscribing to the DS library, and capture the final dark screens there.** RC-CC isn't worth resuscitating: retire its "Figma wins for tokens" claim in `DESIGN_SYSTEM.md` §1 (stale in practice; the declared one-way code-outward flow already supersedes it) via `/revise-doc`. The capture is currently team-demand-gated per `DESIGN_SYSTEM_RUN.md` §2, but the July 21 package owes "a Figma file" and hi-fi mockups, and the quiz side currently has zero captured final screens (the only quiz mockup is the June 22 hi-fi in Kayla's file, which predates the final build). Recommend confirming with the team once, then defaulting to capture. Doing it means porting the dashboard's FIGMA_MAP-aware `/capture-figma` first and seeding a small per-project FIGMA_MAP for this repo.
3. **Register "RC.org Prototype."** Get the file key from Kayla, record it in the UX repo's FIGMA_MAP as that project's per-project file (design source and capture target both; it's already where the team works). The split stays exactly the dashboard's proven shape: foundations and shared primitives in the DS library, screens in the per-project file, per repo.
4. **Claude Design.** For the UX refinement loop you want, reuse the dashboard's `.design-sync` pattern: a tokens-and-styles bundle sourced from the package into a Claude Design project for the UX work. Mind the standing do-not-merge rule: the "RoboticsCareer.org Design System" project (`8686032d…`) is the live-site recreation with its own token names; the kit-aligned refresh vocabulary must not be pushed into it. For the §10 esbuild real-atoms bundle, default to the conscious skip: the screens you'll refine have their own components, so the bundle isn't on the critical path, and §10's fallback (static preview cards) is there if atom ingestion turns out to matter after all. That's a deliberate override of §10's "no part to hold" framing, on the grounds that the UX-screens loop is the actual Claude Design value now.

---

## 6. The sequence against July 21

Twenty days out. Infrastructure fits in week one; the point of all of it is to buy weeks two and three for actual design work and handoff assembly.

| When | What | Size |
|---|---|---|
| Now (before ~July 7) | Rescue the 10 expiring Figma assets into `public/` | ~1 hr |
| Week 1 | Stand up `rc-design-system` (tokens + fonts + base + Icon, exports map, FIGMA_MAP moved in) | ~1 day |
| Week 1 | Excavate both branches into `robotics_career` on `@rc/ui`; stub seams; gates | ~1 day |
| Week 1 | Hand-port the harness into the UX repo (best-of-both selections above) | ~1 session |
| Week 1 | Tokenize Kayla's ~90 hex literals; fix `font-montserrat`; content flags to Kayla | ~0.5 day |
| Week 1–2 | explore_floor pre-sync pass (font weights, §7/§2 doc reconcile) | ~0.5 session |
| Week 2 | Dark variables into the DS library; create the Interest Quiz file; port `/capture-figma`; capture the dark screens | ~1–1.5 days |
| Week 2–3 | The actual work: UX refinement loop with Claude Design; quiz handoff prep (`HANDOFF_GUIDE.md` items: data swap when ARM answers, role-name confirmation, `devSeedResults()` removal) | the rest |
| If calm | Step 5 consumer conversion; atoms tier; esbuild bundle | stretch |

---

## 7. Flags and things only you can answer

1. **Confirm today's deletions were intentional and backed up**, especially `style_guide/` (the Angular `rc-ui-kit` is named as a July 21 handoff artifact in REALIGNMENT §10's Fivestar guardrail). RC_Proto's plain-CSS baseline is otherwise recoverable only in fragments from a session transcript. Also `Capstone/CLAUDE.md` still calls RC_Proto active and needs its folder-map lines refreshed either way (that edit belongs to a Cowork session, per its scope note).
2. **Kayla**: her intent for the branches, the "RC.org Prototype" file key, and the Landing content questions (four-category tabs, AI-roles badge) before handoff.
3. **The team-demand gate** on capturing the quiz's final dark screens into Figma: one quick confirmation, then we default to capture.
4. **Repo name**: keep `robotics_career` or rename before `git init`.
5. Standing `REMAINING_WORK.md` items unaffected by this plan: the ARM per-job/bridge content swap (high, blocked on ARM), the Fivestar role-name confirmation (medium, needs an owner), `devSeedResults()` removal before handoff.

_(Update 2026-07-02: all of this landed — D-035 records the go, `DESIGN_SYSTEM_RUN.md` and `REMAINING_WORK.md` are repointed, and `ECOSYSTEM_RUN.md` is the execution ledger.)_
