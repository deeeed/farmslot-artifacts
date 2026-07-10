# Recipe Coverage

Recipe: `artifacts/recipe.json`
Run package: `artifacts/recipe-run`

| AC | Proof mode | Status | Evidence |
| --- | --- | --- | --- |
| Default `ui.press` records bounded `ui.screen` and `ui.visible` | mixed | pass | `trace.json` entry `press-default-observe` has both observer keys; `ui.visible.items` is capped at 20 and `truncated` is true. Screenshots show the real UI flow. |
| `observe: false` disables passive observations | state | pass | `trace.json` entry `press-observe-false` has no `observations` or `observationWarnings`. |
| `observe: ["ui.visible"]` records only requested observer | state | pass | `trace.json` entry `press-visible-only` has only `ui.visible`. |
| Observation failures are warnings and do not fail the action | state | pass | `packages/recipe-harness/src/core/observations.test.ts` covers thrown observer errors producing warnings while recipe status remains pass. |
| Observations never alter `next`, `status`, `case`, artifacts, or branches | state | pass | `trace.json` press entries retain authored `next`; tests assert status/case/artifacts are not changed by observations. |
| `ui.visible.items` exposes stable handles and stays bounded | mixed | pass | `trace.json` shows labels, roles, selectors, enabled state, bounds, `limits`, and `truncated`; screenshots show the visible targets. |
| Manifest metadata advertises observer support | state | pass | `docs/examples/recipes/farmslot-v1.action-manifest.json` includes `observers` for `ui.screen` and `ui.visible`; protocol tests validate the declarations. |
| Expo/RN bridge returns visible actionable targets | state | pass | `RecipeBridgeProvider` handles `observeUi` and returns `ui.screen` / `ui.visible` through the bridge, with an app-supplied observer hook for project-specific Pressable/TextInput handles. |
| Documentation states observations are passive context, not proof | state | pass | `apps/docs/docs/reference/recipe-protocol-v1.md` and `apps/docs/docs/guides/write-a-recipe.md` document passive semantics and proof requirements. |

Visual evidence:

- `artifacts/before-passive-observations.png`
- `artifacts/after-passive-observations.png`
- `artifacts/after.mp4`

Recorder note: the native recorder failed to create `videos/recipe-run.mp4`, and CDP screencast captured zero frames in this sandbox. The attached MP4 is generated from the actual recipe screenshots; the passing run package and trace are in `artifacts/recipe-run`.
