// Per-product structured data for materials / enough / certifications pages

export type ProductRef = {
  slug: string;
  short: string;     // 短称呼 (用于卡片标题)
  full: string;      // 完整名称
  icon: string;      // emoji 占位
  iconColor: string; // 图标背景色
  pkg: string;       // 产品包装图 (用 picsum)
};

export const productRefs: ProductRef[] = [
  { slug: 'allergy-probiotic',     short: '舒敏益生菌',     full: '三倍舒敏益生菌',     icon: '🦠', iconColor: 'bg-emerald-100', pkg: 'https://picsum.photos/seed/pkg-allergy/600/700' },
  { slug: 'lutein',                short: '葉黃素',         full: '三倍感受葉黃素',     icon: '🌼', iconColor: 'bg-amber-100',   pkg: 'https://picsum.photos/seed/pkg-lutein/600/700' },
  { slug: 'probiotic',             short: '腸道益生菌',     full: '腸道保健益生菌',     icon: '💊', iconColor: 'bg-sky-100',     pkg: 'https://picsum.photos/seed/pkg-probiotic/600/700' },
  { slug: 'fishoil',               short: '高濃度魚油',     full: '85%高濃度魚油',      icon: '🐟', iconColor: 'bg-blue-100',    pkg: 'https://picsum.photos/seed/pkg-fishoil/600/700' },
  { slug: 'uc2',                   short: '關鍵UC2',        full: '三倍關鍵UC2',        icon: '🦴', iconColor: 'bg-rose-100',    pkg: 'https://picsum.photos/seed/pkg-uc2/600/700' },
  { slug: 'royaljelly',            short: '蜂王乳',         full: '三倍精華蜂王乳',     icon: '🍯', iconColor: 'bg-yellow-100',  pkg: 'https://picsum.photos/seed/pkg-royal/600/700' },
  { slug: 'vitamin-bm',            short: '綜合B群+鋅',     full: '綜合B群+鋅',         icon: '🅱️', iconColor: 'bg-orange-100',  pkg: 'https://picsum.photos/seed/pkg-bm/600/700' },
  { slug: 'vitamin-bf',            short: '綜合B群+鐵',     full: '綜合B群+鐵',         icon: '🅱️', iconColor: 'bg-pink-100',    pkg: 'https://picsum.photos/seed/pkg-bf/600/700' },
  { slug: 'gaba-complex',          short: '好眠GABA',       full: '三倍好眠GABA',       icon: '😴', iconColor: 'bg-indigo-100',  pkg: 'https://picsum.photos/seed/pkg-gaba/600/700' },
  { slug: 'ca',                    short: '海藻鈣',         full: '三倍強化海藻鈣',     icon: '🦴', iconColor: 'bg-cyan-100',    pkg: 'https://picsum.photos/seed/pkg-ca/600/700' },
  { slug: 'collagen',              short: '膠原蛋白',       full: '三倍美妍膠原蛋白',   icon: '✨', iconColor: 'bg-pink-100',    pkg: 'https://picsum.photos/seed/pkg-collagen/600/700' },
  { slug: 'maca-p',                short: '極黑瑪卡',       full: '三倍活力極黑瑪卡',   icon: '⚫', iconColor: 'bg-stone-200',   pkg: 'https://picsum.photos/seed/pkg-maca/600/700' },
  { slug: 'bittermelon',           short: '苦瓜胜肽',       full: '美國專利苦瓜胜肽',   icon: '🥒', iconColor: 'bg-lime-100',    pkg: 'https://picsum.photos/seed/pkg-bitter/600/700' },
  { slug: 'cranberry-probiotics',  short: '專利蔓越莓',     full: '法國專利蔓越莓益生菌', icon: '🍒', iconColor: 'bg-red-100',     pkg: 'https://picsum.photos/seed/pkg-cran/600/700' },
  { slug: 'vitamin-c',             short: '維他命C',        full: '天然萃取維他命C+Q10', icon: 'Ⓒ', iconColor: 'bg-yellow-100',  pkg: 'https://picsum.photos/seed/pkg-vitc/600/700' }
];

// ───────────────────────────────────────────────────────────────────
// MATERIALS：每款产品的国际原料卡片
// ───────────────────────────────────────────────────────────────────
export type MaterialCard = {
  badge: string;       // 顶部 logo 文字 (PM-A5 / FloraGLO 等)
  badgeColor: string;  // 顶部 logo 描边色
  title: string;       // 蓝色标题列
  bullets: string[];
  factory: string;     // 工厂图说明
};

