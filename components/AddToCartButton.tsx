'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './CartProvider';

interface Props {
  variantId?: string;
  productName?: string;
}

export default function AddToCartButton({ variantId, productName }: Props) {
  const router = useRouter();
  const { addItem, loading } = useCart();
  const [feedback, setFeedback] = useState<'idle' | 'added' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState<string>('');

  if (!variantId) {
    return (
      <button className="flex-1 bg-gray-300 text-white rounded-full py-3 font-medium cursor-not-allowed" disabled>
        缺少規格資訊
      </button>
    );
  }

  const handleAdd = async (then?: 'cart' | 'stay') => {
    try {
      setFeedback('idle');
      await addItem(variantId, 1);
      setFeedback('added');
      if (then === 'cart') router.push('/cart');
      else setTimeout(() => setFeedback('idle'), 1800);
    } catch (e: any) {
      setErrMsg(e.message || '加入失敗');
      setFeedback('error');
      setTimeout(() => setFeedback('idle'), 2500);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => handleAdd('cart')}
          disabled={loading}
          className="flex-1 bg-promo text-white rounded-full py-3 font-medium hover:bg-pink-700 disabled:opacity-60 transition"
        >
          {loading ? '處理中…' : '立即搶購'}
        </button>
        <button
          onClick={() => handleAdd('stay')}
          disabled={loading}
          className="flex-1 border border-brand-blue text-brand-blue rounded-full py-3 font-medium hover:bg-brand-blue hover:text-white disabled:opacity-60 transition"
        >
          加入購物車
        </button>
      </div>
      {feedback === 'added' && (
        <div className="text-sm text-brand-bright text-center">
          ✓ 已加入購物車{productName ? ` · ${productName}` : ''}
        </div>
      )}
      {feedback === 'error' && (
        <div className="text-sm text-promo text-center">✗ {errMsg}</div>
      )}
    </div>
  );
}
