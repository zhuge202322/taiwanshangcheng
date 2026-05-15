// 测试: register -> login -> 下单 -> activeCustomer.orders 列出该订单
const API = 'http://localhost:7010/shop-api';
let token = null;

async function gql(query, variables) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(API, { method: 'POST', headers, body: JSON.stringify({ query, variables }) });
  const t = res.headers.get('vendure-auth-token');
  if (t) token = t;
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}
function check(p, l) { if (p?.errorCode) throw new Error(`${l}: ${p.errorCode} ${p.message}`); return p; }

const email = `test_${Date.now()}@example.com`;
const password = 'P@ssw0rd';

(async () => {
  console.log(`1) register ${email}`);
  await gql(
    `mutation($i: RegisterCustomerInput!) {
       registerCustomerAccount(input: $i) {
         ... on Success { success }
         ... on ErrorResult { errorCode message }
       } }`,
    { i: { emailAddress: email, password, firstName: '小明', lastName: '王', phoneNumber: '0912345678' } },
  ).then((d) => check(d.registerCustomerAccount, 'register'));

  console.log('2) login');
  await gql(
    `mutation($u: String!, $p: String!) {
       login(username: $u, password: $p, rememberMe: true) {
         ... on CurrentUser { id identifier }
         ... on ErrorResult { errorCode message }
       } }`,
    { u: email, p: password },
  ).then((d) => check(d.login, 'login'));

  console.log('3) activeCustomer');
  const me = await gql(`query { activeCustomer { id firstName lastName emailAddress phoneNumber } }`);
  console.log('   me:', me.activeCustomer);

  console.log('4) addItemToOrder');
  await gql(
    `mutation { addItemToOrder(productVariantId: "2", quantity: 1) {
       ... on Order { id code }
       ... on ErrorResult { errorCode message }
     } }`,
  ).then((d) => { check(d.addItemToOrder, 'add'); console.log('   order:', d.addItemToOrder); });

  console.log('5) setShippingAddress + method + transition + pay');
  const ms = await gql(`query { eligibleShippingMethods { id } }`);
  await gql(
    `mutation($i: CreateAddressInput!) { setOrderShippingAddress(input: $i) { ... on Order { id } ... on ErrorResult { errorCode message } } }`,
    { i: { fullName: '王小明', streetLine1: '八德路三段73巷27號', city: '松山區', province: '台北市', postalCode: '105', countryCode: 'TW', phoneNumber: '0912345678' } },
  ).then((d) => check(d.setOrderShippingAddress, 'addr'));
  await gql(`mutation($id: [ID!]!) { setOrderShippingMethod(shippingMethodId: $id) { ... on Order { id } ... on ErrorResult { errorCode message } } }`, { id: [ms.eligibleShippingMethods[0].id] }).then((d) => check(d.setOrderShippingMethod, 'ship'));
  await gql(`mutation { transitionOrderToState(state: "ArrangingPayment") { ... on Order { id state } ... on OrderStateTransitionError { errorCode message } } }`).then((d) => check(d.transitionOrderToState, 'tx'));
  const placed = await gql(
    `mutation { addPaymentToOrder(input: { method: "dummy-payment", metadata: { note: "cod" } }) {
       ... on Order { id code state totalWithTax }
       ... on ErrorResult { errorCode message }
     } }`,
  ).then((d) => { check(d.addPaymentToOrder, 'pay'); return d.addPaymentToOrder; });
  console.log('   placed:', placed);

  console.log('6) activeCustomer.orders');
  const o = await gql(`query { activeCustomer { orders(options: { sort: { createdAt: DESC }, take: 5 }) { items { code state totalWithTax orderPlacedAt } totalItems } } }`);
  console.log('   orders:', JSON.stringify(o.activeCustomer.orders, null, 2));

  console.log(`7) orderByCode(${placed.code}) - 物流/付款`);
  const detail = await gql(
    `query($c: String!) { orderByCode(code: $c) {
       code state
       fulfillments { id state method trackingCode createdAt }
       payments { id method state amount }
     } }`,
    { c: placed.code },
  );
  console.log('   detail:', JSON.stringify(detail.orderByCode, null, 2));

  console.log('\n✓ Auth + order history flow OK');
})().catch((e) => { console.error('✗ FAILED:', e.message); process.exit(1); });
