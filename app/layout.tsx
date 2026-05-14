import type { Metadata } from 'next';
import './globals.css';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LineFloatButton from '@/components/LineFloatButton';

export const metadata: Metadata = {
  title: '配方時代｜研究證實的有效配方',
  description: '配方時代嚴選科學有效的經典配方，並確保各成分劑量添加充足，相關研究顯示 1~2 個月快速有感。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <PromoBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <LineFloatButton />
      </body>
    </html>
  );
}
