#!/usr/bin/env python3
"""One word per caption (story-Shorts style). Prints CAPTIONS and DURATION for src/shots.js.

    python3 captions_one.py audio/vo.words.json
"""
import json, sys
w = json.load(open(sys.argv[1]))
caps = []
for i, x in enumerate(w):
    end = w[i + 1]['s'] if i + 1 < len(w) else x['e'] + 0.4
    if end - x['s'] > 0.9: end = x['e'] + 0.15
    caps.append([round(x['s'], 2), x['w'], round(end, 2)])
print('export const CAPTIONS = ' + json.dumps(caps) + ';')
print('export const DURATION = %.2f;' % (w[-1]['e'] + 0.9))
