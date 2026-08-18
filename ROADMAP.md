# Roadmap Jaringan Wim

Fase implementasi jaringan Wim. Fase berjalan berurutan; tiap fase selesai =
verifikasi build/lint + link checker + Lighthouse spot-check sebelum lanjut.

## Fase 0 — Fondasi Dokumentasi ✅
- [x] Buat repo `aixwim/wims-docs`
- [x] Tulis arsitektur, konvensi, schema, SEO rules, troubleshooting
- [x] Buat `registry/network.json` kanonik

## Fase 1 — Template Config-Driven (Sumber Tema)
- [x] Refactor template: semua identitas dipindah ke `site.config.json`
  (repo, siteName, logoText, logoPrefix, tagline, description, category, parent,
  children, related, brand{accent, accent2}, giscus)
- [x] `basePath` & semua URL otomatis dari config (bukan hardcoded `/wims`)
- [x] Ganti warna hardcoded `indigo/violet/cyan` → CSS vars `--brand-*`
- [x] `og.png` & favicon digenerate dari config brand (`npm run assets`)
- [x] Footer memakai `registry/network.json` untuk blok "Jaringan"
- [x] Pisahkan ke repo `aixwim/wims-template`
- [x] Verifikasi: build bersih, no hardcoded identity tersisa
- [x] Fix regresi bundle: tanpa `browserslist`, First Load JS 103 kB
  (lihat [09-TROUBLESHOOTING](docs/09-TROUBLESHOOTING.md#browserslist-bundle-devtools))

## Fase 2 — Tooling
- [x] `scripts/sync-theme.mjs` — hash-compare + copy tema dari template
- [x] `scripts/check-links.js` — validasi semua cross-link (0 orphan)
- [x] Workflow `sync.yml` di tiap situs (cron + manual)
- [x] Workflow `deploy.yml` reusable (GH Pages)
- [x] `scripts/create-site.js` — scaffold repo situs dari template + config

> Catatan: `create-site.js` hidup di `wims-docs/scripts/` dan dipakai saat
> scaffold 10 kategori (Fase 3-6). Fix 2026-08-18: scaffold tanpa konten
> memicu error `ENOENT content` (template hapus konten tapi `getAllPosts()`
> butuh folder); kini selalu menulis `content/welcome.md` placeholder + izin
> scaffold repo berstatus `planned` (pakai data network.json).

## Fase 3 — Hub Menjadi Portal ✅
- [x] Ubah `aixwim/wims` menjadi portal: grid 10 kartu kategori
- [x] Pindahkan ~35 artikel tech ke `wims-teknologi`
- [x] Update metadata/sitemap/robots/JSON-LD hub
- [x] Verifikasi: link checker 0 orphan, Lighthouse hub

> 34 artikel (Astro/Termux/SEO/Next.js) dipindah ke `wims-teknologi`
> (commit `1a259f8`); hub kini portal dengan `welcome.md` + 10 kartu kategori.
> Sisa: metadata/sitemap/robots/JSON-LD hub + Lighthouse.

## Fase 4 — Situs Teknologi ✅
- [x] Scaffold `aixwim/wims-teknologi` dari template
- [x] Impor 35 artikel existing (konten unik)
- [x] Konfigurasi niche: palette indigo→cyan, favicon/og.png
- [x] Aktifkan Pages via API, deploy, verifikasi

## Fase 5 — 9 Kategori Lain ✅
- [x] Scaffold: bisnis, selebritas, kultur, entertainment, game, living,
  berita, style, olahraga (semua repo + Pages live)
- [x] Isi 3-5 artikel starter per situs (konten unik)
- [x] Konfigurasi niche masing-masing (palette + identitas)
- [x] Aktifkan Pages via API, deploy semua, verifikasi link checker

> 4 artikel starter unik per situs (36 artikel total), identitas niche
> (tagline/deskripsi/OG) per situs. Lighthouse hub: PERF 99, A11Y 100,
> BP 100, SEO 100.

## Fase 6 — Topik Niche Contoh ✅
- [x] `wims-teknologi-ai` (contoh topik di bawah kategori teknologi)
- [x] `wims-game-mobile` (contoh topik game)
- [x] Update parent/children di `registry/network.json`
- [x] Verifikasi matriks interlinking

> Keempat topik (teknologi-ai, teknologi-pemrograman, game-mobile,
> olahraga-sepakbola) sudah live. Menunggu konten starter seperti Fase 5.

## Fase 7 — Pages CMS & Polishing
- [x] Giscus: Discussions aktif + repoId/categoryId terisi di 14 repo
  (hub `wims` sudah live; app giscus di-install di akun)
- [x] Lighthouse semua situs (a11y/BP/SEO 100, perf ≥ 99 desktop)
- [x] Verifikasi `sync.yml` end-to-end (0 perubahan → tanpa PR)
- [ ] Install Pages CMS GitHub App ke seluruh repo
- [ ] `.pages.yml` sesuai niche tiap situs
- [ ] Update dokumentasi & status tabel di README

## Kriteria Selesai per Fase
- `npm run build` bersih (semua repo)
- `npm run lint` bersih
- `scripts/check-links.js` → 0 orphan, 0 tautan mati
- Lighthouse: a11y/BP/SEO 100, perf ≥ 80 (desktop)
- Status tabel di README diperbarui
