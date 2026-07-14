# Learnings — PR #320 follow-up

- The review comments live as PR issue comments, not review threads — `gh pr view --json reviews/comments` returned empty; the actionable findings were in `abretonc7s` issue comments across two rounds. Round 2 (cross-model, at HEAD `24eda26e`) held the 4 confirmed items this run addressed.
- Chain-creation paths that call `createRun` directly (recovery in `run.ts`, `ci-watch-step.ts`, `recovery.ts`) all bypass `runCreate`'s `validateTicketRef`; any new such path must re-validate the ref itself. Silently `.catch(() => null)` on `loadProjectVars` was the root cause — a missing `ci.repo` produced an inherited `MANUAL-*` ref that only failed much later.
- Load-time migration in `runs/store.ts` must cover **every** persisted field derived from a renamed value, not just `flowType`: `taskTemplate.fileName` pointed at a deleted template and would wedge write-task on resume.
- `backfill-orphan-runs.mjs` intentionally hand-mirrors protocol constants (it runs outside the TS build), so the fix was a local `normalizeFlowType` mirror rather than an import — matching the file's existing `FLOW_STEPS` pattern.
- `tsc --noEmit` prints nothing on success, so an empty `yarn typecheck` log with exit 0 is a pass, not a silent failure — confirmed per-package (`typecheck:gateway`).
