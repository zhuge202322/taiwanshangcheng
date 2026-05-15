'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/account';
  const { user, register, loading } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    confirm: '',
  });
  const [err, setErr] = useState('');

  useEffect(() => {
    if (user) router.replace(next);
  }, [user, next, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (form.password.length < 6) {
      setErr('密碼至少 6 位');
      return;
    }
    if (form.password !== form.confirm) {
      setErr('兩次密碼不一致');
      return;
    }
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        emailAddress: form.emailAddress,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });
      router.replace(next);
    } catch (e: any) {
      setErr(e.message || '註冊失敗');
    }
  };

  return (
    <section className="py-14 bg-cream min-h-[70vh]">
      <div className="container-x max-w-md mx-auto bg-white rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-medium text-brand-navy">會員註冊</h1>
        <p className="mt-2 text-sm text-ink-mid">註冊以追蹤訂單並享有專屬優惠</p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="姓"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
            />
            <input
              placeholder="名"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
            />
          </div>
          <input
            required
            type="email"
            placeholder="電子郵件"
            value={form.emailAddress}
            onChange={(e) => setForm({ ...form, emailAddress: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
          />
          <input
            type="tel"
            placeholder="手機（選填）"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
          />
          <input
            required
            type="password"
            placeholder="密碼（至少 6 位）"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
          />
          <input
            required
            type="password"
            placeholder="再次輸入密碼"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-brand-blue outline-none"
          />

          {err && <div className="text-sm text-promo">✗ {err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-promo text-white rounded-full py-3 font-medium hover:bg-pink-700 transition disabled:opacity-60"
          >
            {loading ? '處理中…' : '建立帳號'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-ink-mid">
          已有帳號？{' '}
          <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-brand-blue hover:underline">
            前往登入
          </Link>
        </div>
      </div>
    </section>
  );
}
