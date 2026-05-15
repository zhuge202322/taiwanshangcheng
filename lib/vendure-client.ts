'use client';

const SHOP_API =
  process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL || 'http://localhost:7010/shop-api';

const TOKEN_KEY = 'vendure-auth-token';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export class VendureError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export async function shopQuery<T = any>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(SHOP_API, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  // Vendure 通过 vendure-auth-token 响应头返回 / 刷新 token
  const newToken = res.headers.get('vendure-auth-token');
  if (newToken) setToken(newToken);

  if (!res.ok) {
    throw new Error(`Vendure ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

// 当 mutation 返回 union 类型时，检查是否是 ErrorResult
export function ensureSuccess<T>(payload: any): T {
  if (payload?.errorCode) {
    throw new VendureError(payload.errorCode, payload.message || payload.errorCode);
  }
  return payload as T;
}

export function emitSessionChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('vendure:session-change'));
  }
}

export const ORDER_FRAGMENT = `
  fragment OrderFields on Order {
    id
    code
    state
    active
    subTotal
    subTotalWithTax
    shippingWithTax
    totalWithTax
    totalQuantity
    currencyCode
    lines {
      id
      quantity
      linePriceWithTax
      unitPriceWithTax
      productVariant {
        id
        name
        sku
        priceWithTax
        product {
          id
          slug
          name
          featuredAsset { source preview }
        }
      }
      featuredAsset { source preview }
    }
    shippingLines {
      id
      shippingMethod { id code name }
      priceWithTax
    }
    shippingAddress {
      fullName phoneNumber streetLine1 streetLine2 city province postalCode country countryCode
    }
    customer { id firstName lastName emailAddress phoneNumber }
  }
`;
