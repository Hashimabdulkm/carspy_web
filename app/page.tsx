import { HeroSection } from './components/HeroSection'
import { BannerSection } from './components/BannerSection'
import { TrendingCars } from './components/TrendingCars'
import { UsedCars } from './components/UsedCars'
import { CustomerReviews } from './components/CustomerReviews'
import { CuratedServices } from './components/CuratedServices'
import { BlogSection } from './components/BlogSection'
import { GetInTouch } from './components/GetInTouch'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white min-w-0 overflow-x-hidden">
      <HeroSection />
      <BannerSection />
      <TrendingCars />
      <UsedCars />
      <CustomerReviews />
      <CuratedServices />
      <BlogSection />
      <GetInTouch />
      <Footer />
    </div>
  )
}
