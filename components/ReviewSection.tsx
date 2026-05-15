import { Star, ShieldCheck } from 'lucide-react';
import { getReviewsBySlug, getReviewSummary } from '@/lib/reviews';

export default function ReviewSection({ slug }: { slug: string }) {
  const reviews = getReviewsBySlug(slug);
  const summary = getReviewSummary(slug);
  if (!reviews.length) return null;

  return (
    <section className="py-14 bg-white">
      <div className="container-x max-w-3xl">
        <h2 className="section-title">真實使用評價</h2>
        <div className="section-title-underline" />

        <div className="mt-8 flex items-center justify-center gap-3 text-ink-mid">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < Math.round(summary.average) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-ink-dark">{summary.average}</span>
          <span className="text-sm">／ 5</span>
          <span className="text-sm text-ink-soft">| 共 {summary.count} 則評價</span>
        </div>

        <div className="mt-10 divide-y divide-gray-100">
          {reviews.map((r) => (
            <div key={r.id} className="py-6 grid grid-cols-[64px_1fr] gap-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-cream text-brand-blue flex items-center justify-center font-medium mx-auto">
                  {r.author?.[0] || '匿'}
                </div>
                <div className="mt-2 text-xs text-ink-dark truncate">{r.author}</div>
                {r.verified && (
                  <div className="mt-1 text-[10px] text-brand-bright flex items-center justify-center gap-1">
                    <ShieldCheck size={10} /> 已驗證
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.round(r.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ink-soft">{r.date}</span>
                </div>
                <p className="mt-2 text-ink-dark leading-7 whitespace-pre-wrap break-words">
                  {r.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
