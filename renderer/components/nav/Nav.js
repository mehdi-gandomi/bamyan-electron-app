import { React, useState } from 'react'
import Hamburger from '../../components/icons/Hamburger'
import Close from '../../components/icons/Close'
import Link from 'next/link'
import NextNProgress from 'nextjs-progressbar'

const headerList = [
  {
    link: '#',
    id: 0,
    text: 'STARTSEITE',
  },
  {
    link: '#uber',
    id: 1,
    text: 'ÜBER UNS',
  },
  {
    link: '#speisen',
    id: 2,
    text: 'SPEISEN',
  },
  {
    link: '#reservation',
    id: 3,
    text: 'TISCHRESERVIERUNG',
  },
  {
    link: '#galerie',
    id: 4,
    text: 'GALERIE',
  },
  {
    link: '/menu',
    id: 4,
    text: 'MENU',
  },
]

const Header = () => {
  // function HeaderButtons(props) {
  //   return <button>{props.header.text}</button>
  // }

  const [drawerStatus, setDrawerStatus] = useState(false)
  return (
    <div className=" sg:h-[70px] h-[80px] bg-[#c62c2c] lg:h-[120px]">
      <div className="sg:h-[70px] fixed z-20 flex h-[80px] w-full justify-between gap-[3px] bg-[#c62c2c] bg-opacity-95 lg:h-[120px]">
        {/* <div className="animated-animate my-2 mx-2 w-[90px] lg:mx-10 lg:my-0 lg:h-[120px] lg:w-[180px]">
          <img
            // src="https://res.cloudinary.com/ingootag-com/image/upload/v1651328815/samples/food/LogoBamyanPng_prfpeo.png"
            src="/images/logo.png"
          />
        </div> */}
        <div className="bg-[red]-100 animate-transition my-1 mx-1 w-[70px] lg:mx-10 lg:my-0 lg:h-[100px] lg:w-[110px]">
          <img
            // src="https://res.cloudinary.com/ingootag-com/image/upload/v1651328815/samples/food/LogoBamyanPng_prfpeo.png"
            src="/images/sikhBamyan.png"
          />
        </div>
        <Link href="/menu">
          <a
            className="active:bg-black-700 w-[80px] active:border-4 md:w-[90px] md:p-2 lg:w-[140px]"
            //  onClick={toggleShowMore}
            // className="text-md mx-auto mt-5 block rounded-lg bg-[#1baa05] p-4 text-white xl:text-3xl"
          >
            <img className="rounded-lg" src="/logos/menu.png" />
          </a>
        </Link>
        <>
          <header className="z-20 flex h-[70px] bg-transparent p-[25px] lg:p-[35px]">
            <button
              onClick={() => setDrawerStatus((prevStatus) => !prevStatus)}
              className="border-color-black border-white-500/50 flex  h-[35px] w-[35px]  animate-pulse  items-center justify-center  rounded-lg border-4 bg-slate-200  lg:h-[55px] lg:w-[55px]"
            >
              {drawerStatus ? <Close /> : <Hamburger />}
            </button>
          </header>
          <div
            className={`fixed z-10 flex flex-col gap-[14px]  bg-[#333333] p-[10px] ${
              drawerStatus ? 'right-[-30px]' : 'right-[-300px]'
            } top-0 w-[220px] transition-all duration-300`}
          >
            <div className="h-100vm w-full "></div>
            {headerList.map((header, index) => (
              <Link href={header.link} key={index}>
                <div className="p-[6px] text-white">
                  <button key={header.id}>{header.text}</button>
                </div>
              </Link>
            ))}
          </div>
        </>
      </div>
    </div>
  )
}

export default Header

// import Hamburger from '../../components/icons/Hamburger'
// import Close from '../../components/icons/Close'

// function Header() {
//   const [drawerStatus, setDrawerStatus] = useState(false)
//   return (

//   )
// }

// <nav className="bg-white p-2 shadow md:flex md:items-center md:justify-around lg:p-5">
//   <div className="flex items-center justify-between">
//     <span className="cursor-pointer font-[Poppins] text-2xl">
//
//     </span>
//   </div>
//   <ul className="absolute left-0 top-[-400px] z-[-1] w-full bg-white py-4 pl-7 text-xl font-bold opacity-0 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:py-0 md:pl-0 md:opacity-100">
//     <li className="mx-4 my-6  md:my-0">
//       <a
//         href="#"
//         className="border-b-4 border-white py-4 text-[#c62c2c] duration-500 hover:border-orange hover:text-orange"
//       >
//         STARTSEITE
//       </a>
//     </li>
//     <li className="mx-4 my-6 md:my-0">
//       <a
//         href="#uber"
//         className="border-b-4 border-white py-4 text-[#c62c2c]  duration-500 hover:border-orange hover:text-orange"
//       >
//         ÜBER UNS
//       </a>
//     </li>
//     <li className="mx-4 my-6 md:my-0">
//       <a
//         href="#speisen"
//         className="border-b-4 border-white py-4 text-[#c62c2c] duration-500 hover:border-orange hover:text-orange"
//       >
//         SPEISEN
//       </a>
//     </li>
//     <li className="mx-4 my-6 md:my-0">
//       <a
//         href="#reservation"
//         className="border-b-4 border-white py-4 text-[#c62c2c] duration-500 hover:border-orange hover:text-orange"
//       >
//         TISCHRESERVIERUNG
//       </a>
//     </li>
//     <li className="mx-4 my-6 md:my-0">
//       <a
//         href="#galerie"
//         className="border-b-4 border-white py-4 text-[#c62c2c] duration-500 hover:border-orange hover:text-orange"
//       >
//         GALERIE
//       </a>
//     </li>

//     <li className="mx-4 my-6 md:my-0">
//       <a
//         href="#"
//         className="border-b-4 border-white py-4 text-[#c62c2c] duration-500 hover:border-orange hover:text-orange"
//       >
//         JOBS
//       </a>
//     </li>

//     <h2 className=""></h2>
//   </ul>
// </nav>
