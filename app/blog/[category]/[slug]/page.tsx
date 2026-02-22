'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Footer } from '@/app/components/Footer'
import { PageHero } from '@/app/components/PageHero'
import { blogPosts, getPostByLink } from '@/app/lib/blog-data'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostPage() {
  const params = useParams()
  const category = params.category as string
  const slug = params.slug as string

  const link = `/blog/${category}/${slug}`
  const post = getPostByLink(link)

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Post not found</h1>
          <p className="mt-2 text-gray-600">The article you’re looking for doesn’t exist or has been moved.</p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 text-[var(--pbmit-xclean-global-color)] font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white min-w-0 overflow-x-hidden">
      <PageHero
        eyebrow={post.category}
        title={<span className="text-white">{post.title}</span>}
        subtitle={post.date}
      />

      <div className="bg-white pt-10 sm:pt-14 pb-16 sm:pb-20">
        <article className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--pbmit-xclean-global-color)] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="rounded-2xl overflow-hidden bg-gray-100 mb-8">
            <img
              src={post.image}
              alt=""
              className="w-full aspect-[16/10] object-cover"
            />
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-2">{post.date} · {post.category}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--pbmit-xclean-blackish-color)] mt-0 mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-gray-600 lead mb-8">
                {post.excerpt}
              </p>
            )}
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                This is a placeholder for the full article. In production, you would load the post body from a CMS or markdown file.
              </p>
              <p>
                For now, you can head back to the blog to browse all articles, or use the carspy app for RC details, challan check, and more.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--pbmit-xclean-global-color)] font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              View all posts
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  )
}
