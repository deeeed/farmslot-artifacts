# Companion jank

- Device: Pixel 6a, Android 17, 29071JEGR20638
- App: net.siteed.farmslot.development, 0.11.0, release build, installed 2026-11-07 01:03:04
- Checkout: 4b845f5a26472be3317525a2274002f341cd3583

| flow | budget | sustained fps | active fps | fps target | press p50 / p95 / max (ms) | worst frame | janky | frames | Hz |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-presses | pass | n/a | 58.4 | n/a | 113.9 / 153.4 / 153.4 | 29.3 ms | 0.5% | 418 | 60 |
| review-scroll | pass | 46.1 | 57.5 | 77% of 60 | n/a / n/a / n/a | 55.3 ms | 0.5% | 392 | 60.1 |
| terminals-scroll | pass | 38 | 54.9 | 63% of 60 | n/a / n/a / n/a | 17.3 ms | 0.4% | 267 | 60.1 |
| review-idle | pass | n/a | n/a | n/a | n/a / n/a / n/a | 16.7 ms | 6.7% | 15 | 60 |

| flow | press target | timed | p50 / p95 / max (ms) | within press target |
| --- | --- | --- | --- | --- |
| tab-presses | companion-tab-terminals | 3/3 (3 by shown line) | 120.5 / 150.1 / 153.4 | no |
| tab-presses | companion-tab-advanced | 3/3 (3 by shown line) | 103.9 / 121.6 / 123.6 | no |
| tab-presses | companion-tab-settings | 3/3 (3 by shown line) | 105.2 / 148.6 / 153.4 | no |
| tab-presses | companion-tab-review | 3/3 (3 by shown line) | 120.7 / 125.9 / 126.5 | no |

- tab-presses shown presses: touch frame to the end of the last frame that started by two vsyncs (33.3 ms at 60 Hz) after the screen's `[farmslot-perf] shown` line, logged from the second animation frame after focus. A press can over-read by up to about two light frames, and could miss a mount frame that starts more than two vsyncs after the line.
- tab-presses baseline, 7da49c4df @90Hz: press p95 127.6 ms, max 133.8 ms, 90 Hz
- review-scroll baseline, 7da49c4df @90Hz: sustained 70 fps, 555 frames, 90 Hz
- terminals-scroll baseline, 7da49c4df @90Hz: sustained 88.9 fps, 427 frames, 90 Hz
- review-idle baseline, 7da49c4df idle @60Hz: 7 frames, 60 Hz
- NOTE tab-presses: measured 60 Hz; the baseline was recorded at 90 Hz
- NOTE review-scroll: measured 60 Hz; the baseline was recorded at 90 Hz
- NOTE terminals-scroll: measured 60 Hz; the baseline was recorded at 90 Hz
