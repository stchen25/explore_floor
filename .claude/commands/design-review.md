---
description: Screenshot the running UI and grade it against docs/rubrics via the design-reviewer subagent.
argument-hint: "[screen or URL — e.g. results, /sort, http://localhost:5173/results; and/or a rubric name]"
---

Run a design review of the running app.

1. Make sure the dev server is running (`pnpm dev`). If it isn't and you can't start it, tell the user and stop — don't fabricate a review.
2. Parse `$ARGUMENTS` for a target screen/URL and/or a specific rubric. Default target: whatever screen is current in the work; default rubrics: all three in `docs/rubrics/`.
3. Dispatch the **design-reviewer** subagent (Agent tool, `subagent_type: design-reviewer`) with the target and rubric scope. It will drive Playwright, screenshot, read implementing code as needed, and grade against the rubric criteria.
4. Relay its findings: grouped by rubric, severity-ordered (p1→p3), each with `file:line` or the visual region, the criterion id, and the concrete fix. End with the single highest-impact fix.
5. If the review surfaced a notable, reusable insight (a recurring drift, a pattern worth a rule), offer to `/compound lesson`.

The reviewer is read-only; apply fixes yourself afterward if the user wants them.
