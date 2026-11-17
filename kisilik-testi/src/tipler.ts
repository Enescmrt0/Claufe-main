/** Şık: düz yazı (puanı sırasına göre 1,2,3,4 olur) ya da { metin, puan } */
export type Secenek = string | { metin: string; puan: number };
export type Soru = { soru: string; secenekler: Secenek[] };
/** aralik: [en az, en çok] toplam puan. Yazılmazsa puan aralığı sonuçlara eşit bölünür. */
export type Sonuc = { emoji: string; ad: string; aciklama: string; aralik?: [number, number] };
export type TestVerisi = {
  ustYazi?: string;
  baslik: string;
  kanca?: string;
  tema?: { renk1?: string; renk2?: string };
  sorular: Soru[];
  sonuclar: Sonuc[];
  kapanis?: string;
  uyari?: string;
  /** saniye cinsinden, isteğe bağlı */
  sureler?: Partial<Sureler>;
  /** "sonra": puanlar geri sayımdan sonra görünür (varsayılan) · "hemen": şıklarla birlikte görünür */
  puanZamani?: "sonra" | "hemen";
};
export type Sureler = {
  giris: number;
  kural: number;
  soru: number;
  sayim: number;
  puan: number; // geri sayımdan sonra puanların ekranda kaldığı süre
  sonucSorusu: number;
  sonuc: number;
  kapanis: number;
};
export const FPS = 30;
export const VARSAYILAN_SURELER: Sureler = {
  giris: 3,
  kural: 2.5,
  soru: 6,
  sayim: 3,
  puan: 1.5, // sorunun son kaç saniyesinde geri sayım akar
  sonucSorusu: 3,
  sonuc: 3.5,
  kapanis: 3.5,
};
export const HARFLER = ["A", "B", "C", "D", "E", "F"];
export const HARF_RENKLERI = ["#FF4D6D", "#3A86FF", "#06D6A0", "#FFB703", "#9B5DE5", "#F15BB5"];

export const sureleriAl = (v: TestVerisi): Sureler => ({ ...VARSAYILAN_SURELER, ...(v.sureler ?? {}) });

export const toplamKare = (v: TestVerisi) => {
  const s = sureleriAl(v);
  const sn = s.giris + s.kural + v.sorular.length * s.soru + s.sonucSorusu + v.sonuclar.length * s.sonuc + s.kapanis;
  return Math.round(sn * FPS);
};

export const secenekMetni = (s: Secenek) => (typeof s === "string" ? s : s.metin);
export const secenekPuani = (s: Secenek, i: number) => (typeof s === "string" ? i + 1 : s.puan);

/** Mümkün olan en düşük ve en yüksek toplam puan */
export const puanSiniri = (v: TestVerisi): [number, number] => {
  let az = 0, cok = 0;
  for (const q of v.sorular) {
    const p = q.secenekler.map(secenekPuani);
    az += Math.min(...p);
    cok += Math.max(...p);
  }
  return [az, cok];
};

/** Her sonucun puan aralığı (yazılmamışsa eşit dilimlere böler) */
export const sonucAraliklari = (v: TestVerisi): [number, number][] => {
  const [az, cok] = puanSiniri(v);
  const n = v.sonuclar.length;
  const adim = (cok - az + 1) / n;
  return v.sonuclar.map((r, i) => r.aralik ?? [Math.round(az + i * adim), i === n - 1 ? cok : Math.round(az + (i + 1) * adim) - 1]);
};
