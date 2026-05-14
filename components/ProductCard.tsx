import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/lib/products';

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden group">
      <Link href={`/products/${p.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
        <div className="absolute top-2 left-2 bg-promo text-white text-xs px-2 py-1 rounded">
          母親節限定回饋
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/products/${p.slug}`} className="block">
          <h3 className="text-base md:text-lg font-medium text-ink-dark line-clamp-2 hover:text-brand-blue">
            {p.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink-soft">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill={i < Math.round(p.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span>{p.rating}</span>
          <span>|</span>
          <span>{p.reviews} 則評價</span>
        </div>
        <div className="mt-3 text-sm">
          <div className="text-ink-soft line-through">原價 ${p.originalPrice}</div>
          <div className="text-promo font-bold text-lg">最低 ${p.price}</div>
        </div>
        <Link
          href={`/products/${p.slug}`}
          className="mt-4 block text-center border border-brand-blue text-brand-blue rounded-full py-2 text-sm hover:bg-brand-blue hover:text-white transition"
        >
          立即搶購
        </Link>
      </div>
    </div>
  );
}
