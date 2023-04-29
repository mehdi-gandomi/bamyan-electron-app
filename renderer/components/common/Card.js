import { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'

export default function Card({ table }) {
  return (
    <>
      <div className="relative h-fit  w-[320px] break-inside-avoid justify-end border-2 border-dotted bg-[#ffffff] p-[30px]">
        {/* {    {props.tableSpecification[key]===40 ?style={{ marginTop: '100px' }} : style={{ marginTop: '100px' }} }} */}
        <img
          className={
            'h-136 absolute top-[8px] right-[8px] flex w-[120px] justify-items-end '
          }
          src={
            'https://res.cloudinary.com/ingootag-com/image/upload/v1650111320/samples/food/%DA%AF%D9%88%D8%B4%D9%87_%D8%B1%D8%A7%D8%B3%D8%AA_rdsyxr.png'
          }
          alr={'Bote jeghe Irani'}
        />
        <img
          className={
            'h-136 absolute bottom-[8px] left-[8px] flex w-[120px] rotate-180 justify-items-end '
          }
          src={
            'https://res.cloudinary.com/ingootag-com/image/upload/v1650111320/samples/food/%DA%AF%D9%88%D8%B4%D9%87_%D8%B1%D8%A7%D8%B3%D8%AA_rdsyxr.png'
          }
          alr={'Bote jeghe Irani'}
        />
        <div className="z-20 flex h-fit w-full break-inside-avoid flex-col items-center gap-[16px] rounded-[16px] border px-[16px] py-[32px] shadow-lg">
          <div className="text-[20px] font-semibold">Digitale Speisekarte</div>
          <div className="absolute bottom-10 right-12 text-[20px] font-semibold">
            #{table.tableNumber}
          </div>
          <div className="font-['Brush Script MT'] flex flex-col gap-[8px]">
            <QRCode size={100} value={'https://www.bamyan-kabab.de/menu'} />
            {/* {tables && tables.map((table) => <div>111</div>)} */}
          </div>
        </div>
      </div>
    </>
  )
}
