'use client';
import { productRefs } from '@/lib/pageData';

export default function ProductNavGrid({ prefix = 'p-' }: { prefix?: string }) {
  return (
    <div>
      <p className="text-center text-ink-mid mb-6">點擊商品快速尋找配方資訊：</p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
        {productRefs.map((p) => (
          <a
            key={p.slug}
            href={`#${prefix}${p.slug}`}
            className="bg-white border border-gray-200 rounded-2xl py-5 flex flex-col items-center hover:border-brand-bright hover:shadow-card transition"
          >
            <div className={`w-14 h-14 rounded-full ${p.iconColor} grid place-items-center text-2xl`}>
              {p.icon}
            </div>
            <div className="mt-2 text-xs md:text-sm text-ink-dark">{p.short}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
