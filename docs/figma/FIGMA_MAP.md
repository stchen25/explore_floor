# FIGMA_MAP — the code ↔ Figma manifest

The durable record of this repo's Figma mirror: file keys, node IDs, variable IDs/keys, and the naming contract that binds React components to Figma components and `@theme` tokens to Figma Variables. This is the repo's replacement for Code Connect (Org/Enterprise-only; we're on Education). The `/capture-figma` and `/pull-figma` commands read this file first. Shape mirrors `career_dashboard/docs/figma/FIGMA_MAP.md` (D-038).

Status: **stood up in ecosystem Pass 7 (2026-07-02, D-038)** — the dark extension (24 variables + 2 effect styles) is created in the DS library, verified value-exact against `globals.css`, and **published** (Caelan's publish click, same day); the Foundations pages render the dark section; the Interest Quiz file lives in the ARM team project, subscribed to the library, and holds **reference stills of all 8 final screens** (§6). The editable, variable-bound screen rebuilds are the pass's recorded remainder (`ECOSYSTEM_RUN.md` Pass 7). **An ID here is ground truth; an empty cell means not yet built.**

## 1. Files

| File | Key | Role |
|---|---|---|
| Design System (library) | `afi5Q5nFtcnT9HJ04Cbylg` | The foundations authority, published as a team library in the ARM team (`team::1630989118127729295`). Kit-aligned light values (81 vars, registered in the dashboard's map §4–§6) **plus the dark extension this repo owns (§4–§5 below)**. |
| Interest Quiz | `pjgrRJS5YYII1iciW7Pak2` | **This repo's per-project file and capture target.** In the ARM team project, subscribed to the DS library (moved + enabled by Caelan, Pass 7). |
| RC-CC | `yGDi4yDtptKttboTYV8on7` | **Dead** (D-037: one blank cover, zero variables). Never capture into it, never cite it as a source. |
| RC.org Prototype (Kayla's) | `k3AjijocJEmzrvlKTd9vJM` | The UX repo's design source, **pull-only** — registered and governed in `robotics_career/docs/figma/FIGMA_MAP.md`, listed here only so no session mistakes it for a capture target. |

## 2. The naming contract

- **Components:** PascalCase React component name = Figma component (set) name. `RoleCard.tsx` ↔ component set `RoleCard`. Variant axes use Figma convention (`State=active`).
- **Tokens:** the `@theme` custom property is the Figma variable's **WEB code syntax, verbatim, `var()`-wrapped**. Display names are human-grouped (`Color/Dark/Canvas`); the code syntax is the machine contract (`var(--color-dark-canvas)`).
- **Provenance:** every variable description states lineage — `kit: <name> (verbatim)` or `extension: <reason, with evidence>`. Lineage lives in descriptions, never in names.
- **What round-trips:** static UI only (screens at settled states, cards, chrome, type, color). Animated scenes and transient states (bucket-sort drags, flow transitions, ambient float/pulse loops, hover/focus) stay code-owned — capture resting states only.

## 3. Interest Quiz file — pages

| Page | Node ID | Contents |
|---|---|---|
| Cover | `0:1` | Dark cover card (`1:4`). |
| Quiz Flow | `1:2` | Landing + intro question + scene bucket-sort captures. |
| Results | `1:3` | The 5-screen dark results set. |

## 4. DS library — the dark extension variables (authored from this repo, Pass 7)

Published into the library's existing collections following its own invariant: raw values → `Primitives`, `var()` references → `Semantic` (every Semantic variable is a `VARIABLE_ALIAS`, never a raw value). Every variable carries an `extension:` lineage description (the kit has no dark ramp), narrow scopes (no `ALL_SCOPES`), and `var()`-wrapped WEB code syntax matching the code token exactly. Collection totals after the append: Primitives 89, Semantic 16.

**`Primitives` (`VariableCollectionId:6:2`, mode `Value` `6:0`) — 17 added:**

| Variable | ID | Key | Value | WEB code syntax |
|---|---|---|---|---|
| Color/Dark/Canvas | `VariableID:513:2` | `c5977f6d3fd8d2f35bfb69930d5ae465ad1c3554` | `#1B1B1B` | `var(--color-dark-canvas)` |
| Color/Dark/Surface | `VariableID:513:3` | `fbdf8144f157ecba9343abea7e19b6a94eb71a32` | `#292929` | `var(--color-dark-surface)` |
| Color/Dark/Text On Dark | `VariableID:513:4` | `807841516410ff707cf3ecba6581c1cc58ce560a` | `#F2F4F5` | `var(--color-text-on-dark)` |
| Color/Dark/Text On Dark Muted | `VariableID:513:5` | `b712127b380c5b3dff3b646bfaee24e930efe270` | `#C4C8CC` | `var(--color-text-on-dark-muted)` |
| Color/Dark/Text On Dark Faint | `VariableID:513:6` | `f1f972efdb01f20f93e21d7c7f4855061eba3fd0` | `#9AA0A5` | `var(--color-text-on-dark-faint)` |
| Color/Dark/Glass Fill | `VariableID:513:7` | `372d773d5eed4291ea2631b55eb5f2479c02598f` | `#FFFFFF @ 4.5%` | `var(--color-glass-fill)` |
| Color/Dark/Glass Fill Strong | `VariableID:513:8` | `c4283f52b6fcf10950ae90839d83190b4e61cccf` | `#FFFFFF @ 6%` | `var(--color-glass-fill-strong)` |
| Color/Dark/Glass Border | `VariableID:513:9` | `678f3185cdfe71f4244481f2a77a2c5b585c41f1` | `#FFFFFF @ 10%` | `var(--color-glass-border)` |
| Color/Dark/Glass Border Soft | `VariableID:513:10` | `c01fe8dcab4cea5cc20aec9fcff4b840362924a8` | `#FFFFFF @ 7%` | `var(--color-glass-border-soft)` |
| Color/Dark/Glass Panel | `VariableID:513:11` | `9327d54fcdadc73b4d71fd7aa15d81794cf89a49` | `#262626 @ 85%` | `var(--color-glass-panel)` |
| Color/Dark/Constellation Line | `VariableID:513:12` | `a48fbb5e3f1511af9ab06689646aa62bb5f0d093` | `#E0E0E0` | `var(--color-constellation-line)` |
| Color/Role/Technician Soft | `VariableID:513:13` | `36c475206a782962fd6a49f114fa22682ea2348a` | `#FFD27A` | `var(--color-role-technician-soft)` |
| Color/Role/Technician Glow | `VariableID:513:14` | `4eecbb484c5641a56aff05af579a20cce6f73497` | `#FFB81C @ 30%` | `var(--color-role-technician-glow)` |
| Color/Role/Specialist Soft | `VariableID:513:15` | `a9c775b9c4006111e5d9720cc8550ecafd8093c2` | `#7FE0F2` | `var(--color-role-specialist-soft)` |
| Color/Role/Specialist Glow | `VariableID:513:16` | `76fda5bacd359f51fa5660e14bb64a7459160176` | `#7FE0F2 @ 30%` | `var(--color-role-specialist-glow)` |
| Color/Role/Integrator Soft | `VariableID:513:17` | `6534468b8a6f3893ef0646d9dae0f276aa23e310` | `#F2965A` | `var(--color-role-integrator-soft)` |
| Color/Role/Integrator Glow | `VariableID:513:18` | `30c5c447545e3e8d1376dd8ef596ce3d73acf954` | `#F2965A @ 30%` | `var(--color-role-integrator-glow)` |

**`Semantic` (`VariableCollectionId:139:66`, mode `Value` `139:0`) — 7 aliases added:**

| Variable | ID | Key | Alias target | WEB code syntax |
|---|---|---|---|---|
| Color/Dark/Panel | `VariableID:513:19` | `492809a851c79f3510008a320f18c33005ec9fc4` | Color/Neutral/Near Black | `var(--color-dark-panel)` |
| Color/Role/Technician | `VariableID:513:20` | `d652354939358bf49ab1c6f35e1fda5b19efe535` | Color/Brand/ARM Gold | `var(--color-role-technician)` |
| Color/Role/Technician On | `VariableID:513:21` | `665ba1f00ad81265b8b64a5b28a171eedeffb629` | Color/Neutral/Near Black | `var(--color-role-technician-on)` |
| Color/Role/Specialist | `VariableID:513:22` | `b1d6d8901ed622878f85495686267732ee6e78ee` | Color/Brand/Secondary Teal | `var(--color-role-specialist)` |
| Color/Role/Specialist On | `VariableID:513:23` | `8c345b7ce349d6cb3336f6a28157fd249a509ab2` | Color/Neutral/On CTA | `var(--color-role-specialist-on)` |
| Color/Role/Integrator | `VariableID:513:24` | `00ce2f552f853349cb88ed7d5716af9e0fde43c8` | Color/Brand/Secondary Orange | `var(--color-role-integrator)` |
| Color/Role/Integrator On | `VariableID:513:25` | `925e2939ce82d47275a7275b071e86e347e41095` | Color/Neutral/On CTA | `var(--color-role-integrator-on)` |

The two `Role/* On` whites alias `Color/Neutral/On CTA` (value-identical `#FFFFFF`): code says `var(--color-white)`, which has no library primitive — the same rewrite `@rc/ui` v1 documented. `blur-bar` / `blur-panel` stay code-only (no clean Figma variable home; `DESIGN_SYSTEM.md` §2).

## 5. DS library — dark effect styles

| Style | ID | Spec | Code token |
|---|---|---|---|
| Shadow/Dark Panel | `S:fba444b7168919821ddd192abdc2ab054f58a101,` | 0 20px 70px rgb(0 0 0 / 0.35) | `--shadow-dark-panel` |
| Shadow/Dark Card | `S:f3414e178d9f871b31f2f6ad69ee9f42467890ef,` | 0 10px 40px rgb(0 0 0 / 0.28) | `--shadow-dark-card` |

## 6. Reference captures — Interest Quiz file

**Reference stills, captured 2026-07-02:** 1440×900 image-fill frames of the built app (production build, reduced-motion settled states; Playwright-driven, believable mixed score spread — Specialist top at 45%). They are visual ground truth of the final build, **not** editable frames — the editable, variable-bound screen rebuilds (paints bound to the §4 dark variables) are the pass's recorded remainder. When a rebuild lands, it goes beside its `Ref/*` twin and gets its own row here.

| Screen | Route / state | Page | Node ID |
|---|---|---|---|
| Landing | `/` | Quiz Flow | `7:2` (`Ref/Landing`) |
| Intro question | `/flow` (question step) | Quiz Flow | `7:3` (`Ref/IntroQuestion`) |
| Scene bucket-sort | `/flow` (scene step, settled) | Quiz Flow | `7:4` (`Ref/SceneSort`) |
| Results — role cards | `/results` screen 1 | Results | `7:5` (`Ref/RoleCards`) |
| Results — compare | `/results` screen 2 | Results | `7:6` (`Ref/Compare`) |
| Results — bubble map | `/results` screen 3 | Results | `7:7` (`Ref/BubbleMap`) |
| Results — constellation + job panel | `/results` screen 4 | Results | `7:8` (`Ref/Constellation`) |
| Results — job overview | `/results` screen 5 | Results | `7:9` (`Ref/JobOverview`) |
