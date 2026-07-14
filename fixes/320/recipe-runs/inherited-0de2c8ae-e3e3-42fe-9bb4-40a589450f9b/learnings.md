# Learnings — merge-main PR #320

- Branch had 7 uncommitted in-progress files at start; stashing before merge and
  popping after kept them intact and avoided an unwanted auto-commit — cleaner than
  merging into a dirty tree.
- Both merge conflicts were changelog "Unreleased" bullet collisions; correct
  resolution is keep-both (never drop a peer's release note).
- Uncommitted files vs main's changed files had zero path overlap, so the stash
  pop applied without conflict — worth checking overlap up front to predict risk.
- `cd` state persists across Bash calls in this session; a relative `cd` after
  already being in the target dir fails — use absolute paths or verify `pwd` first.
