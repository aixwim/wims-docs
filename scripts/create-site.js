#!/usr/bin/env node
/**
 * create-site.js — Scaffold repo situs baru dari wims-template + network.json.
 *
 * Usage:
 *   node scripts/create-site.js --repo wims-teknologi-ai --parent wims-teknologi
 *   node scripts/create-site.js --repo wims-bisnis          # parent default = hub
 *   node scripts/create-site.js --repo wims-x --dry-run     # tanpa buat repo
 *
 * Prasyarat:
 *   - `gh` terautentikasi sebagai owner (aixwim)
 *   - repo template aixwim/wims-template tersedia
 *   - cwd berisi registry/network.json (kanonik ada di wims-docs)
 *
 * Alur: buat repo publik -> clone template -> salin tema (tanpa config/content
 * template) -> tulis site.config.json dari argumen + network.json -> commit.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const repo = flag('--repo');
const parent = flag('--parent') || null;
const name = flag('--name');
const tagline = flag('--tagline');
const dryRun = args.includes('--dry-run');
const templateRef = flag('--template') || 'https://github.com/aixwim/wims-template.git';

if (!repo) {
  console.error('--repo wajib (contoh: wims-teknologi-ai)');
  process.exit(2);
}
if (!/^wims-[a-z0-9]+(-[a-z0-9]+)*$/.test(repo)) {
  console.error(`--repo "${repo}" tidak sesuai konvensi wims-<kategori>[-<topik>]`);
  process.exit(2);
}

const networkPath = path.resolve(process.cwd(), 'registry', 'network.json');
if (!fs.existsSync(networkPath)) {
  console.error(`registry tidak ditemukan: ${networkPath}`);
  process.exit(2);
}
const network = JSON.parse(fs.readFileSync(networkPath, 'utf-8'));

const allSites = [...(network.sites || []), ...(network.topics || [])];
const existing = allSites.find((s) => s.repo === repo);
if (existing && existing.status === 'active') {
  console.error(`repo "${repo}" sudah active — tidak boleh di-scaffold ulang`);
  process.exit(2);
}

const category = flag('--category') || (existing?.category) || repo.replace(/^wims-/, '').split('-')[0];
const palette = network.brandPalettes?.[category] || existing?.brand || { accent: '#6366f1', accent2: '#8b5cf6' };
const siteName = name || existing?.name || `Wim ${capitalize(category)}`;
const hubRepo = network.hub;
const parentEffective = parent || existing?.parent || hubRepo;

// related default: pakai nilai network.json bila ada, selain itu sibling aktif
const relatedDefault = () => {
  if (existing?.related?.length) return existing.related;
  const siblings = allSites.filter(
    (s) => s.parent === parentEffective && s.repo !== repo && s.status === 'active'
  );
  const pick = siblings.slice(0, 2).map((s) => s.repo);
  if (parentEffective && parentEffective !== hubRepo) pick.push(parentEffective);
  return pick;
};

const siteConfig = {
  repo,
  siteName,
  logoText: category,
  logoPrefix: 'wim',
  tagline: tagline || `Tagline ${siteName}`,
  description: `Deskripsi meta ${siteName}.`,
  ogTitle: `Judul OG<br>untuk ${siteName}`,
  ogSubtitle: 'Subtitle OG singkat dan informatif.',
  category,
  categoryLabel: existing?.categoryLabel || capitalize(category),
  parent: parentEffective,
  children: existing?.children || [],
  related: relatedDefault(),
  brand: palette,
  giscus: { repoId: 'REPO_ID', categoryId: 'CATEGORY_ID' },
};

console.log(`repo          : ${repo}`);
console.log(`siteName      : ${siteName}`);
console.log(`category      : ${category} (${JSON.stringify(palette)})`);
console.log(`parent        : ${siteConfig.parent}`);
console.log(`related       : ${JSON.stringify(siteConfig.related)}`);

if (dryRun) {
  console.log('\n[dry-run] tidak membuat repo. Rencana site.config.json:');
  console.log(JSON.stringify(siteConfig, null, 2));
  process.exit(0);
}

const tmp = `/tmp/wims-create-${repo}`;
fs.rmSync(tmp, { recursive: true, force: true });

console.log('\n1) Membuat repo publik...');
execSync(`gh repo create ${repo} --public --description "Wim ${capitalize(category)} — situs jaringan Wim"`, { stdio: 'inherit' });

console.log('2) Clone template...');
execSync(`git clone --depth 1 ${templateRef} ${tmp}`, { stdio: 'inherit' });

console.log('3) Salin tema, hapus identitas template...');
for (const rel of ['site.config.json', 'site.config.json.example', '.git']) {
  fs.rmSync(path.join(tmp, rel), { recursive: true, force: true });
}
fs.rmSync(path.join(tmp, 'content'), { recursive: true, force: true });
fs.mkdirSync(path.join(tmp, 'content'), { recursive: true });

console.log('4) Tulis site.config.json + content/welcome.md...');
fs.writeFileSync(path.join(tmp, 'site.config.json'), JSON.stringify(siteConfig, null, 2) + '\n');

const welcome = `---
title: "Selamat Datang di ${siteName}"
date: "2026-08-18"
category: "Perkenalan"
excerpt: "${siteName} — ${siteConfig.description}"
tags: ["perkenalan"]
---

Selamat datang di **${siteName}**, bagian dari jaringan **Wim**.

Situs ini sedang dalam pengembangan. Isi file di folder \`content/\` untuk menampilkan artikel.

- Topik utama: *${siteConfig.categoryLabel}*
- Jaringan: *${siteConfig.parent}*
`;
fs.writeFileSync(path.join(tmp, 'content', 'welcome.md'), welcome);

console.log('5) Init repo baru + commit + push...');
execSync('git init -b main && git add -A && git commit -m "feat: scaffold ' + repo + ' from wims-template"', {
  cwd: tmp,
  stdio: 'inherit',
});
execSync(`git remote add origin https://github.com/aixwim/${repo}.git`, { cwd: tmp, stdio: 'inherit' });
execSync('git push -u origin HEAD:main', { cwd: tmp, stdio: 'inherit' });

console.log(`\n✓ ${repo} dibuat. Langkah berikutnya:`);
console.log(`  - Registrasi di registry/network.json (wims-docs), status="active"`);
console.log(`  - Isi content/*.md dan npm run assets`);
console.log(`  - Atur giscus.repoId/categoryId di site.config.json`);

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}