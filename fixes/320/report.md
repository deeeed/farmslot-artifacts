# Merge-Main Report — PR #320

**Branch:** `feat/manual-000014-rename-branch-maintenance-flow`
**Merged:** `origin/main` (branch was 5 behind, 2 ahead of merge-base)
**Merge commit:** `2fdcd8ab`

## Pre-merge state

Working tree carried 7 uncommitted files (in-progress rename-flow work, matching
PR #320 scope — `merge-main` → `update-branch`). None overlapped with main's
changed files (main touched `packages/handoff/**`, `services/gateway/src/self-review/**`,
`scripts/dev.sh`, `projects/farmslot-farm/project.json`, `schemas/**`), so the
uncommitted work was stashed → merge → popped clean with no conflict on those files.

## Conflicts resolved (2)

Both were "Unreleased" changelog sections where each side appended a new bullet.
Resolution: keep **both** bullets (no content lost).

- `apps/command-center/CHANGELOG.md` — HEAD `update-branch` backfill rename bullet + main `yarn dev` node co-launch bullet.
- `services/gateway/CHANGELOG.md` — HEAD chained CI-watch `update-branch` bullet + main self-review issue-parsing bullet.

## Files changed by the merge

Merge pulled in main's 5 commits (handoff package tests/validation, self-review
issue parsing, dev.sh node co-launch, project.json/schema tweaks). The only
manual conflict edits were the two CHANGELOG files above.

## Post-merge working tree (restored uncommitted work, unchanged by merge)

- `apps/command-center/scripts/backfill-orphan-runs.mjs`
- `apps/docs/docs/reference/template-variables.generated.md`
- `docs/reference/template-variables.md`
- `scripts/docs/template-variable-catalog.mjs`
- `services/gateway/src/methods/run.ts`
- `services/gateway/src/runs/store.test.ts`
- `services/gateway/src/runs/store.ts`

## Validation

- `cd apps/command-center && yarn typecheck` → **exit 0** (clean).
- `yarn exec tsx --test services/gateway/src/*.test.ts` → **1/1 pass** (server-globals).
- `yarn exec tsx --test services/gateway/src/runs/store.test.ts` → **37/37 pass**, incl. new
  `loadAllRuns migrates a persisted merge-main.md worker template to update-branch.md`.

## Notes

- Merge commit contains only the resolved changelogs + main's incoming changes.
- Uncommitted rename-flow work was preserved as working-tree changes (not committed —
  no explicit commit instruction for it); typecheck + tests run against the full tree.
