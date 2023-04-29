//icons
import Cart from '../icons/Cart'
import Hamburger from '../icons/Hamburger'

//components
import Drawer from './Drawer'
import HeaderInfoBox from './HeaderInfoBox'

//hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useOrderContext } from '../../context/OrderContext'
import { useSharedContext } from '../../context/SharedContext'

export default function CustomerHeader({ tables }: any) {
  const options = tables.map((table: any) => ({
    label: table.tableNumber,
    value: table._id,
  }))
  options.unshift({ label: '?', value: '0' })
  const [selectedTableId, setSelectedTableId] = useState(options[0].value)
  const [generatedPass, setGeneratedPass] = useState(null)
  const { orderItems } = useOrderContext()
  const { isWaiter, setPassword, password, setPasswordCheckResult, isAdmin } =
    useAuthContext()
  const { cartModalStatus, setCartModalStatus, setDrawerStatus } =
    useSharedContext()
  useEffect(() => {
    if (selectedTableId !== '0') {
      // console.log('morghe pokhte ')
      // console.log(e.target.value)
      generateTablePass()
      setPassword('')
      setPasswordCheckResult({
        _id: '',
        password: '',
        tableNumber: 0,
        date: '',
        isPasswordValid: false,
      })
    } else {
      setPassword('')
      setPasswordCheckResult({
        _id: '',
        password: '',
        tableNumber: 0,
        date: '',
        isPasswordValid: false,
      })
    }
  }, [selectedTableId])
  const generateTablePass = () => {
    console.log('yyy')
    console.log(selectedTableId)
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
        return res.json()
      })
      .then((data) => {
        // setGeneratedPass(data.password)
        setPassword(data.password)
        console.log('xxx')
        console.log(data)
      })
      .catch((e) => console.log(e))
  }

  //context

  //function
  const totalPrice = orderItems?.reduce(
    (a: any, b: any) =>
      (typeof a === 'object' ? a.price * a.count : a) + b.price * b.count,
    0
  )

  const totalCount = orderItems?.reduce(
    (a: any, b: any) => (typeof a === 'object' ? a.count : a) + b.count,
    0
  )

  return (
    <div
      className={` flex h-[80px] w-full items-center justify-between ${
        isAdmin ? 'bg-[#ffe001]' : isWaiter ? 'bg-[#36c62c]' : 'bg-[#C62C2C]'
      } p-2`}
    >
      <div className="flex h-fit w-fit items-center gap-2">
        <button className="text-white" onClick={() => setDrawerStatus(true)}>
          <Hamburger />
        </button>
        <Drawer />

        <button
          className="relative text-white"
          onClick={() => {
            if (orderItems.length > 0) {
              setCartModalStatus(!cartModalStatus)
            }
          }}
        >
          <Cart />
          <div className="absolute top-[-4px] right-[-4px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#333]">
            {totalCount}
          </div>
        </button>

        {/* {passwordCheckResult?.isPasswordValid && (
          <>
            <button onClick={() => setCartModalStatus(!cartModalStatus)}>
              <Cart />
            </button>
            <div>{totalPrice} €</div>
          </>
        )} */}
      </div>
      {isWaiter && (
        <div className="flex h-[48px] w-fit items-center gap-2 ">
          <select
            className="h-full w-[70px] rounded-lg px-2 text-[24px]"
            value={selectedTableId}
            onChange={(e) => {
              setSelectedTableId(e.target.value)
            }}
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

          {/* <button
            onClick={() => {
              generateTablePass()
              // console.log(generateTablePass())
              // alert('hey sosis ')
            }}
          >
            <Add />
          </button> */}

          <div className="flex h-full w-[100px] items-center justify-center rounded-lg border bg-white text-[24px]">
            {password}
          </div>
        </div>
      )}
      {!isWaiter && <HeaderInfoBox />}
    </div>
  )
}
