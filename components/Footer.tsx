import Link from 'next/link';

const aboutLinks = [
  { href: '/', label: '品牌介紹' },
  { href: '/blogs', label: '保健專欄' },
  { href: '/reviews', label: '▶︎ 使用者真實回饋' },
  { href: '/materials', label: '國際頂級原料' },
  { href: '/enough', label: '足量強效配方' },
  { href: '/certifications', label: '安心檢驗報告' },
  { href: '/affordable', label: '為何我們價格這麼實惠？' }
];

const news = [
  '2025 雙12得獎名單公告',
  '2025 狂歡週年慶得獎名單公告',
  '2025 父親節得獎名單公告',
  '2025 熱銷感謝祭得獎名單公告',
  '2025 母親節得獎名單公告',
  '仿冒品宣導聲明'
];

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-gray-100">
      <div className="container-x py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-ink-mid">
        <div>
          <div className="border-l-4 border-brand-bright pl-3 mb-4 font-medium text-ink-dark">關於我們</div>
          <ul className="space-y-2">
            {aboutLinks.map(l => (
              <li key={l.href}><Link href={l.href} className="hover:text-brand-blue">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="border-l-4 border-brand-bright pl-3 mb-4 font-medium text-ink-dark">最新消息</div>
          <ul className="space-y-2">
            {news.map(n => <li key={n} className="hover:text-brand-blue cursor-pointer">{n}</li>)}
          </ul>
          <div className="mt-6 border-l-4 border-brand-bright pl-3 mb-3 font-medium text-ink-dark">優質成分股份有限公司</div>
          <ul className="space-y-1 text-xs">
            <li>電話 / 02-2736-0322</li>
            <li>時間 / 周一至周五 10:00-12:00 | 14:00-17:00</li>
            <li>地址 / 台北市大安區信義路4段279號6樓之一</li>
            <li>信箱 / <a className="text-brand-blue" href="mailto:service@healthformula.com.tw">service@healthformula.com.tw</a></li>
            <li>產品已投保／國泰千萬產品責任險</li>
          </ul>
        </div>

        <div>
          <a
            href="https://lin.ee/PjfZXiP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B14C] text-white font-medium px-6 py-3 rounded-md transition"
          >
            <span className="font-bold">LINE</span> 加入好友
          </a>
          <div className="mt-4 w-36 h-36 bg-white border rounded overflow-hidden">
            <img
              src="/img/line.png"
              alt="LINE 官方帳號 QR Code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-ink-soft">
        © Copyright - 配方時代 <br />
        本公司聘任天羅和永國際商務法律事務所
      </div>
    </footer>
  );
}
