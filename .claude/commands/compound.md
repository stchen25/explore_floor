---
description: Capture a decision, lesson, or session handoff note into docs/knowledge.
argument-hint: "decision | lesson | session  — then a short description of what to capture"
---

Capture knowledge so it compounds. Parse `$ARGUMENTS`: first token is the type (`decision` | `lesson` | `session`), the rest is the content. If the type is missing or ambiguous, ask which one.

**decision** → append a new entry to `docs/knowledge/DECISIONS.md` (newest first, under today's date). Use the ADR-lite shape: `D-### — title`, then **Decision · Why · Alternatives · Affected**. Increment the D-number from the last entry. Then add its one-line row to the `## Index` at the top (`- **D-###** (MM-DD) — short title`) so the index stays 1:1 with the headings — the `knowledge-guard` hook checks that count.

**lesson** → append to `docs/knowledge/LESSONS.md` under today's date: `L-### — one-line takeaway`, then **Context · Do**. Keep it about agentic-workflow or design-craft learnings. If this is the 3rd+ time a similar lesson appears, suggest promoting it to a rule in `CLAUDE.md`.

**session** → write a new dated handoff note `docs/knowledge/sessions/YYYY-MM-DD-<slug>.md`. Lead with a short **Resume here** header (state · next action · open holds, ≤ half a page) so the next session can orient without reading the whole note, then the narrative below it: **What we did · State at end of session · Next session**. This is the artifact the next session reads to resume — make it specific and skimmable.

After writing, also update `docs/knowledge/STATUS.md` if state changed, and confirm what you captured in one line. Keep the STATUS header a snapshot: `Current focus` / `Next up` stay tight (a few sentences each), and session-by-session detail goes into the `sessions/` note and is linked from the `### Earlier sessions` list, never inlined into the header bullets; demote older sessions to one-line pointers. Keep entries tight — these are scannable logs, not essays. If a decision or lesson is durable enough to matter every session, also mirror a one-line fact into built-in memory.
