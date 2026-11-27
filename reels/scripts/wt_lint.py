import json,sys,re
r=sys.argv[1]; W=json.load(open(r+'/audio/words_ref.json'))
src=open(r+'/web/shots_body.js').read(); bad=0
for m in re.finditer(r"wt\((\d+),\s*'([^']*)'(?:,\s*(\d+))?\)",src):
    l,p,n=int(m[1]),m[2],int(m[3] or 0)
    ws=[w for w in W if w['line']==l and re.sub(r'[^a-z0-9%]','',w['w'].lower()).startswith(p)]
    if len(ws)<=n: print('MISSING',m[0]); bad+=1
print('wt ok' if not bad else f'{bad} missing')
