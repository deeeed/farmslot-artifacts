# Recipe Coverage

## Command Center

- Surface: Command Center browser UI on slot `macwork-ff-3`.
- Recipe: `command-center-passive-observations.recipe.json`.
- Runner: worktree-local `apps/command-center/scripts/agentic/run-recipe.mjs` from PR #304 branch.
- Result: `recipe-run-command-center-local/summary.json` reports `status=pass`, `passed=17`, `failed=0`.
- Covered behavior:
  - Default `observe: true` for `ui.press` records `ui.screen` and `ui.visible`.
  - Node-level `observe: ["ui.visible"]` records only `ui.visible`.
  - Node-level `observe: false` records no observations and no observation warnings.

## Companion

- Surface: Farmslot Companion iOS dev client on simulator `fs-3`, Metro `:8880`.
- Recipe: `companion-passive-observations.recipe.json`.
- Runner: repo-supported `apps/companion/scripts/agentic/validate-recipe.sh`.
- Result: `recipe-run-companion/summary.json` reports `status=pass`, `passed=3`, `failed=0`.
- Covered behavior:
  - Official recipe action `app.status` maps to bridge command `status` and confirms the app-side bridge is reachable.
  - `observe: true` records passive `ui.screen` and `ui.visible` observations through the companion `observeUi` bridge path.

## Explicit Gap

- Companion does not currently expose repo-supported `ui.press`, `ui.wait_for`, `ui.screenshot`, or observer declarations in `apps/companion/scripts/agentic/recipe/action-manifest.json`.
- The companion proof validates supported `observeUi` behavior, not full React Native UI-action parity with the Command Center `ui.press` default/selected/`observe:false` matrix.
