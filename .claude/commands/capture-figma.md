---
description: Code-to-canvas — capture the running screen(s) into editable Figma frames via the Figma MCP.
argument-hint: "[screen or URL to capture — optional; defaults to the current screen]"
---

Capture rendered UI into Figma (the code→canvas half of the round-trip; see `ARCHITECTURE.md` §7).

1. Ensure the dev server is running (`pnpm dev`); confirm the Figma MCP `figma` server is connected (the user may need to `/mcp` and authenticate once).
2. Navigate to the target screen (`$ARGUMENTS`, else the current one).
3. Use the Figma MCP `generate_figma_design` to capture the rendered screen/element into **editable** Figma frames. Capture a multi-step flow screen by screen if asked.
4. Report the resulting Figma frame URL(s).

Boundaries (important):
- This works on **static UI** — cards, buttons, results layout, landing chrome, role cards. Capture those freely.
- The **animated scene and the robot do NOT round-trip** — they capture at best as a frozen still and can't be tuned in Figma. Treat those regions as reference stills; the conveyor/arm/build-beat/robot stay code-authored. Don't imply otherwise.
- Capture at meaningful checkpoints (settled iteration, before a user test, before showing ARM), not continuously.
