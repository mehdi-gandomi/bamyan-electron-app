import Link from 'next/link'
//icons
import Close from '../icons/Close'
import Phone from '../icons/Phone'
import Time from '../icons/Time'
import Home from '../icons/Home'

//hooks
import { useSharedContext } from '../../context/SharedContext'
import { useEffect } from 'react'

type Props = {}

export default function Drawer({}: Props) {
  const { drawerStatus, setDrawerStatus } = useSharedContext()
 
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-10 h-screen  w-[340px] shadow-2xl ${
          drawerStatus ? 'translate-x-0' : 'translate-x-[-340px]'
        }   bg-[#e5e5e5] px-2 pt-[20px] duration-200`}
      >
        <div className="relative flex h-full w-full flex-col items-center gap-[20px]">
          <button
            className="flex w-full justify-end"
            onClick={() => setDrawerStatus(false)}
          >
            <Close />
          </button>
          <div className="flex w-full justify-center text-[28px] font-bold">
            Bamyan Kebab
          </div>
          <div className="mt-[40px] flex w-full flex-col gap-[10px]">
            <div className="flex w-full items-center gap-[10px] text-[14px] font-bold">
              <div className="h-6 w-6">
                <Phone />
              </div>
              <div>020145864519</div>
            </div>

            <div className="flex w-full items-center gap-[10px] text-[14px] font-bold">
              <div className="h-6 w-6">
                <Time />
              </div>
              <div>
                öffnungszeiten:
                <br />
                Montags 25 Juli bis - Donerstag 25 Juli bleibt das Geschäft
                geschlossen
                <br />
                So bis Do. 12:00 bis 22:00 Uhr.
                <br />
                Fr und Sa 12:00 bis 23:00 Uhr.
              </div>
            </div>
            <div className="flex w-full items-center gap-[10px] text-[14px] font-bold">
              <div className="h-6 w-6">
                <Home />
              </div>
              <div>Altendorfer Str.318 45143 Essen</div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="m-2 flex justify-center gap-5 py-5 text-4xl xl:text-3xl">
              <a
                href="https://www.facebook.com/BamyanKabab/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/logos/facebook.png"
                  className="h-[30px] w-[30px] overflow-hidden rounded-lg"
                />
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
              <a
                href="https://wa.me/+491785858544"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/logos/whatsapp.png"
                  className="h-[30px] w-[30px] overflow-hidden rounded-lg"
                />
              </a>
              <a
                href="https://www.tiktok.com/@mirblank1/video/7038367899261652230"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/logos/tiktok.png"
                  className="h-[30px] w-[30px] overflow-hidden rounded-lg"
                />
              </a>
            </div>
          </div>
          
          <div>
            <Link href="/">
              <button
                className="w-[70px]"
                //  onClick={toggleShowMore}

                onClick={() => {}}
                // className="text-md mx-auto mt-5 block rounded-lg bg-[#1baa05] p-4 text-white xl:text-3xl"
              >
                <img className="rounded-lg" src="/logos/website.png" />
                Zurück zur Website
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div
        className={`fixed top-0 right-0  z-10 flex h-screen w-[calc(98vw-340px)] duration-200 ${
          !drawerStatus ? 'translate-x-[calc(100vw-340px)]' : 'translate-x-0'
        }  flex-col items-center gap-[40px] bg-black bg-opacity-60 `}
      ></div> */}
    </>
  )
}
