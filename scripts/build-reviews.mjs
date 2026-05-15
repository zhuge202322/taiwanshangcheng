// 从 data/scraped-reviews.json 随机抽取 5-10 条/产品 -> data/reviews.json
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../data/scraped-reviews.json');
const DST = path.resolve(__dirname, '../data/reviews.json');

// 简单的可重复随机：基于 slug 的种子
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const raw = JSON.parse(await fs.readFile(SRC, 'utf8'));
const out = {};
for (const [slug, info] of Object.entries(raw)) {
  const rng = mulberry32(hashString(slug));
  const count = 5 + Math.floor(rng() * 6); // 5-10
  const pool = info.reviews || [];
  const picked = shuffle(pool, rng).slice(0, Math.min(count, pool.length));
  out[slug] = picked.map((r, i) => ({
    id: `${slug}-${i + 1}`,
    author: r.author,
    rating: r.rating,
    content: r.content || r.title,
    date: r.date,
    verified: r.verified,
  }));
}
await fs.writeFile(DST, JSON.stringify(out, null, 2), 'utf8');
console.log(
  `Wrote ${DST}\nPer product:`,
  Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])),
);
