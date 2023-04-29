import type { NextPage } from 'next'

import Nav from '../components/nav/Nav.js'
import Hero from '../components/hero/Hero.js'
import Teasor from '../components/teasor/Teasor.js'
import FoodAlbum from '../components/foodAlbum/FoodAlbum.js'
import Cards from '../components/cards/Cards.js'
import Reservation from '../components/reservation/Reservation.js'
import Contact from '../components/contact/Contact.js'
import Footer from '../components/footer/Footer.js'

const Home: NextPage = () => {
  return (
    <div className=" bg-[#1c1c1c]">
      {/* -------------------------------- Header -------------------------------------- */}
      <Nav />
      {/* -------------------------------- Hero ---------------------------------------- */}
      <Hero />
      {/* -------------------------------- Teasor ---------------------------------------- */}
      {/* <div className="items-center justify-center bg-[#1c1c1c]">
        <FoodAlbum />
      </div> */}
      <Teasor />
      {/* -------------------------------- Menu ---------------------------------------- */}
      {/* -------------------------------- Cards --------------------------------------- */}
      <div className="items-center justify-center bg-[#1c1c1c]">
        <Cards />
      </div>
      {/* -------------------------------- Reservation ---------------------------------------- */}
      <div className="items-center justify-center bg-[#1c1c1c]">
        <Reservation />
      </div>
      {/* ----------------- -------------- Contact -------------------------------------- */}
      <div className="items-center justify-center bg-[#1c1c1c]">
        <Contact />
      </div>
      {/* ----------------- -------------- Footer -------------------------------------- */}
      <Footer />
    </div>
  )
}

export default Home
