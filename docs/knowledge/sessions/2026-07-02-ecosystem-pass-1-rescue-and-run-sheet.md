# 2026-07-02 — Ecosystem run Pass 1: asset rescue + run sheet + GO bookkeeping (D-035)

**Resume here.** The ecosystem plan is ratified and running as single-session passes. Pass 1 (this session) is done. **Next: Pass 2 — stand up `rc-design-system`**, fully specced in `docs/knowledge/ECOSYSTEM_RUN.md` (file tree, exact package.json, token-merge table, gates). Open the run sheet and execute; no re-derivation needed. Before Pass 3, Caelan coordinates with Kayla (branch intent, the "RC.org Prototype" Figma file key, Landing content calls).

Branch `narrative-v3-realign`. Docs-only in this repo; no code touched, gates unaffected.

## What shipped

**Asset rescue (the ~July 7 deadline item).** The 10 hot-linked `figma.com/api/mcp/asset/...` URLs on `career_dashboard` `origin/homepage-and-explore` (Kayla's homepage branch; captured ~06-30, ~7-day validity) were downloaded into `Prototypes/robotics_career/public/figma-assets/` — 3 PNG (hero background 710KB, quiz image 2.7MB, testimonial avatar) + 7 SVG (quote mark, 4 FAQ icons, ARM footer logo, RC nav logo), all verified non-empty with `file`-types matching their content-types. `MANIFEST.md` beside them maps URL id → filename → source constant (`HERO_BG` etc. in `Landing.tsx:73-76,230-233`, `SiteFooter.tsx:4`, `TopNavV2.tsx:13`) so the Pass-3 excavation rewrites references mechanically. Kayla's branches untouched; `robotics_career/` is still a plain directory (git init happens at excavation).

**`ECOSYSTEM_RUN.md` — the pass ledger.** New doc, the execution companion to `ECOSYSTEM_PLAN.md`: seven passes + stretch, each with goal/prereqs/steps/exit gates, sized to one session, statuses ticked as they complete. It persists this session's research so later sessions start cold: the career_dashboard extraction survey (133-token canonical `@theme`, 5 woff2 fonts, React-only `Icon`, FIGMA_MAP §1–§6 shared vs §7–§8 dashboard-specific), the 27-token dark append set from this repo's `globals.css` (with the two required `-on` rewrites `var(--color-white)` → `var(--color-on-cta)` and the judged exclusions), and the full Pass-2 package design (tsup + committed dist, exports map, Mode A/B Tailwind consumption, the two verification gates).

**Bookkeeping (D-035).** The GO recorded with scope (tokens-first; atom tier later; consumer conversion stretch-only). `DESIGN_SYSTEM_RUN.md`'s go/no-go section answered GO with pointer to the run sheet; `REMAINING_WORK.md` router gained the ecosystem-run row and a High item for Pass 2 + Kayla coordination; `STATUS.md` Next-up repointed; `ECOSYSTEM_PLAN.md` header marked ratified (it entered git this commit — it was untracked).

**Rulings captured (Caelan).** (1) GitHub remote: install `gh` CLI at Pass 2 (`brew install gh`, interactive `! gh auth login`), create `caelar/rc-design-system` private. (2) Assets live in `robotics_career/public/figma-assets/`. (3) The 07-01 Finder deletions were intentional, nothing to recover — the Angular `rc-ui-kit` only seeded the Figma style guide, so **the ARM UI-kit handoff is the Figma files alone** (revises `archive/REALIGNMENT.md` §10's Fivestar-guardrail artifact list; ECOSYSTEM_PLAN flag §7.1 closed).

## Deliberately not done
- The `rc-design-system` stand-up itself (Pass 2 — next session; Caelan restructured the original one-big-session plan into passes for context economy).
- Parent `Capstone/CLAUDE.md` folder-map refresh (still names RC_Proto as the active sandbox) — a Cowork-session edit per its scope note.
- Everything Pass 3+ (excavation, harness port, hex tokenization, this repo's pre-sync pass, Figma work) — queued in the run sheet.

## Verification
Rescue gate: 10/10 files on disk, non-empty, types match the manifest. Knowledge-guard hook: DECISIONS index 38/38 in sync (a mid-edit warning fired between the two edits; final state clean). No code changes — lint/typecheck/test state unchanged from the last green run.
