import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

export const metadata = { title: '推薦好友優惠 - 配方時代' };

const Bullet = ({ children, color = 'border-brand-bright' }: { children: React.ReactNode; color?: string }) => (
  <div className={`border-l-4 ${color} pl-3 mt-6 mb-3 font-medium text-ink-dark`}>{children}</div>
);

export default function NewFriendPage() {
  return (
    <>
      {/* HERO IMAGE */}
      <section className="bg-white pt-10">
        <div className="container-x">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-[280px] md:h-[460px] object-cover rounded-3xl shadow-card"
          />
        </div>
      </section>

      {/* TITLE BAR */}
      <section className="py-8 bg-white">
        <div className="container-x">
          <div className="bg-brand-sky rounded-xl py-4 text-center text-brand-blue text-xl md:text-2xl font-medium tracking-wide">
            品牌好友 推薦計畫 🌎
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white pb-2">
        <div className="container-x max-w-3xl text-ink-mid leading-8 space-y-4">
          <p>
            <strong className="text-ink-dark">【配方時代】</strong>致力於研發最有感的產品，並秉持三大承諾<strong className="text-brand-bright">『強效配方、劑量充足、價格實惠』</strong>
          </p>
          <p>
            現在，誠摯邀請你成為我們的<strong className="text-ink-dark">品牌好友</strong>，將這份承諾傳遞出去，與好友分享你對【配方時代】的喜愛，一起感受這份良好的體驗。
          </p>
        </div>
      </section>

      {/* Q1 */}
      <section className="py-14 bg-white">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-medium text-brand-navy">
            Q1：成為品牌好友，我可以獲得什麼優惠呢？
          </h2>

          <Bullet>▎優惠一</Bullet>
          <p className="text-ink-mid leading-8">
            品牌好友只要成功推薦 1 位朋友加入會員，當對方完成取貨付款後，即可獲得「<strong className="text-promo">150 元 購物金</strong>」，使用期限為半年，<strong>推薦越多送越多</strong>。（朋友購物滿 1500 元即符合活動資格）
          </p>
          <p className="mt-2 text-xs text-ink-soft">＊消費滿 1500 元可使用購物金，結帳時系統會自動套用</p>

          <Bullet color="border-promo">▎優惠二</Bullet>
          <p className="text-ink-mid leading-8">
            被推薦的朋友，透過推薦連結加入會員，即可獲得「<strong className="text-promo">50 元 購物金</strong>」，使用期限為 7 天。
          </p>
          <p className="mt-3 text-ink-mid">
            <Star className="inline text-amber-400 mb-1" size={16} fill="currentColor" /> 搭配加入 LINE 享折扣碼 50 元，<strong className="text-promo">最多可現折 100 元</strong>！
          </p>
          <p className="mt-2 text-xs text-ink-soft">＊配方時代 擁有活動解釋權</p>
        </div>
      </section>

      {/* GRAPHIC BANNER */}
      <section className="py-2 bg-white">
        <div className="container-x">
          <div className="rounded-3xl bg-gradient-to-r from-brand-sky to-blue-100 px-8 md:px-16 py-12 md:py-16 text-center">
            <div className="text-3xl md:text-5xl font-bold text-brand-navy">
              不用<span className="text-promo">5</span>分鐘！推薦朋友 ⏱
            </div>
            <div className="mt-4 text-2xl md:text-3xl text-brand-blue">
              一起成為配方時代的品牌好友
            </div>
          </div>
        </div>
      </section>

      {/* Q2 */}
      <section className="py-14 bg-white">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-medium text-brand-navy">
            Q2：如何取得自己的推薦連結，分享給朋友呢？
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '步驟一', desc: '點擊「會員登入」登入會員' },
              { step: '步驟二', desc: '前往「會員中心 > 個人資訊」，找到「會員推薦優惠」區塊，點擊「複製連結」' },
              { step: '步驟三', desc: '將連結分享給朋友，待朋友成功註冊、且第一筆訂單付款取貨完成後（朋友消費滿 1500 元）' }
            ].map((s, i) => (
              <div key={i} className="bg-cream rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-brand-bright text-white grid place-items-center text-lg font-bold">
                  {i + 1}
                </div>
                <div className="mt-3 font-medium text-brand-navy">{s.step}</div>
                <p className="mt-3 text-sm text-ink-mid leading-7">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-ink-soft text-center">＊訂單付款完成與收到貨後，推薦人才會收到購物金喔</p>

          <div className="mt-8 text-center">
            <Link href="/cart" className="btn-pill-solid">
              登入會員 <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Q3 */}
      <section className="py-14 gradient-soft">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-medium text-brand-navy">
            Q3：朋友要如何獲得 50 元購物金？
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '步驟一', desc: '點擊【推薦連結】進入官網' },
              { step: '步驟二', desc: '點擊「會員註冊」註冊會員' },
              { step: '步驟三', desc: '註冊成功後，畫面會彈出獲得購物金的通知，消費時會自動套用折抵' }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-promo text-white grid place-items-center text-lg font-bold">
                  {i + 1}
                </div>
                <div className="mt-3 font-medium text-brand-navy">{s.step}</div>
                <p className="mt-3 text-sm text-ink-mid leading-7">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-ink-soft text-center">
            ＊消費滿 1500 元可使用購物金，結帳時系統會自動套用<br />
            ＊配方時代 擁有活動解釋權
          </p>

          <div className="mt-8 text-center">
            <Link href="/allproduct" className="btn-pill-solid">
              立即推薦好友 <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
