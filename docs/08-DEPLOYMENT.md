# Deployment & Pages CMS

## Deployment GitHub Pages

Setiap repo situs memakai workflow yang sama (disinkron dari template):

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          publish_branch: gh-pages
          force_orphan: true
```

- Deploy otomatis pada tiap push ke `main`.
- Artefak di branch `gh-pages`, di-serve GitHub Pages di
  `https://aixwim.github.io/<repo>/`.
- File `out/.nojekyll` dihasilkan script `build` agar file `_*` tidak diabaikan.

## Aktivasi GitHub Pages via API

Untuk repo baru (tanpa membuka UI):

```bash
gh api -X POST repos/aixwim/<repo>/pages \
  -f 'build_type=workflow' \
  -f 'source[branch]=gh-pages' \
  -f 'source[path]=/' \
  --silent
```

Atau buka UI: repo → Settings → Pages → Source: `gh-pages` branch.

## Pages CMS

Setiap repo situs memiliki `.pages.yml` (disinkron template, nilai kustom
per niche dibiarkan di file situs bila diperlukan).

Ringkasan konfigurasi:
- **Media uploads:** `public/uploads`
- **Content collection `posts`:** markdown dengan frontmatter
  (`title, slug, date, category, excerpt, tags, cover, meta_title,
  meta_description, draft, body`)
- **Commit templates:** pesan commit otomatis sesuai aksi (create/update/delete)

Akses CMS: buka aplikasi Pages CMS (https://pagescms.org), pilih repo yang
diinginkan. GitHub App Pages CMS harus terpasang di seluruh repo jaringan.

## Sitemap & Robots per Situs

- `sitemap.ts` menghasilkan `sitemap.xml` hanya untuk URL situs itu sendiri:
  `https://aixwim.github.io/<repo>/...`.
- `robots.ts` mengizinkan semua crawler + menunjuk sitemap situs.
- Tidak mencampur URL antar situs.

## Daftar Konten Minimal per Situs

| Tipe Situs | Artikel Awal | Target Jangka Panjang |
|---|---|---|
| Kategori | 3-5 | 20+ |
| Topik | 5 | 15+ |
| Hub | 0-3 (portal) | konten ringan, fokus navigasi |

## Verifikasi Deploy

```bash
curl -s -o /dev/null -w "%{http_code}" https://aixwim.github.io/<repo>/
# 200
```
Cek juga: `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/og.png` semuanya 200.