export const materialsByProduct: Record<string, MaterialCard[]> = {
  'allergy-probiotic': [
    { badge: 'PM-A5', badgeColor: 'border-blue-500 text-blue-600', title: '加氏乳酸桿菌A5',
      bullets: ['經成大醫院實驗研究顯示可調整體質', '具備台灣調整體質功效專利', '具備相關國際試驗證實', '通過腸道定殖力測試'],
      factory: '台灣上市公司光晟生技' },
    { badge: 'PM-A6', badgeColor: 'border-orange-500 text-orange-600', title: '唾液乳酸桿菌A6',
      bullets: ['人體自有菌培養，可耐胃酸膽鹽', '具備多項研究實證', '具備國際期刊支持', '國家認證級菌種'],
      factory: '台灣上市公司光晟生技' },
    { badge: 'PM-A9', badgeColor: 'border-rose-500 text-rose-600', title: '約氏乳酸桿菌A9',
      bullets: ['可耐胃酸膽鹽、穩定性佳', '改善細菌叢生態', '促進新陳代謝，健康維持', '調節生理機能，增強體力'],
      factory: '台灣上市公司光晟生技' },
    { badge: 'BRAP-01', badgeColor: 'border-purple-500 text-purple-600', title: '副乾酪乳酸桿菌 BRAP-01',
      bullets: ['可耐胃酸膽鹽', '改善細菌叢生態', '促進新陳代謝，健康維持', '調節生理機能，增強體力'],
      factory: '台灣上市公司光晟生技' },
    { badge: 'Fibersol-2', badgeColor: 'border-emerald-500 text-emerald-600', title: '日本專利松谷纖維',
      bullets: ['日本特定保健用食品(FOSHU)採用率最高', '多項功效實證，溫和不刺激', '耐熱、耐酸、耐凍', '具優良的安定性'],
      factory: '台灣上市公司光晟生技' }
  ],
  lutein: [
    { badge: 'FloraGLO', badgeColor: 'border-emerald-500 text-emerald-600', title: '美國權威專利葉黃素',
      bullets: ['全球最多專家最推薦的葉黃素', '游離型葉黃素，吸收率佳', '美國FDA食品安全GRAS認證', '原料廠全球擁有超過2600名員工'],
      factory: '美國大廠 Kemin' },
    { badge: 'OmniXan', badgeColor: 'border-amber-500 text-amber-600', title: '歐美日認證玉米黃素',
      bullets: ['有機農場栽培金盞花，純淨來源無污染', '具備國際研究驗證', '生產過程環境友善', '透明溯源系統，完整生產履歷'],
      factory: '國際原料廠 Olive Lifesciences' },
    { badge: 'AstaReal', badgeColor: 'border-rose-500 text-rose-600', title: '世界頂級大廠蝦紅素',
      bullets: ['純淨天然紅球藻萃取物', '具備全球最多專利認證', '美國FDA認同新膳食成分', '全球蝦紅素生產大廠 AstaReal AB 製造'],
      factory: '瑞典大廠 AstaReal AB' },
    { badge: 'MaquiBright', badgeColor: 'border-purple-500 text-purple-600', title: '德國專利智利酒果',
      bullets: ['萃取自天然野生的智利酒果', '擁有德國GMP廠專利製造', '唯一提供標準化高濃度花青素、飛燕草素', '具備多項國際研究支持'],
      factory: '德國大廠 Anklam Extrakt GmbH' },
    { badge: 'MIRTOSELECT', badgeColor: 'border-indigo-500 text-indigo-600', title: '歐洲認證山桑子花青素',
      bullets: ['全球植物萃取物領導廠商生產', '無輻射汙染，無農藥殘留', '符合歐洲藥典認證', '來自北歐手工採收'],
      factory: '純淨無汙染瑞士山桑子' }
  ],
  probiotic: [
    { badge: 'AB-Kefir', badgeColor: 'border-pink-500 text-pink-600', title: '百年科學實證 AB Kefir',
      bullets: ['全球第一完全共生益生菌', '亞洲唯一被評選為益生菌創新工藝', '專利包埋技術、穩定性高', 'SYNTEK 菌種優化製程系統'],
      factory: '台灣乳酸菌權威生合生技' },
    { badge: 'LactoSpore', badgeColor: 'border-emerald-500 text-emerald-600', title: '具完整功效實驗 LactoSpore',
      bullets: ['加拿大天然健康食品認證', '具備專利認證', '已達 10 篇原廠研究', '通過各項食品安定性試驗'],
      factory: '國際原料大廠 SABINSA' },
    { badge: 'HN019', badgeColor: 'border-blue-500 text-blue-600', title: '世界頂級順暢菌種 HN019',
      bullets: ['全球益生菌權威大廠 Danisco 生產', '投入數十億美元研發費用', '擁有美國專利，銷售至全球100多國', '獲得瑞士食品安全室 FSVO 消化健康批准'],
      factory: '全球最大益生菌廠 Danisco' },
    { badge: 'NCFM', badgeColor: 'border-orange-500 text-orange-600', title: '美國功效專利 NCFM',
      bullets: ['全球第一支基因定序嗜酸乳桿菌', '擁有 7 國多項專利認證', '具穩定性、安全性', '擁有數篇發表研究'],
      factory: '全球最大益生菌廠 Danisco' },
    { badge: 'Bimuno', badgeColor: 'border-purple-500 text-purple-600', title: '英國半乳寡糖 Bimuno',
      bullets: ['具備四大功效專利益生質', '擁有超過 60 個專利號', '超過百篇學術研究', '具備國際研究支持'],
      factory: '國際生物公司 Clasado Biosciences 研發' }
  ],
  fishoil: [
    { badge: 'VIVOMEGA', badgeColor: 'border-blue-500 text-blue-600', title: '全球最大挪威百年魚油廠',
      bullets: ['國際魚油標準 IFOS 五星認證', '嚴選純淨海域小型魚種，無重金屬汙染', '極鮮 rTG 魚油，不使用任何溶劑', '4 大永續認證保護海洋資源'],
      factory: '挪威大廠 GC RIEBER' }
  ],
  uc2: [
    { badge: 'UC-II®', badgeColor: 'border-rose-500 text-rose-600', title: '瑞士原廠多國專利 UC2',
      bullets: ['全球第一家非變性二型膠原蛋白', '萃取自雞胸軟骨的新型專利', '具備多篇研究實證支持', '低溫專利營養完整保留'],
      factory: '瑞士原廠 Lonza' },
    { badge: 'Mobilee', badgeColor: 'border-blue-500 text-blue-600', title: '歐洲大廠專利玻尿酸',
      bullets: ['西班牙天然發酵玻尿酸', '高分子量、高活性', '多篇期刊驗證關節健康', '安全性高、無刺激'],
      factory: '歐洲大廠 Bioiberica' }
  ],
  royaljelly: [
    { badge: 'Royal Jelly', badgeColor: 'border-yellow-500 text-yellow-600', title: '日本進口高活性蜂王乳',
      bullets: ['10-HDA 高達 6%', '日本嚴選高活性原料', '完整保留蜂王乳營養', '專利低溫凍乾技術'],
      factory: '日本 API Co., Ltd.' },
    { badge: 'SoyLife', badgeColor: 'border-emerald-500 text-emerald-600', title: '專利大豆胚芽萃取',
      bullets: ['荷蘭專利大豆異黃酮', '高濃度標準化萃取', '搭配蜂王乳發揮綜效', '溫和好吸收'],
      factory: '荷蘭大廠 Frutarom' },
    { badge: 'Chaste Berry', badgeColor: 'border-purple-500 text-purple-600', title: '專利聖潔莓萃取',
      bullets: ['歐洲傳統女性保養草本', '標準化萃取', '多篇國際期刊支持', '溫和不刺激'],
      factory: '德國大廠 Finzelberg' }
  ]
};

