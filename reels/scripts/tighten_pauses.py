# Shorten long pauses inside a voice take (lesson from vargHQ/skills stickman-video: pauses over 0.25 s -> 0.2 s, speech never stretched).
# usage: python tighten_pauses.py in.wav out.wav [max_pause=0.30] [keep=0.22]
import sys, numpy as np, soundfile as sf
src, dst = sys.argv[1], sys.argv[2]
maxp = float(sys.argv[3]) if len(sys.argv) > 3 else .30
keep = float(sys.argv[4]) if len(sys.argv) > 4 else .22
a, sr = sf.read(src); mono = a.mean(1) if a.ndim > 1 else a
hop = int(sr * .01); n = len(mono) // hop
rms = np.sqrt(np.mean(mono[:n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)
thr = np.max(rms) * 10 ** (-38 / 20); quiet = rms < thr
out, i, cut = [], 0, 0.0; start = 0
while i < n:
    if quiet[i]:
        j = i
        while j < n and quiet[j]: j += 1
        dur = (j - i) * .01
        if i > 0 and j < n and dur > maxp:
            a0, a1 = i * hop, j * hop; k = int(keep * sr / 2)
            out.append(a[start:a0 + k]); start = a1 - k; cut += dur - keep
        i = j
    else: i += 1
out.append(a[start:]); y = np.concatenate(out)
sf.write(dst, y, sr); print(f'tightened: {len(a)/sr:.2f}s -> {len(y)/sr:.2f}s (removed {cut:.2f}s of pauses)')
