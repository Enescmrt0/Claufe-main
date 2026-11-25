# Builds eyepatch-final.mp4: Ken Burns on stills, Higgsfield Kling clips, one-word captions, local audio mix.
import json, subprocess, os
W = json.load(open('audio/words_ref.json'))
LS = {}
for w in W: LS.setdefault(w['line'], w['s'])
END = W[-1]['e'] + 0.9
def wt(line, word):
    for w in W:
        if w['line'] == line and w['w'].lower().strip('.,!?\'"').startswith(word): return w['s']
    return LS[line]
B = lambda i: LS[i] - .05 if i else 0.0
# (start, kind, source, motion)  kind: still|clip
segs = [
 (0, 'still', 'hf/ref.png', 'in', False),
 (B(1), 'still', 'hf/s1.png', 'left', False),
 (B(2), 'still', 'hf/s2.png', 'in', False),
 (wt(2, '20') - .1, 'still', 'hf/s3.png', 'right', False),
 (B(3), 'still', 'hf/s4.png', 'in', False),
 (B(4), 'still', 'hf/s5.png', 'in', False),
 (B(5), 'still', 'hf/s6.png', 'out', False),
 (B(6), 'clip', 'hf/c7.mp4', None, False),
 (wt(6, 'could') - .1, 'still', 'hf/s8.png', 'in', True),
 (B(7), 'still', 'hf/s9.png', 'left', False),
 (B(8), 'still', 'hf/s10.png', 'in', False),
]
os.makedirs('seg', exist_ok=True)
files = []
for k, (st, kind, src, mo, flip) in enumerate(segs):
    en = segs[k + 1][0] if k + 1 < len(segs) else END
    d = en - st; n = max(1, round(d * 30)); out = f'seg/{k:02d}.mp4'
    if kind == 'still':
        z = {'in': "min(1.0+0.0010*on,1.25)", 'out': "max(1.18-0.0010*on,1.0)", 'left': "1.12", 'right': "1.12"}[mo]
        x = {'in': "iw/2-(iw/zoom/2)", 'out': "iw/2-(iw/zoom/2)", 'left': f"(iw-iw/zoom)*(1-on/{n})", 'right': f"(iw-iw/zoom)*(on/{n})"}[mo]
        vf = ("hflip," if flip else "") + f"scale=2160:3840,zoompan=z='{z}':x='{x}':y='ih/2-(ih/zoom/2)':d={n}:s=1080x1920:fps=30"
        cmd = ['ffmpeg', '-v', 'error', '-y', '-loop', '1', '-i', src, '-vf', vf, '-frames:v', str(n), '-pix_fmt', 'yuv420p', '-c:v', 'libx264', '-crf', '18', out]
    else:
        f = max(1.0, d / 5.0)
        vf = f"setpts={f:.4f}*PTS,scale=1080:1920,setsar=1,fps=30"
        cmd = ['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', vf, '-frames:v', str(n), '-an', '-pix_fmt', 'yuv420p', '-c:v', 'libx264', '-crf', '18', out]
    subprocess.run(cmd, check=True); files.append(out)
open('seg/list.txt', 'w').write(''.join(f"file '{os.path.abspath(f)}'\n" for f in files))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'seg/list.txt', '-c', 'copy', 'silent.mp4'], check=True)
# one-word captions (ASS)
def ts(t): h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60; return f"{h}:{m:02d}:{s:05.2f}"
ass = ["[Script Info]", "PlayResX: 1080", "PlayResY: 1920", "", "[V4+ Styles]",
       "Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Outline, Shadow, Alignment, MarginV",
       "Style: W,Poppins,138,&H00FFFFFF,&H00000000,&H64000000,1,12,5,5,0", "", "[Events]", "Format: Layer, Start, End, Style, Text"]
for i, w in enumerate(W):
    e = W[i + 1]['s'] if i + 1 < len(W) and W[i + 1]['s'] - w['e'] < .4 else w['e'] + .2
    txt = w['w'].lower().strip(',.!?;:"')
    ass.append(f"Dialogue: 0,{ts(w['s'])},{ts(e)},W,{{\\pos(540,1180)\\fscx85\\fscy85\\t(0,80,\\fscx100\\fscy100)}}{txt}")
open('captions.ass', 'w').write('\n'.join(ass) + '\n')
fd = os.path.abspath('../hans/web/fonts')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'silent.mp4', '-i', 'audio/mix.wav', '-vf', f"ass=captions.ass:fontsdir={fd}",
                '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-pix_fmt', 'yuv420p',
                '-af', 'loudnorm=I=-14:TP=-1.5:LRA=9', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', '-movflags', '+faststart', 'eyepatch-final.mp4'], check=True)
print('done', END)
