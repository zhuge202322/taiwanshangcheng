import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export const metadata = { title: '購物車 - 配方時代' };

export default function CartPage() {
  return (
    <>
      <PageHero title="購物車" subtitle="即將串接 Vendure 後端" />
      <section className="py-20 bg-cream">
        <div className="container-x text-center max-w-md mx-auto">
          <ShoppingCart size={64} className="mx-auto text-ink-soft" />
          <h2 className="mt-6 text-xl font-medium">購物車目前是空的</h2>
          <p className="mt-2 text-sm text-ink-mid">前往挑選你的有感配方</p>
          <Link href="/allproduct" className="btn-pill-solid mt-6">查看所有產品</Link>
        </div>
      </section>
    </>
  );
}
