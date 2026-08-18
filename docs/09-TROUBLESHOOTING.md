# Troubleshooting — Katalog Bug & Solusi

Format entri:
```
## [YYYY-MM-DD] Situs / Komponen — Ringkasan
- **Gejala:** ...
- **Akar masalah:** ...
- **Solusi:** ... (tempat fix: template/situs/config)
- **Status:** ✅ Selesai / 🔄 Dalam proses / ⏳ Pending
```

---

## [2026-08-18] Semua situs — Bundle membengkak (~840 KB) karena `next-devtools`
- **Gejala:** First Load JS shared melonjak 103 kB → 339 kB; chunk `ed9f2dc4-*.js`
  ~820 KB (raw) berisi `next-devtools`/`dev-overlay`/`dev-tools-indicator` ikut
  dibundle ke produksi dan dimuat di tiap halaman.
- **Akar masalah:** Field `browserslist` di `package.json` memicu bug webpack
  Next.js [vercel/next.js#89844](https://github.com/vercel/next.js/issues/89844):
  modul dev-only ikut di-bundle ke produksi. Hash chunk polyfill identik dengan
  dan tanpa browserslist → field ini tidak memberi manfaat, hanya memicu bug.
- **Solusi:** Hapus field `browserslist` dari `package.json` (fix `8d3d7e6` di wims,
  `bdc6f27` di template). First Load JS kembali 103 kB.
- **Status:** ✅ Selesai

## [2026-08-18] Semua situs — Tag menampilkan prefiks `#`
- **Gejala:** Tag tampil sebagai `#seo`, `#teknologi` di semua halaman.
- **Akar masalah:** Komponen merender `#{tag}` sebagai teks (bukan hashtag yang diinginkan).
- **Solusi:** Hapus prefiks `#` dari semua render tag (Home, Archive, tag page, Footer, Search, JSON-LD). Fix di **template**.
- **Status:** ✅ Selesai

## [2026-08-18] Giscus — Widget kosong di mode terang
- **Gejala:** Kolom komentar giscus gagal termuat di mode terang.
- **Akar masalah:** Tema giscus `transparent_light.css` tidak tersedia di server giscus (HTTP 404, MIME text/html ditolak browser). `transparent_dark.css` ada, sehingga hanya mode gelap yang jalan.
- **Solusi:** Hosting tema lokal `public/giscus-dark.css` (transparan, hex brand) dan referensikan URL absolut. Fix di **template**.
- **Status:** ✅ Selesai

## [2026-08-17] Disqus — Tidak sinkron dengan dark mode
- **Gejala:** Kolom reaksi & input komentar terang di halaman gelap, membingungkan.
- **Akar masalah:** iframe Disqus tidak membaca perubahan tema halaman.
- **Solusi:** (Ditangguhkan) Disqus diganti total dengan **Giscus** (lihat entri di atas).
- **Status:** ✅ Selesai (migrasi ke Giscus)

## [2026-08-17] Semua situs — Crash `oklch()` di Chromium
- **Gejala:** Disqus/Giscus gagal membaca computed style; halaman bermasalah di Chromium.
- **Akar masalah:** Tailwind v4 menghasilkan warna `oklch()` yang tidak didukung parser lama Chromium (`parseColor` crash).
- **Solusi:** Seluruh palet tema dipaksa **hex** (`@theme` di globals.css). Aturan: brand `accent`/`accent2` di `site.config.json` wajib hex. Fix di **template**.
- **Status:** ✅ Selesai

## [2026-08-17] Header — Hydration error React #418
- **Gejala:** Error hydration saat load (cahaya berbeda server vs client).
- **Akar masalah:** State tema (light/dark) di-render dari localStorage di client.
- **Solusi:** Mode gelap permanen (`<html class="dark">`); toggle tema dihapus. Fix di **template**.
- **Status:** ✅ Selesai

## [2026-08-17] Footer — Kredit pihak ketiga muncul
- **Gejala:** Footer menampilkan "Dibangun dengan Next.js" / kredit tema.
- **Akar masalah:** Komponen footer menyertakan credit bawaan tema.
- **Solusi:** Hapus semua kredit/copyright; footer bersih (brand + jaringan). Fix di **template**.
- **Status:** ✅ Selesai

---

## Catatan Pemeliharaan
- Jika bug ditemukan: perbaiki di **template**, catat di sini, lalu sync
  (lihat [05-SYNC.md](05-SYNC.md)).
- Jika bug hanya di satu situs (config/konten): perbaiki di situs itu, tetap catat di sini.
- Selalu sertakan langkah reproduksi bila memungkinkan.
