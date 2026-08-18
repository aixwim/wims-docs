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
> scaffold 10 kategori (Fase 3).

## Fase 3 — Hub Menjadi Portal
- [ ] Ubah `aixwim/wims` menjadi portal: grid 10 kartu kategori
- [ ] Pindahkan ~35 artikel tech ke `wims-teknologi`
- [ ] Update metadata/sitemap/robots/JSON-LD hub
- [ ] Verifikasi: link checker 0 orphan, Lighthouse hub

## Fase 4 — Situs Teknologi
- [ ] Scaffold `aixwim/wims-teknologi` dari template
- [ ] Impor 35 artikel existing (konten unik)
- [ ] Konfigurasi niche: palette indigo→cyan, favicon/og.png
- [ ] Aktifkan Pages via API, deploy, verifikasi

## Fase 5 — 9 Kategori Lain
- [ ] Scaffold: bisnis, selebritas, kultur, entertainment, game, living,
  berita, style, olahraga
- [ ] Isi 3-5 artikel starter per situs (konten unik)
- [ ] Konfigurasi niche masing-masing (palette + identitas)
- [ ] Aktifkan Pages via API, deploy semua, verifikasi link checker

## Fase 6 — Topik Niche Contoh
- [ ] `wims-teknologi-ai` (contoh topik di bawah kategori teknologi)
- [ ] `wims-game-mobile` (contoh topik game)
- [ ] Update parent/children di `registry/network.json`
- [ ] Verifikasi matriks interlinking

## Fase 7 — Pages CMS & Polishing
- [ ] Install Pages CMS GitHub App ke seluruh repo
- [ ] `.pages.yml` sesuai niche tiap situs
- [ ] Lighthouse semua situs (a11y/BP/SEO ≥ 99, perf optimal)
- [ ] Update dokumentasi & status tabel di README

## Kriteria Selesai per Fase
- `npm run build` bersih (semua repo)
- `npm run lint` bersih
- `scripts/check-links.js` → 0 orphan, 0 tautan mati
- Lighthouse: a11y/BP/SEO 100, perf ≥ 80 (desktop)
- Status tabel di README diperbarui
