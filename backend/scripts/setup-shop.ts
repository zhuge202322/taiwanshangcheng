/**
 * 设置店铺基础数据：
 *  - 运费方式（免运 / 滿千免運）
 *  - 支付方式（Dummy Payment 用于开发测试）
 * 幂等：重复运行不会产生重复记录
 */
import {
  bootstrapWorker,
  LanguageCode,
  ShippingMethodService,
  PaymentMethodService,
  ChannelService,
  ZoneService,
  RequestContextService,
} from '@vendure/core';
import { config } from '../src/vendure-config';

async function run() {
  console.log('Bootstrapping Vendure worker...');
  const { app } = await bootstrapWorker(config);
  try {
    await setup(app);
  } finally {
    await app.close();
  }
}

async function setup(app: any) {
  const channelService = app.get(ChannelService);
  const requestContextService = app.get(RequestContextService);
  const zoneService = app.get(ZoneService);
  const shippingMethodService = app.get(ShippingMethodService);
  const paymentMethodService = app.get(PaymentMethodService);

  const defaultChannel = await channelService.getDefaultChannel();
  const ctx = await requestContextService.create({
    apiType: 'admin',
    channelOrToken: defaultChannel,
    languageCode: LanguageCode.zh_Hant,
  });

  // ---- ShippingMethod ----
  const zones = await zoneService.findAll(ctx);
  const twZone = zones.items.find(z => z.name === 'Taiwan') || zones.items[0];
  console.log('Using zone:', twZone?.name);

  const methods = await shippingMethodService.findAll(ctx);
  const ensureShipping = async (code: string, name: string, ratePerOrderInMinor: number) => {
    const existing = methods.items.find(m => m.code === code);
    if (existing) {
      console.log(`Shipping method exists: ${code}`);
      return existing;
    }
    const created = await shippingMethodService.create(ctx, {
      code,
      fulfillmentHandler: 'manual-fulfillment',
      checker: {
        code: 'default-shipping-eligibility-checker',
        arguments: [{ name: 'orderMinimum', value: '0' }],
      },
      calculator: {
        code: 'default-shipping-calculator',
        arguments: [
          { name: 'rate', value: String(ratePerOrderInMinor) },
          { name: 'includesTax', value: 'include' },
          { name: 'taxRate', value: '0' },
        ],
      },
      translations: [
        { languageCode: LanguageCode.zh_Hant, name, description: '' },
        { languageCode: LanguageCode.en, name, description: '' },
      ],
    });
    console.log(`Created shipping method: ${code} (rate=${ratePerOrderInMinor / 100} 元)`);
    return created;
  };

  await ensureShipping('standard-shipping', '宅配運費', 8000); // 80 元
  await ensureShipping('free-shipping', '滿千免運', 0);

  // ---- PaymentMethod ----
  const payments = await paymentMethodService.findAll(ctx);
  const code = 'dummy-payment';
  if (payments.items.find(p => p.code === code)) {
    console.log(`Payment method exists: ${code}`);
  } else {
    await paymentMethodService.create(ctx, {
      code,
      enabled: true,
      handler: {
        code: 'dummy-payment-handler',
        arguments: [{ name: 'automaticSettle', value: 'true' }],
      },
      translations: [
        { languageCode: LanguageCode.zh_Hant, name: '貨到付款', description: '收到商品時付款' },
        { languageCode: LanguageCode.en, name: 'Cash on Delivery', description: '' },
      ],
    });
    console.log(`Created payment method: ${code}`);
  }

  console.log('Shop setup complete.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
