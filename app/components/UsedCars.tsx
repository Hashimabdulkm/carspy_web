'use client'

import Link from 'next/link'

const usedCars = [
  { name: 'Grand I10', price: '₹2,84,000', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-15/ed81e15b2dbc4b4188efcadb2ce5d2ee/raw/file.JPG' },
  { name: 'Eon', price: '₹2,77,000', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-15/72a701a0fd584b3497978dd36454c007/raw/file.JPG' },
  { name: 'Santro', price: '₹3,11,000', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-14/6dc40f28fabe47a0991f05d1f670e1c0/raw/file.JPG' },
  { name: 'Baleno', price: '₹3,87,000', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-12/cfbfd6c56b3d4e6b8262d1b10f72c5dd/raw/file.JPG' },
  { name: 'City', price: '₹6,99,000', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-11/47aab35b75dd4c80825fffafc68dfb62/raw/file.JPG' },
  { name: 'Baleno', price: '₹6,90,000', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-13/62d353a458f24839840abb0315cefef3/raw/file.JPG' },
  { name: 'Taigun', price: '₹12,47,208', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-13/205ccdebf2494aada99efcb11e4ad63a/raw/file.JPG' },
  { name: 'Hector', price: '₹11,19,993', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-11/10070d5fa703420aa1185e3893eeeaf5/raw/file.JPG' },
]

export function UsedCars() {
  return (
    <section className="usedcar_usedCars__gfKSs w-full">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h4 className="text-base sm:text-lg lg:text-2xl">Used Cars Around You</h4>
        <div className="usedcar_carsList__X1XqF">
          {usedCars.map((car, index) => (
            <Link 
              key={index} 
              className="usedcar_carItem__LEwKP" 
              href="/used-cars-in-delhi"
            >
              <div className="usedcar_carImage__BBdL9">
                <img alt={car.name} src={car.image} />
              </div>
              <div className="usedcar_carspy__2wCCL">
                <h5>{car.name}</h5>
                <p>{car.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="usedcar_slideArrow__z9an_ usedcar_rightArrow__Hetvq" aria-hidden>&gt;</div>
      </div>
    </section>
  )
}
