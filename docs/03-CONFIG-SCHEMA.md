# Referensi `site.config.json`

Setiap situs jaringan punya `site.config.json` di root repo. File ini adalah
satu-satunya sumber identitas situs — metadata, basePath, brand, nav, dan
tautan jaringan dibaca dari sini oleh template.

## Skema

```jsonc
{
  // Nama repo GitHub. basePath otomatis = "/" + repo.
  "repo": "wims-teknologi",

  // Nama tampilan situs (judul & brand).
  "siteName": "Wim Teknologi",

  // Bagian teks logo yang di-gradient (singkat, 1 kata).
  "logoText": "tekno",

  // Awalan teks logo sebelum logoText (opsional, default "").
  "logoPrefix": "wim",

  // Slogan singkat.
  "tagline": "Teknologi, AI & Web",

  // Deskripsi meta (untuk SEO & Open Graph).
  "description": "Artikel teknologi, AI, dan web development.",

  // Judul & subtitle OG image (opsional; dipakai generate-assets.mjs).
  "ogTitle": "Teknologi<br>dan <span class=\"grad\">AI</span>",
  "ogSubtitle": "Artikel teknologi, AI, dan web development — ditulis untuk dipahami semua orang.",

  // Kategori (untuk grouping & tema). Hub memakai "hub".
  "category": "teknologi",

  // Label kategori untuk tampilan.
  "categoryLabel": "Teknologi",

  // Repo induk (parent). Hub bernilai null.
  "parent": "wims",

  // Repo anak (topik di bawah kategori ini). Hub bernilai [].
  "children": ["wims-teknologi-ai"],

  // 2-3 repo kategori terkait untuk footer "Jaringan".
  "related": ["wims-game", "wims-living"],

  // Palette brand. Diterjemahkan ke CSS vars --brand-*.
  "brand": {
    "accent": "#6366f1",
    "accent2": "#8b5cf6"
  },

  // Opsional: override jumlah kartu di homepage / dsb.
  "home": {
    "featured": 4,
    "recent": 6
  },

  // Opsional: repo-id & category-id giscus untuk kolom komentar.
  "giscus": {
    "repoId": "R_kgDOT5wE7A",
    "categoryId": "DIC_kwDOT5wE7M4DDe8B"
  },

  // Opsional: token meta google-site-verification (Search Console).
  // Jika diisi, meta <meta name="google-site-verification" ...> dirender
  // otomatis di <head> setiap halaman. Kosongkan jika belum diverifikasi.
  "googleVerification": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

## Contoh Lengkap (Hub)

```json
{
  "repo": "wims",
  "siteName": "Wim",
  "logoText": "wim",
  "logoPrefix": "aix",
  "tagline": "Portal Jaringan Wim",
  "description": "Portal jaringan situs Wim: teknologi, game, bisnis, dan banyak lagi.",
  "category": "hub",
  "categoryLabel": "Hub",
  "parent": null,
  "children": [
    "wims-bisnis", "wims-selebritas", "wims-kultur", "wims-entertainment",
    "wims-game", "wims-living", "wims-berita", "wims-style",
    "wims-teknologi", "wims-olahraga"
  ],
  "related": [],
  "brand": { "accent": "#6366f1", "accent2": "#8b5cf6" },
  "giscus": { "repoId": "R_kgDOT5wE7A", "categoryId": "DIC_kwDOT5wE7M4DDe8B" }
}
```

## Aturan

1. Semua field wajib ada kecuali yang bertanda "Opsional".
2. `accent`/`accent2` **wajib hex** (menghindari bug `oklch()` pada browser,
   lihat [09-TROUBLESHOOTING.md](09-TROUBLESHOOTING.md)).
3. Nilai `parent`/`children`/`related` harus terdaftar di
   [`registry/network.json`](../registry/network.json), diverifikasi
   `scripts/check-links.js`.
4. Perubahan `site.config.json` hanya pada repo situs itu sendiri; tidak
   disebar oleh sync template.
