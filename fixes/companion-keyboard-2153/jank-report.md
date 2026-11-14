# Companion jank

- Device: Pixel 6, Android 17, 21261FDF6001SP
- App: net.siteed.farmslot.preview, 0.11.0, release build, installed 2026-11-05 11:17:13
- Checkout: 574799fd19820cc51ddbe97d36968a3f71346ca4

| flow | budget | sustained fps | active fps | fps target | press p50 / p95 / max (ms) | worst frame | janky | frames | Hz |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-presses | pass | n/a | 84.3 | n/a | 120 / 160.1 / 183.2 | 72.8 ms | 1.3% | 558 | 90 |
| review-scroll | pass | n/a | 88.9 | n/a | n/a / n/a / n/a | 13.3 ms | 0% | 154 | 90 |
| terminals-scroll | pass | 69.4 | 89.7 | 100% of 60 | n/a / n/a / n/a | 20.9 ms | 0.7% | 442 | 90 |
| review-idle | pass | n/a | n/a | n/a | n/a / n/a / n/a | n/a | n/a | 0 | n/a |

| flow | press target | timed | p50 / p95 / max (ms) | within press target |
| --- | --- | --- | --- | --- |
| tab-presses | companion-tab-terminals | 3/3 (3 by shown line) | 126.2 / 126.8 / 126.8 | no |
| tab-presses | companion-tab-advanced | 3/3 (3 by shown line) | 93.3 / 174.2 / 183.2 | no |
| tab-presses | companion-tab-settings | 3/3 (3 by shown line) | 117.3 / 138.7 / 141.1 | no |
| tab-presses | companion-tab-review | 3/3 (3 by shown line) | 122.7 / 135.8 / 137.3 | no |

- tab-presses shown presses: touch frame to the end of the last frame that started by two vsyncs (22.2 ms at 90 Hz) after the screen's `[farmslot-perf] shown` line, logged from the second animation frame after focus. A press can over-read by up to about two light frames, and could miss a mount frame that starts more than two vsyncs after the line.
- tab-presses baseline, 7da49c4df @90Hz: press p95 127.6 ms, max 133.8 ms, 90 Hz
- review-scroll baseline, 7da49c4df @90Hz: sustained 70 fps, 555 frames, 90 Hz
- terminals-scroll baseline, 7da49c4df @90Hz: sustained 88.9 fps, 427 frames, 90 Hz
- review-idle baseline, 7da49c4df idle @60Hz: 7 frames, 60 Hz
