'use client'

import Link from 'next/link'

export function GetInTouch() {
  return (
    <div className="home_getInTouchLayout__DtIEf">
      <div className="home_getInTouchContainer__WOOXR content-wrapper">
        <div className="home_heading__oW6N7">
          <h4>Get In Touch</h4>
        </div>
        <div className="home_content__h_a4D">
          <div className="home_card__d7Bsl">
            <div className="home_cardLogo__MRtbO">
              <img alt="whats app icon" src="/img/home/whatsappIcon.svg" />
            </div>
            <div className="home_cardContent__AF1xk">
              <h6>Chat with us</h6>
              <p>Send us a message</p>
            </div>
            <div className="home_cardSubIcon__LllxH">
              <img alt="right arrow icon" src="/img/home/rightArrowIcon.svg" />
            </div>
          </div>
          
          <Link href="tel:+91 93-55-777-529" className="home_card__d7Bsl" style={{ color: 'black', textDecoration: 'none' }}>
            <div className="home_cardLogo__MRtbO">
              <img alt="phone call icon" src="/img/home/phoneCallIcon.svg" />
            </div>
            <div className="home_cardContent__AF1xk">
              <h6>Talk to us</h6>
              <p>93-55-777-529</p>
            </div>
            <div className="home_cardSubIcon__LllxH">
              <img alt="right arrow icon" src="/img/home/rightArrowIcon.svg" />
            </div>
          </Link>
          
          <Link href="mailto:support@carinfo.app" className="home_card__d7Bsl" style={{ color: 'black', textDecoration: 'none' }}>
            <div className="home_cardLogo__MRtbO">
              <img alt="email icon" src="/img/home/emailIcon.svg" />
            </div>
            <div className="home_cardContent__AF1xk">
              <h6>Write to us</h6>
              <p>support@carinfo.app</p>
            </div>
            <div className="home_cardSubIcon__LllxH">
              <img alt="right arrow icon" src="/img/home/rightArrowIcon.svg" />
            </div>
          </Link>
        </div>
        
        <div className="home_planeImage__QEl_5">
          <img alt="plane icon" src="/img/home/planeIcon.svg" />
        </div>
      </div>
    </div>
  )
}
