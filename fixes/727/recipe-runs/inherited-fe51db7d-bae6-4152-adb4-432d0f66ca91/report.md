
## Self-Review Fixes
- packages/recipe-harness/src/runtime/cdp.ts:905 — the CDP `scrollTo` primitive returns `false` when the surface unmounted between measure and move, and the session throws `UiScrollToError('SCROLL_SURFACE_MISSING')` (harness) instead of a plain in-page `Error` that classified as `unknown`.
- packages/recipe-harness/src/core/scroll-to.ts:233 — a coded provider failure raised during the move now carries the observation measured before it (backend, session, before bounds, viewport), so the trace keeps geometry for every provider, not only CDP.
- packages/recipe-harness/test/recipe-harness.test.ts — the new test drives the real `CdpWebPage.scrollSession` against a fake CDP session whose surface disappears at the move; it fails on the previous HEAD. There is no recipe node for this case: removing a surface in the exact window between two CDP evaluations would make a timing-based, flaky node. The full 18-node real-Chrome recipe was re-run as a regression check and passes.

## Branch freshness (self-review fix pass)
- First probe after 4ae022a9: behindMain=1, mergeConflicts=true (services/gateway/CHANGELOG.md, both sides added Unreleased bullets).
- Ran `git merge origin/main` and kept both bullets (merge commit 8ae85e7c, pushed). Changelog guard, `yarn typecheck`, and gateway QA completion tests pass on the merge.
- Re-probe: behindMain=0, mergeConflicts=false.
