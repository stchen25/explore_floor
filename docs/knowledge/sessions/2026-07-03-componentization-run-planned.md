# 2026-07-03 — Componentization run planned (D-041)

**Resume here.** The cross-file **Figma componentization pass** is ratified and specced: `COMPONENTIZATION_RUN.md` is the run sheet (6 passes, Pass 0 = audit + promotion registry, ratify with Caelan). Key rulings: one **nav mega set** (explore_floor's centered-search `AppHeader` wins; `Auth=in/out` variants; Kayla's `TopNavV2` retired; reference image at `docs/reference/nav-logged-out-target.png`), buttons standardized (lean two sets, ratify at Pass 0), dashboard chip sprawl consolidated, robotics_career's form family promoted, Icon name union in `@rc/ui`, quiz vocabulary local, no Figma-mode restructure for dark. Code atoms tier stays out of scope. Next action: **start Pass 0 in a fresh session** — Caelan will bring more nav screenshots/guidance. Earlier the same day: the n-s1 copy trim landed and the Interest Quiz eyeball pass was approved (this run is its one note, formalized).

## What happened

Caelan asked what the "componentize + variants" idea from his Interest Quiz eyeball pass would look like across the whole ecosystem. Three parallel read-only surveys (career_dashboard, robotics_career, rc-design-system) plus a local inventory produced the picture; Caelan then ruled on every cluster and asked for the run doc. No code or Figma changes this session — planning only, plus the doc set below.

## Survey detail (inputs for Pass 0)

The run doc's terrain table is the summary; this is the rest of what the surveys established.

**career_dashboard** (standalone; does NOT consume `@rc/ui`; tokens mirrored via Figma + FIGMA_MAP):
- Atom vocabulary in `src/components/`: `Icon`, `Chip` (tone×size×weight; absorbed retired GoldChip), `StatusPill` (sm/md) + `StatusControl` + `statusTones.ts`, `Meter`, `Ring`, `CompanyLogo`, `CtaButton` (primary/outline × lg/md), `CardLink`, `Card`, `CardHead`, `CardFooter`, `CardEmptyState`, `CardDismiss`, `MetaRow`, `SignalBand`; customize-mode affordances (`CornerBubble`, `SizeChip`, `WidgetCardControls`, `DashboardGrid`, `TrayDragGhost`) are app-specific. Shell: `TopNav`, `SecondaryNav`, `ProfileMenu`, `CustomizeControls`, `Footer`. 12 widget composites in `src/widgets/`.
- Its `docs/DESIGN_SYSTEM.md` §7 is the canonical component inventory (§7.6 = the DEF-013 shared-primitives tier); `docs/reviews/` holds the audit trail; DEF-012 logs the CardHead action-slot gap (SponsoredCard rebuilds a raw head).
- Figma: DS library `afi5Q5nFtcnT9HJ04Cbylg` (22 published sets, keys in its FIGMA_MAP §6) + Dashboard file `7t46ROAv93lIQRspgaslgz` (12 widget sets S/M/L; widgets do NOT instance the DS `Card` — §7 note).

**robotics_career** (consumes `@rc/ui` Mode A; zero local tokens):
- Shell: `TopNavV2` (273 lines; Light/OverHero scroll states; typewriter search), `SiteFooter`. Atom: local `Icon` copy (Kayla's 5 extra names, D-006 keep). Auth family in `src/screens/auth/shared.tsx`: `FormField`, `GoldButton`, `OAuthButton`, `CheckboxRow`/`RadioRow`, `StepFooter`, brand icons, + `AuthLayout`. File-internal: Landing (`CountUpStat`, `SectionLabel`, `GoldPill`, `OutlinePill`), Explore (`Chip`, `JobCard`, `FilterDropdown`, `AdvCheckboxRow`, `MapView` code-owned).
- Button divergence inside one repo: `GoldButton` / `GoldPill` / `OutlinePill` / `OAuthButton`.
- Figma: Captures file `F3GRK7HNLLtG48vPosyXKw` (pages Cover/Landing/Explore/Sign-up/Components; 12 screen frames + ~12 local masters, `TopNavV2` the only variant set; node IDs in its FIGMA_MAP §5). Kayla's file `k3AjijocJEmzrvlKTd9vJM` is pull-only. Icon-atom debt: ~33 raw `material-icons` spans, flagged by its own `design-system-compliance` rubric.

**rc-design-system** (`@rc/ui` v1, tag `v1`, 2 commits):
- Ships tokens (165 pairs, `theme.css` + generated `tokens.css`), fonts, `base.css`, and exactly one atom (`Icon`, 47 names). `dist/` committed on purpose. Consumers: Mode A (Tailwind CSS imports) / Mode B (flattened `styles.css`).
- **No harness** (no CLAUDE.md/STATUS/DECISIONS/.claude) — README + `conventions.md` + a FIGMA_MAP copied from the dashboard. The atoms-tier candidate list lives in `conventions.md` ("CtaButton, Chip, StatusPill, Ring, Meter, MetaRow, Card/CardHead — a later pass"); the step-0 store-free audit exists only in explore_floor's `ECOSYSTEM_PLAN.md` §10.

**explore_floor** (this repo): shared dir = `AppHeader`, `Button` (rounded-md, primary variant), `Icon`, `ProgressBar`, `SegmentedControl`, `SparkleStar`; ~30 screen-level pieces (results vocabulary: `Chip`, `StatBox`, `SignalBars`, `RoleTabs`, `RoleHero`, `CompareColumn`, `BridgeProgramRow`…; pill-shaped chrome lives in the results screens, not the Button atom). Interest Quiz file: 9 bound frames, zero components; two unpublished code tokens (`--color-text-subtle`, `--color-white`) will resurface as component fills.

## Docs landed this session

- **`COMPONENTIZATION_RUN.md`** (new) — the run sheet: rulings, nav spec, pass specs, contract notes, open questions.
- **`docs/reference/nav-logged-out-target.png`** (new) — Caelan's logged-out nav reference.
- `DECISIONS.md` D-041; `ECOSYSTEM_RUN.md` Stretch pointer updated; `REMAINING_WORK.md` router row; `STATUS.md` next-up/awaiting updated.

## State at end of session

- No `src/`, no Figma changes. Gates untouched (last green: lint / typecheck / 82 unit / 3 E2E at the n-s1 copy commit, `b10ba65`).
- Earlier same-day commits: `b10ba65` (copy trim), `452c4db` + `73b6b90` (bookkeeping); push `ad2020f..452c4db` landed.
