import Link from 'next/link';
import { ChevronRight, FlaskConical, Pill, Tag } from 'lucide-react';

const items = [
  {
    icon: FlaskConical,
    title: '強效配方，幫助幅度更大',
    desc: '團隊耗時數年，從數千篇國際文獻中，精選出『 功效最強、幫助範圍最廣 』的成分，比起一般成分幫助更大、更加有感',
    cta: { href: '/materials', label: '為何我們的配方更強效' }
  },
  {
    icon: Pill,
    title: '劑量充足，有感速度更快',
    desc: '我們保證產品中的關鍵有效成分，都嚴格依照研究結果『 確實加足 』有效劑量，比起一般配方，能給你更快的有感體驗',
    cta: { href: '/enough', label: '一顆抵兩顆，超高劑量' }
  },
  {
    icon: Tag,
    title: '官方直售，價格更優惠',
    desc: '省下代言人的高昂費用、免去上架通路抽成，免去比價煩惱，現省高達50%，直接給你最優惠的價格',
    cta: { href: '/affordable', label: '挑戰市場最高CP值' }
  }
];

export default function ThreePromises() {
  return (
    <section className="py-16 md:py-24 gradient-soft relative overflow-hidden">
      <div className="container-x relative">
        <h2 className="section-title">
          萃活世家團隊<br className="md:hidden" />
          <span className="md:ml-3">給消費者的三大承諾</span>
        </h2>
        <div className="section-title-underline" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="bg-white rounded-2xl shadow-card p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-sky grid place-items-center text-brand-blue">
                <it.icon size={28} />
              </div>
              <h3 className="mt-5 text-lg md:text-xl font-medium text-brand-navy">{it.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink-mid">{it.desc}</p>
              <Link href={it.cta.href} className="btn-pill mt-6">
                {it.cta.label} <ChevronRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
