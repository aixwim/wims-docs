# Matriks Interlinking (Jaring Laba-laba)

Setiap situs menaut ke situs lain secara terstruktur agar seluruh jaringan
terhubung seperti jaring laba-laba — terindeks baik oleh mesin pencari tanpa
menjadi link farm. Sumber kebenaran: [`registry/network.json`](../registry/network.json).

## Peran Tautan per Tipe Situs

### Hub (`wims`)
| Lokasi | Menaut ke |
|---|---|
| Header nav | halaman internal hub |
| Homepage | grid 10 kartu kategori (setiap kategori = 1 link) |
| Footer | seluruh 10 kategori (daftar label) |
| Artikel (jika ada) | kategori relevan |

### Kategori (contoh `wims-teknologi`)
| Lokasi | Menaut ke |
|---|---|
| Footer blok "Jaringan" | `parent` (hub), `children` (topik), 2-3 `related` |
| Artikel | topik terkait (jika ada) + 1-2 related kontekstual |
| About | hub + kepemilikan |

### Topik (contoh `wims-teknologi-ai`)
| Lokasi | Menaut ke |
|---|---|
| Footer blok "Jaringan" | `parent` (kategori), `children` (jika ada), 1-2 `related` |
| Breadcrumb | kategori induk |
| Artikel | kategori induk + related kontekstual |
| About | hub + kepemilikan |

## Matriks Contoh (10 kategori)

| Situs | parent | children | related (pilih 2-3) |
|---|---|---|---|
| wims | — | 10 kategori | — |
| wims-bisnis | wims | wims-bisnis-startup* | wims-berita, wims-teknologi |
| wims-selebritas | wims | — | wims-style, wims-entertainment |
| wims-kultur | wims | — | wims-living, wims-entertainment |
| wims-entertainment | wims | — | wims-game, wims-selebritas |
| wims-game | wims | wims-game-mobile* | wims-teknologi, wims-entertainment |
| wims-living | wims | — | wims-style, wims-kultur |
| wims-berita | wims | — | wims-bisnis, wims-olahraga |
| wims-style | wims | — | wims-selebritas, wims-living |
| wims-teknologi | wims | wims-teknologi-ai, wims-teknologi-pemrograman* | wims-game, wims-bisnis |
| wims-olahraga | wims | wims-olahraga-sepakbola* | wims-berita, wims-living |

\* topik dibentuk kemudian; saat ada, isi `children` di `network.json`.

## Aturan Umum

1. **Semua link keluar relatif** ke situs target:
   `https://aixwim.github.io/<target-repo>/`.
2. **Anchor text** deskriptif (nama situs/topik), bukan keyword stuffing.
3. **Tanpa tautan timbal balik wajib** — hub → semua kategori, tetapi kategori
   → hub saja (1 arah dari kategori ke hub sudah cukup). Tidak perlu
   "link exchange" kaku.
4. **Footer konsisten** di semua situs: blok berjudul **"Jaringan Wim"** dengan
   maksimal 6 tautan (parent + children + related + hub).
5. **Tautan kontekstual** di dalam artikel hanya bila relevan untuk pembaca
   (bukan hiasan).
6. **Link checker** (`scripts/check-links.js`) wajib 0 broken & 0 orphan
   sebelum deploy.

## Verifikasi

```bash
node scripts/check-links.js
# Output: per repo, jumlah link in/out, orphan list, broken list
```

Hasil akhir jaringan: setiap situs terhubung ke hub dalam ≤ 2 klik, dan
setiap kategori terhubung ke 3-5 situs lain (hub + related + topik).
