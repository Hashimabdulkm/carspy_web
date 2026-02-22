'use client'

import Link from 'next/link'

const trendingCars = [
  { name: 'BE 6e', price: '₹ 18,90,000', image: '/img/home/be6Tranding.svg', brand: 'Mahindra', slug: 'be-6e' },
  { name: 'Windsor EV', price: '₹ 15,49,800', image: '/img/home/windsorTranding.svg', brand: 'MG', slug: 'windsor-ev' },
  { name: 'XEV 9e', price: '₹ 21,90,000', image: '/img/home/xevTranding.svg', brand: 'Mahindra', slug: 'xev-9e' },
  { name: 'Thar Roxx', price: '₹ 16,99,000', image: '/img/home/roxTranding.svg', brand: 'Mahindra', slug: 'thar-roxx' },
  { name: 'M2', price: '₹ 99,89,875', image: '/img/home/m2Tranding.svg', brand: 'BMW', slug: 'm2' },
  { name: 'Camry', price: '₹ 46,16,753', image: '/img/home/camreyTranding.svg', brand: 'Toyota', slug: 'camry' },
]

export function TrendingCars() {
  return (
    <section className="home_newCars__DMUEA content-wrapper">
      <h4 className="text-base sm:text-lg lg:text-2xl">Trending New Cars</h4>
      <div className="home_carsList__37U1g">
        {trendingCars.map((car, index) => (
          <Link 
            key={index} 
            className="home_carItem__1Q0kL" 
            href={`/new-cars/${car.brand.toLowerCase()}/${car.slug}`}
          >
            <div className="home_carImage__4chct">
              <img alt={car.brand} src={car.image} />
            </div>
            <div className="home_carspy__BlvS5">
              <h5>{car.name}</h5>
              <p>{car.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="home_slideArrow__4ilZN home_rightArrow__08Aiq" aria-hidden>&gt;</div>
    </section>
  )
}
