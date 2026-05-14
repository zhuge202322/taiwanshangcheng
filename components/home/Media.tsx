const media = [
  { name: 'PChome 新聞', text: '減少了通路抽成和行銷費用，真正回饋到「強效保健」產品上' },
  { name: 'Yahoo! 新聞', text: '知名保健品牌「配方時代」突破市場，主打研究文獻支持的足量配方' },
  { name: 'YamNews', text: '在 Monde Selection 評鑑中榮獲品質金牌，成分安全性檢驗皆通過' },
  { name: '中時新聞網', text: '配方時代寄得食品界奧斯卡最高榮譽，肯定其品質與配方科學性' }
];
export default function Media() {
  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="container-x">
        <h2 className="section-title text-brand-blue">各大媒體報導</h2>
        <div className="section-title-underline" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {media.map((m) => (
            <div key={m.name} className="bg-white rounded-xl shadow-card p-6">
              <div className="font-bold text-brand-bright mb-3">{m.name}</div>
              <p className="text-sm leading-7 text-ink-mid">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
