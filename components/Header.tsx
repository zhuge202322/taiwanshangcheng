'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from './CartProvider';
import { useAuth } from './AuthProvider';
import { User } from 'lucide-react';

type ProductLink = { slug: string; name: string };

const aboutLinks = [
  { href: '/', label: '品牌介紹' },
  { href: '/reviews', label: '▶︎ 使用者真實回饋' },
  { href: '/materials', label: '國際頂級原料' },
  { href: '/enough', label: '足量強效配方' },
  { href: '/certifications', label: '安心檢驗報告' },
  { href: '/affordable', label: '為何我們價格這麼實惠？' }
];

export default function Header({ productLinks = [] }: { productLinks?: ProductLink[] }) {
  const [mobile, setMobile] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const { order } = useCart();
  const cartCount = order?.totalQuantity || 0;
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container-x flex items-center justify-between h-16">
        <Link href="/" className="text-xl md:text-2xl font-medium text-brand-navy tracking-widest">
          萃活世家
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm text-ink-mid">
          <Link href="/2026mothersday" className="text-promo font-medium">
            寵愛母親節❤️‍🔥100%中獎
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpenAbout(true)}
            onMouseLeave={() => setOpenAbout(false)}
          >
            <button className="flex items-center gap-1 hover:text-brand-blue py-2">
              關於我們 <ChevronDown size={14} />
            </button>
            {openAbout && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1">
                <div className="bg-white shadow-card rounded-lg py-2 min-w-[220px]">
                  {aboutLinks.map(l => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2 hover:bg-cream hover:text-brand-blue">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/blogs" className="hover:text-brand-blue">保健專欄</Link>

          <div
            className="relative"
            onMouseEnter={() => setOpenProducts(true)}
            onMouseLeave={() => setOpenProducts(false)}
          >
            <button className="flex items-center gap-1 hover:text-brand-blue py-2">
              所有產品 <ChevronDown size={14} />
            </button>
            {openProducts && (
              <div className="absolute right-0 top-full pt-1">
                <div className="bg-white shadow-card rounded-lg py-2 min-w-[260px] max-h-[70vh] overflow-y-auto">
                  <Link href="/allproduct" className="block px-4 py-2 font-medium text-brand-blue border-b">
                    全部產品
                  </Link>
                  {productLinks.map(p => (
                    <Link key={p.slug} href={`/products/${p.slug}`} className="block px-4 py-2 text-sm hover:bg-cream hover:text-brand-blue">
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/cart" className="relative flex items-center gap-1 hover:text-brand-blue">
            <ShoppingCart size={18} /> 購物車
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 rounded-full bg-promo text-white text-[11px] leading-[18px] text-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/newfriend" className="hover:text-brand-blue">推薦好友優惠</Link>
          {user ? (
            <Link href="/account" className="flex items-center gap-1 hover:text-brand-blue">
              <User size={16} /> 個人中心
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-1 hover:text-brand-blue">
              <User size={16} /> 登入
            </Link>
          )}
        </nav>

        <button className="lg:hidden text-ink-dark" onClick={() => setMobile(true)}>
          <Menu size={24} />
        </button>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="container-x flex items-center justify-between h-16 border-b">
            <span className="text-xl font-medium text-brand-navy">萃活世家</span>
            <button onClick={() => setMobile(false)}><X size={24} /></button>
          </div>
          <div className="container-x py-4 space-y-4 text-ink-dark">
            <Link href="/2026mothersday" className="block text-promo font-medium" onClick={() => setMobile(false)}>
              寵愛母親節❤️‍🔥100%中獎
            </Link>
            <div>
              <div className="font-medium text-brand-navy mb-2">關於我們</div>
              <div className="pl-3 space-y-2">
                {aboutLinks.map(l => (
                  <Link key={l.href} href={l.href} className="block text-sm" onClick={() => setMobile(false)}>{l.label}</Link>
                ))}
              </div>
            </div>
            <Link href="/blogs" className="block" onClick={() => setMobile(false)}>保健專欄</Link>
            <div>
              <div className="font-medium text-brand-navy mb-2">所有產品</div>
              <div className="pl-3 space-y-2">
                <Link href="/allproduct" className="block text-sm text-brand-blue" onClick={() => setMobile(false)}>全部產品</Link>
                {productLinks.map(p => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="block text-sm" onClick={() => setMobile(false)}>{p.name}</Link>
                ))}
              </div>
            </div>
            <Link href="/newfriend" className="block" onClick={() => setMobile(false)}>推薦好友優惠</Link>
            <Link href="/cart" className="block" onClick={() => setMobile(false)}>
              購物車 {cartCount > 0 && <span className="ml-1 inline-block bg-promo text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
            </Link>
            {user ? (
              <Link href="/account" className="block" onClick={() => setMobile(false)}>個人中心</Link>
            ) : (
              <Link href="/login" className="block" onClick={() => setMobile(false)}>登入 / 註冊</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
