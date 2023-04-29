//library
import { useState } from 'react'
import Link from 'next/link'

//icons
import Hamburger from '../icons/Hamburger'
import Cart from '../icons/Cart'
import Add from '../icons/Add'

export default function WaiterHeader({ options }: { options: any }) {
  const [selectedTableId, setSelectedTableId] = useState(options[0].value)
  const [generatedPass, setGeneratedPass] = useState(null)
  const generateTablePass = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/table/addPassword/${selectedTableId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          tableNumber: options.find(
            (option: any) => option.value === selectedTableId
          ).label,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((res) => {
        // alert('Miou')
        return res.json()
      })
      .then((data) => {
        setGeneratedPass(data.password)
      })
      .then((data) => {
        console.log(data)
      })
      .catch((e) => console.log(e))
  }
  return (
    <div className="flex h-[70px] w-full items-center justify-between bg-[#2ac940] p-2">
      <div className="mb-2 flex h-fit w-fit items-center gap-2">
        {/* <Hamburger /> */}
        <Link href="/menu">
          <button
            className="w-[80px]"
            // onClick={toggleShowMore}

            // className="text-md mx-auto mt-5 block rounded-lg bg-[#1baa05] p-4 text-white xl:text-3xl"
          >
            <img className="rounded-lg" src="/logos/menu.png" />
          </button>
        </Link>
        <Cart />
      </div>
      <div className="flex h-fit w-fit items-center gap-2 ">
        <select
          value={selectedTableId}
          onChange={(e) => setSelectedTableId(e.target.value)}
        >
          {options.map((option: any) => (
            <option
              key={option.value}
              value={option.value}
              // selected={option.value === selectedTableId}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div>
          <button
            onClick={() => {
              generateTablePass()
              // console.log(generateTablePass())
              // alert('hey sosis ')
            }}
          >
            <Add />
          </button>
        </div>
        <div className="flex h-6 w-[100px] items-center justify-center rounded-lg border bg-white">
          {generatedPass}
        </div>
      </div>
    </div>
  )
}
