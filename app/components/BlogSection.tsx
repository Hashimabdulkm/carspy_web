'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const blogPosts = [
  {
    title: 'Delhi Traffic Police Launches Digital Lok Adalat for Faster Challan Disposal',
    date: '19 Feb 2026',
    category: 'Challan',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/02/Untitled-design-23-1.webp?fit=1200%2C600&ssl=1',
    link: '/blog/challan/delhi-traffic-police-launches-digital-lok-adalat-for-faster-challan-disposal-heres-what-it-means-for-you'
  },
  {
    title: 'FASTag KYV Removed: New FASTag Rules Explained for Car Owners',
    date: '3 Feb 2026',
    category: 'News',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/02/1-blog-94.webp?fit=775%2C469&ssl=1',
    link: '/blog/news/fastag-kyv-removed-new-fastag-rules-explained-for-car-owners'
  },
  {
    title: 'India-EU FTA Deal: Which European Cars May Become Cheaper in India?',
    date: '27 Jan 2026',
    category: 'AUTO and EVs',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/01/1-blog-92.png?fit=775%2C469&ssl=1',
    link: '/blog/auto-and-evs/india-eu-fta-deal-which-european-cars-may-become-cheaper-in-india'
  },
  {
    title: 'National Lok Adalat on 13 December Postponed in Delhi',
    date: '29 Dec 2025',
    category: 'Challan',
    image: 'https://i0.wp.com/carspy9e92c7ba48.wpcomstaging.com/wp-content/uploads/2025/12/1-blog-89.webp?fit=775%2C469&ssl=1',
    link: '/blog/challan/national-lok-adalat-on-13-december-postponed-in-delhi-new-january-date-announced-full-details-inside'
  },
]

const categories = ['ALL', 'News', 'Tips', 'AUTO and EVs', 'RTO', 'Insurance', 'Challan', 'Service History']

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'ALL') return blogPosts
    return blogPosts.filter((post) => post.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold m-0">Latest From The Auto World</h3>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[var(--pbmit-xclean-global-color)] font-medium hover:underline self-start sm:self-center"
          >
            <img alt="view all" src="/img/home/viewAllIcon.svg" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>View all</span>
          </Link>
        </div>

        <div className="border-b border-gray-200 mb-4 sm:mb-6">
          <div
            role="tablist"
            aria-label="Blog categories"
            className="flex gap-1 overflow-x-auto overflow-y-hidden py-1 -mb-px scrollbar-thin scrollbar-thumb-gray-300"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                    ${isSelected
                      ? 'text-[var(--pbmit-xclean-global-color)] border-[var(--pbmit-xclean-global-color)]'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div role="tabpanel" aria-live="polite">
          {filteredPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredPosts.map((post, index) => (
                <article key={`${post.link}-${index}`} className="flex flex-col">
                  <Link href={post.link} className="group block">
                    <div className="rounded-2xl overflow-hidden bg-gray-100">
                      <img
                        alt=""
                        src={post.image}
                        className="w-full h-40 sm:h-48 object-cover group-hover:opacity-95 transition-opacity"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">{post.date}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{post.category}</p>
                    <h4 className="text-sm sm:text-base font-medium mt-1 line-clamp-2 group-hover:text-[var(--pbmit-xclean-link-color-hover)] transition-colors">
                      {post.title}
                    </h4>
                  </Link>
                  <Link
                    href={post.link}
                    className="mt-2 text-sm font-medium text-[var(--pbmit-xclean-global-color)] hover:underline self-start"
                  >
                    Read More
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
