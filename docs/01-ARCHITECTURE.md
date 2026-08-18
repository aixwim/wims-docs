# Arsitektur Jaringan

## Gambaran

Jaringan Wim adalah piramida web terhubung (hub-and-spoke) di mana **satu situs
induk** (hub) menjadi portal, **10 situs kategori** menjadi niche web utama, dan
**situs topik** bercabang dari kategori sebagai niche yang lebih dalam.

```
aixwim.github.io/wims                     ← HUB / Portal utama (aixwim/wims)
   ├── /wims-bisnis            (Bisnis)
   ├── /wims-selebritas        (Selebritas)
   ├── /wims-kultur            (Kultur)
   ├── /wims-entertainment     (Entertainment)
   ├── /wims-game              (Game)
   │     └── /wims-game-mobile    (Topik: game mobile)
   ├── /wims-living            (Living)
   ├── /wims-berita            (Berita)
   ├── /wims-style             (Style)
   ├── /wims-teknologi         (Teknologi)
   │     ├── /wims-teknologi-ai    (Topik: AI)
   │     └── /wims-teknologi-pemrograman (Topik: pemrograman)
   └── /wims-olahraga          (Olahraga)
```

## Aturan Inti

### 1 repo = 1 situs = 1 URL
Setiap repository GitHub adalah satu situs GitHub Pages yang berdiri sendiri:

```
https://aixwim.github.io/<nama-repo>/
```

`basePath` pada konfigurasi Next.js diisi nama repo (contoh: `/wims-teknologi`),
sehingga semua URL absolut/canonical dibentuk otomatis.

### Hirarki
| Tingkat | Contoh Repo | Peran |
|---|---|---|
| Hub | `wims` | Portal, grid kategori, daftar semua situs |
| Kategori | `wims-teknologi` | Niche web utama per kategori (10 buah) |
| Topik | `wims-teknologi-ai` | Niche dalam satu kategori (bisa banyak) |

## Komponen Kode

- **`aixwim/wims-template`** — sumber tema. Semua kode aplikasi (src/,
  globals.css, komponen, workflow, scripts) digerakkan `site.config.json`.
- **Setiap situs** — salinan tema tersinkron + `site.config.json` + `content/`.
- **`aixwim/wims-docs`** — dokumentasi pusat (repo ini).
- **`registry/network.json`** — daftar kanonik seluruh situs; dipakai template
  untuk membangun tautan jaringan dan divalidasi link checker.

## Alur Data

```
wims-template (sumber tema)
      │  sync-theme (cron/manual)
      ▼
wims · wims-teknologi · wims-game · ... (tiap situs)
      │
      ├── site.config.json  → metadata, brand, basePath, nav
      ├── content/*.md      → artikel
      └── registry/network.json → footer "Jaringan" + cross-link
```

## Keputusan Arsitektur (dengan alasan)

1. **GitHub.io paths (bukan domain custom)** — gratis, tanpa DNS/SSL manual,
   mudah discale ke puluhan situs. Satu custom domain per repo tetap bisa
   ditambahkan kapan pun tanpa perubahan arsitektur.
2. **Satu template, banyak config** — perbaikan kode cukup sekali di template;
   identitas per situs diisolasi di config. Meminimalkan drift antar situs.
3. **Dokumentasi Markdown polos** — tanpa build/CI, mudah dibaca di GitHub UI,
   mudah dirawat, tidak menambah permukaan kegagalan.
4. **Dokumentasi tanpa tautan publik** — docs murni internal; tidak ada link
   footer menuju docs dari situs jaringan (menghindari jejak link network).
