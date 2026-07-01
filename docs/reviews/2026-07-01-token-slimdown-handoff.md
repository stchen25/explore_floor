# Token-Slimdown Handoff — trim explore_floor's first-turn context

**For:** a fresh Claude Code agent working *inside* this repo (`Prototypes/explore_floor`).
**Author:** the sibling `career_dashboard` session that just did this exact job there (2026-07-01).
**Goal:** cut the tokens every session pays *before real work starts*, by moving detail into files read on demand and keeping only snapshots + indexes on the session-start path. Do NOT touch the harness's actual value (skills, commands, subagents, rubrics, the revision flow all stay).

---

## 0. Read this before you start

- **This is a doc/config-only job.** You will edit files under `docs/knowledge/`, `.claude/`, and `CLAUDE.md`. You will NOT touch `/src`. If a step seems to need a source change, stop and flag it.
- **Verify before editing.** The specific sizes, line numbers, and D-numbers below are from a 2026-07-01 scan. Files drift. Re-read each file's current state before you edit it; treat the line numbers as "roughly here," not gospel.
- **Work on a branch, leave it uncommitted for Caelan to review** (his standing pattern — he commits the doc changes himself). `git push` is denied in this repo anyway.
- **Nothing is lost.** Every collapse points to where the full detail already lives (a `sessions/` note or a `DECISIONS.md` D-number). You are relocating detail, not deleting it.
- **A worked example exists.** The sibling repo `../career_dashboard` did all of this in commit `cf105a1` ("chore(harness): token-slimdown …"). You can read its diff for a concrete template: `git -C ../career_dashboard show cf105a1`. Its harness is a descendant of this one, so the shapes line up closely — but note the two real differences called out below.

## What's already done (do NOT redo)

The plugin diet and connector cleanup were **global** changes to `~/.claude/`, so they already benefit this repo:
- Superpowers, firecrawl, both LSPs, and several unused plugins are disabled globally; the Superpowers SessionStart hook no longer fires. (Confirm with a fresh session showing `0 hooks` from plugins.)
- Note: this repo's `.claude/settings.json` still lists `firecrawl` in `enabledMcpjsonServers`, but the firecrawl *plugin* is globally off, so it's inert. Optional tidy: drop `firecrawl` from that whitelist. Low priority.

So your job is the **in-repo work only**, plus **adding the guard hook** (this repo is currently hook-free).

---

## The two ways explore_floor differs from the career_dashboard job

1. **STATUS.md bloat is a different shape.** career_dashboard had a stacked "Last updated / Prior / Previously" changelog. Here, STATUS.md (~27KB, ~65 lines) has ONE `Last updated` line but **two gigantic run-on paragraph-bullets** that have accreted the whole phase history inline: `- **Current focus:**` (~5.3KB) and `- **Next up:**` (~14.9KB). Those two bullets are ~75% of the file. Your A1 target is to **shrink those two bullets**, not to collapse a list.
2. **DECISIONS.md headings are clean.** career_dashboard had a lost heading to restore; here all `### D-` headings (D-001…D-032, plus a few phase-split `D-029 Phase …` sub-entries) are well-formed. You only need to *add* the index, not repair anything.

---

## The work

### A1 — Rewrite STATUS.md's header into a real snapshot  *(biggest win)*
File: `docs/knowledge/STATUS.md`.

The file is two parts: a **header block** (above the first `---`) and a **live section** (Harness bootstrap + Phase 0–3 acceptance-criteria checklists with `[x]/[ ]` boxes). **Leave the live checklist section byte-for-byte untouched** — that's what `/phase-check` maintains.

In the header, rewrite the two run-on bullets:
- **`Current focus`** → a tight few-sentence statement of where the build actually is right now (the current flow/phase, the one active thread, any uncommitted state). Aim for well under 1KB.
- **`Next up`** → the immediate next action(s) only. Its ~15KB of embedded Phase 0/A/B/C/D/E/F/G "DONE" write-ups is history, not "next" — move it out.

For the accreted phase history you're removing from those bullets: it already exists in the `sessions/` notes (31 of them). Add a short **`### Earlier sessions`** pointer list to the header — one line per session: `YYYY-MM-DD · D-### (if any) · terse title → [note](./sessions/<file>.md)`. Keep only the 1–2 most recent sessions described in any fuller form; everything older is a one-line pointer. Target: header well under ~8KB, whole file roughly 8–12KB (from ~27KB).

Verify after: `diff` the live section (from `## Harness bootstrap` onward) against `git show HEAD:docs/knowledge/STATUS.md`'s same section to prove you changed only the header. (See how the sibling did this in `cf105a1`.)

