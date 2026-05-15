'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import AccountSidebar from '@/components/AccountSidebar';
import { shopQuery } from '@/lib/vendure-client';
import { OrderStateBadge } from '../page';

const fmt = (m: number) => `${Math.round(m / 100)} 元`;

type FilterKey = 'all' | 'unpaid' | 'paid';

function OrdersInner() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await shopQuery<{ activeCustomer: any }>(`
          query {
            activeCustomer {
              orders(options: { sort: { createdAt: DESC }, take: 50 }) {
                items {
                  id code state totalWithTax totalQuantity orderPlacedAt
                  lines { id quantity productVariant { name product { name slug featuredAsset { source } } } }
                }
                totalItems
              }
            }
          }
        `);
        setOrders(data.activeCustomer?.orders?.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = orders.filter((o) => {
    if (filter === 'all') return true;
    if (filter === 'unpaid') return ['ArrangingPayment', 'PaymentAuthorized'].includes(o.state);
    if (filter === 'paid') return ['PaymentSettled', 'PartiallyShipped', 'Shipped', 'PartiallyDelivered', 'Delivered'].includes(o.state);
    return true;
  });

  return (
    <section className="py-10 md:py-14 bg-cream min-h-[70vh]">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <AccountSidebar />

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h1 className="text-xl font-medium text-brand-navy">我的訂單</h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {([
              ['all', '全部'],
              ['unpaid', '未付款'],
              ['paid', '已付款 / 出貨'],
            ] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`px-4 py-1.5 rounded-full text-sm border transition ${
                  filter === k
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-ink-mid border-gray-200 hover:border-brand-blue'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="mt-8 text-sm text-ink-soft">載入中…</div>
          ) : filtered.length === 0 ? (
            <div className="mt-10 text-center text-ink-soft">
              <div>沒有相符的訂單</div>
              <Link href="/allproduct" className="btn-pill-solid mt-5 inline-block">前往選購</Link>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {filtered.map((o) => (
                <li key={o.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-card transition">
                  <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Link href={`/account/orders/${o.code}`} className="font-mono font-medium text-ink-dark hover:text-brand-blue">{o.code}</Link>
                      <OrderStateBadge state={o.state} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-ink-soft">
                      <span>{o.orderPlacedAt?.slice(0, 10) || '—'}</span>
                      <span>{o.totalQuantity} 件</span>
                      <span className="text-promo font-medium text-base">{fmt(o.totalWithTax)}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-3 overflow-x-auto">
                    {o.lines.slice(0, 4).map((l: any) => {
                      const img = l.productVariant.product.featuredAsset?.source;
                      return (
                        <div key={l.id} className="shrink-0 w-16">
                          {img ? <img src={img} alt={l.productVariant.name} className="w-16 h-16 object-cover rounded-lg bg-cream" /> : <div className="w-16 h-16 bg-cream rounded-lg" />}
                          <div className="mt-1 text-[11px] text-ink-soft truncate">× {l.quantity}</div>
                        </div>
                      );
                    })}
                    {o.lines.length > 4 && (
                      <div className="shrink-0 w-16 h-16 flex items-center justify-center text-xs text-ink-soft border border-dashed rounded-lg">+{o.lines.length - 4}</div>
                    )}
                  </div>
                  <div className="mt-3 text-right">
                    <Link href={`/account/orders/${o.code}`} className="text-sm text-brand-blue hover:underline">查看詳情與物流 →</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrdersInner />
    </RequireAuth>
  );
}
