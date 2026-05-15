'use client';
import { useState } from 'react';
import { Award, ShieldCheck, Lightbulb, MessageCircle } from 'lucide-react';

const tabs = [
  {
    key: 'origin',
    icon: Award,
    label: '頂級原料',
    title: '我們堅持給你最好的 國際頂級原料',
    desc: '選用國際大廠頂級原料，所以我們敢公開全商品原料來源，讓你吃得有感更安心'
  },
  {
    key: 'test',
    icon: ShieldCheck,
    label: '全品項自主檢驗',
    title: '全品項自主檢驗',
    desc: '堅持全品項全數送檢驗，保證項目包含 315 項西藥檢測、9 項塑化劑檢測、5 項重金屬檢測全數合格'
  },
  {
    key: 'rd',
    icon: Lightbulb,
    label: '專業研發團隊',
    title: '專業研發團隊',
    desc: '專業研發團隊是萃活世家的堅強支柱，致力於研究各種國際期刊文獻，以及精心挑選高品質、純淨、經過驗證的成分'
  },
  {
    key: 'service',
    icon: MessageCircle,
    label: '一對一真人客服',
    title: '一對一真人客服',
    desc: '真人線上客服團隊是我們與您直接溝通橋樑的重要一環，我們將專業知識與友好服務相結合，您可透過 LINE 客服解答所有疑問'
  }
];

export default function AffordableTabs() {
  const [active, setActive] = useState(tabs[0].key);
  const cur = tabs.find((t) => t.key === active)!;

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-5 md:px-7 py-2.5 rounded-full border text-sm md:text-base transition flex items-center gap-2 ${
              active === t.key
                ? 'bg-brand-blue text-white border-brand-blue shadow-card'
                : 'bg-white text-ink-dark border-gray-300 hover:border-brand-blue'
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto bg-cream rounded-3xl p-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-brand-bright text-white grid place-items-center">
          <cur.icon size={28} />
        </div>
        <h3 className="mt-5 text-xl md:text-2xl font-medium text-brand-navy whitespace-pre-line">
          {cur.title}
        </h3>
        <p className="mt-4 text-ink-mid leading-8">{cur.desc}</p>
      </div>
    </>
  );
}
