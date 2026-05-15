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
import { ORDER_FRAGMENT, ensureSuccess, shopQuery, VendureError } from '@/lib/vendure-client';

export type OrderLine = {
  id: string;
  quantity: number;
  linePriceWithTax: number;
  unitPriceWithTax: number;
  productVariant: {
    id: string;
    name: string;
    sku: string;
    priceWithTax: number;
    product: { id: string; slug: string; name: string; featuredAsset?: { source: string } | null };
  };
  featuredAsset?: { source: string } | null;
};

export type ActiveOrder = {
  id: string;
  code: string;
  state: string;
  active: boolean;
  subTotal: number;
  subTotalWithTax: number;
  shippingWithTax: number;
  totalWithTax: number;
  totalQuantity: number;
  currencyCode: string;
  lines: OrderLine[];
  shippingLines: { id: string; shippingMethod: { id: string; code: string; name: string }; priceWithTax: number }[];
  shippingAddress?: any;
  customer?: any;
} | null;

interface CartContextValue {
  order: ActiveOrder;
  loading: boolean;
  error: string | null;
  addItem: (productVariantId: string, quantity?: number) => Promise<void>;
  adjustLine: (orderLineId: string, quantity: number) => Promise<void>;
  removeLine: (orderLineId: string) => Promise<void>;
  refresh: () => Promise<void>;
  clearLocalOrder: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<ActiveOrder>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shopQuery<{ activeOrder: any }>(
        `${ORDER_FRAGMENT} query { activeOrder { ...OrderFields } }`,
      );
      setOrder(data.activeOrder || null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (productVariantId: string, quantity = 1) => {
      try {
        setLoading(true);
        setError(null);
        const data = await shopQuery<{ addItemToOrder: any }>(
          `${ORDER_FRAGMENT}
           mutation($id: ID!, $qty: Int!) {
             addItemToOrder(productVariantId: $id, quantity: $qty) {
               ...OrderFields
               ... on ErrorResult { errorCode message }
             }
           }`,
          { id: productVariantId, qty: quantity },
        );
        const ok = ensureSuccess<any>(data.addItemToOrder);
        setOrder(ok);
      } catch (e: any) {
        setError(e instanceof VendureError ? e.message : e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const adjustLine = useCallback(async (orderLineId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await shopQuery<{ adjustOrderLine: any }>(
        `${ORDER_FRAGMENT}
         mutation($id: ID!, $qty: Int!) {
           adjustOrderLine(orderLineId: $id, quantity: $qty) {
             ...OrderFields
             ... on ErrorResult { errorCode message }
           }
         }`,
        { id: orderLineId, qty: quantity },
      );
      const ok = ensureSuccess<any>(data.adjustOrderLine);
      setOrder(ok);
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeLine = useCallback(async (orderLineId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await shopQuery<{ removeOrderLine: any }>(
        `${ORDER_FRAGMENT}
         mutation($id: ID!) {
           removeOrderLine(orderLineId: $id) {
             ...OrderFields
             ... on ErrorResult { errorCode message }
           }
         }`,
        { id: orderLineId },
      );
      const ok = ensureSuccess<any>(data.removeOrderLine);
      setOrder(ok);
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearLocalOrder = useCallback(() => setOrder(null), []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    if (typeof window !== 'undefined') {
      window.addEventListener('vendure:session-change', handler);
      return () => window.removeEventListener('vendure:session-change', handler);
    }
  }, [refresh]);

  const value = useMemo(
    () => ({ order, loading, error, addItem, adjustLine, removeLine, refresh, clearLocalOrder }),
    [order, loading, error, addItem, adjustLine, removeLine, refresh, clearLocalOrder],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
