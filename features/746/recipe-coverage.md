# Recipe coverage

Validation of PR #746 at `ccceaa5d` in run `daa41c47`, a new family, with `sandbox-gateway-ui` and `browser-cdp` leased for it. The recipe is the preserved one (`/tmp/farmslot-746-0926-validation-source/recipe.json`, sha256 `9f75ea59…0e21`), with probe paths moved to this run and three `ui.scroll` nodes added: `scroll-evals-models`, `scroll-luna-pill` and `scroll-luna-efforts`. Without them the targets were off-screen, so `visible` could not pass and `hidden` passed trivially.

Runs:
- Baseline on `main` (`ae393b75`), `recipe-run-baseline/`: fails at `catalog-codex` with `METHOD_NOT_FOUND runner.modelCatalog`.
- Full `recipe.json` on `ccceaa5d`, `recipe-run/` (video): 27/28, fails at `wait-evals-unsaved-hidden`.
- `recipe-dispatch-slice.json` (full recipe minus the 6 Evals nodes), `recipe-run-slice/` (video): 62/62 pass.

| Criterion | Mode | Verdict | Proof |
| --- | --- | --- | --- |
| Structured catalog: Codex ready from `structured-file` with Astra `ultra`; Claude unsupported; Pi unavailable when its file is missing | state | pass | `assert-codex-*`, `assert-claude-unsupported`, `assert-pi-unavailable` in both runs. Baseline on `main` fails at `catalog-codex`. |
| Explicit selection kept outside the saved set; stored runs unchanged | state | pass | `assert-visible-saved`, `assert-retained-model`, `assert-runs-unchanged` (byte-identical `run.list`). |
| Unsaved Pi and Cursor keep picker defaults | state | pass | `assert-seed-pi-unsaved`, `assert-seed-pi-anthropic`, `assert-seed-cursor`. |
| Native default stays selectable when visibility omits it | state | pass | `assert-native-default`: `NATIVE_DEFAULT_SELECTABLE gpt-6-astra` while Codex is saved as `[gpt-5.4]`. |
| Dispatch picker: Claude unsupported, Codex narrowed + retained Astra, catalog save persists | mixed | pass | Slice nodes `wait-unsupported`, `wait-visible-default`, `wait-retained-astra`, `wait-seed-hidden`, `wait-saved`, `assert-ui-saved-astra`. Screenshots `before-visible-models.png`, `after-unsupported-catalog.png`, `after-visible-defaults.png`, `after-runner-catalog.png`; `after.mp4`. |
| Catalog-only model offers only accepted efforts | mixed | pass | `wait-luna-xhigh` visible, `wait-luna-max-hidden` hidden with the effort row on screen. The same row shows `max` for Astra (`after-visible-defaults.png`), so the negative check can fail. `after-catalog-effort-accepted.png`. |
| Stale catalog response dropped after runner change | mixed | pass | `assert-stale-catalog-dropped`: `STALE_CATALOG_DROPPED runner=claude loaded=none`. The probe clicks real controls and reads `loadedCatalog`; it writes no state. |
| Direct Evals entry uses saved visibility | mixed | fail (environment) | `wait-evals-unsaved-hidden` fails: `gpt-5.6-sol` and the rest of the seed are still offered (`after-evals-direct-entry-failure.png`, `after-full-recipe-evals-failure.mp4`). Cause: the shared runs dir `~/dev/farmslot/.runs` holds `undefined.json`, which `runs/store.ts` (on `main`, not in this PR) wrote at the 08:06:04Z gateway restart from `runtime-capabilities-7777.json`. `run.list` returns it without `id`. Every Evals re-render throws in `catalogItemFromRun` (`run.id.slice`), so the re-render `watchVisibleModels` requests after loading never lands. In the page, the cache holds `["gpt-5.4"]` and `candidateModelOptions('codex','gpt-6-astra')` returns `[gpt-5.4, gpt-6-astra]`. Not proven on this HEAD. The operator's `.runs` was left untouched. |
