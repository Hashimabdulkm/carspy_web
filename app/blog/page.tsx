'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PageHero } from '@/app/components/PageHero'
import { Footer } from '@/app/components/Footer'
import { blogPosts, BLOG_CATEGORIES, getPostsByCategory } from '@/app/lib/blog-data'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const filteredPosts = useMemo(
    () => getPostsByCategory(selectedCategory),
    [selectedCategory]
  )

  return (
    <div className="min-h-screen bg-white min-w-0 overflow-x-hidden">
      <PageHero
        eyebrow="Latest from the auto world"
        title={
          <>
            carspy <span className="text-[var(--pbmit-xclean-global-color)]">Blog</span>
          </>
        }
        subtitle="Auto news, challan updates, RTO info, insurance tips, and vehicle guides — all in one place."
      />

      <div className="bg-white pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          {/* Category tabs */}
          <div className="border-b border-gray-200 mb-8 sm:mb-10">
            <div
              role="tablist"
              aria-label="Blog categories"
              className="flex gap-1 overflow-x-auto overflow-y-hidden py-1 -mb-px scrollbar-thin scrollbar-thumb-gray-300"
            >
              {BLOG_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
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

          {/* Posts grid */}
          <div role="tabpanel" aria-live="polite">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 sm:py-24">
                <p className="text-gray-500 text-lg">No posts in this category yet.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for new articles.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={`${post.link}-${index}`}
                    className="flex flex-col rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                  >
                    <Link href={post.link} className="group block flex-1 flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                        <img
                          src={post.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
                          <span>{post.date}</span>
                          <span className="text-gray-300">·</span>
                          <span className="font-medium text-[var(--pbmit-xclean-global-color)]">
                            {post.category}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-semibold text-[var(--pbmit-xclean-blackish-color)] mt-0 mb-2 line-clamp-2 group-hover:text-[var(--pbmit-xclean-global-color)] transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-2 mt-auto">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="mt-3 inline-flex items-center text-sm font-medium text-[var(--pbmit-xclean-global-color)] group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
