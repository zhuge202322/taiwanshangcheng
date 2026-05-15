import { fetchProducts } from '@/lib/vendure';
import ProductCard from '@/components/ProductCard';

export const metadata = { title: '所有產品 - 萃活世家' };

export default async function AllProductPage() {
  const products = await fetchProducts();
  return (
    <>
      <section className="gradient-blue text-white py-14 text-center">
        <h1 className="text-3xl md:text-5xl font-medium tracking-wide">所有產品</h1>
        <p className="mt-4 opacity-90">{products.length} 款研究證實的有效配方・1~2 個月快速有感</p>
      </section>
      <section className="py-14 bg-cream">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>
    </>
  );
}
