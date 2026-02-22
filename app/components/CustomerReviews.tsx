'use client'

const reviews = [
  {
    name: 'Manish Bhatia',
    review: "I took my car insurance from CarInfo and it was a smooth process. The options were clear, the premium was affordable.",
    rating: 4,
    image: '/img/home/reviewManish.png'
  },
  {
    name: 'Ritika Gupta',
    review: "I ordered a service history report for a used car I wanted to buy - for just ₹219. It was fast, detailed and totally worth it!",
    rating: 4,
    image: '/img/home/reviewRitika.png'
  },
  {
    name: 'Manoj Rawat',
    review: "Quick and simple process to pay my bike's challan. Very convenient!",
    rating: 5,
    image: '/img/home/reviewManoj.png'
  },
  {
    name: 'Amit Sharma',
    review: "I got my FASTag in a few days and was able to use it without any glitches at toll booths. Quite satisfied with the service.",
    rating: 4,
    image: '/img/home/reviewAmit.png'
  },
  {
    name: 'Priyanka Singh',
    review: "Excellent service, fast delivery of reports, and very helpful customer support!",
    rating: 4,
    image: '/img/home/reviewPriyanka.png'
  },
  {
    name: 'Neeraj Kapur',
    review: "Very helpful and have all latest information. Carinfo app gives timely alerts for PUC and Insurance expiry.",
    rating: 5,
    image: '/img/home/reviewNeeraj.png'
  },
]

export function CustomerReviews() {
  return (
    <div className="home_customerReviews__ojP6I content-wrapper">
      <h4 className="home_heading__oW6N7">What Our Customers Say</h4>
      <div className="home_reviewsContainer__F2HYl">
        <img alt="car info half icon" className="home_appLogo__h4wbq" src="/img/home/carinfoFullLogo.svg" />
        <div className="home_reviews___8Rb4">
          {reviews.map((review, index) => (
            <div key={index} className="home_reviewCard__aVSuX">
              <img alt={`review ${review.name}`} className="home_bgImage__Jidx7" src={review.image} />
              <div className="home_content__h_a4D">
                <div className="star_rating_starRatings__vQnpS">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="star_rating_star__l0E_D">
                      <img 
                        alt={i < review.rating ? "review active icon" : "review inactive icon"} 
                        src={i < review.rating ? "/img/home/reviewActiveStar.svg" : "/img/home/reviewInactiveStar.svg"} 
                      />
                    </div>
                  ))}
                </div>
                <h6>{review.name}</h6>
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="home_slideArrow__4ilZN home_rightArrow__08Aiq">&gt;</div>
      </div>
    </div>
  )
}
