export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  hero: string;
  highlights: string[];
  ingredients: { name: string; brand: string; desc: string }[];
  description: string;
};

const ph = (seed: string, w = 600, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const products: Product[] = [
  {
    slug: 'lutein',
    name: '三倍感受 金盞花葉黃素',
    subtitle: '添加蝦紅素・山桑子・智利酒果',
    category: '眼部保健',
    tagline: '1~2 個月快速有感',
    price: 593,
    originalPrice: 1280,
    rating: 4.6,
    reviews: 1667,
    image: ph('lutein'),
    hero: ph('lutein-hero', 1600, 900),
    highlights: ['FloraGLO® 游離型葉黃素', '專利蝦紅素 AstaReal', '智利酒果 MaquiBright'],
    ingredients: [
      { name: '游離型葉黃素', brand: 'FloraGLO®', desc: '美國專利・吸收率最高' },
      { name: '蝦紅素', brand: 'AstaReal', desc: '日本進口・專利原料' },
      { name: '智利酒果', brand: 'MaquiBright®', desc: '德國專利・滋潤靈魂之窗' }
    ],
    description: '配方時代葉黃素選用蝦紅素、山桑子、智利酒果三大有感成分，並嚴格依照研究結果加足有效劑量，幫助快速有感同時兼顧日常保養。'
  },
  {
    slug: 'probiotic',
    name: '三倍調整 腸道保健益生菌',
    subtitle: '專利芽孢菌・100億+活菌',
    category: '腸道保健',
    tagline: '三倍調整・順暢有感',
    price: 500,
    originalPrice: 980,
    rating: 4.7,
    reviews: 1776,
    image: ph('probiotic'),
    hero: ph('probiotic-hero', 1600, 900),
    highlights: ['LactoSpore® 活性芽孢菌', '專利益生質', '耐胃酸耐高溫'],
    ingredients: [
      { name: '活性芽孢菌', brand: 'LactoSpore®', desc: '美國專利・直達腸道' },
      { name: '專利益生質', brand: 'Fibersol®', desc: '日本松谷' }
    ],
    description: '採用專利芽孢菌種搭配益生質，幫助維持消化道機能、調整體質。'
  },
  {
    slug: 'allergy-probiotic',
    name: '三倍舒敏 調整體質益生菌',
    subtitle: '雙專利菌株・舒敏配方',
    category: '舒敏調理',
    tagline: '舒敏調理・調整體質',
    price: 660,
    originalPrice: 1680,
    rating: 4.7,
    reviews: 1778,
    image: ph('allergy'),
    hero: ph('allergy-hero', 1600, 900),
    highlights: ['雙專利舒敏菌株', '足量 200 億活菌', '兒童成人皆可'],
    ingredients: [
      { name: '舒敏益生菌', brand: 'AB-Kefir®', desc: '台灣專利・舒緩過敏' }
    ],
    description: '針對過敏體質設計，採用雙專利菌株，幫助調整體質與舒敏。'
  },
  {
    slug: 'uc2',
    name: '三倍關鍵 非變性二型膠原蛋白 UC-II®',
    subtitle: '美國專利 UC-II® 非變性膠原',
    category: '關節保健',
    tagline: '行動靈活・關鍵保養',
    price: 980,
    originalPrice: 1880,
    rating: 4.8,
    reviews: 1235,
    image: ph('uc2'),
    hero: ph('uc2-hero', 1600, 900),
    highlights: ['UC-II® 美國專利', '玻尿酸 + 葡萄糖胺', '40 mg 足量添加'],
    ingredients: [{ name: 'UC-II®', brand: 'Lonza', desc: '美國專利非變性二型膠原蛋白' }],
    description: '搭配 UC-II 非變性二型膠原與玻尿酸，幫助行動靈活。'
  },
  {
    slug: 'fishoil',
    name: '85% 高濃度頂級魚油',
    subtitle: 'rTG 型・挪威 VIVOMEGA',
    category: '心血管保健',
    tagline: 'Omega-3 高濃度 85%',
    price: 720,
    originalPrice: 1600,
    rating: 4.9,
    reviews: 1235,
    image: ph('fishoil'),
    hero: ph('fishoil-hero', 1600, 900),
    highlights: ['挪威 VIVOMEGA 原料', 'rTG 型・吸收率高', 'EPA + DHA 850mg'],
    ingredients: [{ name: '高濃度魚油', brand: 'VIVOMEGA®', desc: '挪威全球最大魚油廠' }],
    description: '85% 高濃度 rTG 型魚油，採用挪威 VIVOMEGA 原料，提供充足 Omega-3。'
  },
  {
    slug: 'royaljelly',
    name: '三倍精華 蜂王乳',
    subtitle: '10-HDA 6% 高活性',
    category: '女性保健',
    tagline: '由內而外・展現自信',
    price: 880,
    originalPrice: 1680,
    rating: 4.7,
    reviews: 921,
    image: ph('royal'),
    hero: ph('royal-hero', 1600, 900),
    highlights: ['10-HDA 6% 高活性', '日本進口蜂王乳', '搭配大豆異黃酮'],
    ingredients: [{ name: '蜂王乳', brand: 'API', desc: '日本專利・高活性' }],
    description: '高活性 10-HDA 蜂王乳搭配大豆異黃酮，給女性最完整的保養。'
  },
  {
    slug: 'vitamin-bm',
    name: '天然萃取 綜合 B 群 + 鋅',
    subtitle: '男性活力・天然來源',
    category: '能量代謝',
    tagline: '一錠補足・提振活力',
    price: 480,
    originalPrice: 980,
    rating: 4.7,
    reviews: 612,
    image: ph('bm'),
    hero: ph('bm-hero', 1600, 900),
    highlights: ['天然酵母萃取', '8 種 B 群完整', '搭配鋅 + 牛磺酸'],
    ingredients: [{ name: '天然 B 群', brand: 'Lalmin®', desc: '加拿大酵母萃取' }],
    description: '天然酵母萃取的綜合 B 群，搭配鋅與牛磺酸，給男性最佳能量補給。'
  },
  {
    slug: 'vitamin-bf',
    name: '天然萃取 綜合 B 群 + 鐵',
    subtitle: '女性氣色・補鐵首選',
    category: '能量代謝',
    tagline: '紅潤好氣色',
    price: 480,
    originalPrice: 980,
    rating: 4.7,
    reviews: 588,
    image: ph('bf'),
    hero: ph('bf-hero', 1600, 900),
    highlights: ['天然酵母萃取', '高吸收甘胺酸亞鐵', '搭配維他命 C'],
    ingredients: [{ name: '甘胺酸亞鐵', brand: 'Ferrochel®', desc: '美國專利・高吸收' }],
    description: '天然酵母萃取 B 群搭配甘胺酸亞鐵，幫助女性紅潤好氣色。'
  },
  {
    slug: 'gaba-complex',
    name: '三倍好眠 專利 GABA',
    subtitle: 'PharmaGABA® + 芝麻素',
    category: '舒眠保健',
    tagline: '一夜好眠・自然放鬆',
    price: 690,
    originalPrice: 1480,
    rating: 4.8,
    reviews: 803,
    image: ph('gaba'),
    hero: ph('gaba-hero', 1600, 900),
    highlights: ['PharmaGABA® 專利', '芝麻素 + 色胺酸', '不昏沉不依賴'],
    ingredients: [{ name: 'PharmaGABA®', brand: 'Pharma Foods', desc: '日本專利天然發酵' }],
    description: '採用日本專利 PharmaGABA® 搭配芝麻素，幫助一夜好眠。'
  },
  {
    slug: 'ca',
    name: '三倍強化 海藻鈣鎂 + D3',
    subtitle: '愛爾蘭 AlgaeCal 海藻鈣',
    category: '骨骼保健',
    tagline: '補鈣首選・全家適用',
    price: 580,
    originalPrice: 1280,
    rating: 4.8,
    reviews: 745,
    image: ph('ca'),
    hero: ph('ca-hero', 1600, 900),
    highlights: ['AlgaeCal® 愛爾蘭海藻鈣', '高吸收率', '搭配 D3 + 鎂'],
    ingredients: [{ name: '海藻鈣', brand: 'AlgaeCal®', desc: '愛爾蘭海域萃取' }],
    description: '愛爾蘭 AlgaeCal 海藻鈣搭配 D3 與鎂，吸收率與穩定性兼具。'
  },
  {
    slug: 'collagen',
    name: '三倍美妍 膠原蛋白',
    subtitle: '小分子魚膠原 + 玻尿酸',
    category: '美容保養',
    tagline: '由內透亮・水潤緊緻',
    price: 690,
    originalPrice: 1480,
    rating: 4.8,
    reviews: 1102,
    image: ph('collagen'),
    hero: ph('collagen-hero', 1600, 900),
    highlights: ['小分子魚膠原 5000mg', '專利玻尿酸 + 神經醯胺', '維他命 C + 穀胱甘肽'],
    ingredients: [{ name: '小分子魚膠原', brand: 'Peptan®', desc: '法國專利水解膠原' }],
    description: 'Peptan® 法國專利小分子魚膠原蛋白，搭配玻尿酸與神經醯胺，滿足全方位美妍需求。'
  },
  {
    slug: 'maca-p',
    name: '三倍活力 極黑瑪卡',
    subtitle: '秘魯極黑瑪卡 + 鋅',
    category: '男性活力',
    tagline: '回到年輕的狀態',
    price: 880,
    originalPrice: 1680,
    rating: 4.8,
    reviews: 567,
    image: ph('maca'),
    hero: ph('maca-hero', 1600, 900),
    highlights: ['秘魯極黑瑪卡', '專利精胺酸', '鋅 + 韭菜籽'],
    ingredients: [{ name: '極黑瑪卡', brand: 'BLACKMACA®', desc: '秘魯有機認證' }],
    description: '採用秘魯黑瑪卡搭配精胺酸與鋅，為男性活力打造完整配方。'
  },
  {
    slug: 'bittermelon',
    name: '美國專利 苦瓜胜肽',
    subtitle: 'mcIRBP-19 美國專利',
    category: '代謝調節',
    tagline: '甜蜜人生・輕盈代謝',
    price: 880,
    originalPrice: 1880,
    rating: 4.8,
    reviews: 489,
    image: ph('bitter'),
    hero: ph('bitter-hero', 1600, 900),
    highlights: ['mcIRBP-19 美國專利', '足量 50mg', '搭配肉桂 + 鉻'],
    ingredients: [{ name: '苦瓜胜肽', brand: 'mcIRBP-19', desc: '台美雙專利' }],
    description: '採用 mcIRBP-19 美國專利苦瓜胜肽，幫助維持代謝健康。'
  },
  {
    slug: 'cranberry-probiotics',
    name: '法國專利 蔓越莓益生菌',
    subtitle: 'Cran-Max® + 私密益生菌',
    category: '私密保養',
    tagline: '私密守護・自信無憂',
    price: 690,
    originalPrice: 1480,
    rating: 4.8,
    reviews: 654,
    image: ph('cranberry'),
    hero: ph('cranberry-hero', 1600, 900),
    highlights: ['Cran-Max® 36mg PAC', '雙專利私密菌', 'D-甘露糖'],
    ingredients: [{ name: '蔓越莓萃取', brand: 'Cran-Max®', desc: '美國專利' }],
    description: '法國專利蔓越莓搭配私密益生菌與 D-甘露糖，給予女性私密完整守護。'
  },
  {
    slug: 'vitamin-c',
    name: '天然萃取 維他命 C + Q10',
    subtitle: '針葉櫻桃 C + 還原型 Q10',
    category: '抗氧保健',
    tagline: '由內透亮・健康後盾',
    price: 480,
    originalPrice: 980,
    rating: 4.8,
    reviews: 423,
    image: ph('vitc'),
    hero: ph('vitc-hero', 1600, 900),
    highlights: ['天然針葉櫻桃 C', '日本還原型 Q10', '搭配玫瑰果'],
    ingredients: [{ name: '針葉櫻桃 C', brand: 'Acerola', desc: '巴西天然萃取' }],
    description: '採用針葉櫻桃天然 C 搭配日本還原型 Q10，提供完整的抗氧後盾。'
  }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
