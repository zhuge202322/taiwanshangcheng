import Link from 'next/link';
import { ChevronRight, Check } from 'lucide-react';
import ProductNavGrid from '@/components/ProductNavGrid';
import { productRefs, enoughByProduct } from '@/lib/pageData';

export const metadata = { title: '足量強效配方 - 萃活世家' };

export default function EnoughPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white pt-10 pb-2">
        <div className="container-x">
          <div
            className="rounded-2xl overflow-hidden h-[280px] md:h-[420px] flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(13,58,149,0.45),rgba(13,58,149,0.5)), url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000&q=80')`
            }}
          >
            <div className="px-8 md:px-16 text-white">
              <h1 className="text-4xl md:text-7xl font-medium tracking-wide drop-shadow">
                科學支持<br />足量有效
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 bg-white">
        <div className="container-x max-w-3xl text-ink-mid leading-8 space-y-5">
          <p>或許您曾經使用過保健食品，但未感到明顯的效果，這可能是因為保健食品的配方，並沒有嚴謹的科學實驗支持，或是添加的劑量未達有效劑量。</p>
          <p>不論是成分未經過科學實驗支持，或是劑量不足，吃了都真的很難有感受。</p>
          <p>我們不只是嚴選配方的種類，更保證每項配方都達到有效劑量，所有產品中的每個配方都是以足夠的劑量添加的，確保您能吃得有幫助、安心。</p>
        </div>

        <div className="mt-14 container-x text-center">
          <div className="text-ink-mid">我們追求的是</div>
          <div className="mt-4 text-2xl md:text-4xl font-medium text-brand-navy leading-relaxed">
            <span className="text-promo">「</span>如果你吃我們家的產品沒有幫助，<br />
            那也不用再試其他的了。<span className="text-promo">」</span>
          </div>
          <p className="mt-8 text-ink-mid">
            以下我們列出了我們產品所含有的成分及相關的科學實驗佐證，讓您能更深入了解每一種成分的重要性。
          </p>
        </div>

        <div className="container-x mt-12">
          <ProductNavGrid prefix="e-" />
        </div>
      </section>

      {/* PER PRODUCT TABLES */}
      {productRefs.map((p, idx) => {
        const rows = enoughByProduct[p.slug];
        if (!rows) return null;
        return (
          <section
            key={p.slug}
            id={`e-${p.slug}`}
            className={`py-14 md:py-16 ${idx % 2 ? 'gradient-soft' : 'bg-white'} scroll-mt-24`}
          >
            <div className="container-x">
              <h2 className="text-center text-2xl md:text-3xl font-medium text-brand-navy">{p.full}</h2>
              <div className="text-center text-ink-mid mt-1">足量強效配方如下</div>
              <div className="section-title-underline" />

              <div className="mt-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-brand-navy text-white text-sm font-medium">
                  <div className="col-span-3 p-4 text-center">成分</div>
                  <div className="col-span-6 p-4 text-center bg-brand-blue">有效的原因</div>
                  <div className="col-span-3 p-4 text-center bg-brand-bright">我們所添加的劑量</div>
                </div>
                {rows.map((r, i) => (
                  <div
                    key={r.name}
                    className={`grid grid-cols-1 md:grid-cols-12 ${i % 2 ? 'bg-cream' : 'bg-white'} border-t border-gray-100`}
                  >
                    <div className="md:col-span-3 p-5 font-medium text-ink-dark md:flex md:items-center md:justify-center text-center">
                      {r.name}
                    </div>
                    <div className="md:col-span-6 p-5 text-sm text-ink-mid leading-7 border-t md:border-t-0 md:border-l border-gray-100">
                      <div className="md:hidden text-xs text-brand-blue mb-1 font-medium">有效的原因</div>
                      {r.reason}
                    </div>
                    <div className="md:col-span-3 p-5 text-center border-t md:border-t-0 md:border-l border-gray-100">
                      <div className="md:hidden text-xs text-brand-bright mb-1 font-medium">我們所添加的劑量</div>
                      <div className="font-bold text-brand-bright">{r.dose}</div>
                      {r.enough && (
                        <div className="mt-1 inline-flex items-center gap-1 text-xs bg-brand-bright text-white px-2 py-0.5 rounded-full">
                          <Check size={12} /> 足量添加
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link href={`/products/${p.slug}`} className="btn-pill">
                  看看 {p.full} 更多資訊 <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
