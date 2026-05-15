import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { fetchProducts } from '@/lib/vendure';
import ProductCard from '@/components/ProductCard';
import AffordableTabs from './AffordableTabs';

export const metadata = { title: '為何我們價格這麼實惠？ - 萃活世家' };

export default async function AffordablePage() {
  const products = await fetchProducts();

  return (
    <>
      {/* HERO IMAGE */}
      <section className="bg-white pt-10">
        <div className="container-x">
          <img
            src="https://images.unsplash.com/photo-1591084728795-1149f32d9866?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-[280px] md:h-[460px] object-cover rounded-3xl shadow-card"
          />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 bg-white">
        <div className="container-x max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-medium text-brand-navy">以最實惠的價格提供最有效的配方</h1>
          <div className="section-title-underline mx-0 mt-3" />
          <div className="mt-8 space-y-5 text-ink-mid leading-8">
            <p>萃活世家的初衷是想要提供真正有科學根據的有效配方，並確保每一位消費者都能夠在無負擔的情況下享受到健康。</p>
            <p>我們意識到目前市面上充斥著昂貴且無效的保健食品，透過深入的保健食品市場研究，發現其中一個原因是相關店面、行銷、營運和通路成本的高昂。</p>
          </div>
        </div>
      </section>

      {/* WHY AFFORDABLE */}
      <section className="py-14 gradient-soft">
        <div className="container-x">
          <h2 className="section-title">為何我們的價格如此實惠？</h2>
          <div className="section-title-underline" />
          <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="rounded-2xl shadow-card w-full h-[360px] object-cover"
            />
            <div className="space-y-5 text-ink-mid leading-8">
              <p>萃活世家的承諾是，不僅提供真正有效的保健食品，更將健康帶給每一個人，我們相信健康不應成為奢侈品，而是每個人都能夠輕鬆擁有的權益。</p>
              <p>我們選擇不花大錢投入昂貴的實體通路，或是轉嫁各大銷售平台成本，我們將節省下來的費用全部</p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="py-16 bg-white">
        <div className="container-x">
          <h2 className="section-title">
            用在對你更好且<br />更重要的地方
          </h2>
          <div className="section-title-underline" />
          <AffordableTabs />
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="py-16 gradient-soft">
        <div className="container-x">
          <h2 className="section-title">查看萃活世家所有產品</h2>
          <div className="section-title-underline" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
          <div className="mt-10 text-center">
            <Link href="/allproduct" className="btn-pill-solid">
              查看全部產品 <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
