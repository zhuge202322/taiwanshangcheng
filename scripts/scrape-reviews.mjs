// 从 healthformula.com.tw 爬取每个产品 Yotpo 评论数据
// 输出: data/scraped-reviews.json（key = 我们的产品 slug）
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36';

// 我们的 slug -> 对方网站 slug
const SLUG_MAP = {
  'probiotic-gut-30': 'probiotic',
  'cranberry-15': 'cranberry-probiotics',
  'uc2-30': 'uc2',
  'bittermelon-60': 'bittermelon',
  'gaba-60': 'gaba-complex',
  'maca-30': 'maca-p',
  'royaljelly-60': 'royaljelly',
  'collagen-15': 'collagen',
  'calcium-45': 'ca',
  'probiotic-allergy-30': 'allergy-probiotic',
  'vitc-q10-30': 'vitamin-c',
  'vitb-zn-60': 'vitamin-bm',
  'vitb-fe-60': 'vitamin-bf',
  'lutein-30': 'lutein',
  'fishoil-60': 'fishoil',
};

async function getYotpoConfig(targetSlug) {
  const url = `https://healthformula.com.tw/${targetSlug}/`;
  const html = await fetch(url, { headers: { 'User-Agent': UA } }).then((r) => r.text());
  const appKey = (html.match(/yotpo\.com\/([A-Za-z0-9]{20,})\/widget\.js/) || [])[1];
  const productId = (html.match(/data-(?:yotpo-)?product-id="([^"]+)"/) || html.match(/yotpo-product-id="([^"]+)"/) || [])[1];
  return { appKey, productId, url };
}

async function fetchYotpoReviews(appKey, productId, perPage = 15) {
  const api = `https://api-cdn.yotpo.com/v1/widget/${appKey}/products/${encodeURIComponent(productId)}/reviews.json?per_page=${perPage}&page=1&sort=date&direction=desc`;
  const res = await fetch(api, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Yotpo API ${res.status} for ${productId}`);
  const data = await res.json();
  const reviews = data?.response?.reviews || [];
  return reviews.map((r) => ({
    author: r.user?.display_name || r.user?.user_name || '匿名',
    rating: r.score,
    title: r.title || '',
    content: r.content || '',
    date: (r.created_at || '').slice(0, 10),
    verified: !!r.verified_buyer,
  }));
}

async function main() {
  const out = {};
  for (const [ourSlug, targetSlug] of Object.entries(SLUG_MAP)) {
    process.stdout.write(`[${ourSlug}] -> ${targetSlug} ... `);
    try {
      const { appKey, productId, url } = await getYotpoConfig(targetSlug);
      if (!appKey || !productId) {
        console.log(`SKIP (appKey=${appKey} productId=${productId})`);
        out[ourSlug] = { source: url, reviews: [] };
        continue;
      }
      const reviews = await fetchYotpoReviews(appKey, productId, 15);
      out[ourSlug] = { source: url, productId, reviews };
      console.log(`${reviews.length} reviews`);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      out[ourSlug] = { source: '', reviews: [], error: e.message };
    }
    // be polite
    await new Promise((r) => setTimeout(r, 600));
  }

  const dataDir = path.resolve(__dirname, '../data');
  await fs.mkdir(dataDir, { recursive: true });
  const outPath = path.join(dataDir, 'scraped-reviews.json');
  await fs.writeFile(outPath, JSON.stringify(out, null, 2), 'utf8');

  const totals = Object.values(out).map((v) => v.reviews?.length || 0);
  console.log(`\nWrote ${outPath}`);
  console.log(`Per product: ${totals.join(', ')} (sum=${totals.reduce((a, b) => a + b, 0)})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
