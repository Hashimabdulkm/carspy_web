'use client'

import { Star, StarHalf } from 'lucide-react'

const reviews = [
  {
    name: 'Manish Bhatia',
    review: "I took my car insurance from CarInfo and it was a smooth process. The options were clear, the premium was affordable.",
    rating: 4,
  },
  {
    name: 'Ritika Gupta',
    review: "I ordered a service history report for a used car I wanted to buy - for just ₹219. It was fast, detailed and totally worth it!",
    rating: 4,
  },
  {
    name: 'Manoj Rawat',
    review: "Quick and simple process to pay my bike's challan. Very convenient!",
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    review: "I got my FASTag in a few days and was able to use it without any glitches at toll booths. Quite satisfied with the service.",
    rating: 4,
  },
  {
    name: 'Priyanka Singh',
    review: "Excellent service, fast delivery of reports, and very helpful customer support!",
    rating: 4,
  },
  {
    name: 'Neeraj Kapur',
    review: "Very helpful and have all latest information. Carinfo app gives timely alerts for PUC and Insurance expiry.",
    rating: 5,
  },
]

export function CustomerReviews() {
  return (
    <section className="home_customerReviews__ojP6I content-wrapper">
      <h4 className="home_heading__oW6N7">What Our Customers Say</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <h6 className="font-semibold mb-2">{review.name}</h6>
            <p className="text-gray-600 text-xs sm:text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
