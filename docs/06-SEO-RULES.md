# Aturan Keamanan SEO

Jaringan Wim adalah sekumpulan situs **milik satu orang** yang saling menaut.
Google memandang ini sebagai jaringan pribadi dan dapat memberlakukan penalti
jika terlihat manipulatif. Dokumen ini adalah aturan wajib untuk meminimalkan
risiko.

## Aturan Wajib

### 1. Konten unik per situs
- Satu topik hanya hidup di satu situs. **Dilarang** menyalin/menduplikasi
  artikel lintas situs.
- Jika dua situs perlu topik yang sama, gunakan **canonical link** ke situs
  pemilik topik + tautan kontekstual (bukan salinan).
- Setiap situs punya `about` yang jelas dan deskripsi unik.

### 2. Kepemilikan transparan
- Footer & About setiap situs mencantumkan bahwa situs dikelola oleh **aixwim**
  dan merupakan bagian dari **Jaringan Wim**, menautkan ke hub `wims`.
- Jangan sembunyikan hubungan antar situs. Keterbukaan = sinyal baik.

### 3. Tautan natural, bukan link farm
- Tautan jaringan di footer dibatasi: `parent`, `children`, 2-3 `related`,
  dan hub. **Jangan** menaruh daftar puluhan tautan di footer.
- Anchor text deskriptif dan manusiawi (bukan "klik di sini" berulang).
- Gunakan `rel="noopener"` (sudah standar) untuk tautan eksternal.
- Tautan kontekstual di dalam artikel ≤ 2 per artikel, dan hanya bila relevan
  bagi pembaca.

### 4. Canonical & URL absolut
- Setiap halaman punya `<link rel="canonical">` absolut ke
  `https://aixwim.github.io/<repo>/<path>/`.
- Tidak ada dua situs dengan konten yang sama dan canonical berbeda.

### 5. Sitemap & robots per situs
- Tiap situs punya `sitemap.xml` dan `robots.txt` sendiri.
- Sitemap **hanya** berisi URL situs itu sendiri (tidak mencampur situs lain).

### 6. E-E-A-T per niche
- Tiap situs kategori/topik punya fokus topik jelas (bukan campur aduk).
- Metadata (title, description) unik per situs dan deskriptif.

## Yang Dihindari

| Hal | Risiko |
|---|---|
| Menyalin konten antar situs | Duplicate content / penalti |
| Footer berisi 20+ tautan lintas situs | Terlihat link scheme |
| Anchor text persis keyword berulang | Keyword stuffing |
| Sitemap campur antar situs | Kebingungan index |
| Menyembunyikan kepemilikan | Tidak terpercaya |
| Membeli backlink antar situs jaringan | Penalti link scheme |

## Alur Audit

Setiap penerbitan atau perubahan struktur, jalankan:
```bash
node scripts/check-links.js   # 0 broken, 0 orphan
```
Dan periksa manual: canonical, metadata, uniknya konten.

## Referensi
- [07-INTERLINKING.md](07-INTERLINKING.md) — matriks tautan
- [08-DEPLOYMENT.md](08-DEPLOYMENT.md) — robots/sitemap teknis
