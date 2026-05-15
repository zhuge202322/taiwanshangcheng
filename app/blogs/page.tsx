import PageHero from '@/components/PageHero';

export const metadata = { title: '保健專欄 - 萃活世家' };

const posts = Array.from({ length: 9 }).map((_, i) => ({
  title: [
    '葉黃素什麼時候吃最好？營養師完整解析',
    '魚油與 Omega-3 怎麼挑？高濃度迷思一次破解',
    '益生菌種類大不同！如何挑選最適合你的菌株',
    '更年期保養關鍵：蜂王乳 + 大豆異黃酮',
    'GABA 助眠真的有效嗎？專家告訴你',
    '海藻鈣 vs 碳酸鈣：吸收率大解密',
    'UC-II® 非變性二型膠原，關節保健新選擇',
    '膠原蛋白怎麼吃才有效？',
    '私密保養必看：蔓越莓 + 益生菌'
  ][i],
  date: `2025/0${(i % 9) + 1}/${10 + i}`,
  cat: ['營養知識', '原料解析', '生活保健'][i % 3],
  image: `https://picsum.photos/seed/blog${i}/600/400`
}));

export default function BlogsPage() {
  return (
    <>
      <PageHero title="保健專欄" subtitle="專業營養知識・讓你吃得有感更有道理" />
      <section className="py-14 bg-cream">
        <div className="container-x grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="bg-white rounded-2xl shadow-card overflow-hidden group cursor-pointer">
              <div className="overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-5">
                <div className="text-xs text-brand-bright font-medium">{p.cat} ・ {p.date}</div>
                <h3 className="mt-2 font-medium text-ink-dark group-hover:text-brand-blue">{p.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
