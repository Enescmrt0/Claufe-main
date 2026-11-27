#!/usr/bin/env bash
# Build <reel>/audio.py from the shared head + the reel's _cues.py + music calls + the shared tail.
# usage: bash mk_audio.sh <reel> "music call 1" "music call 2" ...
# Lesson from vargHQ/skills video-sound: pros put a sound on few cuts (~2 whooshes per film, accents on 4-25% of cuts),
# so the old "whoosh on every line" loop is replaced by a soft whoosh on every third line only.
set -e
R="$(cd "$(dirname "$0")/.." && pwd)"; r=$1; shift
{ sed -n 1,95p "$R/lustig/audio.py"
  echo "for i in range(3, NLINES, 3): place(sfx, whoosh(.36), S(i) - .22, .16)"
  cat "$R/$r/_cues.py"
  sed -n 121,203p "$R/lustig/audio.py"
  printf "%s\n" "$@"
  sed -n '209,$p' "$R/lustig/audio.py"; } > "$R/$r/audio.py"
echo "wrote $R/$r/audio.py"
