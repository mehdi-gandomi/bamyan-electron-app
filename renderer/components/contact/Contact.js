import React from 'react'
import { FaPhone } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'

const Contact = () => {
  return (
    <footer
      id="kontakt"
      className=" mt-5border-t-4 overflow-hidden border-[#c62c2c] bg-[#e8e7e7] md:flex"
    >
      <div className="w-4/4 p-5 text-xl md:w-1/3">
        <img
          className="mx-0 mt-5 mb-10 w-[80px] rounded-lg md:w-20"
          src="https://res.cloudinary.com/ingootag-com/image/upload/v1651328815/samples/food/LogoBamyanPng_prfpeo.png"
        />
        <div className="flex flex-row  p-2">
          <a>
            <FaPhone className="h-10 fill-[#000000]" />
          </a>
          <p className="ml-10">020145864519</p>
        </div>

        <div className="flex flex-row p-2">
          <a>
            <FaRegClock className="h-10 fill-[#000000] text-teal-500" />
          </a>
          <p className="ml-10">
            <ul>
              <li>
                !!! Montags 25 Juli bis - Donerstag 25 Juli bleibt das Geschäft
                geschlossen
              </li>
              <li>Montags - Donerstag: Von 12:00 Bis 22:00</li>
              <li>Freitag - Samstag: Von 12:00 bis 23:00</li>
              <li>Sonntags: 12:00 bis 22:00</li>
            </ul>
          </p>
        </div>

        <div className="flex flex-row p-2">
          <a>
            <FaHome className="h-10 fill-[#000000]" />
          </a>
          <p className="text-neworange ml-10">
            <ul>
              <li>Altendorfer Str.318</li>
              <li>45143 Essen</li>
            </ul>
          </p>
        </div>
      </div>
      <iframe
        className="w-0/4 invisible h-[0px] flex-auto md:visible md:h-[500px] md:w-2/3"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.8129963541273!2d6.974277115768302!3d51.46158977962768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8c28eb8c921bb%3A0xbfb8c1cc8c362311!2sBamyan%20Kabab%20Restaurant!5e0!3m2!1sen!2sde!4v1650129800197!5m2!1sen!2sde"
        width=""
        height=""
        style={{ border: 10 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </footer>
  )
}
export default Contact
