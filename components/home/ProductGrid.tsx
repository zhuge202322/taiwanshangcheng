import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { fetchProducts } from '@/lib/vendure';
import ProductCard from '@/components/ProductCard';

export default async function ProductGrid() {
  const products = await fetchProducts();
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-x">
        <h2 className="section-title">
          我們知道沒有人想要<span className="text-brand-bright">花錢買無效的產品</span>
        </h2>
        <div className="section-title-underline" />
        <p className="mt-4 text-center text-ink-mid">讓我們的強效配方，協助解決你的困擾</p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/allproduct" className="btn-pill-solid">
            查看全部產品 <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
