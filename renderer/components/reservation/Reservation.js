import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Reservation = () => {
  return (
    <div
      id="reservation"
      className="flex justify-center overflow-hidden lg:mt-20 lg:mb-40"
    >
      <div className="invisible overflow-hidden lg:visible lg:my-auto">
        {/* <img
          className="p-10 transition duration-1000 ease-in-out hover:scale-110"
          src="https://res.cloudinary.com/ingootag-com/image/upload/v1650019273/samples/food/ilovepdf_pages-to-jpg/galerie-5-gr_mb1yeq.jpg"
        /> */}
      </div>
      <div className="my-auto flex flex-col justify-center p-5 md:p-20 ">
        <a
          className="mb-10 h-[50px] w-[full] p-0"
          href="https://wa.me/+491785858544"
        >
          {/* md:h-30 mx-auto h-20 w-60 fill-orange md:my-5 md:w-20 md:py-0" */}
          <div
            className="
            h-22   md:3 mx-auto
             w-20 fill-[#28D146] md:my-5 md:w-20"
          >
            <img src="https://res.cloudinary.com/ingootag-com/image/upload/v1651327654/samples/food/whatsapp-icon-png-image-28_kjoqcf.png" />
          </div>
        </a>
        <p className="mt-3 text-center text-3xl font-bold text-[#28D146] md:my-auto md:text-4xl">
          Zur Tischreservierung, drücken Sie mich !
        </p>
      </div>
      <div className="invisible overflow-hidden lg:visible lg:my-auto">
        <img
          className="p-10 transition duration-1000 ease-in-out hover:scale-110"
          src="https://res.cloudinary.com/ingootag-com/image/upload/v1650019251/samples/food/ilovepdf_pages-to-jpg/galerie-1-gr_kjeqmh.jpg"
        />
      </div>
    </div>
  )
}

export default Reservation
