# Mekanisme Sinkron Template

Tujuan: **semua situs jaringan memakai tema yang identik** tanpa menyalin
manual. Perbaikan kode cukup dilakukan sekali di `wims-template`, lalu
menyebar ke seluruh situs secara otomatis.

## Sumber & Target

- **Sumber:** `aixwim/wims-template` (branch `main`).
- **Target:** setiap repo situs (`wims`, `wims-teknologi`, dst.).

## Yang Disinkron (dari template ke situs)

| Jalur | Isi |
|---|---|
| `src/**` | Seluruh kode aplikasi (app, components, lib) |
| `next.config.js` | Konfigurasi Next (basePath digenerate dari config) |
| `package.json` | Dependencies & scripts |
| `.github/workflows/deploy.yml` | Workflow deploy |
| `.pages.yml` | Konfigurasi Pages CMS |
| `scripts/**` | Tooling bersama |

## Yang TIDAK Disinkron

| Jalur | Alasan |
|---|---|
| `site.config.json` | Identitas unik tiap situs |
| `content/**` | Artikel unik tiap situs |
| `public/og.png`, `public/favicon.svg` | Brand spesifik situs |
| `out/` | Artefak build |

## Workflow `sync.yml` (di tiap situs)

```yaml
name: Sync Template

on:
  workflow_dispatch:
  schedule:
    - cron: "0 */6 * * *"   # tiap 6 jam

permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Clone template
        run: git clone --depth 1 https://github.com/aixwim/wims-template /tmp/template
      - name: Run sync script
        run: node scripts/sync-theme.mjs --template /tmp/template --site .
      - name: Open PR if changed
        run: |
          git add -A
          if git diff --cached --quiet; then
            echo "Tidak ada perubahan"
          else
            git commit -m "chore: sync theme from wims-template"
            git push origin HEAD:sync-template
            gh pr create --base main --head sync-template --title "Sync tema" --body "Auto-sync dari wims-template" || true
          fi
```

## Skrip `sync-theme.mjs`

- Membandingkan hash seluruh file dalam daftar sinkron (`src`, `next.config.js`,
  `package.json`, `deploy.yml`, `.pages.yml`).
- Menyalin file yang berbeda dari template ke situs.
- **Tidak pernah** menyentuh `site.config.json`, `content/`, `public/og.png`,
  `public/favicon.svg`.
- Menulis file sementara `registry/network.json` terbaru (daftar tautan).

## Alur Kerja Bug

1. Bug ditemukan di situs mana pun.
2. Catat di [09-TROUBLESHOOTING.md](09-TROUBLESHOOTING.md).
3. Perbaiki **sekali** di `wims-template`.
4. Trigger sync manual per situs (`workflow_dispatch`) atau tunggu cron.
5. Verifikasi PR hasil sync → merge.

## Aturan Penting

- Jangan edit file tersinkron langsung di repo situs (kecuali kondisi darurat,
  lalu selaraskan ke template secepatnya agar tidak tertimpa sync).
- Uji perubahan template dengan build lokal **sebelum** push ke template.
- `registry/network.json` di template adalah **baca-saja**; sumber kanonik ada
  di `wims-docs` dan disalin ke template saat pembaruan jaringan.
