import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function UserToken404() {
  return (
    <main className="h-screen overflow-y-auto bg-white bg-gradient-to-b">
      <div className="fontsize-12 mt-[300px] flex h-[300px] w-full flex-col items-center justify-between font-bold ">
        <div className=" m-[300px] mt-0 mb-2 flex items-center justify-center text-center text-4xl font-normal leading-normal text-[#564611]">
          Willkommen bei BamyanKabab, Bitte Hier Klicken
        </div>
        <Link href="/">
          <button className="mt-9 h-[200px] w-[200px] rounded border-b-4 border-red-700 bg-[#464715] py-2 px-4 text-5xl font-bold text-white hover:border-red-500 hover:bg-yellow-400">
            <img src="https://res.cloudinary.com/ingootag-com/image/upload/v1649873490/samples/food/ilovepdf_pages-to-jpg/Logobamian_bioomu.png"></img>
          </button>
        </Link>
      </div>
    </main>
  )
}

export default UserToken404
