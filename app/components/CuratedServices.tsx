'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'

export function CuratedServices() {
  const services = [
    {
      title: 'Settle Your Challans Instantly',
      bgColor: 'rgb(255, 138, 72)',
      image: '/img/home/payChallanPoster.png',
      points: ['Challan History', 'Instant Settlement'],
      button: 'Pay Challans',
      link: '/e-challan-check'
    },
    {
      title: 'Sell Your Car From Home',
      bgColor: 'rgb(19, 194, 194)',
      image: '/img/home/sellCarPoster.png',
      points: ['Get The Best Value', 'Instant Payment'],
      button: 'Sell Car',
      link: '/sell-car'
    },
    {
      title: 'Your Dream Car In Your Budget',
      bgColor: 'rgb(71, 142, 199)',
      image: '/img/home/dreamCarPoster.png',
      points: ['Trusted Sellers', 'Exclusive Deals'],
      button: 'Explore Used Cars',
      link: '/used-cars-in-delhi'
    },
  ]

  return (
    <section className="home_curatedServiceContainer__Jljnp content-wrapper">
      <h5 className="home_heading__oW6N7">Curated Services For You</h5>
      <div className="home_cardsContainer__6logG">
        {services.map((service, index) => (
          <Link 
            key={index} 
            href={service.link}
          >
            <Card 
              className="home_card__d7Bsl border-0" 
              style={{ backgroundColor: service.bgColor }}
            >
              <CardContent className="p-6">
                <div className="home_cardImage___aCQ5">
                  <img 
                    alt={service.title.toLowerCase().replace(' ', '-')} 
                    src={service.image}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
                <h5 className="home_cardHeading__BOvb9">{service.title}</h5>
                <div className="home_points__uN3IL">
                  {service.points.map((point, idx) => (
                    <div key={idx} className="home_point__tNycR">
                      <div style={{ 
                        backgroundColor: index === 0 ? 'rgb(255, 173, 127)' : index === 1 ? 'rgb(92, 219, 211)' : 'rgb(100, 167, 221)',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img 
                          alt="point icon" 
                          src={idx === 0 ? '/img/home/whiteBadgeIcon.svg' : '/img/home/rupeeIcon.svg'}
                          width={12}
                          height={12}
                        />
                      </div>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-4"
                >
                  {service.button}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
