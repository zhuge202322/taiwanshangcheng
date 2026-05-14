import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { reviewBlocks } from '@/lib/reviewsData';

const reviewImages = [
  '/img/home-reviews/review-03.jpg',
  '/img/home-reviews/review-04.jpg',
  '/img/home-reviews/review-06.jpg',
  '/img/home-reviews/review-07.jpg',
  '/img/home-reviews/review-09.jpg',
  '/img/home-reviews/review-10.jpg',
  '/img/home-reviews/review-11.jpg',
  '/img/home-reviews/review-12.jpg'
];

const allReviewers = reviewBlocks.flatMap((b) => b.reviews);
const cards = reviewImages.map((src, i) => {
  const r = allReviewers[(i * 7) % allReviewers.length];
  return { image: src, name: r.name, age: r.age, job: r.job, text: r.text };
});

// 复制一份用于 marquee 无缝循环
const loop = [...cards, ...cards];

export default function Reviews() {
  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="container-x">
        <h2 className="section-title">
          官網＆蝦皮累積<span className="text-brand-bright">破萬則5星好評</span>
        </h2>
        <div className="section-title-underline" />
      </div>

      <div
        className="mt-12 overflow-hidden marquee-mask pause-on-hover"
        style={{ ['--marquee-duration' as string]: '60s' }}
      >
        <div className="flex w-max gap-6 animate-marquee">
          {loop.map((c, i) => (
            <article
              key={i}
              className="shrink-0 w-[280px] md:w-[320px] bg-white rounded-2xl overflow-hidden shadow-card flex flex-col"
            >
              <img
                src={c.image}
                alt=""
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="p-5">
                <div className="text-base md:text-lg font-medium text-ink-dark">
                  {c.name} {c.age} 歲 {c.job}
                </div>
                <p className="mt-3 text-sm text-ink-mid leading-7 line-clamp-5">
                  {c.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="container-x mt-10 flex justify-center">
        <Link href="/reviews" className="btn-pill">
          看更多真實心得 <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
}
