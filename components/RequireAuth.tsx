'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(path || '/account')}`);
    }
  }, [user, loading, router, path]);

  if (loading || !user) {
    return (
      <section className="py-20 bg-cream min-h-[60vh]">
        <div className="container-x text-center text-ink-soft">載入中…</div>
      </section>
    );
  }
  return <>{children}</>;
}