### A2 — Make the snapshot self-sustaining
- `.claude/commands/compound.md` (the STATUS-update paragraph, ~line 14): add a sentence — when updating STATUS.md, keep `Current focus`/`Next up` tight and **push session-by-session detail into the `sessions/` note and link it, never inline it into the header bullets**; demote older sessions to one-line pointers.
- `.claude/commands/phase-check.md` (step 5, "Update STATUS.md", ~line 12): add the same "keep the header a snapshot; link, don't inline" note.

### A3 — Resume-here discipline + soften the ritual
- `.claude/commands/compound.md` (the `**session**` bullet, ~line 12): require each handoff note to **lead with a short "Resume here" header** (state · next action · open holds, ≤ half a page) above the narrative. (Notes here currently dive straight into narrative.)
- Soften the session-start ritual so it's header-first. Canonical spot: `CLAUDE.md` ~line 101 (`## Harness & session protocol` → "Session start"). Change "read STATUS.md and the newest sessions/ note before touching anything" to: read STATUS.md, then the newest note's **Resume here** header, and the full note only if continuing that thread.
- Align the ritual restatements so they don't drift: `CLAUDE.md` ~line 137 (doc map), `docs/knowledge/README.md` ~lines 11 & 20, `docs/knowledge/HARNESS.md` ~line 96, and the root `README.md` (~lines 67/80/86) + `docs/ARCHITECTURE.md` ~line 102 where they echo "read STATUS.md first." Leave the per-note "Read after STATUS.md" hints inside individual session notes alone (they're local, not the global ritual).

### A4 — Index DECISIONS.md
File: `docs/knowledge/DECISIONS.md` (~75KB, no index today). Add a compact `## Index` block just under the preamble/`---`: one row per decision, newest first — `- **D-###** (MM-DD) — short title`, built from the existing `### D-` headings (grep anchor: `^### D-[0-9]+`). Include the phase-split `D-029 Phase …` sub-entries as their own rows so the index is 1:1 with the headings (the guard hook in A6 checks that count). Then add a maintenance line to `.claude/commands/compound.md` (the `**decision**` bullet) and `.claude/commands/revise-doc.md` (its "Log it" step): "when you append a decision, add its one-line row to the `## Index`."

### A5 — Trim CLAUDE.md's embedded history
`CLAUDE.md` is short overall but several sections have grown into mini-changelogs that duplicate `ROADMAP.md` / `REALIGNMENT.md` / `DECISIONS.md`. Trim each to its definition + a pointer, dropping the narrative:
- **`## Phasing` (~lines 107–118)** — the clearest offender: a phase-by-phase changelog with decision IDs. It even says the real track lives in `REALIGNMENT.md`. Cut to a terse phase list + "see `ROADMAP.md` / `docs/knowledge/archive/REALIGNMENT.md` + `DECISIONS.md`."
- **`## Tech stack` table (~lines 38–55)** — rows carry long "documented cut" decision histories (GSAP, scene rendering, audio). Keep the stack fact; drop the history to a pointer.
- **The `> Realignment (2026-06…)` block in `## What this is` (~line 11)** — a paragraph re-narrating the pivot; reduce to one line + `REALIGNMENT.md`.
- **`## Repo structure` comments (~lines 57–74)** and **`## Hard rules` (~lines 120–126)** — both embed removal/taxonomy history; trim the asides.

### A6 — Add the warn-only guard hook  *(this repo is hook-free today)*
This is what keeps A1/A4 from silently regressing. Add a `PostToolUse` guard that nudges (never blocks) when STATUS.md re-bloats or the DECISIONS index falls out of sync. It's the sibling's `.claude/hooks/knowledge-guard.sh` adapted to this repo's STATUS shape.

Create `.claude/hooks/knowledge-guard.sh` (make it executable, `chmod +x`):

