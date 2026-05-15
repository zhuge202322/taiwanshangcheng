import reviewsData from '@/data/reviews.json';

export type Review = {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
};

const ALL = reviewsData as Record<string, Review[]>;

export function getReviewsBySlug(slug: string): Review[] {
  return ALL[slug] || [];
}

export function getReviewSummary(slug: string): { count: number; average: number } {
  const list = getReviewsBySlug(slug);
  if (!list.length) return { count: 0, average: 0 };
  const sum = list.reduce((a, r) => a + (r.rating || 0), 0);
  return { count: list.length, average: Math.round((sum / list.length) * 10) / 10 };
}
