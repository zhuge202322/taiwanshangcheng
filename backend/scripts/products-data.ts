// 产品按照 chanpin/产品信息 文件夹中文显示顺序排列（1-15）
// 详情图对应 chanpin/詳情頁/1.png ... 15.png

export interface SeedProduct {
  // 与 chanpin/产品信息/<folder> 对应
  folder: string;
  // 显示名（去掉文件夹中的多余字眼）
  name: string;
  // SKU
  sku: string;
  // 价格（单位：分；NTD 800 → 80000）
  price: number;
  // 详情页图编号（1-25）
  detailNo: number;
  // 简短副标，用于商品列表卡片
  subtitle: string;
}

export const seedProducts: SeedProduct[] = [
  {
    folder: '腸道保健益生菌',
    name: '三倍調整 腸道保健益生菌',
    sku: 'PROBIOTIC-GUT-30',
    price: 80000,
    detailNo: 1,
    subtitle: '三大強效菌種｜多部位調整｜孕婦長輩嬰兒皆可食用'
  },
  {
    folder: '法國專利蔓越莓益生菌',
    name: '法國專利蔓越莓益生菌',
    sku: 'CRANBERRY-15',
    price: 90000,
    detailNo: 2,
    subtitle: '法國頂級蔓越莓｜多國功效專利｜四大強效成分'
  },
  {
    folder: '非變性二型膠原蛋白 (含UC-II® )',
    name: '三倍關鍵 非變性二型膠原蛋白 (含 UC-II®)',
    sku: 'UC2-30',
    price: 120000,
    detailNo: 3,
    subtitle: '兩大專利配方｜功效更勝葡萄糖胺｜銀髮族運動族必備'
  },
  {
    folder: '美國專利苦瓜胜肽',
    name: '美國專利苦瓜胜肽',
    sku: 'BITTERMELON-60',
    price: 95000,
    detailNo: 4,
    subtitle: '美國功效專利｜三大強效成分｜澱粉控、甜食族首選'
  },
  {
    folder: '三倍好眠專利GABA',
    name: '三倍好眠專利 GABA',
    sku: 'GABA-60',
    price: 95000,
    detailNo: 5,
    subtitle: '日本市佔第一專利 GABA｜三大強效成分｜全年齡可食'
  },
  {
    folder: '三倍活力極黑瑪卡',
    name: '三倍活力極黑瑪卡',
    sku: 'MACA-30',
    price: 99000,
    detailNo: 6,
    subtitle: '世界第一瑪卡｜6 倍濃縮｜男性魅力、運動健身'
  },
  {
    folder: '三倍精華蜂王乳',
    name: '三倍精華蜂王乳',
    sku: 'ROYALJELLY-60',
    price: 99000,
    detailNo: 7,
    subtitle: '四大關鍵成分｜調節女性生理｜熟齡保養首選'
  },
  {
    folder: '三倍美妍膠原蛋白',
    name: '三倍美妍膠原蛋白',
    sku: 'COLLAGEN-15',
    price: 105000,
    detailNo: 8,
    subtitle: '德國頂級膠原蛋白｜三大強效成分｜養妍美容'
  },
  {
    folder: '三倍強化海藻鈣鎂 + D3',
    name: '三倍強化海藻鈣鎂 + D3',
    sku: 'CALCIUM-45',
    price: 88000,
    detailNo: 9,
    subtitle: '市佔第一海藻鈣｜三大強效成分｜銀髮族孕哺學生'
  },
  {
    folder: '三倍舒敏 調整體質益生菌',
    name: '三倍舒敏 調整體質益生菌',
    sku: 'PROBIOTIC-ALLERGY-30',
    price: 90000,
    detailNo: 10,
    subtitle: '4 大調整體質專利菌種｜1~2 個月快速有感'
  },
  {
    folder: '天然萃取維他命C+Q10',
    name: '天然萃取維他命 C + Q10',
    sku: 'VITC-Q10-30',
    price: 85000,
    detailNo: 11,
    subtitle: '天然卡姆果粉｜日本頂級 Q10｜青春亮妍快速有感'
  },
  {
    folder: '天然萃取綜合B群 + 鋅',
    name: '天然萃取綜合 B 群 + 鋅',
    sku: 'VITB-ZN-60',
    price: 78000,
    detailNo: 12,
    subtitle: '天然酵母 B 群｜三大強效成分｜上班族外食族'
  },
  {
    folder: '天然萃取綜合B群 + 鐵',
    name: '天然萃取綜合 B 群 + 鐵',
    sku: 'VITB-FE-60',
    price: 78000,
    detailNo: 13,
    subtitle: '天然酵母 B 群｜三大強效成分｜女性、學生首選'
  },
  {
    folder: '葉黃素產品信息',
    name: '三倍感受 金盞花葉黃素',
    sku: 'LUTEIN-30',
    price: 95000,
    detailNo: 14,
    subtitle: '三大強效成分｜6 大有感需求｜各年齡層適用'
  },
  {
    folder: '魚油產品信息',
    name: '萃活世代 85% 高濃度頂級魚油',
    sku: 'FISHOIL-60',
    price: 110000,
    detailNo: 15,
    subtitle: '挪威真空短程蒸餾｜85% 超高濃度｜rTG 高吸收型態'
  }
];