// 兜底：未在上方列出的产品提供通用 2 卡
export const materialsFallback: MaterialCard[] = [
  { badge: 'INTL', badgeColor: 'border-blue-500 text-blue-600', title: '國際大廠頂級原料',
    bullets: ['多項國際專利認證', '完整國際研究實證', '通過食品安全檢驗', 'GRAS 食品安全認可'],
    factory: '國際原料大廠生產' },
  { badge: 'GMP', badgeColor: 'border-emerald-500 text-emerald-600', title: '嚴選研究級成分',
    bullets: ['遵循 GMP 標準', '原料 COA 全程追溯', '低溫萃取保留活性', '安定性、純度雙重把關'],
    factory: '國際 GMP 認證工廠' }
];

// ───────────────────────────────────────────────────────────────────
// ENOUGH：每款产品的足量配方表
// ───────────────────────────────────────────────────────────────────
export type DoseRow = {
  name: string;       // 成分名
  reason: string;     // 有效的原因
  dose: string;       // 我們所添加的劑量
  enough?: boolean;   // 是否「足量添加」
};

export const enoughByProduct: Record<string, DoseRow[]> = {
  'allergy-probiotic': [
    { name: '加氏乳桿菌A5', reason: '2010年的美國《Pediatric pulmonology》期刊中，實驗證實之有效劑量為 40 億 / 天。', dose: '40 億', enough: true },
    { name: '唾液乳桿菌A6', reason: '2012年國際期刊《印度兒科 Indian Pediatr》中，實驗證實之有效劑量為 40 億 / 天。', dose: '40 億', enough: true },
    { name: '約氏乳桿菌A9', reason: '2012年《International journal of pediatric otorhinolaryngology》中，實驗證實之有效劑量為 40 億 / 天。', dose: '40 億', enough: true },
    { name: 'LP BRAP-01',  reason: '2008年中華民國發明專利研究中（專利字號：TWI342217），顯示有效劑量為 150 億 / 天。', dose: '150 億', enough: true }
  ],
  lutein: [
    { name: '葉黃素', reason: '2003 年至 2022 年數篇國際研究均證實葉黃素之功效，有效劑量為葉黃素 10 mg + 玉米黃素 2 mg / 天。', dose: '葉黃素 10 mg + 玉米黃素 2 mg / 天', enough: true },
    { name: '智利酒果', reason: '2014 年《密涅瓦藥典 Panminerva medica》證實智利酒果之功效，有效劑量約 30 mg / 天。', dose: '30 mg / 天', enough: true },
    { name: '蝦紅素', reason: '2005 年《臨床醫學雜誌 Journal of Clinical Medicine》證實蝦紅素之功效，有效劑量約 4 mg / 天。', dose: '4 mg / 天', enough: true }
  ],
  probiotic: [
    { name: 'HN019',    reason: '2011 年英國醫學期刊《Scand J Gastroenterol》中，實驗實證有效劑量為 18 億 / 天。', dose: '50 億', enough: true },
    { name: 'NCFM',     reason: '2016 年國際醫學期刊《World J Gastroenterol》中，實驗實證有效劑量為 10 億 / 天。', dose: '50 億', enough: true },
    { name: 'AB Kefir', reason: '2020 年國際期刊《Probiotics and Antimicrobial Proteins》中，實驗實證有效劑量為 100 億 / 天。', dose: '100 億', enough: true }
  ],
  fishoil: [
    { name: '85% 高濃度', reason: '低濃度魚油可能需要更高劑量才能達到相同 Omega-3 攝取效果，並會增加攝取其他油脂的風險。', dose: '85% rTG 高濃度' },
    { name: '1000 mg 高劑量', reason: '美國心臟協會 (AHA) 建議確保攝取足量的 Omega-3 劑量幫助維持健康。', dose: '1000 mg', enough: true },
    { name: 'r-TG 型態', reason: '《Journal of the American College of Nutrition》指出 r-TG 形式的魚油吸收效果最為卓越。', dose: 'r-TG 型' },
    { name: '挪威來源', reason: '挪威百年魚油大廠，嚴選純淨海域的小型魚種。', dose: '挪威進口' }
  ],
  uc2: [
    { name: 'UC2', reason: '2002–2016 年數篇 UC2 國際研究均證實 UC2 之功效，有效劑量約 40 mg / 天。', dose: '40 mg / 天', enough: true },
    { name: '玻尿酸', reason: '2008–2020 年數篇玻尿酸國際實驗研究中，實驗有效劑量約 80 mg / 天。', dose: '80 mg / 天', enough: true }
  ],
  royaljelly: [
    { name: '蜂王乳粉', reason: '2014 年蘇格蘭《Complement Ther Med》期刊中，蜂王乳有效劑量為 1000 mg / 天。', dose: '相當於 1500 mg 蜂王乳（500 mg 濃縮粉）/ 天', enough: true },
    { name: '大豆胚芽萃取物', reason: '2022 年國際期刊《活體內 In Vivo》中，大豆異黃酮實驗實證有效劑量為 15 mg / 天。', dose: '相當於純量 50 mg（萃取物 125 mg × 40%）', enough: true },
    { name: '西洋牡荊萃取物（聖潔莓）', reason: '2014 年國際醫學期刊《Advances in therapy》中，聖潔莓有效劑量為 20 mg / 天。', dose: '20 mg', enough: true },
    { name: '芝麻素', reason: '2015 年國際期刊《Glob J Health Sci》中，實驗實證有效劑量為 10 mg / 天。', dose: '15 mg', enough: true }
  ],
  'vitamin-bm': [
    { name: '天然酵母 B 群', reason: '衛福部「國人膳食營養素參考攝取量」建議：B1 1.4 mg、B2 1.6 mg、B6 1.6 mg、B12 2.4 ug、生物素 30 ug、菸鹼素 18 mg NE、葉酸 400 ug、泛酸 5 mg。', dose: '皆符合衛福部標準，8 種維生素 B 全都足量添加', enough: true },
    { name: '天然酵母鋅', reason: '2018 年國際期刊《Nutrition Journal》中，鋅實驗實證有效劑量為 10.8 mg / 天。', dose: '16 mg', enough: true },
    { name: '天然酵母硒', reason: '2010 年美國《The American Journal of Clinical Nutrition》中，硒實驗實證有效劑量為 49 ug / 天。', dose: '55 ug', enough: true },
    { name: '牛磺酸', reason: '2014 年國際期刊《Applied Physiology, Nutrition, and Metabolism》中，實驗實證有效劑量為 50 mg / 天。', dose: '50 mg', enough: true }
  ],
  'vitamin-bf': [
    { name: '天然酵母 B 群', reason: '衛福部「國人膳食營養素參考攝取量」建議：B1 1.4 mg、B2 1.6 mg、B6 1.6 mg、B12 2.4 ug、生物素 30 ug、菸鹼素 18 mg NE、葉酸 400 ug、泛酸 5 mg。', dose: '皆符合衛福部標準，8 種維生素 B 全都足量添加', enough: true },
    { name: '西印度櫻桃維生素 C', reason: '2017 年國際期刊《Nutrients》中，維他命 C 實驗實證有效劑量為 100 mg / 天。', dose: '100 mg', enough: true },
    { name: '甘胺酸亞鐵', reason: '衛福部建議：成年男性 10 mg，成年女性 15 mg。', dose: '15 mg', enough: true },
    { name: '牛磺酸', reason: '2014 年國際期刊《Applied Physiology, Nutrition, and Metabolism》中，有效劑量為 50 mg / 天。', dose: '50 mg', enough: true }
  ],
  'gaba-complex': [
    { name: 'GABA', reason: '2016 年韓國《J Sleep Med》期刊中，GABA 有效劑量為 100 mg / 天。', dose: '相當於純量 100 mg（萃取物 500 mg × 20%）', enough: true },
    { name: '97% 芝麻素', reason: '2015 年國際期刊《Glob J Health Sci》中，芝麻素有效劑量為 10 mg / 天。', dose: '15 mg', enough: true },
    { name: 'L-色胺酸', reason: '2012 年國際期刊《Age (Dordr)》中，色胺酸實驗實證有效劑量為 120 mg / 天。', dose: '250 mg', enough: true },
    { name: '天然海藻鈣', reason: '2020 年國際期刊《Sci Rep.》中，實證鈣濃度含量高達 31%，並擁有比碳酸鈣更好的生物利用率。', dose: '135 mg' }
  ],
  ca: [
    { name: '天然海藻鈣', reason: '2020 年國際期刊《Sci Rep.》中，實證鈣濃度含量高達 31%，生物利用率優於碳酸鈣。', dose: '1330 mg' },
    { name: '海洋鎂', reason: '2022 年國際期刊《Bone》中，鎂實驗實證有效劑量約為 200 mg / 天。', dose: '209 mg', enough: true },
    { name: '蕎麥維生素 D3', reason: '2006 年《New England Journal of Medicine》中，維生素 D3 實驗實證有效劑量為 400 I.U. / 天。', dose: '400 I.U.', enough: true },
    { name: '鷹嘴豆萃取維生素 K2', reason: '2020 年國際期刊《Calcified Tissue International》中，維生素 K2 實驗實證有效劑量為 50 mcg / 天。', dose: '50 mcg', enough: true }
  ],
  collagen: [
    { name: '膠原蛋白胜肽', reason: '2018 年國際期刊《Nutrients》中，膠原蛋白胜肽實驗有效劑量為 1000 mg / 天。', dose: '2500 mg', enough: true },
    { name: '西印度櫻桃維生素 C', reason: '2017 年國際期刊《Nutrients》中，維他命 C 實驗實證有效劑量為 100 mg / 天。', dose: '100 mg', enough: true },
    { name: '玄米萃取物（含神經醯胺）', reason: '2020 年國際期刊《J Oleo Sci》中，神經醯胺實驗實證有效劑量為 0.8 mg / 天。', dose: '8 mg（含神經醯胺 0.8 mg）', enough: true },
    { name: '流行鏈球菌發酵物（含玻尿酸）', reason: '2008–2020 年數篇玻尿酸國際實驗研究中，實驗有效劑量約 80 mg / 天。', dose: '80 mg', enough: true }
  ],
  'maca-p': [
    { name: 'Macapro 瑪卡', reason: '2009 年國際期刊《Andrologia》中，瑪卡實驗有效劑量為 2400 mg / 天。', dose: '2500 mg', enough: true },
    { name: '左旋精胺酸', reason: '2019 年國際期刊《The Journal of Sexual Medicine》中，精胺酸有效劑量為 1500 mg / 天。', dose: '1500 mg', enough: true },
    { name: '天然酵母鋅', reason: '2018 年國際期刊《Nutrition Journal》中，鋅有效劑量為 10.8 mg / 天。', dose: '16 mg', enough: true },
    { name: '南非醉茄', reason: '2019 年國際期刊《Medicine (Baltimore)》中，南非醉茄有效劑量為 240 mg / 天。', dose: '240 mg', enough: true }
  ],
  bittermelon: [
    { name: '苦瓜胜肽', reason: '2022 年國際期刊《Food & Nutrition Research》中，苦瓜胜肽有效劑量為 600 mg / 天。', dose: '600 mg', enough: true },
    { name: '肉桂萃取物', reason: '2009 年國際期刊《Journal of the International Society of Sports Nutrition》中，有效劑量為 500 mg / 天。', dose: '500 mg', enough: true },
    { name: '酵母鉻', reason: '2019 年國際期刊中，鉻實驗有效劑量為 200 mcg / 天。', dose: '200 mcg', enough: true }
  ],
  'cranberry-probiotics': [
    { name: '蔓越莓萃取', reason: '法國專利 Cran-Max® 高濃度 PAC，國際多篇期刊證實私密保養功效，有效劑量約 36 mg PAC / 天。', dose: '36 mg PAC', enough: true },
    { name: '私密益生菌', reason: '雙專利益生菌株，國際研究證實私密保養之有效菌數約 50 億 / 天。', dose: '100 億', enough: true },
    { name: 'D-甘露糖', reason: '《World J Urol》研究證實 D-甘露糖維持私密健康，有效劑量約 2000 mg / 天。', dose: '2000 mg', enough: true }
  ],
  'vitamin-c': [
    { name: '針葉櫻桃維生素 C', reason: '2017 年國際期刊《Nutrients》中，維他命 C 有效劑量為 100 mg / 天。', dose: '500 mg', enough: true },
    { name: '還原型 Q10', reason: '日本《Nutrients》研究指出，Q10 實驗有效劑量為 30 mg / 天。', dose: '30 mg', enough: true },
    { name: '玫瑰果萃取', reason: '北歐傳統植萃，富含天然多酚搭配維生素 C 發揮抗氧綜效。', dose: '50 mg' }
  ]
};

