'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Award, ShieldCheck, Lightbulb, MessageCircle, ChevronRight } from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const tabs = [
  {
    key: 'origin',
    icon: Award,
    label: '頂級原料',
    title: '我們堅持給你最好的 國際頂級原料',
    desc: '選用國際大廠頂級原料，所以我們敢公開全商品原料來源，讓你吃得有感更安心'
  },
  {
    key: 'test',
    icon: ShieldCheck,
    label: '全品項自主檢驗',
    title: '全品項自主檢驗',
    desc: '堅持全品項全數送檢驗，保證項目包含 315 項西藥檢測、9 項塑化劑檢測、5 項重金屬檢測全數合格'
  },
  {
    key: 'rd',
    icon: Lightbulb,
    label: '專業研發團隊',
    title: '專業研發團隊',
    desc: '專業研發團隊是配方時代的堅強支柱，致力於研究各種國際期刊文獻，以及精心挑選高品質、純淨、經過驗證的成分'
  },
  {
    key: 'service',
    icon: MessageCircle,
    label: '一對一真人客服',
    title: '一對一真人客服',
    desc: '真人線上客服團隊是我們與您直接溝通橋樑的重要一環，我們將專業知識與友好服務相結合，您可透過 LINE 客服解答所有疑問'
  }
];

export default function AffordablePage() {
  const [active, setActive] = useState(tabs[0].key);
  const cur = tabs.find((t) => t.key === active)!;

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
            <p>配方時代的初衷是想要提供真正有科學根據的有效配方，並確保每一位消費者都能夠在無負擔的情況下享受到健康。</p>
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
              <p>配方時代的承諾是，不僅提供真正有效的保健食品，更將健康帶給每一個人，我們相信健康不應成為奢侈品，而是每個人都能夠輕鬆擁有的權益。</p>
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

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`px-5 md:px-7 py-2.5 rounded-full border text-sm md:text-base transition flex items-center gap-2 ${
                  active === t.key
                    ? 'bg-brand-blue text-white border-brand-blue shadow-card'
                    : 'bg-white text-ink-dark border-gray-300 hover:border-brand-blue'
                }`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-cream rounded-3xl p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-bright text-white grid place-items-center">
              <cur.icon size={28} />
            </div>
            <h3 className="mt-5 text-xl md:text-2xl font-medium text-brand-navy whitespace-pre-line">
              {cur.title}
            </h3>
            <p className="mt-4 text-ink-mid leading-8">{cur.desc}</p>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="py-16 gradient-soft">
        <div className="container-x">
          <h2 className="section-title">查看配方時代所有產品</h2>
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
