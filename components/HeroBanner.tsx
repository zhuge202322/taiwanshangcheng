'use client';
import { useEffect, useState } from 'react';
import { heroBanners } from '@/lib/reviewsData';

export default function HeroBanner() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroBanners.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-white pt-6">
      <div className="container-x relative">
        <div className="relative w-full aspect-[2400/840] overflow-hidden rounded-2xl shadow-card bg-brand-sky">
          {heroBanners.map((b, i) => (
            <img
              key={b.src}
              src={b.src}
              alt={b.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* dots */}
        <div className="mt-4 flex justify-center gap-2">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === idx ? 'bg-brand-blue' : 'bg-gray-300'
              }`}
              aria-label={`banner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
