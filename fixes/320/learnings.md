# Learnings — merge-main PR #320

- Main was already merged (`2fdcd8ab`) — no conflicts; task reduced to committing carried-over second-round review fixes and publishing.
- Checklist omitted a publish step; operator supplied it mid-run. Confirmed branch tracks its origin counterpart and the local merge commit was absent on origin before pushing.
- The review fixes hit a real correctness path: `run.ts` was swallowing a `loadProjectVars` failure, which would let a chained PR-bound flow proceed with an unresolved MANUAL-*/PROJ- ref and wedge at write-task. Fix now fails hard via `validateTicketRef`.
- `store.ts` migration keeps legacy `merge-main.md` runs resumable after the template rename to `update-branch.md`; covered by a new test.
