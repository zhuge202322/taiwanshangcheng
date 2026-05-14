import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Check, ShieldCheck, Truck, Award } from 'lucide-react';
import { products, getProductBySlug } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  return { title: p ? `${p.name} - 配方時代` : '產品 - 配方時代' };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return notFound();
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 4);

  return (
    <>
      <section className="bg-cream py-10 md:py-14">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" />
          </div>
          <div>
            <div className="text-brand-bright text-sm">{p.category}</div>
            <h1 className="mt-2 text-2xl md:text-4xl font-medium text-brand-navy leading-snug">{p.name}</h1>
            <p className="mt-2 text-ink-mid">{p.subtitle}</p>

            <div className="mt-4 flex items-center gap-3 text-sm">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.round(p.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span>{p.rating}</span>
              <span className="text-ink-soft">| {p.reviews} 則評價</span>
            </div>

            <div className="mt-6 bg-white rounded-xl p-5 border border-promo/30">
              <div className="text-promo text-xs font-medium">母親節限定回饋</div>
              <div className="mt-1 flex items-end gap-3">
                <div className="text-ink-soft line-through">原價 ${p.originalPrice}</div>
                <div className="text-promo text-3xl font-bold">最低 ${p.price}</div>
              </div>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-ink-mid">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <Check size={18} className="text-brand-bright shrink-0 mt-0.5" /> {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-promo text-white rounded-full py-3 font-medium hover:bg-pink-700 transition">
                立即搶購
              </button>
              <button className="flex-1 border border-brand-blue text-brand-blue rounded-full py-3 font-medium hover:bg-brand-blue hover:text-white transition">
                加入購物車
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-ink-mid">
              <div className="bg-white rounded-lg p-3">
                <ShieldCheck className="mx-auto text-brand-blue" size={22} />
                <div className="mt-1">食安檢驗通過</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <Truck className="mx-auto text-brand-blue" size={22} />
                <div className="mt-1">滿千免運</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <Award className="mx-auto text-brand-blue" size={22} />
                <div className="mt-1">原料 COA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="container-x">
          <h2 className="section-title">產品介紹</h2>
          <div className="section-title-underline" />
          <p className="mt-8 max-w-3xl mx-auto text-center text-ink-mid leading-8">
            {p.description}
          </p>
        </div>
      </section>

      <section className="py-14 gradient-soft">
        <div className="container-x">
          <h2 className="section-title">國際大廠原料</h2>
          <div className="section-title-underline" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {p.ingredients.map((i) => (
              <div key={i.name} className="bg-white rounded-2xl shadow-card p-6 text-center">
                <div className="text-brand-bright font-bold text-lg">{i.brand}</div>
                <div className="mt-2 text-ink-dark font-medium">{i.name}</div>
                <p className="mt-3 text-sm text-ink-mid">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="container-x">
          <h2 className="section-title">推薦搭配</h2>
          <div className="section-title-underline" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
          <div className="mt-8 text-center">
            <Link href="/allproduct" className="btn-pill">查看所有產品</Link>
          </div>
        </div>
      </section>
    </>
  );
}