```bash
#!/usr/bin/env bash
# knowledge-guard.sh — warn-only PostToolUse guard for docs/knowledge/.
# Keeps STATUS.md a snapshot and DECISIONS.md's ## Index in sync. Never blocks,
# never edits; only injects a one-line reminder for Claude. See DECISIONS D-0XX.
set -euo pipefail
payload="$(cat)"
case "$payload" in
  *docs/knowledge/STATUS.md*|*docs/knowledge/DECISIONS.md*) ;;
  *) exit 0 ;;
esac
file_path="$(printf '%s' "$payload" | python3 -c '
import sys, json
try: print(json.load(sys.stdin).get("tool_input", {}).get("file_path", ""))
except Exception: print("")
' 2>/dev/null || true)"
[ -n "$file_path" ] && [ -f "$file_path" ] || exit 0
warn=""
case "$file_path" in
  */docs/knowledge/STATUS.md)
    # explore_floor's bloat is run-on header bullets, so measure the header
    # (everything above the first '---') and flag any oversized single bullet.
    hdr_bytes=$(awk 'f{next} /^---$/{f=1} {print}' "$file_path" | wc -c | tr -d ' ')
    big_bullet=$(awk 'seen==0 && /^---$/ {seen=1} seen==0 && /^- / {if (length($0)>1500) c++} END {print c+0}' "$file_path")
    parts=""
    [ "${hdr_bytes:-0}" -gt 8192 ] && parts="${parts} header is $((hdr_bytes/1024))KB (>8KB);"
    [ "${big_bullet:-0}" -gt 0 ] && parts="${parts} ${big_bullet} run-on header bullet(s) >1500 chars;"
    [ -n "$parts" ] && warn="STATUS.md snapshot guard:${parts} keep Current focus/Next up tight and push session detail into sessions/ notes (per CLAUDE.md session-start rule + /compound)."
    ;;
  */docs/knowledge/DECISIONS.md)
    heads=$(grep -cE '^### D-[0-9]+' "$file_path" 2>/dev/null || echo 0)
    rows=$(grep -cE '^- \*\*D-[0-9]+\*\*' "$file_path" 2>/dev/null || echo 0)
    [ "$heads" != "$rows" ] && warn="DECISIONS.md index out of sync: ${heads} decision headings vs ${rows} ## Index rows. Add or remove index row(s) to match."
    ;;
esac
[ -z "$warn" ] && exit 0
python3 -c '
import json, sys
print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": sys.argv[1]}}))
' "$warn" 2>/dev/null || echo "$warn" >&2
exit 0
```

Wire it in `.claude/settings.json` (add alongside the existing keys):
```json
"hooks": {
  "PostToolUse": [
    { "matcher": "Edit|Write|MultiEdit",
      "hooks": [ { "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/knowledge-guard.sh\"" } ] }
  ]
}
```

**Test it before trusting it** (pipe synthetic payloads, as the sibling did): confirm it's silent on the freshly-slimmed STATUS.md and on an unrelated `/src` edit, warns on a >8KB header / a >1500-char bullet, and warns when DECISIONS headings ≠ index rows. It must always `exit 0`.

**Tune the thresholds** to whatever your slimmed STATUS.md actually is — set the header threshold a few KB above its healthy size so normal churn doesn't trip it.

### A7 — Log it + reconcile the harness doc
- `/compound decision` (or hand-write): add the next `D-###` (D-033 as of this scan — verify the latest) recording "added one warn-only PostToolUse guard hook for the knowledge layer," and add its index row (A4).
- `docs/knowledge/HARNESS.md`: this repo's §-equivalent that says "no hooks" (check its settings section + any glossary line) should change to "one warn-only guard hook." Grep HARNESS.md for "hook" and "no hooks" and fix.

---

## Verification

- **No source touched:** `git status --porcelain` should show only `CLAUDE.md`, `docs/knowledge/*`, `.claude/commands/*`, `.claude/settings.json`, `docs/*` ritual echoes, and the new `.claude/hooks/`. Nothing under `src/`.
- **Gates:** `pnpm lint` and `pnpm typecheck` green (they don't touch docs, so this just confirms you broke nothing). The full `pnpm test` is unaffected by doc-only changes — note that rather than burning time on e2e.
- **No lost history:** every collapsed STATUS entry resolves to a real `sessions/` note; every `D-###` in the index resolves to a heading (and vice versa — the guard proves this live).
- **Guard proof:** editing DECISIONS.md mid-work should make the guard fire once (transient heading/row mismatch) and go quiet once synced — that's the hook working end to end.

## Optional / flag-don't-do
- The heavy on-demand docs (`REALIGNMENT.md` ~50KB, `VISUAL_REARCHITECTURE.md` ~36KB, `DATA_MODEL.md` ~62KB) are only a first-turn cost **if** the ritual or CLAUDE.md pulls them eagerly. Check whether anything instructs reading them at session start; if not, leave them — on-demand is fine. Don't restructure them in this pass; flag if you think they warrant it.
- `firecrawl` in `enabledMcpjsonServers` is inert (plugin globally disabled). Removing it is a one-line tidy, not required.

## Rough expected impact
STATUS.md ~27KB → ~10KB (~4k tokens off every session) plus the DECISIONS index killing worst-case lookup spikes, and the guard preventing regression. Combined with the already-applied global plugin diet, this repo's session start should land meaningfully lower.
