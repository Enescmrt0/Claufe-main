import json,sys,re
W=json.load(open(sys.argv[1]+'/audio/words_ref.json'))
by={}
for w in W: by.setdefault(w['line'],[]).append(f"{re.sub(r'[^a-z0-9%]','',w['w'].lower())}@{w['s']:.1f}")
for k in sorted(by): print(k,' '.join(by[k]))
