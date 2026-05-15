// 产品类型定义（运行时数据来自 Vendure，详见 lib/vendure.ts）

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  detailImage?: string;
  hero: string;
  highlights: string[];
  ingredients: { name: string; brand: string; desc: string }[];
  description: string;
  sku?: string;
  variantId?: string;
};
