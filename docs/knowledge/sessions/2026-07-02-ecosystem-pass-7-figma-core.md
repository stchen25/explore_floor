# 2026-07-02 — Ecosystem run Pass 7 core: dark set published, Interest Quiz file + FIGMA_MAP, precedence flip (D-039)

**Resume here.** Pass 7's core (steps 1–6) is done and committed on `main`: the dark extension is **published in the DS library**, the **Interest Quiz file** (`pjgrRJS5YYII1iciW7Pak2`) holds reference stills of all 8 final screens, `docs/figma/FIGMA_MAP.md` is the binding manifest, and the doc canon **flipped to the three-artifact precedence** (D-039, superseding D-037's code-outward). **The pass's remainder:** the editable variable-bound screen rebuilds (build via `use_figma` beside the `Ref/*` twins — do NOT reach for `generate_figma_design`, see the war story below), the UX repo's capture-target file (ledger step 7), and the Claude Design `.design-sync` bundle (step 8). Ledger: `ECOSYSTEM_RUN.md` Pass 7.

## What landed

- **DS library (`afi5Q5nFtcnT9HJ04Cbylg`):** 24 dark variables — 17 raw in `Primitives` (surfaces, on-dark text ramp, glass set, constellation line, role soft/glow), 7 as `Semantic` `VARIABLE_ALIAS`es (dark-panel → Near Black; role bases → the brand colors; the on-accent inks → Near Black / On CTA), mirroring exactly how code models raw values vs `var()` refs. Every variable: `extension:` lineage description, narrow scopes, `var()`-wrapped WEB code syntax. Verified value-exact against `globals.css` in-script before Caelan's publish click. Plus `Shadow/Dark Panel` + `Shadow/Dark Card` effect styles, a 24-swatch "Dark extension" section on Foundations/Color (variable-bound chips on a Dark Canvas backing so the glass alphas render honestly), and a dark elevation row on the Space·Radius·Elevation page.
- **Interest Quiz file:** created via MCP, moved into the ARM team project by Caelan, subscribed to the library. Pages Cover (`0:1`, cover card `1:4`) / Quiz Flow (`1:2`) / Results (`1:3`). **Reference stills of all 8 screens** as 1440×900 image-fill frames (`7:2`–`7:9`): Landing, intro question, scene bucket-sort, and the 5-screen results set, captured from the production build at reduced-motion settled states with a believable mixed score spread (Specialist top, 45%).
- **Manifest + commands:** `docs/figma/FIGMA_MAP.md` seeded on the dashboard's shape (files incl. RC-CC-is-dead and Kayla-pull-only rows, naming contract, the full dark-variable registry with IDs + keys, effect styles, captures table). `/capture-figma` rewritten FIGMA_MAP-first on the dashboard's flow; `/pull-figma` gained the manifest step and lost the stale `arm-yellow` example.
- **The flip (D-039):** `DESIGN_SYSTEM.md` preamble (RC-CC finally purged), §2 (three artifacts + display-name vs WEB-code-syntax contract + Primitives/Semantic split), §12 capture note, §15 (manifest-aware precedence), new **§16 reserved/keeps** and **§17 upstream proposals** (`control-xl`/`control-tap`, montserrat-500, Icon union, dark CTA hovers). Steward swept `ARCHITECTURE.md` §3/§7, `ROADMAP.md` §4.6 (checkbox left unchecked — rebuilds outstanding), `HANDOFF_GUIDE.md` §6, `DESIGN_SYSTEM_RUN.md` §1/§2 (capture queue resolved), `HARNESS.md` §3, root `CLAUDE.md`. The two harness precedence lines (`revise-doc.md`, `doc-steward.md`) now defer to §2 — the D-038 authorization held, no guard block.

## The capture war story (read before the rebuild session)

The `generate_figma_design` HTML-capture pipeline burned most of an evening and produced zero usable nodes. Root causes, compounding:
1. **Single-use capture IDs expire in minutes** — minting a batch upfront killed every later submission (410s, and an interrupted submit burns the ID into a permanent "pending").
2. **One capture reported "completed" at a node that never existed** (three stray nodes then materialized much later and were deleted).
3. **macOS occlusion throttling**: with the driven Chrome window behind others, the compositor stops producing frames and *every* capture/screenshot stalls ~150s. `page.bringToFront()` (or `captureBeyondViewport: true`) drops it to ~70ms. This also explains the earlier `page.screenshot` timeouts.
4. Environmental friction: Tailwind v4 watches the whole project, so the Playwright MCP writing console logs *into the repo* (`.playwright-mcp/`) made the dev server full-reload mid-capture — capture from a **production preview** (`pnpm build && pnpm preview`), never the dev server. And a hash-router app can't use the `#figmacapture=` URL method at all.
5. The temporary capture `<script>` tag bakes an "expired" toolbar into the page — it's reverted from `index.html`; first-round uploads had it baked in and were replaced by swapping fill `imageHash`es (a second `upload_assets` round with `nodeId` uploads bytes but silently skips placement when the node already has a fill — swap fills via Plugin API instead).

What works, proven end to end: **Playwright drive (fronted window, reduced motion, preview server) → `page.screenshot` → `upload_assets` → Plugin-API fill swap → verify with `node.screenshot()`.**

## Flags / cross-repo

- `career_dashboard/docs/figma/FIGMA_MAP.md` §4 still says 81 variables (72+9); the append makes it 105 (89+16), and its "Semantic holds status aliases" wording is now narrower than reality. A dashboard-session fix; the DS file's own Foundations header was already updated.
- Still pending from earlier passes: Caelan's robotics_career Pass-5 push + the career_dashboard archive-tag push/branch deletion.

## State at end of session

- explore_floor `main`: Pass-7-core commit (docs + harness + FIGMA_MAP; `src/` untouched, `index.html` back to HEAD), gates green (lint / typecheck / 82 unit / 3 E2E). Dev + preview servers stopped.
- Ledger: Passes 1–7 core ✅; Pass-7 remainder queued (editable rebuilds, steps 7–8); stretch unchanged.
