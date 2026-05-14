# 配方時代 Next.js 前端

复刻 [healthformula.com.tw](https://healthformula.com.tw/) 的板块结构与视觉风格。
产品数据为本地 mock，后续将对接 **Vendure** 电商后端。

## 技术栈

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Lucide React 图标
- Noto Sans TC 字体

## 启动

```bash
npm install
npm run dev
# http://localhost:3000
```

## 目录

```text
app/
  page.tsx                   首页（10 大板块）
  allproduct/                所有产品列表
  products/[slug]/           产品详情（动态路由 + generateStaticParams）
  reviews/                   使用者真实回馈
  materials/                 国际顶级原料
  enough/                    足量强效配方
  certifications/            安心检验报告
  affordable/                为何价格实惠
  blogs/                     保健专栏
  newfriend/                 推荐好友优惠
  2026mothersday/            母亲节活动
  cart/                      购物车（占位）
components/
  PromoBar / Header / Footer / PageHero / ProductCard
  home/Hero / ThreePromises / Stats / ExpertEndorse / IntlMaterials
       / Safety / Reviews / ProductGrid / Media / Consult
lib/
  products.ts                15 款产品 mock 数据
```

## 后续对接 Vendure

将 `lib/products.ts` 替换为 Vendure GraphQL 调用：

```ts
// 例：在 server component 中
const res = await fetch(VENDURE_SHOP_API, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: PRODUCTS_QUERY }),
  next: { revalidate: 60 }
});
```

`Product` 类型与 Vendure `ProductVariant` 字段一一映射即可，UI 层无需改动。
