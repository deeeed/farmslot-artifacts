# Companion jank

- Device: Pixel 6, Android 17, 21261FDF6001SP
- App: net.siteed.farmslot.development, 0.10.0, release build, installed 2026-11-04 01:10:54
- Checkout: 90e35c30c3ebaab8829419db5716b417b7939f08 (uncommitted changes)

| flow | budget | sustained fps | active fps | fps target | press p50 / p95 / max (ms) | worst frame | janky | frames | Hz |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-presses | pass | n/a | 84.1 | n/a | 120.7 / 143.4 / 149.6 | 64.4 ms | 1.3% | 475 | 90 |
| review-scroll | fail | n/a | n/a | n/a | n/a / n/a / n/a | n/a | n/a | 0 | n/a |
| terminals-scroll | pass | 81 | 90 | 100% of 60 | n/a / n/a / n/a | 16.6 ms | 0.2% | 436 | 90.1 |
| review-idle | pass | n/a | n/a | n/a | n/a / n/a / n/a | n/a | n/a | 0 | n/a |

| flow | press target | timed | p50 / p95 / max (ms) | within press target |
| --- | --- | --- | --- | --- |
| tab-presses | companion-tab-terminals | 3/3 (3 by shown line) | 126 / 131.5 / 132.1 | no |
| tab-presses | companion-tab-advanced | 3/3 (3 by shown line) | 93.6 / 128.1 / 132 | no |
| tab-presses | companion-tab-settings | 3/3 (3 by shown line) | 138.2 / 148.5 / 149.6 | no |
| tab-presses | companion-tab-review | 3/3 (3 by shown line) | 81.2 / 111.9 / 115.4 | no |

- tab-presses shown presses: touch frame to the end of the last frame that started by two vsyncs (22.2 ms at 90 Hz) after the screen's `[farmslot-perf] shown` line, logged from the second animation frame after focus. A press can over-read by up to about two light frames, and could miss a mount frame that starts more than two vsyncs after the line.
- tab-presses baseline, 7da49c4df @90Hz: press p95 127.6 ms, max 133.8 ms, 90 Hz
- review-scroll baseline, 7da49c4df @90Hz: sustained 70 fps, 555 frames, 90 Hz
- terminals-scroll baseline, 7da49c4df @90Hz: sustained 88.9 fps, 427 frames, 90 Hz
- review-idle baseline, 7da49c4df idle @60Hz: 7 frames, 60 Hz
- FAIL gfxinfo frames 0 < 10 (review-scroll); 7da49c4df @90Hz baseline frames 555
