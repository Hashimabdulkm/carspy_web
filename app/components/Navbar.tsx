'use client'

import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="navbar_stickyNav__P71MJ navbar_scrolled__0pyke">
      <div className="navbar_navbar__EbVIJ content-wrapper">
        <Link href="/" className="navbar_carInfo__sE8YS">
          <img alt="carInfo" src="/svg/carinfofooter.svg" />
        </Link>
        
        <div className="navbar_locationLogin__guwUg">
          <div>
            <div className="navbar_location__EKJqs">
              <div className="navbar_locationIcon__bpILa">
                <img alt="green location" src="/svg/greenLocationIcon.svg" />
              </div>
              <div className="navbar_city___Ue2C">Delhi</div>
              <img alt="download icon" src="/svg/downArrowGreen.svg" />
            </div>
          </div>
        </div>
        
        <ul className="navbar_navList__8cu40">
          <li className="navbar_dropdown__qnxi_">
            <div>
              <p className="navbar_dropDownItem__PsHdt">
                Vehicle Info
                <img alt="down arrow" src="/svg/drownArrow.svg" />
              </p>
            </div>
            <div className="navbar_dropdownContent__xgGRZ">
              <ul>
                <li><Link href="/rc-search">RC Details</Link></li>
                <li><Link href="/e-challan-check">Challans</Link></li>
                <li><Link href="/rto-vehicle-registration-detail">RTO Details</Link></li>
                <li><Link href="/service-history">Service History</Link></li>
              </ul>
            </div>
          </li>
          
          <li className="navbar_dropdown__qnxi_">
            <div>
              <p className="navbar_dropDownItem__PsHdt">
                Buy Car
                <img alt="down arrow" src="/svg/drownArrow.svg" />
              </p>
            </div>
            <div className="navbar_dropdownContent__xgGRZ">
              <ul>
                <li><Link href="/new-cars">New Cars</Link></li>
                <li><Link href="/used-cars-in-delhi">Used Cars</Link></li>
              </ul>
            </div>
          </li>
          
          <li className="navbar_dropdown__qnxi_">
            <div>
              <p className="navbar_dropDownItem__PsHdt">
                Insurance
                <img alt="down arrow" src="/svg/drownArrow.svg" />
              </p>
            </div>
            <div className="navbar_dropdownContent__xgGRZ">
              <ul>
                <li><Link href="/car-insurance">Car Insurance</Link></li>
                <li><Link href="/bike-insurance">Bike Insurance</Link></li>
              </ul>
            </div>
          </li>
          
          <li className="navbar_dropdown__qnxi_">
            <Link className="" href="/partner-form?utm_medium=nav_bar">CarInfo For Business</Link>
          </li>
          
          <li className="navbar_dropdown__qnxi_">
            <Link className="" href="/contact-us?utm_medium=nav_bar">Contact Us</Link>
          </li>
          
          <li className="navbar_dropdown__qnxi_">
            <div>
              <p className="navbar_dropDownItem__PsHdt">
                More
                <img alt="down arrow" src="/svg/drownArrow.svg" />
              </p>
            </div>
            <div className="navbar_dropdownContent__xgGRZ">
              <ul>
                <li><Link href="/sell-car">Sell Car</Link></li>
                <li><Link href="/loans">Loans</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
              </ul>
            </div>
          </li>
        </ul>
        
        <div aria-label="Toggle dropdown" className="navbar_searchContainer__qPQ_R">
          <div className="navbar_reactTypewritter__h7LEz">
            <span>Search By Vehicle No.</span>
          </div>
          <img alt="search icon" className="navbar_searchImg__tqOPj" src="/svg/searchIcon.svg" />
        </div>
        
        <div className="navbar_loggedContainer__QzyDd">
          <img alt="user logged in" src="/svg/userLoggedInIcon.svg" />
        </div>
      </div>
    </nav>
  )
}
