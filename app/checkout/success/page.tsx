'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const code = params.get('code');
  const { refresh } = useCart();

  // 订单已下，刷新一次让 active order 变 null
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <section className="py-20 bg-cream min-h-[60vh]">
      <div className="container-x max-w-lg mx-auto bg-white rounded-2xl shadow-card p-10 text-center">
        <CheckCircle2 size={64} className="mx-auto text-brand-bright" />
        <h1 className="mt-6 text-2xl font-medium text-brand-navy">訂單成立！</h1>
        <p className="mt-2 text-sm text-ink-mid">感謝您的購買，我們已收到您的訂單。</p>
        {code && (
          <div className="mt-6 inline-block bg-cream px-4 py-2 rounded-lg">
            <span className="text-xs text-ink-soft mr-2">訂單編號</span>
            <span className="font-mono font-medium text-ink-dark">{code}</span>
          </div>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/allproduct" className="btn-pill-solid">繼續購物</Link>
          <Link href="/" className="btn-pill">返回首頁</Link>
        </div>
      </div>
    </section>
  );
}
