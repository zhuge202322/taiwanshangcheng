// 使用者真實回饋页面数据
// ──────────────────────────────────────────────────────
// 图片：已对标原站下载到本地 public/reviews/ (banner + 产品图 + 用户头像)
// 用户姓名/年龄/职业：使用脱敏后的简短事实信息
// 评论文字 (text)：当前为占位文案，后期请从 CMS / Vendure 后端载入真实内容
// ──────────────────────────────────────────────────────

export type ReviewItem = {
  productTag: string;
  name: string;
  age: number;
  job: string;
  text: string;
  avatar: string;
};

export type ReviewProductBlock = {
  slug: string;
  title: string;
  productTag: string;       // 卡片左上角 tag (短称)
  productImage: string;
  reviews: ReviewItem[];
};

const placeholder = (i: number) =>
  `（占位文案 #${i}）此處將顯示來自 CMS 的真實使用者心得，包含使用情境、有感程度、回購意願等。對接 Vendure 後端後即可即時帶入。`;

type Reviewer = { name: string; age: number; job: string };

// 11 个产品区块，每块 9 位用户，姓名/年龄/职业按 DOM 顺序与本地头像 1:1 对应
const blocks: { slug: string; title: string; tag: string; reviewers: Reviewer[] }[] = [
  { slug: 'allergy-probiotic', title: '三倍舒敏益生菌', tag: '舒敏益生菌', reviewers: [
    { name: '連Ｏ凱', age: 10, job: '學生' },
    { name: '吳Ｏ浩', age: 26, job: '工程師' },
    { name: '許Ｏ瑀', age: 2,  job: '兒童' },
    { name: '胡Ｏ溢', age: 30, job: '自由業' },
    { name: '高Ｏ晴', age: 5,  job: '兒童' },
    { name: '江Ｏ澔', age: 27, job: '金融業' },
    { name: '林Ｏ妍', age: 3,  job: '兒童' },
    { name: '曾Ｏ植', age: 1,  job: '兒童' },
    { name: '黃Ｏ妮', age: 35, job: '服務業' }
  ]},
  { slug: 'lutein', title: '三倍感受葉黃素', tag: '三倍感受葉黃素', reviewers: [
    { name: '陳Ｏ豪', age: 26, job: '工程師' },
    { name: '林Ｏ群', age: 7,  job: '兒童' },
    { name: '劉Ｏ辰', age: 30, job: '傳產業' },
    { name: '林Ｏ秀', age: 65, job: '退休' },
    { name: '張Ｏ龍', age: 45, job: '運輸業' },
    { name: '張Ｏ皓', age: 33, job: '媒體業' },
    { name: '杜Ｏ晴', age: 19, job: '大學生' },
    { name: '張Ｏ緯', age: 30, job: '行政' },
    { name: '呂Ｏ元', age: 35, job: '行銷業' }
  ]},
  { slug: 'probiotic', title: '腸道保健益生菌', tag: '腸道益生菌', reviewers: [
    { name: '蔣Ｏ澄', age: 4,  job: '兒童' },
    { name: '高Ｏ琳', age: 30, job: '貿易業' },
    { name: '陳Ｏ威', age: 17, job: '高中生' },
    { name: '蕭Ｏ君', age: 28, job: '設計業' },
    { name: '李Ｏ顥', age: 32, job: '警察' },
    { name: '邱Ｏ臣', age: 11, job: '學生' },
    { name: '陳Ｏ尹', age: 32, job: '服務業' },
    { name: '朱Ｏ國', age: 40, job: '業務' },
    { name: '林Ｏ傑', age: 34, job: '不動產業' }
  ]},
  { slug: 'fishoil', title: '85%高濃度魚油', tag: '高濃度魚油', reviewers: [
    { name: '蔡Ｏ傑', age: 27, job: '業務' },
    { name: '許Ｏ成', age: 57, job: '機械業' },
    { name: '杜Ｏ陽', age: 46, job: '自營業' },
    { name: '吳Ｏ旗', age: 65, job: '傳產業' },
    { name: '林Ｏ諺', age: 41, job: '美髮業' },
    { name: '劉Ｏ廷', age: 35, job: '醫療業' },
    { name: '黃Ｏ宇', age: 35, job: '出版業' },
    { name: '吳Ｏ廷', age: 32, job: '科技業' },
    { name: '石Ｏ靈', age: 65, job: '家管' }
  ]},
  { slug: 'uc2', title: '三倍關鍵UC2', tag: '關鍵UC2', reviewers: [
    { name: '游Ｏ昌', age: 61, job: '物流業' },
    { name: '劉Ｏ貞', age: 91, job: '退休' },
    { name: '金Ｏ英', age: 64, job: '自營業' },
    { name: '林Ｏ雄', age: 65, job: '建築業' },
    { name: '王Ｏ妹', age: 76, job: '退休' },
    { name: '曾Ｏ成', age: 65, job: '顧問業' },
    { name: '陳Ｏ琳', age: 88, job: '退休' },
    { name: '許Ｏ梅', age: 65, job: '製造業' },
    { name: '林Ｏ謙', age: 65, job: '司機' }
  ]},
  { slug: 'royaljelly', title: '三倍精華蜂王乳', tag: '蜂王乳', reviewers: [
    { name: '杜Ｏ娥', age: 61, job: '運輸業' },
    { name: '陳Ｏ珠', age: 55, job: '家管' },
    { name: '周Ｏ妤', age: 40, job: '美容業' },
    { name: '林Ｏ芬', age: 60, job: '教育業' },
    { name: '連Ｏ琍', age: 65, job: '餐飲業' },
    { name: '杜Ｏ蓁', age: 41, job: '家管' },
    { name: '吳Ｏ雲', age: 58, job: '出納' },
    { name: '王Ｏ惠', age: 58, job: '餐飲業' },
    { name: '陳Ｏ玉', age: 53, job: '行政' }
  ]},
  { slug: 'vitamin-bm', title: '綜合B群+鋅', tag: '綜合B群+鋅', reviewers: [
    { name: '謝Ｏ諺', age: 35, job: '金融業' },
    { name: '吳Ｏ毅', age: 31, job: '製造業' },
    { name: '鄧Ｏ勛', age: 30, job: '工程師' },
    { name: '蔣Ｏ文', age: 35, job: '零售業' },
    { name: '丁Ｏ毅', age: 34, job: '自由業' },
    { name: '梁Ｏ和', age: 36, job: '科技業' },
    { name: '李Ｏ婷', age: 33, job: '服務業' },
    { name: '楊Ｏ睿', age: 35, job: '行銷業' },
    { name: '李Ｏ龍', age: 50, job: '室內設計師' }
  ]},
  { slug: 'vitamin-bf', title: '綜合B群+鐵', tag: '綜合B群+鐵', reviewers: [
    { name: '鄭Ｏ晴', age: 32, job: '服務業' },
    { name: '張Ｏ玲', age: 50, job: '法律業' },
    { name: '蔡Ｏ霏', age: 28, job: '金融業' },
    { name: '徐Ｏ耘', age: 23, job: '品保工程師' },
    { name: '張Ｏ珊', age: 27, job: '服務業' },
    { name: '黃Ｏ真', age: 33, job: '醫療業' },
    { name: '林Ｏ珍', age: 60, job: '褓母' },
    { name: '洪Ｏ晴', age: 48, job: '電工業' },
    { name: '莊Ｏ綺', age: 35, job: '公務員' }
  ]},
  { slug: 'gaba-complex', title: '三倍好眠GABA', tag: '好眠GABA', reviewers: [
    { name: '林Ｏ泰', age: 25, job: '金融業' },
    { name: '連Ｏ豪', age: 40, job: '運輸業' },
    { name: '李Ｏ志', age: 32, job: '工程師' },
    { name: '劉Ｏ橋', age: 47, job: '工程師' },
    { name: '黃Ｏ恩', age: 33, job: '飯店業' },
    { name: '曲Ｏ勤', age: 65, job: '公務員' },
    { name: '丁Ｏ英', age: 65, job: '製造業' },
    { name: '陳Ｏ華', age: 53, job: '餐飲業' },
    { name: '張Ｏ麒', age: 31, job: '公務員' }
  ]},
  { slug: 'ca', title: '三倍強化海藻鈣', tag: '海藻鈣', reviewers: [
    { name: '蔣Ｏ文', age: 41, job: '科技業' },
    { name: '尤Ｏ宜', age: 62, job: '汽車維修業' },
    { name: '蔡Ｏ女', age: 68, job: '自由業' },
    { name: '陸Ｏ和', age: 65, job: '物管業' },
    { name: '陳Ｏ翰', age: 32, job: '公務員' },
    { name: '林Ｏ文', age: 65, job: '服飾業' },
    { name: '林Ｏ華', age: 65, job: '家管' },
    { name: '陳Ｏ玲', age: 51, job: '服務業' },
    { name: '劉Ｏ玉', age: 56, job: '作業員' }
  ]},
  { slug: 'collagen', title: '三倍美妍膠原蛋白', tag: '美妍膠原蛋白', reviewers: [
    { name: '張Ｏ絨', age: 34, job: '家管' },
    { name: '張Ｏ慧', age: 48, job: '護理師' },
    { name: '郭Ｏ汝', age: 25, job: '醫療業' },
    { name: '黃Ｏ純', age: 25, job: '甜點師' },
    { name: '黃Ｏ以', age: 32, job: '服務業' },
    { name: '游Ｏ宣', age: 37, job: '政府機關' },
    { name: '張Ｏ儀', age: 32, job: '服務業' },
    { name: '張Ｏ瑄', age: 28, job: '自由業' },
    { name: '曾Ｏ齡', age: 32, job: '自營業' }
  ]}
];

