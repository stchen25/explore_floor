# Handoff — Phase G results polish COMPLETE (Claude Design realignment), 2026-06-30

**Read after `STATUS.md`.** This closes out the Phase-G polish pass that
`2026-06-30-phase-G-polish-handoff.md` left ~70% done. The remaining work is finished, all gates
are green, and a graded `/design-review` passed both rubrics with zero p1/p2. Everything is in the
**working tree, uncommitted** (branch `narrative-v3-realign`) — Caelan commits.

## What this session finished (the remaining ~30%)

- **E2E specs (R1)** — only one assertion was actually broken by the prior nav changes:
  `tests/e2e/narrative.spec.ts:196` `back-to-map` → **`explore-role`** (the cards control after the
  map path is now the forward "Explore {role} careers" dive, not a back-to-map). `job-overview-back`
  survived (testid unchanged), the chip-DOM refactor broke nothing, the other two specs were
  unaffected. Fixed + comment updated.
- **Quiz-intro motion (R2, the one untouched plan item)** — the "weird" feel was a **vertical jump**:
  `FlowRunner`'s `<main>` was `justify-center`, so swapping different-height MC questions re-centered
  the column and the card jumped (the horizontal slide didn't mask it). Fix: **top-anchor the MC steps**
  (`justify-start pt-space-7`) while **keeping scenes centered** so the liked scene slide-up morph is
  untouched. Verified by geometry: the question card top is rock-stable at 124px across 2- and
  4-choice questions; scenes stay centered (space above == below) and still slide up on Continue.
  Matches the reference (its intro screeners sit under the header, not vert-centered).
- **Constellation glow + labels (R4)** — at-rest star glow strengthened to layered
  `drop-shadow(0 0 5px) drop-shadow(0 0 12px)` (the single low-alpha 7px pass barely showed);
  non-dimmed node labels now tint with the role `accent.textSoft` (per the reference) so the ring
  reads as one role's constellation. Both confirmed in screenshots.
- **Trajectory clipping (R3, a real bug found in the visual pass)** — the side-pill branch labels
  overflowed the `overflow-hidden` panel (worse for Integrator's longer names). Rebuilt the labels as
  **centered** (senior above its node, branches + current below) so they can't clip at any length;
  also shortened the long placeholder branch/senior names in `exploreContent.ts`. Reads cleanly as a
  branching climb (lit-teal lower edges → grey upper edges).
- **Chips one-line (R3)** — confirmed one line on the cards hero and the narrower compare column;
  tuned the call site to `maxChars:40, maxCount:2` so two short chips usually show while the row
  stays one line.
- **Design-review p3 fixes (R5)** — **job-overview header** now matches the `.dc.html`: a
  **`tierLabel` level pill** ("Entry level / Mid level / Planning", new field on `RoleDetail`) on the
  right of the title, title bumped `text-h3` → `text-h2`. Stale "easing on-token" comment in
  `ConstellationNode` corrected (the float/twinkle use a deliberate symmetric `'easeInOut'`, not the
  token). Placeholder job `specialist[0]` "Robotics Specialist" → **"Robotics Programmer"** so the
  constellation doesn't read role == job.

## Verified state

- Gates: `pnpm lint`, `pnpm typecheck`, **80 unit**, **3 E2E**, `pnpm build` — all green.
- `/design-review` (design-reviewer subagent, against the `.dc.html`): **PASS on both rubrics, zero
  p1/p2.** Remaining p3s are either fixed (above) or deliberately left: the trajectory panel's
  decorative literals (faithfully reproduce the handoff's fixed gradient/pills — documented in-file),
  and the "gold = Technician vs gold = my-pick" overlap (latent watch-item, only surfaces on a
  Technician-top result).
- Screens re-verified by screenshot (1440×900, blur stripped for capture): intro top-anchor, cards
  hero, why-expanded, compare (default + Integrator), map, constellation, job overlay, all three
  job-overview tabs, full trajectory, and the fromMap "Explore {role} careers" cards.

## Not done on purpose / open

- **Two results-screen rubric items couldn't be graded** from a Specialist-top capture:
  `technician-is-a-rung` (p1 framing) and `low-signal-graceful` (p3). They're **structurally
  supported** (the entry-Technician `pathUp` callout, the trajectory climb, bridge programs, the
  "Our take" lower-barrier lean) but want a **Technician-top result capture** to grade the framing
  live. Worth a follow-up review pass seeded to a Technician-top result.
- **Dev-only "skip to results"** control (`devSeedResults`, `import.meta.env.DEV`) on the Landing is
  still present — it does not ship to production builds. Left in for iteration; remove if desired.
- **Responsive story** for the desktop-first constellation + map is still a Phase-G/-future item
  (the panels are tuned for ≥ md).
- Content under the job-overview / trajectory / fit narrative is still **placeholder marked for ARM**
  (`docs/reference/Job_Program_Data_Request.md`); shapes are final.

## Files touched (all in working tree)

`tests/e2e/narrative.spec.ts`, `src/screens/Flow/FlowRunner.tsx`,
`src/screens/Results/cards/{ConstellationNode,ConstellationField,TrajectoryViz,WhyYouMatched,JobOverview}.tsx`,
`src/data/{exploreContent,roleDetails,jobs,types}.ts`. (Plus the prior session's uncommitted set.)
