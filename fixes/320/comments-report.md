# PR #320 — Follow-up (pr-complete) report

Branch: `feat/manual-000014-rename-branch-maintenance-flow`
Base HEAD at start: `24eda26e`

## Scope

Addressed the **4 confirmed findings** from the second (cross-model) review round
posted at HEAD `24eda26e`. The two waived items (hard-coded `'rebase'` default,
`ci-watch-step.ts` formatting-only hunks) were intentionally left alone.

## Findings addressed

### 1. Recovery chain path bypassed ref validation
`services/gateway/src/methods/run.ts` (~985, "all decisions resolved but still
blocked" branch):
- Removed `loadProjectVars(...).catch(() => null)` — a project-config failure is
  no longer swallowed; it surfaces via the outer `.catch` and the run stays
  `blocked` instead of silently chaining a broken follow-up (also satisfies the
  repo "No Swallowed Exceptions" rule).
- Added an explicit `validateTicketRef(chainSpec.createParams.ticketOrPr,
  chainSpec.flowType)` before `createRun`, since this path bypasses `runCreate`'s
  entry validation. An unresolved `ciRepo` (PR-bound flow still carrying an
  inherited `MANUAL-*`/`PROJ-*` ref) now fails hard here instead of wedging at
  write-task.

### 2. Load migration missed persisted `taskTemplate.fileName`
`services/gateway/src/runs/store.ts` (load migration block): normalize a
persisted `taskTemplate.fileName` starting with `merge-main` to `update-branch`
(`merge-main.md` → `update-branch.md`) so a legacy run does not resume against
the deleted template. Added test: `loadAllRuns migrates a persisted merge-main.md
worker template to update-branch.md` (`store.test.ts`).

### 3. `backfill-orphan-runs.mjs` dropped legacy flow values
`apps/command-center/scripts/backfill-orphan-runs.mjs` (~64): added a local
`normalizeFlowType` mirror (matches protocol: `merge-main`→`update-branch`,
`feature`→`dev`) and ran `sm.flowType` through it before the `FLOW_STEPS`
lookup, so legacy `merge-main` runs get the correct pipeline instead of the
`fix-bug` fallback.

### 4. `BRANCH_UPDATE_STRATEGY` missing from template-variable catalog
`scripts/docs/template-variable-catalog.mjs`: added an `update-branch` scope
entry for `BRANCH_UPDATE_STRATEGY`, then regenerated the references via
`yarn docs:template-vars` (`docs/reference/template-variables.md` and
`apps/docs/docs/reference/template-variables.generated.md`).

## Files changed
- `services/gateway/src/methods/run.ts`
- `services/gateway/src/runs/store.ts`
- `services/gateway/src/runs/store.test.ts` (new test)
- `apps/command-center/scripts/backfill-orphan-runs.mjs`
- `scripts/docs/template-variable-catalog.mjs`
- `docs/reference/template-variables.md` (generated)
- `apps/docs/docs/reference/template-variables.generated.md` (generated)

## Validation
- `cd apps/command-center && yarn typecheck` — pass (exit 0).
- `@farmslot/gateway` full node:test suite — **174 files, 0 failures**, incl. the
  new store migration test.
- `store.test.ts` focused run — 37 pass, 0 fail.
- `yarn lint` — ESLint ratchet passed (11 pre-existing, 0 new).
- `apps/command-center yarn format:check` — clean.
- `scripts/quality/check-workspace-changelogs.mjs` — guard passed.
- `backfill-orphan-runs.mjs` dry-run — runs cleanly (exit 0).

## CDP note
No UI surface touched (gateway logic, a maintenance script, doc catalog + generated
docs). CDP browser validation is therefore N/A for this follow-up.
