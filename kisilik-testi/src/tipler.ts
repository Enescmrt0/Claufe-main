/** Şık: düz yazı (puanı sırasına göre 1,2,3,4 olur) ya da { metin, puan } */
export type Secenek = string | { metin: string; puan: number };
export type Soru = { soru: string; secenekler: Secenek[] };
/** aralik: [en az, en çok] toplam puan. Yazılmazsa puan aralığı sonuçlara eşit bölünür. */
export type Sonuc = {
  emoji: string;
  ad: string;
  aciklama: string;
  aralik?: [number, number];
  /** Uzun videolar için: tek cümlelik alt başlık */
  slogan?: string;
  /** Uzun videolar için: detaylı paragraf (varsa detaylı sonuç ekranı kullanılır) */
  detay?: string;
  /** Uzun videolar için: madde madde özellikler */
  ozellikler?: string[];
};
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
  /** true ise public/ses/<test-adı>/ klasöründeki ses kayıtları videoya eklenir */
  seslendirme?: boolean;
  /** "dikey" (varsayılan, Shorts 1080x1920) · "yatay" (uzun video 1920x1080) */
  format?: "dikey" | "yatay";
  /** Kural ekranındaki kart yazısı */
  kural?: string;
  /** true ise sonuçlardan önce tüm puan aralıklarını gösteren tablo gelir */
  puanTablosu?: boolean;
  /** "soru" (varsayılan): video doğrudan 1. soruyla açılır · "baslik": önce başlık kartı ve kural ekranı gelir */
  acilis?: "soru" | "baslik";
  /** Sondaki "Sıradaki test ne olsun?" ekranındaki seçenekler (yazılmazsa varsayılan liste) */
  sonrakiTestler?: string[];
  /** Yayın metni için: sabitlenecek ilk yorum */
  sabitYorum?: string;
  /** Seslendirme metnini elle değiştirmek için: { "giris": "...", "soru-2": "..." } */
  ses?: Record<string, string>;
  /** (derleme içinde otomatik) kural ve kapanış ekranlarını atla */
  _kuralYok?: boolean;
  _kapanisYok?: boolean;
  /** (otomatik) bulunan ses dosyaları ve süreleri */
  _klipler?: Record<string, { dosya: string; sure: number }>;
};
export type Sureler = {
  giris: number;
  kural: number;
  soru: number;
  sayim: number;
  puan: number; // geri sayımdan sonra puanların ekranda kaldığı süre
  sonucSorusu: number;
  tablo: number;
  sonuc: number;
  kapanis: number;
  sonraki: number; // "Sıradaki test ne olsun?" ekranı
};
export const FPS = 30;
export const VARSAYILAN_SURELER: Sureler = {
  giris: 3,
  kural: 2.5,
  soru: 7.5,
  sayim: 5, // geri sayım süresi (saniye)
  puan: 1.5, // geri sayımdan sonra puanların ekranda kaldığı süre
  sonucSorusu: 3,
  tablo: 7,
  sonuc: 3.5,
  kapanis: 3.5,
  sonraki: 5,
};

/** "Sıradaki test ne olsun?" ekranının varsayılan seçenekleri */
export const VARSAYILAN_SONRAKI_TESTLER = [
  "🐾 Hangi hayvansın?",
  "🎨 Hangi renksin?",
  "🌍 Hangi şehirde yaşamalısın?",
  "🍰 Hangi tatlısın?",
];
export const HARFLER = ["A", "B", "C", "D", "E", "F"];
export const HARF_RENKLERI = ["#FF4D6D", "#3A86FF", "#06D6A0", "#FFB703", "#9B5DE5", "#F15BB5"];

export const sureleriAl = (v: TestVerisi): Sureler => ({ ...VARSAYILAN_SURELER, ...(v.sureler ?? {}) });

/** Seslendirme klip adları (dosya adları da bunlar: giris.mp3, soru-1.mp3 ...) */
export const soruIleAcilir = (v: TestVerisi) => v.acilis !== "baslik";

export const klipAdlari = (v: TestVerisi) => [
  ...(soruIleAcilir(v) ? [] : ["giris", "kural"]),
  ...v.sorular.map((_, i) => `soru-${i + 1}`),
  "puan-topla",
  ...v.sonuclar.map((_, i) => `sonuc-${i + 1}`),
  "kapanis",
];

