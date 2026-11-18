# Companion jank

- Device: sdk_gphone64_arm64, Android 16, emulator-5588
- App: net.siteed.farmslot.development, 0.12.0, release build, installed 2026-11-19 06:22:40
- Checkout: 988fb60ef4dd9d53247d2b63a8bb7d030ac0ccd8 (uncommitted changes)

| flow | budget | sustained fps | active fps | fps target | press p50 / p95 / max (ms) | worst frame | janky | frames | Hz |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-presses | pass | n/a | 58.1 | n/a | 66.9 / 67.3 / 67.4 | 33.9 ms | 6.1% | 409 | 60 |
| review-scroll | pass | 60 | 60 | 100% of 60 | n/a / n/a / n/a | 39.7 ms | 3.2% | 439 | 60 |
| terminals-scroll | pass | n/a | 60 | n/a | n/a / n/a / n/a | 21.1 ms | 5.7% | 141 | 60 |
| review-idle | pass | n/a | n/a | n/a | n/a / n/a / n/a | n/a | n/a | 0 | n/a |

| flow | press target | timed | p50 / p95 / max (ms) | within press target |
| --- | --- | --- | --- | --- |
| tab-presses | companion-tab-terminals | 3/3 (3 by shown line) | 51.3 / 65.4 / 67 | yes |
| tab-presses | companion-tab-advanced | 3/3 (3 by shown line) | 66.9 / 67.1 / 67.1 | yes |
| tab-presses | companion-tab-settings | 3/3 (3 by shown line) | 66.8 / 66.9 / 66.9 | yes |
| tab-presses | companion-tab-review | 3/3 (3 by shown line) | 67.2 / 67.3 / 67.4 | yes |

- tab-presses shown presses: touch frame to the end of the last frame that started by two vsyncs (33.3 ms at 60 Hz) after the screen's `[farmslot-perf] shown` line, logged from the second animation frame after focus. A press can over-read by up to about two light frames, and could miss a mount frame that starts more than two vsyncs after the line.
- tab-presses baseline, 7da49c4df @90Hz: press p95 127.6 ms, max 133.8 ms, 90 Hz
- review-scroll baseline, 7da49c4df @90Hz: sustained 70 fps, 555 frames, 90 Hz
- terminals-scroll baseline, 7da49c4df @90Hz: sustained 88.9 fps, 427 frames, 90 Hz
- review-idle baseline, 7da49c4df idle @60Hz: 7 frames, 60 Hz
- NOTE tab-presses: measured 60 Hz; the baseline was recorded at 90 Hz
- NOTE review-scroll: measured 60 Hz; the baseline was recorded at 90 Hz
- NOTE terminals-scroll: measured 60 Hz; the baseline was recorded at 90 Hz

The four app files match signed PR head 8b80a3d73f3966ef5c3aab2b24a4f4700f0eccf1. Measured on an Android emulator at 60 Hz with a populated private queue.
