---
description: Revise a planning doc safely — edit the canonical owner, reconcile the other docs via doc-steward, and log it.
argument-hint: "<the change to make — e.g. 'the narrative results lead with the node map; the role sheet sits behind progressive disclosure'>"
---

Make a change to the spec set without letting the docs drift out of agreement. This is the path for the heavy design iteration this build expects (the realignment sweep especially). Parse `$ARGUMENTS` for the intended change; if it's vague, ask what should change and to what.

1. **Find the owner.** Decide which doc *owns* this fact, by precedence:
   - `CONTEXT_BRIEF.md` — the why (the research story) · `PRD.md` — what we build (screens, the selectable flows, the core sort interaction, scope, the professional-track stub) · `DATA_MODEL.md` — schema + tuning surface + the §17 flow invariants and the §15 sanity checks · `DESIGN_SYSTEM.md` — tokens + usage (source-of-truth precedence: defer to its §2/§15) · `ARCHITECTURE.md` — code organization · `ROADMAP.md` — phases + acceptance criteria · `CLAUDE.md` — operating manual / hard rules.
   If the change spans owners, pick the primary and note the others for the steward.
2. **Edit the one canonical place.** Make the change in the owning doc, in its voice and formatting. Never duplicate a fact into a second doc — other docs reference it.
3. **Reconcile the rest.** Dispatch the **doc-steward** subagent (Agent tool, `subagent_type: doc-steward`) with: which doc/section changed, old → new, and what to chase (numbers, section refs, named entities). It sweeps the other docs + `CLAUDE.md` for ripple effects and reconciles them, returning a report of what it edited and what it flagged for a human call.
4. **Re-check invariants.** If the change touched the flows, scenes, statements, categories, role ladders, or scoring, confirm the `DATA_MODEL.md` §17 flow invariants (and the §15 sanity checks) still hold — and that `data-integrity.test.ts` still passes — or update them as part of the change.
5. **Log it.** Append a `DECISIONS.md` entry (`D-### — title`, then Decision · Why · Alternatives · Affected), add its one-line row to the `## Index` at the top (keep it 1:1 with the headings — the `knowledge-guard` hook checks the count), and tick `STATUS.md` if state changed.
6. **Report** in one tight block: the canonical edit, the steward's reconciliations + flags, any invariant impact, and the `D-###` logged.

Resolve, don't author beyond the change: the steward brings other docs into agreement with a decision already made — it doesn't invent new requirements. Anything ambiguous gets flagged, not guessed. If the change implies a code edit too, say so; this command edits docs, not source.
