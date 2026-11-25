#!/bin/bash
# joins the 3 Higgsfield clips, adds captions and the local voice/music mix
set -e
cd "$(dirname "$0")"
F=../hans/web/fonts/Poppins-Bold.ttf
cap(){ echo "drawtext=fontfile=$F:text='$1':fontsize=78:fontcolor=white:borderw=10:bordercolor=black:x=(w-text_w)/2:y=h*0.70:enable='between(t,$2,$3)'"; }
V="[0:v]scale=1080:1920,setsar=1,fps=30[a];[1:v]scale=1080:1920,setsar=1,fps=30[b];[2:v]scale=1080:1920,setsar=1,fps=30[c];[a][b][c]concat=n=3:v=1:a=0[v];[v]$(cap 'IN 1932' 0.35 1.5),$(cap 'AUSTRALIA DECLARED WAR' 1.5 3.0),$(cap '...ON BIRDS' 3.0 4.9),$(cap '20,000 EMUS' 5.3 6.5),$(cap '2 MACHINE GUNS' 6.5 9.8),$(cap 'AND THE EMUS WON' 11.0 15)[out]"
ffmpeg -v error -y -i hf/c0.mp4 -i hf/c1.mp4 -i hf/c2.mp4 -i audio/mix.wav -filter_complex "$V" -map "[out]" -map 3:a -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=9" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart emu3d-final.mp4
echo done
