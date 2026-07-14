# Learnings — MANUAL-000014 (update-branch flow rename)

- The flow id `merge-main` and the prepare-time `mergeMain` / `merge_main_strategy`
  (ADR-042 integrate-main) are two distinct concepts sharing a stem. A blanket
  `s/merge-main/update-branch/` had to protect the `--merge-main` CLI flag and
  leave the underscore/camelCase prepare identifiers untouched; the safe global
  pass keyed only on the hyphenated flow id.
- The `perl -0pi -e 's/merge-main/update-branch/g'` sweep also rewrote the *legacy*
  literal inside my own `normalizeFlowType`/`normalizeCiActionId` migration
  functions (turning `case 'merge-main'` into `case 'update-branch'`), silently
  breaking the migration. Caught by the new protocol unit test — write the
  normalization tests before running broad rename sweeps.
- Recipe evidence gotcha: the app HUD renders each node's `intent` text into the
  DOM, so a `ui.wait_for` text assertion is satisfied by the HUD, not the real UI.
  Any word you assert on must not appear in the recipe's intents/labels.
- The sandbox validation stack serves the worktree UI on 5875, but the operator
  `run-recipe.mjs` resolves `uiUrl` from the operator checkout's `.env.ports`
  (5175) and hash-navigation doesn't cross ports — the recipe silently validated
  the stale operator UI. Had to pass `FARMSLOT_UI_URL=http://localhost:5875`.
- Pre-existing (not caused here): `templates/worker/self-review.md` fails the
  worker-template `learnings.md` contract on HEAD too; flagged, left in place.
