---
description: Canvas-to-code — read an edited Figma frame and apply the diff to React against our conventions.
argument-hint: "<Figma frame URL>"
---

Pull edits made on the Figma canvas back into code (the canvas→code half of the round-trip; see `ARCHITECTURE.md` §7).

0. **Read `docs/figma/FIGMA_MAP.md` first.** It's the round-trip authority: file keys, page/frame node IDs, the dark-variable registry, and the naming contract. Only pull from frames it registers (the Interest Quiz file); RC-CC is dead and Kayla's file belongs to the UX repo's map.
1. Require a Figma frame URL in `$ARGUMENTS` (ask if missing). Confirm the `figma` MCP server is connected.
2. Read the frame through the Figma MCP (`get_design_context` / `get_screenshot` / `get_variable_defs` as needed).
3. **Diff against the current implementation** and apply only the meaningful changes — spacing, copy, color, alignment, button placement — as **idiomatic React against our conventions**: Tailwind tokens (never inline hex/px), existing component composition, named exports. This is a surgical update, **not** a blind regeneration of the frame into new JSX.
4. Map Figma variables to Tailwind tokens by the variable's WEB code syntax (`Color/Dark/Canvas` → `var(--color-dark-canvas)` → `dark-canvas`, per FIGMA_MAP §2 + `DESIGN_SYSTEM.md` §2). If the frame introduces a value with no token, flag it rather than hardcoding.
5. Run `/design-review` (or at least typecheck/lint) after applying, and summarize what changed.

Do not pull motion or transient-state changes (drags, transitions, ambient loops, hover/focus) — those are code-authored and don't round-trip. If the frame edits touch those regions, note it and skip them.
