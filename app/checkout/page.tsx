'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { ORDER_FRAGMENT, ensureSuccess, shopQuery } from '@/lib/vendure-client';

const fmt = (minor: number) => `${Math.round(minor / 100)} 元`;

type ShippingMethod = {
  id: string;
  code: string;
  name: string;
  description: string;
  priceWithTax: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { order, refresh, clearLocalOrder } = useCart();

  const [step, setStep] = useState<'form' | 'submitting' | 'done'>('form');
  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    streetLine1: '',
    streetLine2: '',
    city: '',
    province: '台北市',
    postalCode: '',
  });

  // 拉运费方式
  useEffect(() => {
    (async () => {
      try {
        const data = await shopQuery<{ eligibleShippingMethods: ShippingMethod[] }>(
          `query { eligibleShippingMethods { id code name description priceWithTax } }`,
        );
        setMethods(data.eligibleShippingMethods || []);
        if (data.eligibleShippingMethods?.[0]) {
          setSelectedMethod(data.eligibleShippingMethods[0].id);
        }
      } catch (e: any) {
        // 还没有 active order 时也可能失败，留空即可
      }
    })();
  }, [order?.id]);

  if (!order || order.lines.length === 0) {
    if (step !== 'done') {
      return (
        <section className="py-20 bg-cream min-h-[60vh]">
          <div className="container-x text-center max-w-md mx-auto">
            <h2 className="text-xl font-medium">購物車目前是空的</h2>
            <Link href="/allproduct" className="btn-pill-solid mt-6 inline-block">前往選購</Link>
          </div>
        </section>
      );
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStep('submitting');
    try {
      // 1. 设置 customer
      await shopQuery(
        `mutation($input: CreateCustomerInput!) {
           setCustomerForOrder(input: $input) {
             ... on Order { id }
             ... on ErrorResult { errorCode message }
           }
         }`,
        {
          input: {
            firstName: form.fullName.slice(0, 1),
            lastName: form.fullName.slice(1) || form.fullName,
            emailAddress: form.emailAddress,
            phoneNumber: form.phoneNumber,
          },
        },
      ).then((d: any) => ensureSuccess(d.setCustomerForOrder));

      // 2. 设置收货地址
      await shopQuery(
        `mutation($input: CreateAddressInput!) {
           setOrderShippingAddress(input: $input) {
             ... on Order { id }
             ... on ErrorResult { errorCode message }
           }
         }`,
        {
          input: {
            fullName: form.fullName,
            streetLine1: form.streetLine1,
            streetLine2: form.streetLine2,
            city: form.city,
            province: form.province,
            postalCode: form.postalCode,
            countryCode: 'TW',
            phoneNumber: form.phoneNumber,
          },
        },
      ).then((d: any) => ensureSuccess(d.setOrderShippingAddress));

      // 3. 设置运费方式
      if (selectedMethod) {
        await shopQuery(
          `mutation($id: [ID!]!) {
             setOrderShippingMethod(shippingMethodId: $id) {
               ... on Order { id }
               ... on ErrorResult { errorCode message }
             }
           }`,
          { id: [selectedMethod] },
        ).then((d: any) => ensureSuccess(d.setOrderShippingMethod));
      }

      // 4. 转到 ArrangingPayment
      await shopQuery(
        `mutation { transitionOrderToState(state: "ArrangingPayment") {
           ... on Order { id state }
           ... on OrderStateTransitionError { errorCode message transitionError }
         } }`,
      ).then((d: any) => ensureSuccess(d.transitionOrderToState));

      // 5. 添加付款（dummy = automaticSettle）
      const pay = await shopQuery<{ addPaymentToOrder: any }>(
        `${ORDER_FRAGMENT}
         mutation { addPaymentToOrder(input: { method: "dummy-payment", metadata: { note: "cod" } }) {
           ...OrderFields
           ... on ErrorResult { errorCode message }
         } }`,
      );
      const placed = ensureSuccess<any>(pay.addPaymentToOrder);

      setStep('done');
      clearLocalOrder();
      // 跳转到成功页（带订单号）
      router.replace(`/checkout/success?code=${encodeURIComponent(placed.code)}`);
    } catch (e: any) {
      setError(e.message || '結帳失敗');
      setStep('form');
      // 刷新订单以同步状态
      refresh();
    }
  };

  if (!order) return null;

  return (
    <section className="py-10 md:py-14 bg-cream min-h-[70vh]">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* 表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 space-y-6">
          <h1 className="text-xl font-medium text-brand-navy">結帳</h1>

          <div>
            <h2 className="text-base font-medium text-ink-dark mb-3">聯絡資訊</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <input required placeholder="姓名" className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <input required type="tel" placeholder="手機 09xxxxxxxx" className="input" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
              <input required type="email" placeholder="電子郵件" className="input md:col-span-2" value={form.emailAddress} onChange={(e) => setForm({ ...form, emailAddress: e.target.value })} />
            </div>
          </div>

          <div>
            <h2 className="text-base font-medium text-ink-dark mb-3">收件地址</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <input required placeholder="郵遞區號" className="input" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
              <input required placeholder="縣市（如 台北市）" className="input" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} />
              <input required placeholder="鄉鎮市區（如 松山區）" className="input md:col-span-2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input required placeholder="街道地址（路 / 巷 / 號）" className="input md:col-span-2" value={form.streetLine1} onChange={(e) => setForm({ ...form, streetLine1: e.target.value })} />
              <input placeholder="樓層 / 室號（選填）" className="input md:col-span-2" value={form.streetLine2} onChange={(e) => setForm({ ...form, streetLine2: e.target.value })} />
            </div>
          </div>

          <div>
            <h2 className="text-base font-medium text-ink-dark mb-3">配送方式</h2>
            {methods.length === 0 ? (
              <div className="text-sm text-ink-soft">載入中…</div>
            ) : (
              <div className="space-y-2 text-sm">
                {methods.map((m) => (
                  <label key={m.id} className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${selectedMethod === m.id ? 'border-brand-blue bg-cream/50' : 'border-gray-200'}`}>
                    <span className="flex items-center gap-2">
                      <input type="radio" name="shipping" value={m.id} checked={selectedMethod === m.id} onChange={() => setSelectedMethod(m.id)} />
                      {m.name}
                    </span>
                    <span className="text-ink-dark">{fmt(m.priceWithTax)}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-base font-medium text-ink-dark mb-3">付款方式</h2>
            <div className="border border-brand-blue bg-cream/50 rounded-lg px-4 py-3 text-sm">
              <input type="radio" defaultChecked readOnly /> <span className="ml-1">貨到付款</span>
              <span className="block text-xs text-ink-soft mt-1">收到商品時付款，現場驗收後再付款。</span>
            </div>
          </div>

          {error && <div className="text-sm text-promo">✗ {error}</div>}

          <button
            type="submit"
            disabled={step === 'submitting'}
            className="w-full bg-promo text-white rounded-full py-3 font-medium hover:bg-pink-700 transition disabled:opacity-60"
          >
            {step === 'submitting' ? '送出中…' : '送出訂單'}
          </button>
        </form>

        {/* 订单摘要 */}
        <aside className="bg-white rounded-2xl shadow-card p-6 h-fit lg:sticky lg:top-20">
          <h2 className="text-lg font-medium text-brand-navy">訂單明細</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {order.lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-3">
                <span className="truncate">{l.productVariant.product.name} × {l.quantity}</span>
                <span className="shrink-0">{fmt(l.linePriceWithTax)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-3 border-t space-y-2 text-sm">
            <div className="flex justify-between"><span>商品小計</span><span>{fmt(order.subTotalWithTax)}</span></div>
            <div className="flex justify-between"><span>運費</span><span>{fmt(order.shippingWithTax || 0)}</span></div>
            <div className="flex justify-between font-medium text-base text-ink-dark pt-2 border-t">
              <span>合計</span><span className="text-promo text-xl">{fmt(order.totalWithTax)}</span>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          outline: none;
          background: white;
        }
        :global(.input:focus) {
          border-color: #3b82f6;
        }
      `}</style>
    </section>
  );
}
