# Merge-Main Report — PR #320

## Merge target
- Branch: `feat/manual-000014-rename-branch-maintenance-flow`
- Default branch: `main` (origin/main HEAD `12d6de0b`)

## Merge status
Main was **already fully merged** into HEAD via merge commit `2fdcd8ab`
("Merge remote-tracking branch 'origin/main'..."). `git merge-base --is-ancestor
origin/main HEAD` confirms origin/main is an ancestor after a fresh fetch — **no
conflicts to resolve** this round.

## Uncommitted work committed (second-round review fixes for PR #320)
The worktree carried uncommitted second-round review fixes; committed as one
commit `fix: address second-round review findings for PR #320`:

| File | Change |
| --- | --- |
| `services/gateway/src/methods/run.ts` | Stop swallowing `loadProjectVars` failure; validate chained ticket ref so a PR-bound follow-up fails hard instead of wedging downstream. |
| `services/gateway/src/runs/store.ts` | `loadAllRuns` normalizes legacy `merge-main*` task-template filenames to `update-branch*` on load. |
| `services/gateway/src/runs/store.test.ts` | New test: migrates persisted `merge-main.md` worker template to `update-branch.md`. |
| `apps/command-center/scripts/backfill-orphan-runs.mjs` | Backfill script updates. |
| `scripts/docs/template-variable-catalog.mjs` | Catalog entry updates. |
| `docs/reference/template-variables.md` | Doc source update. |
| `apps/docs/docs/reference/template-variables.generated.md` | Regenerated doc output. |

## Validation
- `yarn typecheck` (apps/command-center) — **exit 0**, clean.
- `store.test.ts` — **37/37 pass** (incl. new merge-main→update-branch migration test).
- `server-globals.test.ts` — **pass**.

## Publish
- Branch tracks `origin/feat/manual-000014-rename-branch-maintenance-flow`.
- Before push: 6 commits ahead / 0 behind; merge commit `2fdcd8ab` absent on origin.
- `git push` publishes the merge commit + the review-fix commit to origin.
