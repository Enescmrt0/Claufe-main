"""Telifsiz arka plan müziklerini kodla üretir -> public/muzik/*.wav (döngüye uygun). Depoda .m4a (AAC) olarak tutulur:
  npx remotion ffmpeg -i public/muzik/sakin.wav -c:a aac -b:a 160k -f mp4 public/muzik/sakin.m4a.
Kullanım: python3 scripts/muzik.py
  sakin.wav   : yavaş, ciddi ambient (pad + piyano arpej + yumuşak bas)
  enerjik.wav : hareketli pop (davul + bas + pluck akorlar)
"""
import os, wave
import numpy as np

SR = 44100
KOK = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "muzik")
rng = np.random.default_rng(7)

def hz(nota):  # MIDI -> Hz
    return 440.0 * 2 ** ((nota - 69) / 12)

def zarf(n, atak, birakma):
    e = np.ones(n)
    a = max(1, int(atak * SR)); r = max(1, int(birakma * SR))
    e[:a] = np.linspace(0, 1, a)
    e[-r:] *= np.linspace(1, 0, r)
    return e

def ekle(buf, sinyal, bas):
    """Döngü: taşan kısım başa sarılır (kesintisiz loop)."""
    n = len(buf); i = bas % n
    son = min(n, i + len(sinyal))
    buf[i:son] += sinyal[: son - i]
    kalan = len(sinyal) - (son - i)
    if kalan > 0:
        buf[:kalan] += sinyal[son - i:]

def pad(nota, sure, ses=0.08):
    t = np.arange(int(sure * SR)) / SR
    s = np.zeros_like(t)
    for detune in (-0.12, 0.0, 0.12):
        f = hz(nota + detune)
        for h, a in ((1, 1), (2, 0.35), (3, 0.15)):
            s += a * np.sin(2 * np.pi * f * h * t + rng.uniform(0, 6))
    return s * zarf(len(t), sure * 0.35, sure * 0.45) * ses / 3

def piyano(nota, sure=2.5, ses=0.16):
    t = np.arange(int(sure * SR)) / SR
    f = hz(nota)
    s = sum(a * np.sin(2 * np.pi * f * h * t) * np.exp(-t * (2.2 + h * 0.9)) for h, a in ((1, 1), (2, 0.45), (3, 0.2), (4, 0.1)))
    return s * zarf(len(t), 0.005, 0.3) * ses

def bas_ton(nota, sure, ses=0.22):
    t = np.arange(int(sure * SR)) / SR
    s = np.sin(2 * np.pi * hz(nota) * t) + 0.25 * np.sin(2 * np.pi * hz(nota) * 2 * t)
    return s * zarf(len(t), 0.02, 0.15) * ses

def pluck(nota, sure=0.35, ses=0.09):
    t = np.arange(int(sure * SR)) / SR
    f = hz(nota)
    s = sum(a * np.sin(2 * np.pi * f * h * t) for h, a in ((1, 1), (2, 0.5), (3, 0.3), (5, 0.1)))
    return s * np.exp(-t * 9) * zarf(len(t), 0.003, 0.05) * ses

def kick(ses=0.55):
    t = np.arange(int(0.35 * SR)) / SR
    f = 50 + 110 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * ses

def clap(ses=0.22):
    t = np.arange(int(0.2 * SR)) / SR
    g = rng.uniform(-1, 1, len(t))
    g = np.convolve(g, np.ones(3) / 3, mode="same")
    return g * np.exp(-t * 22) * ses

def hihat(ses=0.06):
    t = np.arange(int(0.06 * SR)) / SR
    g = rng.uniform(-1, 1, len(t))
    g = g - np.convolve(g, np.ones(8) / 8, mode="same")  # yüksek frekans
    return g * np.exp(-t * 70) * ses

def kaydet(ad, buf):
    buf = buf / (np.max(np.abs(buf)) + 1e-9) * 0.8
    stereo = np.stack([buf, np.roll(buf, int(0.012 * SR))], axis=1)  # hafif genişlik
    veri = (stereo * 32767).astype(np.int16)
    yol = os.path.join(KOK, ad)
    with wave.open(yol, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(veri.tobytes())
    print("✔", yol, f"{len(buf) / SR:.1f} sn")

# ---------------- sakin (ciddi) ----------------
def sakin():
    bpm = 68; vurus = 60 / bpm; olcu = 4 * vurus
    # Am - F - C - G  /  Am - F - Dm - E
    akorlar = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62], [57, 60, 64], [53, 57, 60], [50, 53, 57], [52, 56, 59]]
    olcu_sayisi = 16
    buf = np.zeros(int(olcu_sayisi * olcu * SR))
    for m in range(olcu_sayisi):
        ak = akorlar[m % 8]; bas_t = int(m * olcu * SR)
        for n in ak:
            ekle(buf, pad(n, olcu * 1.3), bas_t)
        ekle(buf, bas_ton(ak[0] - 12, olcu * 0.95, 0.12), bas_t)
        # piyano arpej: 8'lik notalar, ilk 8 ölçüde seyrek, sonra dolu
        desen = [0, 1, 2, 1, 0 + 12, 2, 1, 2] if m >= 8 else [0, None, 2, None, 1, None, 2, None]
        for k, d in enumerate(desen):
            if d is None:
                continue
            nota = ak[d % 3] + 12 + (12 if d >= 12 else 0)
            ekle(buf, piyano(nota), bas_t + int(k * vurus / 2 * SR))
    kaydet("sakin.wav", buf)

# ---------------- enerjik (shorts) ----------------
def enerjik():
    bpm = 112; vurus = 60 / bpm; olcu = 4 * vurus
    akorlar = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]  # C G Am F
    olcu_sayisi = 16
    buf = np.zeros(int(olcu_sayisi * olcu * SR))
    for m in range(olcu_sayisi):
        ak = akorlar[m % 4]; b = int(m * olcu * SR)
        for v in range(4):
            ekle(buf, kick(), b + int(v * vurus * SR))
            if v in (1, 3):
                ekle(buf, clap(), b + int(v * vurus * SR))
        for e in range(8):
            ekle(buf, hihat(0.07 if e % 2 else 0.045), b + int(e * vurus / 2 * SR))
        for e, kat in enumerate([1, 0, 1, 1, 0, 1, 1, 0]):
            if kat:
                ekle(buf, bas_ton(ak[0] - 24, vurus / 2 * 0.9, 0.3), b + int(e * vurus / 2 * SR))
        # pluck ritim (senkoplu)
        for e in (0, 3, 6, 8, 11, 14):
            for n in ak:
                ekle(buf, pluck(n + 12), b + int(e * vurus / 4 * SR))
        if m % 2 == 1:  # melodi cevabı
            for e, d in enumerate([2, 1, 0, 1]):
                ekle(buf, pluck(ak[d] + 24, 0.5, 0.08), b + int((8 + e * 2) * vurus / 4 * SR))
    kaydet("enerjik.wav", buf)

os.makedirs(KOK, exist_ok=True)
sakin()
enerjik()
