# Konvensi Nama Repo & URL

## Pola

| Tingkat | Pola Repo | Contoh URL |
|---|---|---|
| Hub | `wims` | `https://aixwim.github.io/wims/` |
| Kategori | `wims-<kategori>` | `https://aixwim.github.io/wims-teknologi/` |
| Topik | `wims-<kategori>-<topik>` | `https://aixwim.github.io/wims-teknologi-ai/` |

- Nama repo **selalu huruf kecil** (`wims`, `wims-teknologi`).
- Nama kategori/topik **tanpa spasi** — gunakan `-` sebagai pemisah kata.
- `basePath` = nama repo (mis. `/wims-teknologi`).

## 10 Kategori Resmi

| Nama Repo | Kategori | Palette Brand |
|---|---|---|
| `wims-bisnis` | Bisnis | emerald |
| `wims-selebritas` | Selebritas | pink/rose |
| `wims-kultur` | Kultur | amber |
| `wims-entertainment` | Entertainment | fuchsia |
| `wims-game` | Game | violet/purple |
| `wims-living` | Living | teal/lime |
| `wims-berita` | Berita | red |
| `wims-style` | Style | rose |
| `wims-teknologi` | Teknologi | indigo → cyan |
| `wims-olahraga` | Olahraga | blue/green |

## Contoh Topik Niche (per kategori)

> Topik dibentuk saat konten kategori cukup dalam. Contoh:

| Kategori | Topik | Repo |
|---|---|---|
| teknologi | AI | `wims-teknologi-ai` |
| teknologi | Pemrograman | `wims-teknologi-pemrograman` |
| game | Mobile | `wims-game-mobile` |
| bisnis | Startup | `wims-bisnis-startup` |
| olahraga | Sepak Bola | `wims-olahraga-sepakbola` |

## Aturan Penamaan Tambahan

- Jangan gunakan singkatan membingungkan (`wims-tekno` → hindari; pakai `wims-teknologi`).
- Jangan duplikasi: satu topik hanya boleh hidup di satu repo.
- Jika topik sudah cukup besar (≥ 15 artikel), pecah menjadi topik baru, bukan menumpuk di kategori.
- `registry/network.json` adalah sumber kebenaran; setiap repo baru harus didaftarkan di sana.
