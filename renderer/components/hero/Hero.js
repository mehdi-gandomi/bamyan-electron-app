import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'

const Hero = () => {
  return (
    <div className="lg:md-10 flex flex-col gap-0 bg-[#1c1c1c] text-center lg:h-[660px] lg:flex-row lg:gap-0">
      <div className="lg:md-10 ml-8 bg-[#1c1c1c] md:h-[160px] lg:ml-0 lg:h-[660px]"></div>
      <div className="order-last flex basis-1/2 flex-col bg-[#1c1c1c] py-0 px-10 font-semibold lg:items-center lg:py-5">
        <h1 className="mt-8 gap-2 text-3xl font-bold text-[#da0812] xl:pt-10 xl:text-6xl">
          Kababs vom <span>Holzkohlgrill</span>
        </h1>
        <h2 className="mb-0 py-5 text-2xl text-[#ffffff]">
          Afghanische, Iranische und Türkische Spezialitäten
        </h2>
        <a
          href="#reservation"
          className="animate-pulse rounded-lg bg-[#FF8C01] p-4 text-2xl text-black xl:text-3xl"
        >
          Tischreservierung
        </a>
        <div className="m-2 flex justify-center gap-5 rounded-lg py-5 text-5xl xl:text-3xl">
          <a className="w-[30px]" href="https://www.facebook.com/BamyanKabab/">
            <img className="rounded-lg" src="/logos/facebook.png" />
          </a>
          <a
            href="https://www.instagram.com/bamyan.kabab/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/logos/instagram.png"
              className="h-[30px] w-[30px] overflow-hidden rounded-lg"
            />
          </a>
          <a className="w-[30px]" href="https://wa.me/+491785858544">
            <img className="rounded-lg" src="/logos/whatsapp.png" />
          </a>
          <a
            className="w-[30px]"
            href="https://www.tiktok.com/@mirblank1/video/7038367899261652230"
          >
            <img className="rounded-lg" src="/logos/tiktok.png" />
          </a>
        </div>
      </div>
      <div className="lg:w-[1500px]">
        <img
          className="clip-your-needful-style xl:clip-your-needful-style visible h-[290px] w-full bg-black  lg:mb-12 lg:h-[auto]"
          src="heroTop.gif"
          alt="loading..."
        />
      </div>
    </div>
  )
}

export default Hero
