import Link from 'next/link';
import { ChevronRight, Star, Quote } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import { reviewBlocks, reviewProductNav } from '@/lib/reviewsData';

export const metadata = { title: '使用者真實回饋 - 配方時代' };

export default function ReviewsPage() {
  return (
    <>
      <HeroBanner />

      {/* 介绍区 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-x text-center">
          <div className="flex justify-center text-amber-400 gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>
          <p className="mt-4 text-ink-mid">多年來，我們已經累積了</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold text-brand-blue">上萬則好評</h1>
          <h2 className="mt-10 text-2xl md:text-4xl font-medium text-brand-navy">
            配方時代使用者 好評回饋
          </h2>
          <div className="section-title-underline" />
        </div>

        {/* 产品快速导航 */}
        <div className="container-x mt-12">
          <p className="text-center text-ink-mid mb-6">點擊商品快速尋找配方資訊：</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto">
            {reviewProductNav.map((p) => (
              <a
                key={p.slug}
                href={`#r-${p.slug}`}
                className="bg-white border border-gray-200 rounded-2xl py-4 px-2 flex flex-col items-center hover:border-brand-bright hover:shadow-card transition"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-50 grid place-items-center">
                  <img src={p.icon} alt={p.short} className="w-full h-full object-cover" />
                </div>
                <div className="mt-2 text-xs md:text-sm text-ink-dark">{p.short}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 各产品的评论区块 */}
      {reviewBlocks.map((block, idx) => (
        <section
          key={block.slug}
          id={`r-${block.slug}`}
          className={`py-14 md:py-20 ${idx % 2 ? 'bg-white' : 'gradient-soft'} scroll-mt-24`}
        >
          <div className="container-x">
            {/* 区块大标题 */}
            <div className="bg-cream rounded-3xl px-6 py-10 md:px-12 md:py-14">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <img
                  src={block.productImage}
                  alt={block.title}
                  className="w-40 md:w-52 rounded-2xl shadow-card"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-medium text-brand-navy">
                    {block.title}
                  </h2>
                  <div className="mt-2 text-lg md:text-2xl text-ink-mid">愛用者分享</div>
                </div>
              </div>

              {/* 评论卡片网格 */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                {block.reviews.map((r, i) => (
                  <article
                    key={i}
                    className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-brand-blue text-white text-xs px-2.5 py-1 rounded-full">
                        {r.productTag}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-sm text-ink-dark font-medium">{r.productTag}</div>
                      <div className="mt-1 text-sm text-ink-mid">
                        {r.name} {r.age} 歲 {r.job}
                      </div>
                      <div className="mt-3 flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <div className="mt-3 relative text-sm text-ink-mid leading-7 flex-1">
                        <Quote
                          size={20}
                          className="absolute -left-1 -top-1 text-brand-bright/20"
                        />
                        <p className="pl-5">{r.text}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link href={`/products/${block.slug}`} className="btn-pill">
                  查看 {block.title} 詳細資料 <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
