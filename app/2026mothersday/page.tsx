import PageHero from '@/components/PageHero';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata = { title: '寵愛母親節 100% 中獎 - 配方時代' };

export default function MothersDayPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 py-16 text-center">
        <div className="text-promo text-sm font-medium">2026 母親節限定</div>
        <h1 className="mt-3 text-4xl md:text-6xl font-bold text-promo">寵愛母親節 ❤️</h1>
        <p className="mt-3 text-lg text-rose-800">買五送二抽 1 次，買十送五直接抽 2 次</p>
        <p className="mt-2 text-rose-700">中獎機率任選 ★ 12 大獎有抽必中</p>
      </section>
      <section className="py-14 bg-cream">
        <div className="container-x">
          <h2 className="section-title">母親節人氣推薦</h2>
          <div className="section-title-underline" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 8).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