// ───────────────────────────────────────────────────────────────────
// CERTIFICATIONS：每款产品检验项目（重金属项数因产品而异）
// ───────────────────────────────────────────────────────────────────
export type CertReport = { label: string; image: string };

export function certReportsFor(slug: string): CertReport[] {
  // 5 项重金属或 4 项重金属
  const fourMetalProducts = ['royaljelly', 'vitamin-bm', 'vitamin-bf'];
  const metalCount = fourMetalProducts.includes(slug) ? 4 : 5;
  return [
    { label: `${metalCount} 項重金屬 符合國家標準`, image: `https://picsum.photos/seed/cert-metal-${slug}/600/800` },
    { label: '9 項塑化劑 符合國家標準',              image: `https://picsum.photos/seed/cert-plast-${slug}/600/800` },
    { label: '315 項西藥 符合國家標準',              image: `https://picsum.photos/seed/cert-drug-${slug}/600/800` },
    { label: '3 項微生物 符合國家標準',              image: `https://picsum.photos/seed/cert-micro-${slug}/600/800` },
    { label: 'HACCP 食品安全管制認證',               image: `https://picsum.photos/seed/cert-haccp-${slug}/600/800` },
    { label: 'ISO 22000 食品安全認證',               image: `https://picsum.photos/seed/cert-iso-${slug}/600/800` }
  ];
}
