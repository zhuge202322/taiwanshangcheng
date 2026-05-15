import type { Metadata } from 'next';
import './globals.css';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LineFloatButton from '@/components/LineFloatButton';
import CartProvider from '@/components/CartProvider';
import AuthProvider from '@/components/AuthProvider';
import { fetchProducts } from '@/lib/vendure';

export const metadata: Metadata = {
  title: '萃活世家｜研究證實的有效配方',
  description: '萃活世家嚴選科學有效的經典配方，並確保各成分劑量添加充足，相關研究顯示 1~2 個月快速有感。'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await fetchProducts();
  const productLinks = products.map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <PromoBar />
            <Header productLinks={productLinks} />
            <main>{children}</main>
            <Footer />
            <LineFloatButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
