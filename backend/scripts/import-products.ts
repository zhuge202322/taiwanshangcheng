import 'dotenv/config';
import { createReadStream, existsSync, readFileSync } from 'fs';
import path from 'path';
import {
  bootstrapWorker,
  AssetService,
  ProductService,
  ProductVariantService,
  RequestContextService,
  TaxCategoryService,
  TaxRateService,
  ZoneService,
  CountryService,
  ChannelService,
  LanguageCode,
} from '@vendure/core';
import { GlobalFlag } from '@vendure/common/lib/generated-types';
import { config } from '../src/vendure-config';
import { seedProducts } from './products-data';

const CHANPIN_DIR = path.resolve(__dirname, '../../chanpin');

function slugify(sku: string) {
  return sku.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function txtToHtml(txt: string): string {
  const lines = txt.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  // 第一行通常是标题，跳过避免与产品名重复
  const body = lines.slice(1).length ? lines.slice(1) : lines;
  const bulletLines = body.map((l) => {
    if (/[：:]/.test(l) && !l.startsWith('一') && !l.startsWith('有效')) {
      return `<li>${l}</li>`;
    }
    return `<p>${l}</p>`;
  });
  return `<div class="product-desc">${bulletLines.join('')}</div>`;
}

async function main() {
  console.log('Bootstrapping Vendure worker...');
  const worker = await bootstrapWorker(config);
  const app = worker.app;

  const ctxService = app.get(RequestContextService);
  const assetService = app.get(AssetService);
  const productService = app.get(ProductService);
  const productVariantService = app.get(ProductVariantService);
  const taxCategoryService = app.get(TaxCategoryService);
  const taxRateService = app.get(TaxRateService);
  const zoneService = app.get(ZoneService);
  const countryService = app.get(CountryService);
  const channelService = app.get(ChannelService);

  const defaultChannel = await channelService.getDefaultChannel();
  const ctx = await ctxService.create({
    apiType: 'admin',
    languageCode: LanguageCode.zh_Hant,
    channelOrToken: defaultChannel,
  });

  // 1) Country (Taiwan)
  let country = (await countryService.findAll(ctx)).items.find((c) => c.code === 'TW');
  if (!country) {
    country = await countryService.create(ctx, {
      code: 'TW',
      enabled: true,
      translations: [
        { languageCode: LanguageCode.zh_Hant, name: '台灣' },
        { languageCode: LanguageCode.en, name: 'Taiwan' },
      ],
    });
    console.log('Created country: TW');
  }

  // 2) Zone (Taiwan)
  let zone = (await zoneService.findAll(ctx)).items.find((z) => z.name === 'Taiwan');
  if (!zone) {
    zone = await zoneService.create(ctx, { name: 'Taiwan', memberIds: [country.id] });
    console.log('Created zone: Taiwan');
  }

  // 3) Tax Category
  let taxCategoryId: string | number;
  const taxCategories = await taxCategoryService.findAll(ctx);
  if (taxCategories.items.length === 0) {
    const tc = await taxCategoryService.create(ctx, { name: 'Standard Tax', isDefault: true });
    taxCategoryId = tc.id;
    console.log('Created tax category: Standard Tax');
  } else {
    taxCategoryId = taxCategories.items[0].id;
  }

  // 4) Tax Rate (0% Taiwan)
  const rates = await taxRateService.findAll(ctx);
  if (rates.items.length === 0) {
    await taxRateService.create(ctx, {
      name: 'Taiwan 0%',
      enabled: true,
      value: 0,
      categoryId: taxCategoryId,
      zoneId: zone.id,
    });
    console.log('Created tax rate: Taiwan 0%');
  }

  // 5) Set channel default tax / shipping zone
  if (!defaultChannel.defaultTaxZone || !defaultChannel.defaultShippingZone) {
    await channelService.update(ctx, {
      id: defaultChannel.id,
      defaultTaxZoneId: zone.id,
      defaultShippingZoneId: zone.id,
    });
    console.log('Set default channel tax/shipping zone to Taiwan');
  }
  // refresh ctx so new channel defaults take effect
  const ctx2 = await ctxService.create({
    apiType: 'admin',
    languageCode: LanguageCode.zh_Hant,
    channelOrToken: await channelService.getDefaultChannel(),
  });

  let success = 0;
  let failed = 0;

  for (let i = 0; i < seedProducts.length; i++) {
    const p = seedProducts[i];
    const tag = `[${i + 1}/${seedProducts.length}] ${p.name}`;
    console.log(`\n${tag}`);

    const folderPath = path.join(CHANPIN_DIR, '产品信息', p.folder);
    // 主图：优先 主图.jpg/png；否则取目录下第一个 jpg/png
    const fs = require('fs') as typeof import('fs');
    let mainPath = ['主图.jpg', '主图.png'].map((f) => path.join(folderPath, f)).find((p) => existsSync(p));
    if (!mainPath) {
      const imgs = fs.readdirSync(folderPath).filter((f: string) => /\.(jpg|jpeg|png)$/i.test(f));
      if (imgs.length) mainPath = path.join(folderPath, imgs[0]);
    }
    const detailPath = path.join(CHANPIN_DIR, '詳情頁', `${p.detailNo}.png`);
    const txtPath = path.join(folderPath, `${p.folder}.txt`);

    if (!mainPath || !existsSync(mainPath)) {
      console.warn('  ⚠ main image missing in:', folderPath);
      failed++;
      continue;
    }
    if (!existsSync(detailPath)) {
      console.warn('  ⚠ detail image missing:', detailPath);
      failed++;
      continue;
    }

    try {
      const mainAsset = await assetService.createFromFileStream(
        createReadStream(mainPath),
        mainPath,
        ctx2,
      );
      if ('message' in mainAsset) throw new Error(`main asset: ${mainAsset.message}`);
      console.log(`  ✓ main asset uploaded (id=${mainAsset.id})`);

      const detailAsset = await assetService.createFromFileStream(
        createReadStream(detailPath),
        detailPath,
        ctx2,
      );
      if ('message' in detailAsset) throw new Error(`detail asset: ${detailAsset.message}`);
      console.log(`  ✓ detail asset uploaded (id=${detailAsset.id})`);

      let description = `<p>${p.subtitle}</p>`;
      if (existsSync(txtPath)) {
        const txt = readFileSync(txtPath, 'utf8');
        description = txtToHtml(txt);
      }

      const product = await productService.create(ctx2, {
        featuredAssetId: mainAsset.id,
        assetIds: [mainAsset.id, detailAsset.id],
        translations: [
          {
            languageCode: LanguageCode.zh_Hant,
            name: p.name,
            slug: slugify(p.sku),
            description,
          },
          {
            languageCode: LanguageCode.en,
            name: p.name,
            slug: slugify(p.sku),
            description,
          },
        ],
      });
      console.log(`  ✓ product created (id=${product.id})`);

      const variants = await productVariantService.create(ctx2, [
        {
          productId: product.id,
          sku: p.sku,
          price: p.price,
          taxCategoryId,
          trackInventory: GlobalFlag.FALSE,
          translations: [
            { languageCode: LanguageCode.zh_Hant, name: p.name },
            { languageCode: LanguageCode.en, name: p.name },
          ],
        },
      ]);
      console.log(`  ✓ variant created (id=${variants[0].id}, sku=${p.sku}, price=${p.price / 100} NT$)`);
      success++;
    } catch (e: any) {
      console.error('  ✗ failed:', e?.message || e);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Done. success=${success}, failed=${failed}`);
  console.log(`========================================`);

  await app.close();
  process.exit(0);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
