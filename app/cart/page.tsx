'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/components/CartProvider';

const fmt = (minor: number) => `${Math.round(minor / 100)} 元`;

export default function CartPage() {
  const router = useRouter();
  const { order, loading, adjustLine, removeLine } = useCart();

  if (loading && !order) {
    return (
      <section className="py-20 bg-cream">
        <div className="container-x text-center text-ink-soft">載入中…</div>
      </section>
    );
  }

  if (!order || order.lines.length === 0) {
    return (
      <section className="py-20 bg-cream">
        <div className="container-x text-center max-w-md mx-auto">
          <ShoppingCart size={64} className="mx-auto text-ink-soft" />
          <h2 className="mt-6 text-xl font-medium">購物車目前是空的</h2>
          <p className="mt-2 text-sm text-ink-mid">前往挑選你的有感配方</p>
          <Link href="/allproduct" className="btn-pill-solid mt-6 inline-block">查看所有產品</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14 bg-cream min-h-[60vh]">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* 商品列表 */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h1 className="text-xl font-medium text-brand-navy mb-6">購物車（{order.totalQuantity} 件）</h1>
          <ul className="divide-y divide-gray-100">
            {order.lines.map((line) => {
              const img = line.featuredAsset?.source || line.productVariant.product.featuredAsset?.source;
              return (
                <li key={line.id} className="py-5 flex gap-4">
                  <Link href={`/products/${line.productVariant.product.slug}`} className="shrink-0">
                    {img ? (
                      <img src={img} alt={line.productVariant.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-cream" />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-cream rounded-lg" />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${line.productVariant.product.slug}`} className="block">
                      <div className="font-medium text-ink-dark hover:text-brand-blue truncate">
                        {line.productVariant.product.name}
                      </div>
                    </Link>
                    <div className="text-xs text-ink-soft mt-1">SKU: {line.productVariant.sku}</div>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button
                          aria-label="減少"
                          onClick={() => adjustLine(line.id, Math.max(0, line.quantity - 1))}
                          className="px-3 py-1.5 hover:bg-cream disabled:opacity-50"
                          disabled={loading}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-1.5 text-sm min-w-[40px] text-center">{line.quantity}</span>
                        <button
                          aria-label="增加"
                          onClick={() => adjustLine(line.id, line.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-cream disabled:opacity-50"
                          disabled={loading}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeLine(line.id)}
                        className="text-ink-soft hover:text-promo text-sm flex items-center gap-1"
                        disabled={loading}
                      >
                        <Trash2 size={14} /> 移除
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-promo font-medium">{fmt(line.linePriceWithTax)}</div>
                    <div className="text-xs text-ink-soft mt-1">單價 {fmt(line.unitPriceWithTax)}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 摘要 */}
        <div className="bg-white rounded-2xl shadow-card p-6 h-fit lg:sticky lg:top-20">
          <h2 className="text-lg font-medium text-brand-navy">訂單摘要</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>商品小計</span><span>{fmt(order.subTotalWithTax)}</span></div>
            <div className="flex justify-between text-ink-soft"><span>運費</span><span>結帳時計算</span></div>
            <div className="border-t pt-3 mt-3 flex justify-between font-medium text-ink-dark text-base">
              <span>合計</span><span className="text-promo text-xl">{fmt(order.subTotalWithTax)}</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="mt-6 w-full bg-promo text-white rounded-full py-3 font-medium hover:bg-pink-700 transition disabled:opacity-60"
            disabled={loading}
          >
            前往結帳
          </button>
          <Link href="/allproduct" className="mt-3 block text-center text-sm text-brand-blue hover:underline">
            繼續購物
          </Link>
        </div>
      </div>
    </section>
  );
}