const k = (sn: number) => Math.round(sn * FPS);

/** Detaylı sonuç ekranının süresi: okuma hızı ~17 karakter/sn + 5 sn pay */
export const detayliSonucSuresi = (r: Sonuc, enAz: number) => {
  const metin = (r.slogan ?? "") + (r.detay ?? "") + (r.ozellikler ?? []).join("");
  return Math.max(enAz, 5 + metin.length / 17);
};

/** Her sahnenin kare sayısı. Ses kaydı varsa sahne, kayıt bitene kadar uzar. */
export const sahneKareleri = (v: TestVerisi) => {
  const s = sureleriAl(v);
  const klip = (ad: string) => v._klipler?.[ad]?.sure ?? 0;
  const uzat = (varsayilan: number, ad: string) => k(Math.max(varsayilan, klip(ad) ? klip(ad) + 0.7 : 0));
  const soruAcilisi = soruIleAcilir(v);
  return {
    giris: soruAcilisi ? 0 : uzat(s.giris, "giris"),
    kural: soruAcilisi || v._kuralYok ? 0 : uzat(s.kural, "kural"),
    sorular: v.sorular.map((_, i) => {
      // ilk soru videoyu açıyorsa başlığı okumak için +1 sn
      const ek = soruAcilisi && i === 0 ? 1 : 0;
      const acilis = Math.max(s.soru - s.sayim - s.puan + ek, klip(`soru-${i + 1}`) ? klip(`soru-${i + 1}`) + 0.4 : 0);
      return k(acilis + s.sayim + s.puan);
    }),
    puanTopla: uzat(s.sonucSorusu, "puan-topla"),
    tablo: v.puanTablosu ? k(s.tablo) : 0,
    sonuclar: v.sonuclar.map((r, i) => uzat(r.detay ? detayliSonucSuresi(r, s.sonuc) : s.sonuc, `sonuc-${i + 1}`)),
    sonraki: v._kapanisYok ? 0 : k(s.sonraki),
    kapanis: v._kapanisYok ? 0 : uzat(s.kapanis, "kapanis"),
  };
};

export const toplamKare = (v: TestVerisi) => {
  const r = sahneKareleri(v);
  return r.giris + r.kural + r.sorular.reduce((a, b) => a + b, 0) + r.puanTopla + r.tablo + r.sonuclar.reduce((a, b) => a + b, 0) + r.sonraki + r.kapanis;
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

/** Birden fazla testi tek uzun videoda birleştiren derleme */
export type DerlemeVerisi = {
  format?: "dikey" | "yatay";
  ustYazi?: string;
  baslik: string;
  kanca?: string;
  kural?: string;
  /** testler/ klasöründeki dosya adları (uzantısız), sırayla */
  testler: string[];
  /** her teste uygulanacak süre ayarları */
  sureler?: Partial<Sureler>;
  kapanis?: string;
  uyari?: string;
  sabitYorum?: string;
  sonrakiTestler?: string[];
  /** (otomatik) testlerin verisi */
  _testler?: TestVerisi[];
};

/** Derlemedeki bir testi videoya uygun hale getirir */
export const derlemeTesti = (d: DerlemeVerisi, t: TestVerisi, j: number, n: number): TestVerisi => ({
  ...t,
  format: d.format ?? "yatay",
  acilis: "baslik",
  ustYazi: `TEST ${j + 1}/${n}`,
  puanTablosu: true,
  seslendirme: false,
  _klipler: {},
  _kuralYok: true,
  _kapanisYok: true,
  sureler: { ...(t.sureler ?? {}), ...(d.sureler ?? {}) },
});

export const derlemeKareleri = (d: DerlemeVerisi) => {
  const s = { ...VARSAYILAN_SURELER, ...(d.sureler ?? {}) };
  const n = d._testler?.length ?? 0;
  return {
    giris: k(s.giris),
    kural: k(s.kural),
    testler: (d._testler ?? []).map((t, j) => toplamKare(derlemeTesti(d, t, j, n))),
    sonraki: k(s.sonraki),
    kapanis: k(s.kapanis),
  };
};

export const derlemeToplamKare = (d: DerlemeVerisi) => {
  const r = derlemeKareleri(d);
  return r.giris + r.kural + r.testler.reduce((a, b) => a + b, 0) + r.sonraki + r.kapanis;
};
