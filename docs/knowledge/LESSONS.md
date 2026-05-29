# Lessons

An **agentic-workflow + design-craft log** — not a generic wiki. What worked when driving this build with Claude Code, where the agent needed steering, and craft learnings worth keeping. This is raw material for the portfolio thesis ("a forward-looking, agentic design practice").

Capture when notable with `/compound lesson`. When a lesson recurs, promote it to a rule in `CLAUDE.md` (by hand).

Format per entry: **L-### — one-line takeaway** · context · what to do.

---

## 2026-05-29

### L-003 — The agent can't self-install external skills; hand the command to the user
- **Context:** `npx skills add greensock/gsap-skills` was blocked by Claude Code's safety classifier (installing external code that steers future sessions = self-modification / untrusted-code integration), even though it was approved in the plan. The user ran it and it succeeded.
- **Do:** For external skill/plugin installs, give the user the exact command (they can prefix `!` to run it in-session) rather than running it as the agent. Project-authored skills (our own `SKILL.md` files) are fine to create directly.

### L-002 — Tune external templates to the project; don't cargo-cult
- **Context:** Adopting the BilLogic "design harness" plugin's structure wholesale would have imported ritual (consent hashing, taxonomies) that doesn't pay off for a single-summer capstone.
- **Do:** Borrow the *frame* and the *schema*, then justify each artifact against this project's actual goals. Cut anything you can't defend. (See `DECISIONS.md` D-007.)

### L-001 — Verify doc-internal invariants by computing them, not trusting them
- **Context:** `DATA_MODEL.md` asserted the Innovator weights summed to 24; they actually sum to 27. The error would have surfaced as a failing Phase 0 sanity test authored from the same table.
- **Do:** When a doc states a total/invariant, recompute it before building against it. Cheap, catches load-bearing errors early. (See `DECISIONS.md` D-001.)
