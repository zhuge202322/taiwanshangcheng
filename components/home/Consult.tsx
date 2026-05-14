import { MousePointerClick } from 'lucide-react';

export default function Consult() {
  return (
    <section
      className="relative min-h-[400px] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.15),rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="container-x text-white">
        <h2 className="text-2xl md:text-4xl font-medium drop-shadow">真人保健諮詢 團隊為您服務</h2>
        <div className="mt-8 space-y-4 max-w-md">
          {['產品真的適合我嗎？', '與他牌產品的差異？'].map((q) => (
            <button
              key={q}
              className="w-full bg-white text-ink-dark rounded-full pl-1.5 pr-6 py-1.5 flex items-center gap-3 shadow-card hover:bg-amber-50"
            >
              <span className="bg-amber-400 text-amber-950 text-xs font-bold rounded-full px-3 py-1.5">免費諮詢</span>
              <span className="flex-1 text-left font-medium">{q}</span>
              <MousePointerClick size={20} className="text-amber-500" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
