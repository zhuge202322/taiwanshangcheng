'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import AccountSidebar from '@/components/AccountSidebar';
import { shopQuery } from '@/lib/vendure-client';
import { OrderStateBadge } from '../../page';
import { Truck, Package, MapPin, CreditCard } from 'lucide-react';

const fmt = (m: number) => `${Math.round(m / 100)} 元`;

const FULFILLMENT_STATE_LABEL: Record<string, string> = {
  Pending: '待處理',
  Shipped: '已出貨',
  Delivered: '已送達',
  Cancelled: '已取消',
};

function OrderDetail() {
  const params = useParams<{ code: string }>();
  const code = params.code;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await shopQuery<{ orderByCode: any }>(
          `query($code: String!) {
            orderByCode(code: $code) {
              id code state totalWithTax subTotalWithTax shippingWithTax totalQuantity orderPlacedAt
              shippingAddress { fullName streetLine1 streetLine2 city province postalCode country phoneNumber }
              lines {
                id quantity linePriceWithTax unitPriceWithTax
                productVariant { name sku product { name slug featuredAsset { source } } }
              }
              shippingLines { shippingMethod { name } priceWithTax }
              payments { id method state amount createdAt }
              fulfillments { id method state trackingCode createdAt }
            }
          }`,
          { code },
        );
        setOrder(data.orderByCode);
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  return (
    <section className="py-10 md:py-14 bg-cream min-h-[70vh]">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <AccountSidebar />

        <div className="space-y-6">
          <Link href="/account/orders" className="text-sm text-brand-blue hover:underline">← 返回訂單列表</Link>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-card p-6 text-ink-soft">載入中…</div>
          ) : !order ? (
            <div className="bg-white rounded-2xl shadow-card p-6 text-ink-soft">找不到此訂單</div>
          ) : (
            <>
              {/* 顶部状态 */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="text-xs text-ink-soft">訂單編號</div>
                    <div className="font-mono text-lg text-ink-dark">{order.code}</div>
                  </div>
                  <OrderStateBadge state={order.state} />
                </div>
                <div className="mt-3 text-xs text-ink-soft">
                  下單時間：{order.orderPlacedAt?.replace('T', ' ').slice(0, 19) || '—'}
                </div>
              </div>

              {/* 物流 */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h2 className="flex items-center gap-2 text-lg font-medium text-brand-navy">
                  <Truck size={18} className="text-brand-bright" /> 物流追蹤
                </h2>
                {order.fulfillments?.length ? (
                  <ul className="mt-4 space-y-3 text-sm">
                    {order.fulfillments.map((f: any) => (
                      <li key={f.id} className="border-l-2 border-brand-bright pl-4 py-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-ink-dark">{f.method || '—'}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-cream text-ink-mid">
                            {FULFILLMENT_STATE_LABEL[f.state] || f.state}
                          </span>
                        </div>
                        {f.trackingCode && (
                          <div className="mt-1 text-xs text-ink-soft">
                            運單號：<span className="font-mono text-ink-dark">{f.trackingCode}</span>
                          </div>
                        )}
                        <div className="mt-1 text-xs text-ink-soft">{f.createdAt?.replace('T', ' ').slice(0, 19)}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3 text-sm text-ink-soft">尚未出貨，敬請耐心等候</div>
                )}
              </div>

              {/* 商品 */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h2 className="flex items-center gap-2 text-lg font-medium text-brand-navy">
                  <Package size={18} className="text-brand-bright" /> 商品明細
                </h2>
                <ul className="mt-4 divide-y divide-gray-100">
                  {order.lines.map((l: any) => {
                    const img = l.productVariant.product.featuredAsset?.source;
                    return (
                      <li key={l.id} className="py-3 flex gap-4">
                        <Link href={`/products/${l.productVariant.product.slug}`} className="shrink-0">
                          {img ? <img src={img} alt={l.productVariant.name} className="w-16 h-16 object-cover rounded-lg bg-cream" /> : <div className="w-16 h-16 bg-cream rounded-lg" />}
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${l.productVariant.product.slug}`} className="font-medium text-ink-dark hover:text-brand-blue">
                            {l.productVariant.product.name}
                          </Link>
                          <div className="text-xs text-ink-soft mt-0.5">SKU: {l.productVariant.sku}</div>
                          <div className="text-xs text-ink-soft mt-0.5">數量 × {l.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-promo font-medium">{fmt(l.linePriceWithTax)}</div>
                          <div className="text-xs text-ink-soft">單價 {fmt(l.unitPriceWithTax)}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 pt-3 border-t space-y-1 text-sm text-right">
                  <div>商品小計 <span className="ml-2">{fmt(order.subTotalWithTax)}</span></div>
                  <div>運費 <span className="ml-2">{fmt(order.shippingWithTax)}</span></div>
                  <div className="text-base font-medium text-ink-dark pt-1">
                    合計 <span className="text-promo text-xl ml-2">{fmt(order.totalWithTax)}</span>
                  </div>
                </div>
              </div>

              {/* 收件地址 */}
              {order.shippingAddress && (
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h2 className="flex items-center gap-2 text-lg font-medium text-brand-navy">
                    <MapPin size={18} className="text-brand-bright" /> 收件地址
                  </h2>
                  <div className="mt-3 text-sm text-ink-dark space-y-1">
                    <div>{order.shippingAddress.fullName} · {order.shippingAddress.phoneNumber}</div>
                    <div>{order.shippingAddress.postalCode} {order.shippingAddress.province}{order.shippingAddress.city}</div>
                    <div>{order.shippingAddress.streetLine1} {order.shippingAddress.streetLine2}</div>
                  </div>
                </div>
              )}

              {/* 付款 */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h2 className="flex items-center gap-2 text-lg font-medium text-brand-navy">
                  <CreditCard size={18} className="text-brand-bright" /> 付款資訊
                </h2>
                {order.payments?.length ? (
                  <ul className="mt-3 space-y-2 text-sm">
                    {order.payments.map((p: any) => (
                      <li key={p.id} className="flex items-center justify-between border-b last:border-0 pb-2">
                        <span className="text-ink-dark">{p.method}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cream text-ink-mid">{p.state}</span>
                        <span className="text-promo font-medium">{fmt(p.amount)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3 text-sm text-ink-soft">尚未付款</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <RequireAuth>
      <OrderDetail />
    </RequireAuth>
  );
}
