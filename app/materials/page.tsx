import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductNavGrid from '@/components/ProductNavGrid';
import { productRefs, materialsByProduct, materialsFallback } from '@/lib/pageData';

export const metadata = { title: '國際頂級原料 - 萃活世家' };

export default function MaterialsPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-[360px] md:min-h-[460px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13,58,149,0.55),rgba(1,34,101,0.55)), url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="container-x text-white">
          <h1 className="text-3xl md:text-6xl font-medium leading-tight tracking-wide drop-shadow">
            國際權威大廠原料<br />有感保證 好安心
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 md:py-16 bg-white">
        <div className="container-x max-w-3xl text-ink-mid leading-8">
          <p>
            萃活世家選擇採用國際大廠生產的原料，主要是因為這些廠商在業界擁有高度的聲譽和信任。製造商進行了多項嚴格的實驗，並在各種專業期刊上發表了相關研究成果，因為通過各項嚴格檢驗及各種實驗，因此<strong className="text-ink-dark">代表著最高品質和安全標準</strong>。
          </p>
          <p className="mt-6">
            國際大廠原料不僅僅是一種產品成分，更是對品質的承諾和對消費者健康的負責。這些原料具有完整的證明文件，並且在市場上享有良好的口碑和廣泛的認可。因此，我們相信使用國際頂級原料是確保我們產品品質和安全性的最佳選擇。
          </p>
        </div>

        <div className="container-x mt-14">
          <ProductNavGrid prefix="m-" />
        </div>
      </section>

      {/* PRODUCT SECTIONS */}
      {productRefs.map((p, idx) => {
        const cards = materialsByProduct[p.slug] || materialsFallback;
        return (
          <section
            key={p.slug}
            id={`m-${p.slug}`}
            className={`py-14 md:py-20 ${idx % 2 ? 'bg-white' : 'gradient-soft'} scroll-mt-24`}
          >
            <div className="container-x">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <img src={p.pkg} alt={p.full} className="w-44 md:w-56 rounded-2xl shadow-card" />
                <div>
                  <h2 className="text-2xl md:text-4xl font-medium text-brand-navy">
                    {p.full}
                  </h2>
                  <div className="mt-2 text-lg md:text-2xl text-ink-mid">國際頂級原料如下</div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((c) => (
                  <div key={c.title} className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col">
                    <div className="p-5 grid place-items-center">
                      <div className={`px-6 py-1.5 rounded-full border-2 font-bold text-lg ${c.badgeColor}`}>
                        {c.badge}
                      </div>
                    </div>
                    <div className="bg-brand-navy text-white text-center py-2.5 font-medium">
                      {c.title}
                    </div>
                    <ul className="p-5 space-y-2 text-sm text-ink-mid flex-1">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-brand-bright">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="px-5 pb-5">
                      <img
                        src={`https://picsum.photos/seed/factory-${p.slug}-${c.badge}/600/300`}
                        alt={c.factory}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="mt-2 text-right text-xs text-ink-soft">{c.factory}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link href={`/products/${p.slug}`} className="btn-pill">
                  查看 {p.full} 詳細資料 <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
