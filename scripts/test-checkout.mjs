// 端到端测试加购 -> 结账流程
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

function check(payload, label) {
  if (payload?.errorCode) throw new Error(`${label}: ${payload.errorCode} ${payload.message}`);
  return payload;
}

(async () => {
  console.log('1) addItemToOrder');
  const a = await gql(
    `mutation { addItemToOrder(productVariantId: "1", quantity: 2) {
       ... on Order { id code totalQuantity totalWithTax }
       ... on ErrorResult { errorCode message }
     } }`,
  );
  check(a.addItemToOrder, 'addItemToOrder');
  console.log('   order:', a.addItemToOrder);

  console.log('2) eligibleShippingMethods');
  const m = await gql(`query { eligibleShippingMethods { id name priceWithTax } }`);
  console.log('   methods:', m.eligibleShippingMethods);
  const methodId = m.eligibleShippingMethods[0].id;

  console.log('3) setCustomerForOrder');
  await gql(
    `mutation($i: CreateCustomerInput!) {
       setCustomerForOrder(input: $i) {
         ... on Order { id customer { emailAddress } }
         ... on ErrorResult { errorCode message }
       } }`,
    { i: { firstName: '王', lastName: '小明', emailAddress: 'test@example.com', phoneNumber: '0912345678' } },
  ).then((d) => check(d.setCustomerForOrder, 'setCustomerForOrder'));

  console.log('4) setOrderShippingAddress');
  await gql(
    `mutation($i: CreateAddressInput!) {
       setOrderShippingAddress(input: $i) {
         ... on Order { id }
         ... on ErrorResult { errorCode message }
       } }`,
    {
      i: {
        fullName: '王小明',
        streetLine1: '八德路三段73巷27號',
        city: '松山區',
        province: '台北市',
        postalCode: '105',
        countryCode: 'TW',
        phoneNumber: '0912345678',
      },
    },
  ).then((d) => check(d.setOrderShippingAddress, 'setOrderShippingAddress'));

  console.log('5) setOrderShippingMethod');
  await gql(
    `mutation($id: [ID!]!) {
       setOrderShippingMethod(shippingMethodId: $id) {
         ... on Order { id shippingWithTax totalWithTax }
         ... on ErrorResult { errorCode message }
       } }`,
    { id: [methodId] },
  ).then((d) => { check(d.setOrderShippingMethod, 'setOrderShippingMethod'); console.log('   ', d.setOrderShippingMethod); });

  console.log('6) transition -> ArrangingPayment');
  await gql(
    `mutation { transitionOrderToState(state: "ArrangingPayment") {
       ... on Order { id state }
       ... on OrderStateTransitionError { errorCode message transitionError }
     } }`,
  ).then((d) => { check(d.transitionOrderToState, 'transitionOrderToState'); console.log('   ', d.transitionOrderToState); });

  console.log('7) addPaymentToOrder');
  const p = await gql(
    `mutation { addPaymentToOrder(input: { method: "dummy-payment", metadata: { note: "cod" } }) {
       ... on Order { id code state totalWithTax }
       ... on ErrorResult { errorCode message }
     } }`,
  );
  check(p.addPaymentToOrder, 'addPaymentToOrder');
  console.log('   final order:', p.addPaymentToOrder);

  console.log('\n✓ Checkout flow complete');
})().catch((e) => { console.error('✗ FAILED:', e.message); process.exit(1); });
