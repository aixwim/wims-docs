# Changelog

Semua perubahan signifikan pada jaringan Wim dan dokumentasi.

Format: `[Tanggal] Kategori — Deskripsi`

---

## [2026-08-18] Dokumentasi — Fondasi jaringan
- Buat repo `aixwim/wims-docs` (dokumentasi pusat jaringan).
- Tulis arsitektur, konvensi nama, schema config, prosedur situs baru,
  mekanisme sync, aturan SEO, matriks interlinking, deployment, troubleshooting.
- Buat `registry/network.json` (daftar kanonik situs).

## [2026-08-18] Template — Mode gelap permanen
- Hapus toggle tema; `<html class="dark">` selalu aktif.
- Giscus pakai tema lokal `giscus-dark.css` (transparan, hex brand).
- Hapus `giscus-light.css`.

## [2026-08-18] Semua situs — Perbaikan tag
- Hapus prefiks `#` dari semua tampilan tag (UI + JSON-LD).

## [2026-08-18] Komentar — Migrasi Disqus → Giscus
- Hapus Disqus; Giscus lazy-load + tema sinkron (kemudian disederhanakan
  menjadi selalu gelap).