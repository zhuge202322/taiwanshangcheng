import { reviewBlocks } from '@/lib/reviewsData';

function pickShowcase() {
  const all = reviewBlocks.flatMap((b) => b.reviews);
  const arr = [...all];
  // 确定性洗牌：保证 SSR/CSR 一致
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (i * 9301 + 49297) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 10);
}

const items = pickShowcase();
const loop = [...items, ...items];

export default function UserShowcase() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-x">
        <h2 className="section-title">
          真實<span className="text-brand-bright">使用者</span>分享
        </h2>
        <div className="section-title-underline" />
        <p className="mt-3 text-center text-ink-mid">
          看看正在使用配方時代的朋友們
        </p>
      </div>

      <div
        className="mt-10 overflow-hidden marquee-mask pause-on-hover"
        style={{ ['--marquee-duration' as string]: '45s' }}
      >
        <div className="flex w-max gap-5 animate-marquee">
          {loop.map((u, i) => (
            <figure
              key={i}
              className="shrink-0 w-[200px] md:w-[220px] bg-gray-50 rounded-2xl overflow-hidden shadow-card"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={u.avatar}
                  alt={u.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="px-3 py-3 text-center">
                <div className="text-sm font-medium text-ink-dark">{u.name}</div>
                <div className="text-xs text-ink-mid mt-0.5">
                  {u.age} 歲 · {u.job}
                </div>
                <div className="mt-1 text-[11px] text-brand-blue">
                  {u.productTag}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
