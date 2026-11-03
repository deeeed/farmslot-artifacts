# Companion jank

- Device: Pixel 6, Android 17, 21261FDF6001SP
- App: net.siteed.farmslot.development, 0.10.0, release build, installed 2026-11-03 23:37:50
- Checkout: f4a3830441ce29d979e5cde5dc74e135acf3a1c0

| flow | budget | sustained fps | active fps | fps target | press p50 / p95 / max (ms) | worst frame | janky | frames | Hz |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-presses | pass | n/a | 84.9 | n/a | 101.1 / 155.2 / 170.8 | 48.2 ms | 1.6% | 557 | 90.1 |
| review-scroll | pass | n/a | 88.2 | n/a | n/a / n/a / n/a | 11.6 ms | 0% | 154 | 90 |
| terminals-scroll | pass | 88 | 89.4 | 100% of 60 | n/a / n/a / n/a | 19 ms | 0.2% | 431 | 90.1 |
| review-idle | pass | n/a | n/a | n/a | n/a / n/a / n/a | 12.4 ms | 0% | 1 | 60 |

| flow | press target | timed | p50 / p95 / max (ms) | within press target |
| --- | --- | --- | --- | --- |
| tab-presses | companion-tab-terminals | 3/3 (3 by shown line) | 133.3 / 137.6 / 138.1 | no |
| tab-presses | companion-tab-advanced | 3/3 (3 by shown line) | 69 / 72.7 / 73.1 | yes |
| tab-presses | companion-tab-settings | 3/3 (3 by shown line) | 137 / 141.9 / 142.4 | no |
| tab-presses | companion-tab-review | 3/3 (3 by shown line) | 104.6 / 164.2 / 170.8 | no |

- tab-presses shown presses: touch frame to the end of the last frame that started by two vsyncs (22.2 ms at 90 Hz) after the screen's `[farmslot-perf] shown` line, logged from the second animation frame after focus. A press can over-read by up to about two light frames, and could miss a mount frame that starts more than two vsyncs after the line.
- tab-presses baseline, 7da49c4df @90Hz: press p95 127.6 ms, max 133.8 ms, 90 Hz
- review-scroll baseline, 7da49c4df @90Hz: sustained 70 fps, 555 frames, 90 Hz
- terminals-scroll baseline, 7da49c4df @90Hz: sustained 88.9 fps, 427 frames, 90 Hz
- review-idle baseline, 7da49c4df idle @60Hz: 7 frames, 60 Hz
