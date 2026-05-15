'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import RequireAuth from '@/components/RequireAuth';
import AccountSidebar from '@/components/AccountSidebar';
import { shopQuery } from '@/lib/vendure-client';

const fmt = (m: number) => `${Math.round(m / 100)} 元`;

type OrderSummary = {
  id: string;
  code: string;
  state: string;
  totalWithTax: number;
  orderPlacedAt?: string;
};

function AccountInner() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await shopQuery<{ activeCustomer: any }>(`
          query {
            activeCustomer {
              orders(options: { sort: { createdAt: DESC }, take: 5 }) {
                items { id code state totalWithTax orderPlacedAt }
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

  return (
    <section className="py-10 md:py-14 bg-cream min-h-[70vh]">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <AccountSidebar />

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h1 className="text-xl font-medium text-brand-navy">個人資料</h1>
            <dl className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm">
              <div><dt className="text-ink-soft">姓名</dt><dd className="mt-0.5 text-ink-dark">{user?.lastName || ''}{user?.firstName || ''} {!user?.firstName && !user?.lastName && '—'}</dd></div>
              <div><dt className="text-ink-soft">電子郵件</dt><dd className="mt-0.5 text-ink-dark">{user?.emailAddress}</dd></div>
              <div><dt className="text-ink-soft">手機</dt><dd className="mt-0.5 text-ink-dark">{user?.phoneNumber || '—'}</dd></div>
            </dl>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-brand-navy">最近訂單</h2>
              <Link href="/account/orders" className="text-sm text-brand-blue hover:underline">查看全部</Link>
            </div>
            {loading ? (
              <div className="mt-5 text-sm text-ink-soft">載入中…</div>
            ) : orders.length === 0 ? (
              <div className="mt-5 text-sm text-ink-soft">尚無訂單</div>
            ) : (
              <ul className="mt-4 divide-y divide-gray-100">
                {orders.map((o) => (
                  <li key={o.id} className="py-3 flex items-center justify-between gap-3 text-sm">
                    <Link href={`/account/orders/${o.code}`} className="font-mono text-ink-dark hover:text-brand-blue">{o.code}</Link>
                    <span className="text-xs text-ink-soft">{o.orderPlacedAt?.slice(0, 10) || '—'}</span>
                    <OrderStateBadge state={o.state} />
                    <span className="text-promo font-medium">{fmt(o.totalWithTax)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OrderStateBadge({ state }: { state: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    AddingItems: { label: '購物中', cls: 'bg-gray-100 text-ink-mid' },
    ArrangingPayment: { label: '待付款', cls: 'bg-amber-100 text-amber-700' },
    PaymentAuthorized: { label: '已授權', cls: 'bg-blue-100 text-blue-700' },
    PaymentSettled: { label: '已付款', cls: 'bg-green-100 text-green-700' },
    PartiallyShipped: { label: '部分出貨', cls: 'bg-indigo-100 text-indigo-700' },
    Shipped: { label: '已出貨', cls: 'bg-indigo-100 text-indigo-700' },
    PartiallyDelivered: { label: '部分送達', cls: 'bg-teal-100 text-teal-700' },
    Delivered: { label: '已送達', cls: 'bg-teal-100 text-teal-700' },
    Cancelled: { label: '已取消', cls: 'bg-red-100 text-red-700' },
  };
  const m = map[state] || { label: state, cls: 'bg-gray-100 text-ink-mid' };
  return <span className={`text-xs px-2 py-0.5 rounded-full ${m.cls}`}>{m.label}</span>;
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <AccountInner />
    </RequireAuth>
  );
}
