export type Soru = { soru: string; secenekler: string[] };
export type Sonuc = { emoji: string; ad: string; aciklama: string };
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
};
export type Sureler = {
  giris: number;
  kural: number;
  soru: number;
  sayim: number;
  sonucSorusu: number;
  sonuc: number;
  kapanis: number;
};
export const FPS = 30;
export const VARSAYILAN_SURELER: Sureler = {
  giris: 3,
  kural: 2.5,
  soru: 5,
  sayim: 3, // sorunun son kaç saniyesinde geri sayım akar
  sonucSorusu: 2.5,
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
