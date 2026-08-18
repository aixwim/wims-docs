# Wim Network — Dokumentasi Pusat

Pusat dokumentasi untuk seluruh jaringan situs Wim. Semua arsitektur, konvensi,
aturan SEO, sinkronisasi template, dan pemeliharaan dicatat di sini.

## Jaringan Sekilas

```
aixwim.github.io/wims                     ← HUB / Portal utama
   ├── /wims-bisnis            (Bisnis)
   ├── /wims-selebritas        (Selebritas)
   ├── /wims-kultur            (Kultur)
   ├── /wims-entertainment     (Entertainment)
   ├── /wims-game              (Game)
   │     └── /wims-game-mobile   (Topik: Game Mobile)
   ├── /wims-living            (Living)
   ├── /wims-berita            (Berita)
   ├── /wims-style             (Style)
   ├── /wims-teknologi         (Teknologi)
   │     ├── /wims-teknologi-ai  (Topik: AI)
   │     └── /wims-teknologi-pemrograman (Topik: Pemrograman)
   └── /wims-olahraga          (Olahraga)
         └── /wims-olahraga-sepakbola (Topik: Sepak Bola)
```

## Status Situs

| Repo | Situs | Kategori | Status |
|---|---|---|---|
| `aixwim/wims` | `/wims` | Hub | Aktif |
| `aixwim/wims-teknologi` | `/wims-teknologi` | Teknologi | Aktif |
| `aixwim/wims-game` | `/wims-game` | Game | Aktif |
| `aixwim/wims-bisnis` | `/wims-bisnis` | Bisnis | Aktif |
| `aixwim/wims-selebritas` | `/wims-selebritas` | Selebritas | Aktif |
| `aixwim/wims-kultur` | `/wims-kultur` | Kultur | Aktif |
| `aixwim/wims-entertainment` | `/wims-entertainment` | Entertainment | Aktif |
| `aixwim/wims-living` | `/wims-living` | Living | Aktif |
| `aixwim/wims-berita` | `/wims-berita` | Berita | Aktif |
| `aixwim/wims-style` | `/wims-style` | Style | Aktif |
| `aixwim/wims-olahraga` | `/wims-olahraga` | Olahraga | Aktif |
| `aixwim/wims-teknologi-ai` | `/wims-teknologi-ai` | Topik: AI | Aktif |
| `aixwim/wims-teknologi-pemrograman` | `/wims-teknologi-pemrograman` | Topik: Pemrograman | Aktif |
| `aixwim/wims-game-mobile` | `/wims-game-mobile` | Topik: Game Mobile | Aktif |
| `aixwim/wims-olahraga-sepakbola` | `/wims-olahraga-sepakbola` | Topik: Sepak Bola | Aktif |

> Semua 15 situs live di GitHub Pages. Konten: hub = portal (welcome);
> wims-teknologi = 34 artikel tech; 9 kategori = 4 artikel starter;
> 4 topik = 3 artikel starter. Lihat [`registry/network.json`](registry/network.json)
> untuk daftar kanonik yang dipakai kode.

## Roadmap

Lihat [ROADMAP.md](ROADMAP.md) untuk fase implementasi lengkap.

## Navigasi Dokumentasi

| Dokumen | Isi |
|---|---|
| [ROADMAP.md](ROADMAP.md) | Fase implementasi jaringan |
| [docs/01-ARCHITECTURE.md](docs/01-ARCHITECTURE.md) | Arsitektur jaringan |
| [docs/02-NAMING.md](docs/02-NAMING.md) | Konvensi nama repo & URL |
| [docs/03-CONFIG-SCHEMA.md](docs/03-CONFIG-SCHEMA.md) | Referensi `site.config.json` |
| [docs/04-CREATE-NEW-SITE.md](docs/04-CREATE-NEW-SITE.md) | Prosedur buat situs baru |
| [docs/05-SYNC.md](docs/05-SYNC.md) | Mekanisme sinkron template |
| [docs/06-SEO-RULES.md](docs/06-SEO-RULES.md) | Aturan keamanan SEO |
| [docs/07-INTERLINKING.md](docs/07-INTERLINKING.md) | Matriks jaring laba-laba |
| [docs/08-DEPLOYMENT.md](docs/08-DEPLOYMENT.md) | Deployment & Pages CMS |
| [docs/09-TROUBLESHOOTING.md](docs/09-TROUBLESHOOTING.md) | Katalog bug & solusi |

## Prinsip

1. **1 repo = 1 situs = 1 URL** — setiap situs di `https://aixwim.github.io/<repo>/`.
2. **Single source of truth** — tema hidup di `aixwim/wims-template`; identitas tiap situs di `site.config.json`; tautan jaringan di `registry/network.json`.
3. **Konten unik per situs** — tidak ada duplikasi lintas situs.
4. **Kepemilikan transparan** — setiap situs menautkan ke hub utama.
5. **Dokumentasi ini murni Markdown** — tanpa build, tanpa CI.

## Kontribusi & Pemeliharaan

- Perbaikan **kode** → lakukan sekali di `wims-template`, sebar lewat sync.
- Perbaikan **dokumentasi** → edit langsung di repo ini (branch `main`).
- Temuan **bug** → tambahkan entri di [docs/09-TROUBLESHOOTING.md](docs/09-TROUBLESHOOTING.md) dan catat di [CHANGELOG.md](CHANGELOG.md).
