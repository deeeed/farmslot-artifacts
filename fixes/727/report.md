# Update-branch report — PR #727

## Selected strategy
`rebase` (from `BRANCH_UPDATE_STRATEGY: rebase`). Rebased `fix/manual-000110-fix-scroll-visibility-contract` onto `origin/main` `b95e58af`; the branch had been 7 commits behind, so GitHub reported CONFLICTING/DIRTY. The earlier merge commit `8ae85e7c` fell away during the rebase. The branch now has 9 linear commits on top of `main`. Before rewriting, I kept a local ref, `backup/727-pre-rebase-8ae85e7c`.

## Conflict resolution summary
- Only `CHANGELOG.md` Unreleased sections conflicted: `apps/command-center`, `packages/protocol`, `services/gateway` on the first commit. `main` and this branch both added bullets. I kept both sets, with this PR's bullet first. No source-file conflicts.
- Integrity check: every file that differs between the pre-rebase branch and the rebased branch is a file `main` changed between `d380ef3c` and `b95e58af`. The only files both sides touched are the three changelogs, so none of the PR's content was lost. The gateway "Recheck GitHub…" bullet appears exactly once.

## Validation notes
- `yarn install --immutable`, then rebuilt `@farmslot/protocol`, `@farmslot/recipe-harness` and `@farmslot/agent-runtime` dists.
- `cd apps/command-center && yarn typecheck`: pass.
- `yarn exec tsx --experimental-test-module-mocks --test ../../services/gateway/src/*.test.ts`: 3/3. The flag is the one the repo's `run-tsx-tests.mjs` passes; without it, `webhook-rule-routing.test.ts` cannot use `mock.module`.
- Focused suites, all passing: protocol (full run-tsx-tests), recipe-harness `yarn test`, expo-recipe 35/35, `run-recipe.test.mjs`, gateway `qa/completion.test.ts`, workspace changelog guard.
- Real-browser recipe not re-run: the `browser-cdp` lease was released (CDP 9332 down) and the worker does not start Chrome. The rebase changed no PR source lines. Recipe coverage, recipe-quality and screenshots are inherited from run fe51db7d and labeled as such in recipe-coverage.md.

## Push command used
`git push --force-with-lease=fix/manual-000110-fix-scroll-visibility-contract:8ae85e7c7648ce1fd8b8e9ff3a42c55603a9f6eb origin fix/manual-000110-fix-scroll-visibility-contract` (`8ae85e7c...f509b775`, forced update).

## Risk notes
- The force-push rewrote every PR commit SHA (new head `f509b775`). Earlier review approvals quoted `4d60a943` and `88b8a744`; those SHAs are no longer on the branch, though the content is unchanged. Re-review should target `f509b775`.
- After the push, GitHub reports `mergeable: MERGEABLE`, `mergeStateStatus: BLOCKED`. CI ("Detect changed quality targets", "Repository hygiene gates") was pending when this report was written; follow up on `gh pr checks 727`.
