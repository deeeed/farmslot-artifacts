# Recipe coverage — MANUAL-000110

Recipe: `artifacts/recipe.json`. Each `command` node runs the worktree Command Center runner (`apps/command-center/scripts/agentic/run-recipe.mjs` → `@farmslot/recipe-harness` CDP transport) against the real Chrome on CDP 9332, on `packages/recipe-harness/test/fixtures/scroll-to-visible/page.html` served from the slot Vite origin. `artifacts/proof/verify-trace.mjs` then asserts that run's `trace.json`/`summary.json`. Baseline (`recipe-run-repro`) failed: `ui.scroll_to` undeclared, `offset_y` unknown.

| AC | Mode | Node(s) | Proof |
| --- | --- | --- | --- |
| ac1 `ui.scroll_to` official + manifest schema params | state | canonical-scroll-to, conformance-suite | runner accepts the action from `farmslot-v1.action-manifest.json` (baseline rejected it); protocol schema tests |
| ac2 absolute vs relative `ui.scroll` | state | canonical-scroll-to (nudge-relative, jump-absolute) | `delta_y: 120` moves +120 from the current offset; `offset_y: 240` lands at 240 |
| ac3 adapter accepts `ui.scroll_to`; trace geometry | mixed | canonical-scroll-to | trace has backend `cdp-web`, sessionId, surface/target ids, before/after bounds, viewport, safeViewport, offset, scrolled/alreadyVisible, settlement, finalVisible; screenshot pair |
| ac4 already-visible no-op; flattened Text via anchor | mixed | canonical-scroll-to (repeat-history, reveal-flat-text) | repeat has `alreadyVisible: true` with an unchanged offset; flat-text has `targetPresent: true`, `targetBounds: null`, anchor bounds inside safeViewport |
| ac5 live layout, HUD, retained session | mixed | settlement-timeout, canonical-scroll-to, conformance-suite | per-frame growth → `SCROLL_SETTLEMENT_TIMEOUT`; real HUD recorded as occlusion; retained-session/HUD cases in the conformance suite |
| ac6 stop after node + teardown | state | stop-after-node, stop-after-node-rejected | trace = open, ready, capture-before, reveal-history, reset-surface (teardown); `summary.stopAfterNode`; runner refuses a terminal stop node and a missing node id |
| ac7 stable codes, harness, geometry | state | surface-missing, target-missing, target-not-measurable, settlement-timeout | `cause_class: harness`, `error_code`, `error_details` with backend/session/viewport; `cause_counts.unknown = 0` |
| ac8 docs/manifests | state | — | `rg` over the capability reference and example manifests (static docs) |

Fail check: the settlement-timeout node failed during development when the fixture layout oscillated in step with the sampling interval, and passed only once the layout really changed every frame; the baseline run fails the first node.

Review-round fixes and their proof:
- Terminal / empty stop node refused: recipe node `stop-after-node-rejected`; removing the guard drops the asserted message (checked against a rebuilt harness, then restored).
- Gateway QA refuses a partial (`stopAfterNode`) package: proven by `services/gateway/src/qa/completion.test.ts` only. No recipe node, because driving QA completion end to end needs a QA run dispatched through the control plane, which this worker cannot reach.
- Hidden or opacity-0 elements are not measurable, and body/html surfaces use the document scroller: covered by the CDP measure expression the real-browser nodes run; no dedicated node.

Cross-model (Codex) review fixes and their proof:
- Outer overflow clip limits the surface viewport: recipe node `reveal-clipped` (viewport 100px, row moved into it). Without the clip loop the node fails with a 153px viewport.
- Corner HUD cards block only the targets they cover: conformance test "a corner card only blocks targets it covers".
- Settlement budget bounded by `max(timeout_ms, (stable_samples - 1) * interval_ms)`: conformance timeout-0 test.
- Agent Device `delta_*` mapping and `--stop-after-node=` / `into_view` guards: expo-recipe and harness unit tests; the empty-value runner guard shares the recipe-proven code path.

Self-review fix: a surface that unmounts between measure and move fails `SCROLL_SURFACE_MISSING` (harness) with pre-move geometry. This is proven by a unit test through the real `CdpWebPage.scrollSession` with a fake CDP session; no recipe node, because the unmount window can't be timed reliably on a live page.

## Update-branch run (PR #727, rebase onto main b95e58af)
This run did not re-execute the recipe. The `browser-cdp` lease had been released (nothing listening on CDP 9332), and the worker does not start Chrome itself. The rebase changed no PR source lines: only changelog conflicts, and `main`'s new commits don't touch recipe-harness, protocol recipe code or the runner. The coverage above, the recipe-quality verdict, the screenshots, and `artifacts/recipe-run` (pass, 18/18 nodes, 2026-09-23T04:45Z, source `4ae022a9`) are inherited from run fe51db7d on identical PR source. Unit and integration suites were re-run on the rebased HEAD (see report.md).
