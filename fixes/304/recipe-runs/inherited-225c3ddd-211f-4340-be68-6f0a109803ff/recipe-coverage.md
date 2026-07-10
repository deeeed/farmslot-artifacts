# Recipe Coverage

Recipe: `artifacts/recipe.json`
Inherited run package: `inputs/inherited/evidence-manifest.json`

This merge-main follow-up did not author a new recipe or rerun UI proof. It reused the inherited recipe evidence for the original feature scope, confirmed the PR branch was already up to date with `origin/main`, and validated the merged branch with typecheck plus focused gateway tests.

| AC | Proof mode | Status | Evidence |
| --- | --- | --- | --- |
| Default `ui.press` records bounded `ui.screen` and `ui.visible` | mixed | pass | Inherited `inputs/inherited/recipe-coverage.md` reports `trace.json` entry `press-default-observe` with both observer keys and bounded `ui.visible.items`. |
| `observe: false` disables passive observations | state | pass | Inherited `inputs/inherited/recipe-coverage.md` reports `press-observe-false` has no `observations` or `observationWarnings`. |
| `observe: ["ui.visible"]` records only requested observer | state | pass | Inherited `inputs/inherited/recipe-coverage.md` reports `press-visible-only` has only `ui.visible`. |
| Observation failures are warnings and do not fail the action | state | pass | Inherited coverage cites `packages/recipe-harness/src/core/observations.test.ts`. |
| Observations never alter `next`, `status`, `case`, artifacts, or branches | state | pass | Inherited coverage reports authored `next` values retained and tests guarding status/case/artifacts. |
| `ui.visible.items` exposes stable handles and stays bounded | mixed | pass | Inherited coverage reports labels, roles, selectors, enabled state, bounds, `limits`, and `truncated`. |
| Manifest metadata advertises observer support | state | pass | Inherited coverage cites `docs/examples/recipes/farmslot-v1.action-manifest.json` and protocol validation tests. |
| Expo/RN bridge returns visible actionable targets | state | pass | Inherited coverage cites `RecipeBridgeProvider` handling `observeUi` and returning `ui.screen` / `ui.visible`. |
| Documentation states observations are passive context, not proof | state | pass | Inherited coverage cites `apps/docs/docs/reference/recipe-protocol-v1.md` and `apps/docs/docs/guides/write-a-recipe.md`. |

Merge follow-up validation:

- `cd apps/command-center && yarn typecheck`: pass.
- `cd apps/command-center && yarn exec tsx ../../services/gateway/src/*.test.ts`: pass.
