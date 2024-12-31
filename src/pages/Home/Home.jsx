import AdventurePlace from '../../components/section/AdventurePlace'
import Banner from '../../components/section/Banner'
import BestPlace from '../../components/section/BestPlace'
import BlogResourceSection from '../../components/section/BlogResourceSection'
import Contact from '../../components/section/Contact'
import EcoFriendlyTravelTips from '../../components/section/EcoFriendlyTravelTips'
import Testimonals from '../../components/section/Testimonals'

function Home () {
  return (
    <div>
      <Banner />
      <AdventurePlace/>
      <BestPlace/>
      <EcoFriendlyTravelTips/>
      <BlogResourceSection/>
      <Testimonals/>
      <Contact/>
    </div>
  )
}

export default Home
