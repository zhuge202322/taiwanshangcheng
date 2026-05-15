'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Package, LogOut } from 'lucide-react';
import { useAuth } from './AuthProvider';

const items = [
  { href: '/account', label: '個人資料', icon: User },
  { href: '/account/orders', label: '我的訂單', icon: Package },
];

export default function AccountSidebar() {
  const path = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <aside className="bg-white rounded-2xl shadow-card p-6 h-fit">
      <div className="pb-4 border-b">
        <div className="text-xs text-ink-soft">已登入</div>
        <div className="mt-1 text-ink-dark font-medium truncate">{user?.emailAddress}</div>
      </div>
      <nav className="mt-4 space-y-1">
        {items.map((i) => {
          const active = path === i.href || path?.startsWith(i.href + '/');
          return (
            <Link
              key={i.href}
              href={i.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                active ? 'bg-cream text-brand-blue font-medium' : 'text-ink-mid hover:bg-cream'
              }`}
            >
              <i.icon size={16} /> {i.label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-mid hover:bg-cream"
        >
          <LogOut size={16} /> 登出
        </button>
      </nav>
    </aside>
  );
}