let counter = 0;
export const reviewBlocks: ReviewProductBlock[] = blocks.map((b) => ({
  slug: b.slug,
  title: b.title,
  productTag: b.tag,
  productImage: `/reviews/products/${b.slug}.png`,
  reviews: b.reviewers.map((r, i) => {
    counter += 1;
    return {
      productTag: b.tag,
      name: r.name,
      age: r.age,
      job: r.job,
      text: placeholder(counter),
      avatar: `/reviews/avatars/${b.slug}-${i + 1}.jpg`
    };
  })
}));

// 顶部 banner（轮播）
export const heroBanners = [
  { src: '/reviews/banner-01.jpg', alt: '上萬好評' },
  { src: '/reviews/banner-02.jpg', alt: '回購保證' },
  { src: '/reviews/banner-03.jpg', alt: '媒體報導' }
];

// 产品快速导航
export const reviewProductNav: { slug: string; short: string; icon: string }[] = [
  { slug: 'allergy-probiotic', short: '舒敏益生菌',     icon: '/reviews/icon-allergy.jpg' },
  { slug: 'lutein',            short: '葉黃素',         icon: '/reviews/icon-lutein.jpg' },
  { slug: 'probiotic',         short: '腸道益生菌',     icon: '/reviews/icon-probiotic.jpg' },
  { slug: 'fishoil',           short: '高濃度魚油',     icon: '/reviews/icon-fishoil.jpg' },
  { slug: 'uc2',               short: '關鍵UC2',        icon: '/reviews/icon-uc2.jpg' },
  { slug: 'royaljelly',        short: '蜂王乳',         icon: '/reviews/icon-royaljelly.jpg' },
  { slug: 'vitamin-bm',        short: '綜合B群+鋅',     icon: '/reviews/icon-vitamin-bm.jpg' },
  { slug: 'vitamin-bf',        short: '綜合B群+鐵',     icon: '/reviews/icon-vitamin-bf.png' },
  { slug: 'gaba-complex',      short: '好眠GABA',       icon: '/reviews/icon-gaba.jpg' },
  { slug: 'ca',                short: '海藻鈣',         icon: '/reviews/icon-ca.jpg' },
  { slug: 'collagen',          short: '膠原蛋白',       icon: '/reviews/icon-collagen.jpg' }
];
