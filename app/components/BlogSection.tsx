'use client'

import Link from 'next/link'

const blogPosts = [
  {
    title: 'Delhi Traffic Police Launches Digital Lok Adalat for Faster Challan Disposal',
    date: '19 Feb 2026',
    category: 'Challan',
    image: 'https://i0.wp.com/carinfo9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/02/Untitled-design-23-1.webp?fit=1200%2C600&ssl=1',
    link: '/blog/challan/delhi-traffic-police-launches-digital-lok-adalat-for-faster-challan-disposal-heres-what-it-means-for-you'
  },
  {
    title: 'FASTag KYV Removed: New FASTag Rules Explained for Car Owners',
    date: '3 Feb 2026',
    category: 'News',
    image: 'https://i0.wp.com/carinfo9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/02/1-blog-94.webp?fit=775%2C469&ssl=1',
    link: '/blog/news/fastag-kyv-removed-new-fastag-rules-explained-for-car-owners'
  },
  {
    title: 'India-EU FTA Deal: Which European Cars May Become Cheaper in India?',
    date: '27 Jan 2026',
    category: 'AUTO and EVs',
    image: 'https://i0.wp.com/carinfo9e92c7ba48.wpcomstaging.com/wp-content/uploads/2026/01/1-blog-92.png?fit=775%2C469&ssl=1',
    link: '/blog/auto-and-evs/india-eu-fta-deal-which-european-cars-may-become-cheaper-in-india'
  },
  {
    title: 'National Lok Adalat on 13 December Postponed in Delhi',
    date: '29 Dec 2025',
    category: 'Challan',
    image: 'https://i0.wp.com/carinfo9e92c7ba48.wpcomstaging.com/wp-content/uploads/2025/12/1-blog-89.webp?fit=775%2C469&ssl=1',
    link: '/blog/challan/national-lok-adalat-on-13-december-postponed-in-delhi-new-january-date-announced-full-details-inside'
  },
]

const categories = ['News', 'Tips', 'AUTO and EVs', 'RTO', 'Insurance', 'Challan', 'Service History', 'ALL']

export function BlogSection() {
  return (
    <section className="MuiContainer-root MuiContainer-maxWidthLg">
      <div className="MuiBox-root flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="MuiTypography-root MuiTypography-h3">Latest From The Auto World</h3>
        <Link href="/blog">
          <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary self-start sm:self-center">
            <img alt="view all" src="/img/home/viewAllIcon.svg" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </Link>
      </div>
      
      <div className="MuiBox-root">
        <div className="MuiTabs-root">
          <div className="MuiTabs-scroller">
            <div aria-label="basic tabs example" className="MuiTabs-flexContainer" role="tablist">
              {categories.map((category, index) => (
                <button 
                  key={category}
                  className={`MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary ${index === 0 ? 'Mui-selected' : ''}`}
                  role="tab"
                  aria-selected={index === 0}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="MuiTabs-indicator"></span>
          </div>
        </div>
      </div>
      
      <div className="MuiBox-root">
        <div role="tabpanel" aria-labelledby="simple-tab-0">
          <div className="MuiBox-root">
            <div className="MuiGrid-root MuiGrid-container">
              {blogPosts.map((post, index) => (
                <div key={index} className="MuiGrid-root MuiGrid-item MuiGrid-grid-sm-3">
                  <div className="MuiBox-root">
                    <div className="MuiBox-root">
                      <img alt="blogs" src={post.image} className="w-full h-auto object-cover rounded-2xl" style={{ borderRadius: '20px' }} />
                      <p className="MuiTypography-root MuiTypography-body1 text-xs sm:text-sm mt-2">{post.date}</p>
                    </div>
                    <div className="MuiBox-root">
                      <p className="MuiTypography-root MuiTypography-body1 text-xs sm:text-sm text-gray-500">{post.category}</p>
                    </div>
                    <div className="MuiBox-root">
                      <div className="MuiTypography-root MuiTypography-body1 text-sm sm:text-base line-clamp-2">{post.title.substring(0, 50)}...</div>
                    </div>
                    <div className="MuiBox-root">
                      <Link href={post.link}>
                        <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary text-sm">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
