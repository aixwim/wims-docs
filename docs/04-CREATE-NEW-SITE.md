# Membuat Situs Baru

Prosedur baku untuk menambah situs ke jaringan (kategori atau topik).
Semua langkah bersifat deterministik — jalankan dari mesin dengan akses `gh`.

## Prasyarat
- GitHub CLI (`gh`) terautentikasi sebagai `aixwim`.
- Repo template `aixwim/wims-template` tersedia.
- Nama repo sudah sesuai konvensi (lihat [02-NAMING.md](02-NAMING.md)).

## Langkah

### 1. Scaffold repo dari template
```bash
node scripts/create-site.js --repo wims-teknologi-ai --parent wims-teknologi
```
Script ini:
- Membuat repo GitHub publik `aixwim/wims-<kategori>[-<topik>]`.
- Menyalin tema dari `wims-template` (tanpa `site.config.json` milik template).
- Membuat `site.config.json` awal dari argumen.

### 2. Isi identitas
Edit `site.config.json` sesuai skema
([03-CONFIG-SCHEMA.md](03-CONFIG-SCHEMA.md)):
- `siteName`, `logoText`, `tagline`, `description`
- `brand.accent`/`brand.accent2` (palette niche, lihat [02-NAMING.md](02-NAMING.md))
- `parent`, `children`, `related`

### 3. Tambah konten
```bash
mkdir -p content
```
Tulis artikel markdown di `content/*.md`. Frontmatter wajib:
```yaml
---
title: Judul
date: 2026-01-01
excerpt: Ringkasan singkat
tags: [topik1, topik2]
draft: false
---
```

### 4. Registrasi di network
Tambahkan entri repo di `aixwim/wims-docs/registry/network.json`:
- `repo`, `name`, `category`, `parent`, `children`, `related`, `status`.
- Jika situs ini anak/parent dari situs lain, perbarui entri terkait.
- Commit + push ke `wims-docs`.

### 5. Aktifkan GitHub Pages
```bash
gh api -X POST repos/aixwim/wims-teknologi-ai/pages \
  -f 'build_type=workflow' \
  -f 'source[branch]=gh-pages' \
  -f 'source[path]=/' \
  --silent
```
Bila `deploy.yml` sudah terpasang di repo (dari template), push pertama
otomatis build ke `gh-pages`.

### 6. Verifikasi
```bash
npm run build
npm run lint
node scripts/check-links.js     # 0 orphan, 0 broken
```
Cek live di `https://aixwim.github.io/<repo>/`.

### 7. Install Pages CMS (opsional, setelah scaffold)
Pastikan Pages CMS GitHub App terpasang untuk repo baru di
https://github.com/settings/installations.

## Checklist Penerimaan
- [ ] Nama repo mengikuti konvensi
- [ ] `site.config.json` lengkap & valid
- [ ] ≥ 3 artikel konten unik (kategori) / ≥ 5 (topik)
- [ ] Terdaftar di `registry/network.json`
- [ ] Build + lint + link check bersih
- [ ] Live URL merespons 200
- [ ] Footer "Jaringan" menampilkan parent/children/related yang benar
