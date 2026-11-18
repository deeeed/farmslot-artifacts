# Companion jank

- Device: sdk_gphone64_arm64, Android 16, emulator-5584
- App: net.siteed.farmslot.development, 0.12.0, release build, installed 2026-11-19 01:15:38
- Checkout: 374d141a455286ada4fffcaa2e7577a7e6e71e67 (uncommitted changes)

| flow | budget | sustained fps | active fps | fps target | press p50 / p95 / max (ms) | worst frame | janky | frames | Hz |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-presses | pass | n/a | 58.2 | n/a | 67 / 67.8 / 68.4 | 35.3 ms | 6.3% | 410 | 60 |
| review-scroll | pass | 60 | 60 | 100% of 60 | n/a / n/a / n/a | 23.1 ms | 2.8% | 434 | 60 |
| terminals-scroll | pass | n/a | 60 | n/a | n/a / n/a / n/a | 23.3 ms | 5.7% | 140 | 60 |
| review-idle | pass | n/a | n/a | n/a | n/a / n/a / n/a | n/a | n/a | 0 | n/a |

| flow | press target | timed | p50 / p95 / max (ms) | within press target |
| --- | --- | --- | --- | --- |
| tab-presses | companion-tab-terminals | 3/3 (3 by shown line) | 67.1 / 68.3 / 68.4 | yes |
| tab-presses | companion-tab-advanced | 3/3 (3 by shown line) | 67 / 67.2 / 67.2 | yes |
| tab-presses | companion-tab-settings | 3/3 (3 by shown line) | 67.2 / 67.3 / 67.3 | yes |
| tab-presses | companion-tab-review | 3/3 (3 by shown line) | 50.6 / 65.2 / 66.8 | yes |

- tab-presses shown presses: touch frame to the end of the last frame that started by two vsyncs (33.3 ms at 60 Hz) after the screen's `[farmslot-perf] shown` line, logged from the second animation frame after focus. A press can over-read by up to about two light frames, and could miss a mount frame that starts more than two vsyncs after the line.
- tab-presses baseline, 7da49c4df @90Hz: press p95 127.6 ms, max 133.8 ms, 90 Hz
- review-scroll baseline, 7da49c4df @90Hz: sustained 70 fps, 555 frames, 90 Hz
- terminals-scroll baseline, 7da49c4df @90Hz: sustained 88.9 fps, 427 frames, 90 Hz
- review-idle baseline, 7da49c4df idle @60Hz: 7 frames, 60 Hz
- NOTE tab-presses: measured 60 Hz; the baseline was recorded at 90 Hz
- NOTE review-scroll: measured 60 Hz; the baseline was recorded at 90 Hz
- NOTE terminals-scroll: measured 60 Hz; the baseline was recorded at 90 Hz

The APK was built on the recorded base with the same two app-source files as PR head
`84cd26dea69fae3cae22ca222e088e652f296642`. The intervening main commit adds model
defaults and leaves the pairing flow unchanged. APK SHA256
`37a876a104a61319cf22097f3de58859b0cfb2515747fef8c08a4b01720b94b9`.
Review used 24 parked runs served by an isolated gateway. Metrics describe the
60 Hz Android emulator; the report's Pixel reference was measured at 90 Hz.
