'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/account';
  const { user, login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [submitErr, setSubmitErr] = useState('');

  useEffect(() => {
    if (user) router.replace(next);
  }, [user, next, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErr('');
    try {
      await login(email, password, remember);
      router.replace(next);
    } catch (e: any) {
      setSubmitErr(e.message || '登入失敗');
    }
  };

  return (
    <section className="py-14 bg-cream min-h-[70vh]">
      <div className="container-x max-w-md mx-auto bg-white rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-medium text-brand-navy">會員登入</h1>
        <p className="mt-2 text-sm text-ink-mid">登入即可查看訂單與會員專屬優惠</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            required
            type="email"
            placeholder="電子郵件"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
          />
          <input
            required
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-ink-mid">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            記住我
          </label>

          {(submitErr || error) && (
            <div className="text-sm text-promo">✗ {submitErr || error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-promo text-white rounded-full py-3 font-medium hover:bg-pink-700 transition disabled:opacity-60"
          >
            {loading ? '登入中…' : '登入'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-ink-mid">
          還沒有帳號？{' '}
          <Link href={`/register?next=${encodeURIComponent(next)}`} className="text-brand-blue hover:underline">
            立即註冊
          </Link>
        </div>
      </div>
    </section>
  );
}
