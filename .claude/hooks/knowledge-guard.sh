#!/usr/bin/env bash
# knowledge-guard.sh — warn-only PostToolUse guard for docs/knowledge/.
#
# Purpose: keep STATUS.md a glanceable snapshot and DECISIONS.md's `## Index`
# in sync with its headings, so the token-hygiene we established (STATUS.md
# ~27KB -> ~11KB, 2026-07-01) doesn't silently regress. It NEVER blocks a tool
# and NEVER edits anything; it only injects a one-line reminder for Claude when
# a threshold is crossed.
#
# explore_floor's bloat shape is a run-on HEADER (the two paragraph-bullets
# `Current focus` / `Next up` that had accreted the whole phase history), so we
# measure the header (everything above the first `---`) and flag any oversized
# single header bullet — not total file size or a stacked changelog.
#
# Wired from .claude/settings.json -> hooks.PostToolUse (matcher Edit|Write|MultiEdit).
# See DECISIONS.md D-033 and HARNESS.md §8.
set -euo pipefail

payload="$(cat)"

# Fast path: the vast majority of edits touch neither guarded file. Bail before
# any real work (no JSON parse, near-zero overhead) unless the payload even
# mentions one of them.
case "$payload" in
  *docs/knowledge/STATUS.md*|*docs/knowledge/DECISIONS.md*) ;;
  *) exit 0 ;;
esac

# Precisely resolve the file actually edited (tool_input.file_path is absolute).
# Fail-open on any parse problem — a guard must never break the workflow.
file_path="$(printf '%s' "$payload" | python3 -c '
import sys, json
try:
    print(json.load(sys.stdin).get("tool_input", {}).get("file_path", ""))
except Exception:
    print("")
' 2>/dev/null || true)"

[ -n "$file_path" ] && [ -f "$file_path" ] || exit 0

warn=""
case "$file_path" in
  */docs/knowledge/STATUS.md)
    # Measure the header (everything up to and including the first `---`) and
    # flag any single run-on header bullet. Healthy header ~5.4KB (2026-07-01);
    # threshold set a few KB above so normal churn doesn't trip it.
    hdr_bytes=$(awk 'f{next} /^---$/{f=1} {print}' "$file_path" | wc -c | tr -d ' ')
    big_bullet=$(awk 'seen==0 && /^---$/ {seen=1} seen==0 && /^- / {if (length($0)>1500) c++} END {print c+0}' "$file_path")
    parts=""
    [ "${hdr_bytes:-0}" -gt 9216 ] && parts="${parts} header is $((hdr_bytes/1024))KB (>9KB);"
    [ "${big_bullet:-0}" -gt 0 ] && parts="${parts} ${big_bullet} run-on header bullet(s) >1500 chars;"
    [ -n "$parts" ] && warn="STATUS.md snapshot guard:${parts} keep Current focus/Next up tight and push session detail into sessions/ notes + the ### Earlier sessions list (per CLAUDE.md session-start rule + /compound)."
    ;;
  */docs/knowledge/DECISIONS.md)
    heads=$(grep -cE '^### D-[0-9]+' "$file_path" 2>/dev/null || echo 0)
    rows=$(grep -cE '^- \*\*D-[0-9]+\*\*' "$file_path" 2>/dev/null || echo 0)
    [ "$heads" != "$rows" ] && warn="DECISIONS.md index out of sync: ${heads} decision headings vs ${rows} ## Index rows. Add or remove index row(s) to match."
    ;;
esac

[ -z "$warn" ] && exit 0

# Non-blocking: surface the reminder to Claude as additional context, exit 0.
python3 -c '
import json, sys
print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": sys.argv[1]}}))
' "$warn" 2>/dev/null || echo "$warn" >&2
exit 0
