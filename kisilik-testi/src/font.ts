import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { BALOO_LATIN, BALOO_LATIN_EXT } from "./font-veri";

// Baloo 2 (Google Fonts, OFL lisansı) koda gömülü: ağ isteği yok, Türkçe karakterleri destekler.
const AILE = "Baloo 2";
const LATIN = "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";
const LATIN_EXT = "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF";

const buffer = (b64: string) => {
  const s = atob(b64);
  const u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return u.buffer;
};

let yukleniyor: Promise<unknown> | null = null;
const fontYukle = () => {
  if (!yukleniyor) {
    const yuzler = [
      new FontFace(AILE, buffer(BALOO_LATIN), { weight: "400 800", unicodeRange: LATIN }),
      new FontFace(AILE, buffer(BALOO_LATIN_EXT), { weight: "400 800", unicodeRange: LATIN_EXT }),
    ];
    yuzler.forEach((f) => document.fonts.add(f));
    yukleniyor = Promise.all(yuzler.map((f) => f.load())).catch((e) => console.error("Font yüklenemedi", e));
  }
  return yukleniyor;
};

/** Her videonun/görselin kök bileşeninde çağrılır: font hazır olana kadar render bekler. */
export const useFont = () => {
  const [tutamac] = useState(() => delayRender("Font yükleniyor"));
  useEffect(() => {
    fontYukle().finally(() => continueRender(tutamac));
  }, [tutamac]);
};

export const FONT = `"${AILE}", "Noto Color Emoji", sans-serif`;
