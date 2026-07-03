---
description: Code-to-canvas — capture the running screen(s) into editable Figma frames via the Figma MCP.
argument-hint: "[screen or URL to capture — optional; defaults to the current screen]"
---

Capture rendered UI into Figma (the code→canvas half of the round-trip; see `ARCHITECTURE.md` §7).

0. **Read `docs/figma/FIGMA_MAP.md` first.** It's the round-trip authority (our Code Connect replacement — we're on Education). It carries the real file keys (§1 — the capture target is the **Interest Quiz** file; RC-CC is dead and Kayla's file is pull-only, never targets), the page node IDs (§3), the dark-variable registry (§4–§5), and the naming contract (§2). An ID there is ground truth; capture *against* it, don't invent a parallel structure.
1. Ensure the dev server is running (`pnpm dev`); confirm the Figma MCP `figma` server is connected and `whoami` is Caelan / ARM team (the user may need to `/mcp` and authenticate once). Load the `figma-use` (+ `figma-generate-library` for component work) skill before any `use_figma` call.
2. Navigate to the target screen (`$ARGUMENTS`, else the current one). Capture a settled, static state — for results screens, drive the flow to a representative score spread first; for quiz steps, land on a populated question or scene.
3. Capture into the **Interest Quiz file**, onto the matching page from FIGMA_MAP §3 (Quiz Flow / Results). Name frames/components to match the React component names (PascalCase) so the round-trip stays legible — binding is by naming alignment, not Code Connect. When a twin already exists, land the capture beside it using its §6 node ID and bind paints to the §4 variables (dark system) or the DS library's light foundations rather than hardcoding hex; don't orphan a duplicate. For a throwaway probe, use a clearly-named scratch page and delete it after.
4. Validate (`get_metadata` for structure, `get_screenshot` for visual) and report the resulting Figma frame URL(s) + node IDs. If you added a durable frame/component, record its node ID (and key, if published) in FIGMA_MAP §6.

Boundaries (important):
- This works on **static UI** — the landing, quiz question/scene layouts at rest, the five dark results screens, cards, chrome. Capture those freely.
- **Animation and transient states do NOT round-trip** — the bucket-sort drag, flow-step transitions, the ambient bubble float/pulse, constellation entrance/hover, focus states. Treat those as code-authored; capture only their resting state. Don't imply otherwise.
- Capture at meaningful checkpoints (settled iteration, before a user test, before showing ARM), not continuously.
