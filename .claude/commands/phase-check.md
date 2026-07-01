---
description: Verify the current phase's acceptance criteria, tick STATUS.md, and report remaining gaps.
argument-hint: "[phase number — optional; defaults to current per STATUS.md]"
---

Run a phase gate.

1. Determine the phase: use `$ARGUMENTS` if given, else read the current phase from `docs/knowledge/STATUS.md`.
2. Read that phase's **acceptance criteria** from `docs/ROADMAP.md` (Phase 0 = §1, Phase 1 = §2, Phase 2 = §3, Phase 3 = §4).
3. Dispatch the **verifier** subagent (Agent tool, `subagent_type: verifier`) to run lint / typecheck / unit / e2e and the `DATA_MODEL.md` §15 data invariants. If the app isn't scaffolded yet, expect a "pre-scaffold / not-yet-runnable" verdict — that's fine, report it, don't error.
4. For each acceptance criterion, mark **met / not-met / not-yet-runnable** based on the verifier's evidence (don't mark something met without evidence).
5. **Update `docs/knowledge/STATUS.md`**: tick the boxes that are now met, update "Last updated" to today, and adjust "Current focus" / "Next up" if the phase advanced. Keep the header a snapshot — Current focus / Next up stay a few tight sentences; link session detail into the `sessions/` notes and the `### Earlier sessions` list, never inline it into the header bullets.
6. Report a concise summary: phase, what's green, what's left (each gap actionable), and whether the phase can close.

Never edit source code to make a check pass — only report. If closing a phase, suggest running `/compound session` to write the handoff note.
