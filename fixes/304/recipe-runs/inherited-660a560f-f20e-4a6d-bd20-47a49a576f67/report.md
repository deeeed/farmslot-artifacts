# Merge-Main Report

## Conflicts resolved

- Merged `origin/main` into `feat/manual-000011-recipe-ui-passive-observations`.
- Resolved one content conflict in `packages/protocol/CHANGELOG.md` by preserving all Unreleased entries:
  - Recipe Protocol v1 passive UI observation fields.
  - Reviewer context protocol types and exports.
  - Tmux runtime recovery RPC contracts.

## Files changed

- Merge commit: `a8be1026 chore: merge main into recipe UI passive observations`.
- Merge brought in 90 changed files from `origin/main` with 3,954 insertions and 293 deletions.
- Direct conflict-resolution edit was limited to `packages/protocol/CHANGELOG.md`.

## Validation results

- `cd apps/command-center && yarn typecheck`: pass.
- `cd apps/command-center && yarn exec tsx ../../services/gateway/src/*.test.ts`: initially failed because local `@farmslot/protocol` dist was stale and did not export `isReviewerWindowName`.
- `yarn workspace @farmslot/protocol build`: pass; refreshed local generated protocol dist.
- `cd apps/command-center && yarn exec tsx ../../services/gateway/src/*.test.ts`: pass.
