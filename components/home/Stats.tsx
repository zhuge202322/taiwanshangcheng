import { ShoppingCart, TrendingUp } from 'lucide-react';

export default function Stats() {
  return (
    <section className="gradient-blue text-white py-16 md:py-20">
      <div className="container-x text-center">
        <h2 className="text-2xl md:text-4xl font-medium">為何我們能成為</h2>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          <div className="flex items-center gap-4">
            <ShoppingCart size={64} className="opacity-90" />
            <div className="text-left">
              <div className="text-sm opacity-90">銷量突破</div>
              <div className="text-4xl md:text-5xl font-bold border-b-2 border-white/60 pb-1">30萬件+</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TrendingUp size={64} className="opacity-90" />
            <div className="text-left">
              <div className="text-sm opacity-90">消費者滿意度</div>
              <div className="text-4xl md:text-5xl font-bold border-b-2 border-white/60 pb-1">高達95%</div>
            </div>
          </div>
        </div>
        <h2 className="mt-10 text-2xl md:text-4xl font-medium">的強效保健品牌</h2>
      </div>
    </section>
  );
}
