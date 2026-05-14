import Link from 'next/link';
import { Globe, HeartHandshake, Award, Sprout, CheckCircle2, ChevronRight } from 'lucide-react';

const items = [
  {
    icon: Globe,
    title: '原料進口COA',
    points: ['國際原料檢驗報告', '確保成分安全性']
  },
  {
    icon: HeartHandshake,
    title: '食安檢驗全數通過',
    points: ['塑化劑檢驗', '重金屬檢驗', '大腸桿菌檢驗']
  },
  {
    icon: Award,
    title: '認證合格製程環境',
    points: ['HACCP食安管制', 'ISO22000食安管制']
  },
  {
    icon: Sprout,
    title: '拒絕刺激性成分',
    points: ['不添加激素類成分', '不添加致腹瀉成分']
  }
];

export default function Safety() {
  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.85),rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="container-x">
        <h2 className="section-title">
          最高標準的<span className="text-brand-bright">食品安全</span>
        </h2>
        <div className="section-title-underline" />

        <div className="mt-12 bg-white rounded-3xl shadow-card p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((it) => (
            <div key={it.title} className="text-center md:text-left">
              <it.icon className="mx-auto md:mx-0 text-brand-navy" size={40} strokeWidth={1.4} />
              <h3 className="mt-3 font-medium text-ink-dark">{it.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-ink-mid">
                {it.points.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 justify-center md:justify-start">
                    <CheckCircle2 size={14} className="text-brand-bright" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/certifications" className="btn-pill">
            看完整報告 <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
