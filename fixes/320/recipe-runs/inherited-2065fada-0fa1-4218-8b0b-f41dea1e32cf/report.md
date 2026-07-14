# Merge-Main Report — PR #320 / feat/manual-000014-rename-branch-maintenance-flow

## Merge status

`origin/main` was fetched and is already a **direct ancestor of HEAD** — the merge
landed earlier at commit `2fdcd8ab` ("Merge remote-tracking branch 'origin/main'").
No new upstream commits remained to integrate, so no additional merge commit or
conflict resolution was required in this run.

- `git merge-base --is-ancestor FETCH_HEAD HEAD` → true (main fully merged).
- Branch ahead of origin by 6 commits; no `MERGE_HEAD` / no in-progress merge.

## Conflicts resolved

None during this run. The merge itself was already resolved at `2fdcd8ab`.

## Working-tree changes present (merge fallout, uncommitted)

The working tree carries post-merge rename-flow fixes (merge-main → update-branch)
left from prior work on this branch. Validated, not committed (no commit step in
checklist; auto-commit disallowed):

| File | Change |
| --- | --- |
| `services/gateway/src/runs/store.ts` | Normalize persisted `taskTemplate.fileName` `merge-main*` → `update-branch*` on load so legacy runs don't wedge on a deleted template. |
| `services/gateway/src/runs/store.test.ts` | New test: `loadAllRuns` migrates a persisted `merge-main.md` template to `update-branch.md`. |
| `services/gateway/src/methods/run.ts` | Harden chained CI-watch run: don't swallow `loadProjectVars` failure; `validateTicketRef` on the chained ref since `createRun` bypasses `runCreate` validation. |
| `apps/command-center/scripts/backfill-orphan-runs.mjs` | Add `normalizeFlowType` (`merge-main`→`update-branch`, `feature`→`dev`) mirroring protocol so orphan backfill maps legacy flow ids correctly. |
| `scripts/docs/template-variable-catalog.mjs` | Add `update-branch` scope var `BRANCH_UPDATE_STRATEGY` to catalog. |
| `docs/reference/template-variables.md` + `apps/docs/.../template-variables.generated.md` | Regenerated docs for the new `BRANCH_UPDATE_STRATEGY` var. |

## Validation results

- `cd apps/command-center && yarn typecheck` → **EXIT 0**.
- `yarn exec tsx ../../services/gateway/src/runs/store.test.ts` → **37/37 pass** (incl. new `merge-main.md`→`update-branch.md` migration test).
- `yarn exec tsx ../../services/gateway/src/*.test.ts` (server-globals) → **1/1 pass**.

## Verdict

Merge-main fallout for the branch rename is fully integrated and green. No unmerged
upstream work; no conflicts outstanding.
