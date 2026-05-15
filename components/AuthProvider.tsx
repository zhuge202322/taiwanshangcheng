'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { emitSessionChange, ensureSuccess, shopQuery } from '@/lib/vendure-client';

export type CurrentUser = {
  id: string;
  identifier: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
} | null;

interface AuthContextValue {
  user: CurrentUser;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: {
    emailAddress: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  }) => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await shopQuery<{ activeCustomer: any }>(`
        query {
          activeCustomer {
            id
            firstName
            lastName
            emailAddress
            phoneNumber
            user { identifier }
          }
        }
      `);
      const c = data.activeCustomer;
      setUser(
        c
          ? {
              id: c.id,
              identifier: c.user?.identifier || c.emailAddress,
              firstName: c.firstName,
              lastName: c.lastName,
              emailAddress: c.emailAddress,
              phoneNumber: c.phoneNumber,
            }
          : null,
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string, remember = true) => {
    setLoading(true);
    setError(null);
    try {
      const data = await shopQuery<{ login: any }>(
        `mutation($u: String!, $p: String!, $r: Boolean!) {
           login(username: $u, password: $p, rememberMe: $r) {
             ... on CurrentUser { id identifier }
             ... on ErrorResult { errorCode message }
           }
         }`,
        { u: email, p: password, r: remember },
      );
      ensureSuccess(data.login);
      emitSessionChange();
      await refresh();
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await shopQuery(`mutation { logout { success } }`);
      setUser(null);
      emitSessionChange();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (input: {
      emailAddress: string;
      password: string;
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await shopQuery<{ registerCustomerAccount: any }>(
          `mutation($i: RegisterCustomerInput!) {
             registerCustomerAccount(input: $i) {
               ... on Success { success }
               ... on ErrorResult { errorCode message }
             }
           }`,
          { i: input },
        );
        ensureSuccess(data.registerCustomerAccount);
        // 开发环境 requireVerification=false：注册即可登入
        await login(input.emailAddress, input.password, true);
      } catch (e: any) {
        setError(e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [login],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ user, loading, error, login, logout, register, refresh }),
    [user, loading, error, login, logout, register, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
