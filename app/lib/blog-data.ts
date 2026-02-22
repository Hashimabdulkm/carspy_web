export const BLOG_CATEGORIES = ['ALL', 'News', 'Tips', 'AUTO and EVs', 'RTO', 'Insurance', 'Challan', 'Service History'] as const

export type BlogPost = {
  title: string
  date: string
  category: string
  image: string
  link: string
  excerpt?: string
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Delhi Traffic Police Launches Digital Lok Adalat for Faster Challan Disposal',
    date: '19 Feb 2026',
    category: 'Challan',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/02/Untitled-design-23-1.webp?fit=1200%2C600&ssl=1',
    link: '/blog/challan/delhi-traffic-police-launches-digital-lok-adalat-for-faster-challan-disposal-heres-what-it-means-for-you',
    excerpt: 'Delhi Traffic Police has launched a digital Lok Adalat initiative to help vehicle owners settle challans faster. Here’s what it means for you.',
  },
  {
    title: 'FASTag KYV Removed: New FASTag Rules Explained for Car Owners',
    date: '3 Feb 2026',
    category: 'News',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/02/1-blog-94.webp?fit=775%2C469&ssl=1',
    link: '/blog/news/fastag-kyv-removed-new-fastag-rules-explained-for-car-owners',
    excerpt: 'KYC for FASTag has been done away with. We break down the new FASTag rules and how they affect car and bike owners.',
  },
  {
    title: 'India-EU FTA Deal: Which European Cars May Become Cheaper in India?',
    date: '27 Jan 2026',
    category: 'AUTO and EVs',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/01/1-blog-92.png?fit=775%2C469&ssl=1',
    link: '/blog/auto-and-evs/india-eu-fta-deal-which-european-cars-may-become-cheaper-in-india',
    excerpt: 'The India-EU free trade agreement could cut import duties on several European cars. Here’s which models might get more affordable.',
  },
  {
    title: 'National Lok Adalat on 13 December Postponed in Delhi',
    date: '29 Dec 2025',
    category: 'Challan',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2025/12/1-blog-89.webp?fit=775%2C469&ssl=1',
    link: '/blog/challan/national-lok-adalat-on-13-december-postponed-in-delhi-new-january-date-announced-full-details-inside',
    excerpt: 'The National Lok Adalat scheduled for 13 December in Delhi has been postponed. New date and details inside.',
  },
]

export function getPostByLink(link: string): BlogPost | undefined {
  return blogPosts.find((p) => p.link === link)
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'ALL') return blogPosts
  return blogPosts.filter((p) => p.category === category)
}
