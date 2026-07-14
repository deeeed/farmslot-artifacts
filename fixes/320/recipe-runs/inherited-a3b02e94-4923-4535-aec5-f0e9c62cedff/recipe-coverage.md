# Recipe coverage — MANUAL-000014 (update-branch flow rename)

Recipe: `artifacts/recipe.json` — drives the Command Center flow-graph dev harness
(`#dev/flow-graph`) on the sandbox UI (5875) via real CDP navigation, no store/DOM
injection. Baseline (pre-rename source stashed) fails at the `update-branch` pill
assertion; fixed code passes. Evidence: `before-flow-selector.png` (merge-main),
`after-flow-selector.png` (update-branch), `after-update-branch-graph.png`
(executor-lane "Update Branch" label + `update-branch` CI-watch chain node),
`after.mp4`.

| # | Acceptance criterion | Proof mode | Status | Evidence |
|---|----------------------|------------|--------|----------|
| ac1 | Flow selection / graph / labels show `update-branch`, not the previous name | visual | pass | `after-flow-selector.png`, `after-update-branch-graph.png`, `after.mp4` vs `before-flow-selector.png` |
| ac2 | New branch-maintenance runs persist `flowType: "update-branch"` | state | pass | `createRun` persists `flowType`/`branchUpdateStrategy` (store.ts); `FlowType` union + `FLOW_STEPS` include `update-branch` (protocol test `flow-normalization.test.ts`) |
| ac3 | Legacy `merge-main` records normalized at load; UI never shows old name | state + visual | pass | `normalizeFlowType`/`normalizeCiActionId` + store load migration (store.ts); `flow-normalization.test.ts`; UI absent-`Merge Main` recipe assertion |
| ac4 | Explicit strategy `rebase \| merge \| project-default` | state | pass | `BranchUpdateStrategy` + `resolveBranchUpdateStrategy` (protocol); `Run.branchUpdateStrategy`; template `BRANCH_UPDATE_STRATEGY` var (writer.ts) |
| ac5 | Default prefers rebase for agent-owned branches; rebase push uses `--force-with-lease` | state | pass | `resolveBranchUpdateStrategy` prefers rebase / downgrades to merge when force-push disallowed (`flow-normalization.test.ts`); CI-watch chained update-branch defaults `branchUpdateStrategy: 'rebase'` (ci-watch-chain.ts); worker template mandates `--force-with-lease` |
| ac6 | `merge` remains available for no-force-push / shared / conflict cases | state | pass | `resolveBranchUpdateStrategy('merge', …)` honored; strategy union keeps `merge`; template documents merge path |
| ac7 | Chained runs resolve PR from family/GitHub metadata, not manual ticket suffix | state | pass | `buildCIWatchChainedRunParams` uses `current.prNumber` + `ciRepo`, never parses ticket suffix (ci-watch-chain.ts); `ci-watch-chain.test.ts` |
| ac8 | Public/user docs describe only `update-branch`; ADRs may note rename history | doc | pass | Generated + guide docs updated to `update-branch` (Phase 5) |

Notes:
- Backend ACs (ac2–ac7) are `state` proofs: covered by protocol/gateway unit tests
  (`packages/protocol/test/contracts/flow-normalization.test.ts`, gateway suite green)
  since they have no first-class Command Center render surface beyond the flow label
  already proven visually.
- No UI value injection: the recipe drives the real flow selector via `ui.press` /
  `ui.wait_for`; removing the rename reverts the pill to `merge-main` and the recipe fails.
