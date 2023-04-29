import { useState } from 'react'
import Hamburger from '../../components/icons/Hamburger'
import Close from '../../components/icons/Close'

// this header is not directly used in the website => inside the Nav component
const socialNetworkList = [
  {
    id: 0,
    image: '/logos/facebook.png',
    alt: 'facebook',
    link: 'https://www.facebook.com/BamyanKabab/',
  },
  { id: 1, image: '/logos/tiktok.png', alt: 'tiktok', link: '#' },
  {
    id: 2,
    image: '/logos/instagram.png',
    alt: 'instagram',
    link: 'https://www.instagram.com/bamyan.kabab/',
  },
  {
    id: 3,
    image: '/logos/whatsapp.png',
    alt: 'whatsapp',
    link: 'https://wa.me/+491785858544',
  },
  { id: 4, image: '/logos/website.png', alt: 'website', link: '#' },
]

function Header() {
  const [drawerStatus, setDrawerStatus] = useState(false)
  return (
    <>
      <header className=" fixed z-20 flex h-[60px] w-full bg-transparent p-[15px]">
        <button
          onClick={() => setDrawerStatus((prevStatus) => !prevStatus)}
          className="border-color-black border-white-500/50 flex h-[35px] w-[35px] animate-pulse items-center justify-center rounded-lg border-4 bg-slate-200"
        >
          {drawerStatus ? <Close /> : <Hamburger />}
        </button>
      </header>
      <div
        className={` fixed  z-10 flex flex-col items-center gap-[15px] ${
          drawerStatus ? 'left-0' : 'left-[-60px]'
        } top-0 h-screen w-[60px] transition-all duration-300`}
      >
        <div className="h-[60px] w-full"></div>
        {socialNetworkList.map((socialNetwork) => (
          <SocialNetworkButtons
            key={socialNetwork.id}
            socialNetwork={socialNetwork}
          />
        ))}
      </div>
    </>
  )
}

import React from 'react'

function SocialNetworkButtons(props) {
  return (
    <a href={props.socialNetwork.link} target="_blank" rel="noreferrer">
      <img
        className="h-[30px] w-[30px] rounded-md"
        src={props.socialNetwork.image}
        alt={props.socialNetwork.alt}
      />
    </a>
  )
}

export default Header
