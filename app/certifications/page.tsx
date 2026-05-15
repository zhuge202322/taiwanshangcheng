import Link from 'next/link';
import { CheckCircle2, ChevronRight, FlaskConical, Microscope, Globe } from 'lucide-react';
import ProductNavGrid from '@/components/ProductNavGrid';
import { productRefs, certReportsFor } from '@/lib/pageData';

export const metadata = { title: '安心檢驗報告 - 萃活世家' };

const heroChecks = [
  ['5 項重金屬', '國際原料'],
  ['9 項塑化劑', '製程環境'],
  ['315 項西藥', 'ISO22000 / HACCP']
];

const introCards = [
  { icon: Globe, title: '國際原料', sub: '來源明確安全', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
  { icon: FlaskConical, title: '製程認證', sub: '符合法規製造', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80' },
  { icon: Microscope, title: '產品全數送', sub: '第三方安心檢驗', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80' }
];

export default function CertificationsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-10">
        <div className="container-x">
          <div className="bg-white rounded-3xl shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-ink-dark tracking-wide">
                萃活世家 <span className="text-brand-bright">值得您信賴</span>
              </h1>
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-base md:text-lg text-ink-dark">
                {heroChecks.flat().map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="text-brand-bright" size={20} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="h-full w-full object-cover min-h-[280px]"
            />
          </div>
        </div>
      </section>

      {/* THREE INTRO CARDS */}
      <section className="py-14 bg-white">
        <div className="container-x grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {introCards.map((c) => (
            <div key={c.title} className="text-center">
              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-5 text-xl font-medium text-ink-dark">{c.title}</h3>
              <div className="mt-1 text-ink-mid">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="container-x mt-14">
          <ProductNavGrid prefix="c-" />
        </div>
      </section>

      {/* PER PRODUCT REPORTS */}
      {productRefs.map((p, idx) => {
        const reports = certReportsFor(p.slug);
        return (
          <section
            key={p.slug}
            id={`c-${p.slug}`}
            className={`py-14 md:py-16 ${idx % 2 ? 'gradient-soft' : 'bg-white'} scroll-mt-24`}
          >
            <div className="container-x">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <img src={p.pkg} alt={p.full} className="w-44 md:w-56 rounded-2xl shadow-card" />
                <div>
                  <h2 className="text-2xl md:text-4xl font-medium text-brand-navy">{p.full}</h2>
                  <div className="mt-2 text-lg md:text-2xl text-ink-mid">全數檢驗合格</div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {reports.map((r) => (
                  <div key={r.label} className="bg-white rounded-xl shadow-card overflow-hidden">
                    <div className="px-4 py-3 text-sm md:text-base font-medium text-ink-dark border-b border-gray-100">
                      {r.label}
                    </div>
                    <div className="aspect-[3/4] bg-gray-50 relative">
                      <img src={r.image} alt={r.label} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute bottom-3 right-3 bg-promo text-white text-xs font-bold px-2 py-1 rounded">
                        合格
                      </div>
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
