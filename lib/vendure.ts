import type { Product } from './products';
import { getReviewSummary } from './reviews';

const SHOP_API =
  process.env.VENDURE_SHOP_API_URL || 'http://localhost:7010/shop-api';

const PRODUCT_FIELDS = `
  id
  name
  slug
  description
  featuredAsset { id source preview }
  assets { id source preview }
  variants {
    id
    sku
    priceWithTax
    currencyCode
    stockLevel
  }
`;

interface VendureAsset {
  id: string;
  source: string;
  preview: string;
}
interface VendureVariant {
  id: string;
  sku: string;
  priceWithTax: number;
  currencyCode: string;
  stockLevel: string;
}
interface VendureProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredAsset?: VendureAsset | null;
  assets: VendureAsset[];
  variants: VendureVariant[];
}

async function gql<T>(query: string, variables?: Record<string, any>): Promise<T> {
  let res: Response;
  try {
    res = await fetch(SHOP_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      // ISR: 60 秒服务端缓存，且若 build 时后端不可达不让构建失败
      next: { revalidate: 60 },
    });
  } catch (e) {
    // 例如 Docker build 阶段后端尚未启动时
    throw new Error(`Vendure unreachable at ${SHOP_API}: ${(e as Error).message}`);
  }
  if (!res.ok) {
    throw new Error(`Vendure API ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`Vendure GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

function extractSubtitle(description: string): string {
  // 从 HTML 中提取首个段落或列表项作为副标
  const m = description.match(/<(?:li|p)>([^<]+)<\/(?:li|p)>/);
  return m ? m[1].trim() : '';
}

function mapProduct(p: VendureProduct): Product {
  const main = p.featuredAsset?.source || p.assets[0]?.source || '';
  const detail = p.assets.find((a) => a.source !== main)?.source || '';
  const price = p.variants[0]?.priceWithTax
    ? Math.round(p.variants[0].priceWithTax / 100)
    : 0;
  return {
    slug: p.slug,
    name: p.name,
    subtitle: extractSubtitle(p.description),
    category: '',
    tagline: '',
    price,
    originalPrice: price,
    rating: getReviewSummary(p.slug).average || 4.8,
    reviews: getReviewSummary(p.slug).count,
    image: main,
    detailImage: detail,
    hero: main,
    highlights: [],
    ingredients: [],
    description: p.description,
    sku: p.variants[0]?.sku || '',
    variantId: p.variants[0]?.id,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = await gql<{ products: { items: VendureProduct[] } }>(`
      query {
        products(options: { take: 100 }) {
          items { ${PRODUCT_FIELDS} }
        }
      }
    `);
    return data.products.items.map(mapProduct);
  } catch (e) {
    console.error('fetchProducts failed:', e);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await gql<{ product: VendureProduct | null }>(
      `query ($slug: String!) {
        product(slug: $slug) { ${PRODUCT_FIELDS} }
      }`,
      { slug },
    );
    return data.product ? mapProduct(data.product) : null;
  } catch (e) {
    console.error('fetchProductBySlug failed:', e);
    return null;
  }
}
