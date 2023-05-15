import { useEffect, useRef, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
const { ipcRenderer } = require('electron')
import Delete from '../components/icons/Delete'

import ClipLoader from 'react-spinners/ClipLoader'
import TailWindModal from '../components/tailWindModal/TailWindModal'
import UserLoginModal from '../components/userLoginModal/UserLoginModal'
import { Extra } from '../types/extra'
import { OrderItemType } from '../types/order'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'

// class SW {
//   private weekday: string
//   private getDay: number

//   calculateWeekDays(_oder: { orderTime: NewType | number | Date }) {
//     const weekday: string = [
//       'Sunday',
//       'Monday',
//       'Tuesday',
//       'Wednesday',
//       'Thursday',
//       'Friday',
//       'Saturday',
//     ]
//     const d = new Date(_oder.orderTime).getDay()
//     let WName = weekday[d.getDay()]
//     return WName
//   }
// }

export default function Orders(): JSX.Element {
  const [length, setLength] = useState(0)
  const isMounted = useRef(false)
  const audio = useRef<HTMLAudioElement>(null)
  const [isPermmited, setIsPermmited] = useState(false)
  const [printerIp,setPrinterIp]=useState("")
  const resetAllTables = () => {
    fetch(`https://bamiyan-kebab-backend.herokuapp.com/order/allOrder`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data })
        // mutate()
      mutate(`https://bamiyan-kebab-backend.herokuapp.com/order/summary`)
      })
      .catch((err) => console.log({ err }))
  }

  const [collapsedOrderId, setCollapsedOrderId] = useState<string | undefined>(
    undefined
  )
  const [modalIsOpen, setIsOpen] = useState(false)
  const [userLoginModalIsOpen, setUserLoginModalIsOpen] = useState(true)

  useEffect(() => {}, [modalIsOpen])
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {}, [userLoginModalIsOpen])
  function openUserLoginModal() {
    setUserLoginModalIsOpen(true)
  }

  function closeUserLoginModal() {
    setUserLoginModalIsOpen(false)
  }

  const { mutate } = useSWRConfig()

  const fetcher = (url: string) =>
    fetch("https://bamiyan-kebab-backend.herokuapp.com" + url).then((res) => res.json())
  const {
    data: ordersSummary,
    error: ordersSummaryError,
    isValidating: orderSummaryIsValidating,
  } = useSWR(`/order/summary`, fetcher, {
    refreshInterval: 5000,
  })

  console.log({ ordersSummary })
  const setThePrinterIp=()=>{
    localStorage.setItem("printerIp",printerIp)
    NotificationManager.success('Printer ip set successfully', 'Success!');
  }
  useEffect(() => {}, [ordersSummary])

  useEffect(() => {
    // console.log(window.electron,"electron")
    
    if (
      isMounted?.current &&
      ordersSummary &&
      
      ordersSummary?.length > length
    ) {
      if(isPermmited){
        audio.current?.play()  
      }
      
      if(!ordersSummary[0].printed){
        console.log(ordersSummary[0], 'printing')
      ipcRenderer.send('print', {ip:printerIp,order:ordersSummary[0]}); 
      }
      NotificationManager.success('New Order!');
    }
    setLength(ordersSummary?.length || 0)
  }, [ordersSummary])

  useEffect(() => {
    isMounted.current = true
    if(localStorage){
      const lastIp=localStorage.getItem("printerIp")
      setPrinterIp(lastIp)
    }
    const permissions = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })

    permissions
      .then(() => {
        console.log('granted')

        setIsPermmited(true)
      })
      .catch(() =>{
        // alert('Please grant audio permission')
        NotificationManager.warning('Please grant audio permission', '', 30000);
      })
  }, [])

  // const fetcher2 = (url: string) => fetch(url).then((res) => res.json())
  const { data: singleOrder, error: singleOrderError } = useSWR(
    collapsedOrderId ? `/order?id=${collapsedOrderId}` : null,
    fetcher,
    { refreshInterval: 10000 }
  )

  console.log({ singleOrder })

  const deleteSingleOrder = async (e: any, id: string) => {
    await fetch(`https://bamiyan-kebab-backend.herokuapp.com/order`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    mutate(`https://bamiyan-kebab-backend.herokuapp.com/order/summary`)
    e.stopPropagation()
  }

  return (
    // <div className="max-w-screen flex min-h-screen w-screen items-center justify-center bg-img2 p-20">
    <div className="m:overflow-auto flex min-h-screen w-screen flex-col bg-transparent text-center ">
      <NotificationContainer />
      {/* {orderSummaryIsValidating && (
        <div className="fixed top-2 left-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2">
          <ClockLoader size={20} />
        </div>
      )} */}
      <div className="invisible">
        {' '}
        <audio controls ref={audio}>
          <source src="/audios/ding.mp3" type="audio/mpeg" />
        </audio>{' '}
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/ingootag-com/image/upload/v1650366747/samples/food/pexels-lukas-349610_y0to1k.jpg"
          alt="background"
          className="absolute top-0 right-0 -z-10 h-full w-full object-cover "
        />
      </div>
      {!ordersSummary && !ordersSummaryError && (
        <ClipLoader size={120} color="white" />
      )}
      {ordersSummaryError && (
        <div className="text-white">Sorry , there is an error.</div>
      )}
      {ordersSummary && (
        <div className="mg:p-8  mg:overflow-scroll mb-[100px] pt-[30px] sm:pb-10 lg:p-10">
          {!userLoginModalIsOpen ? null : (
            <UserLoginModal
              openModal={openUserLoginModal}
              closeModal={closeUserLoginModal}
            />
          )}
          <div className="w-full  rounded-lg bg-[#ffffffca] p-0">
            <table className="w-full">
              <thead className="border-b ">
                <tr className="bg-black px-2 py-4 text-[#ffffff]">
                  <th>status</th>
                  <th>Tisch Nummer</th>
                  <th>Zeit </th>
                  <th>Admin table control</th>
                  <th>Kellner Name</th>
                  <th className="text-center">Remove </th>
                </tr>
              </thead>
              <tbody>
                {ordersSummary?.map((order: any, index: number) => (
                  <>
                    <tr
                      key={order._id + order._id}
                      className={`cursor-pointer border-b duration-150 hover:scale-[1.005] hover:bg-blue-100 ${
                        order._id === collapsedOrderId && 'bg-blue-300'
                      }`}
                      onClick={() => {
                        if (order._id == collapsedOrderId) {
                          setCollapsedOrderId('')
                        } else {
                          setCollapsedOrderId(order._id)
                        }
                      }}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        # {order.code}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                        {order.table.tableNumber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                        {`${new Date(order.orderTime).getHours()}:${new Date(
                          order.orderTime
                        ).getMinutes()}`}
                        <br />
                        {new Date(order.orderTime).getDay()}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 font-semibold text-gray-900">
                        {order.tableStatus.title}
                      </td>
                      <td>Hasan</td>
                      <td className=" pl-[30px] text-sm font-semibold text-red-600">
                        <div onClick={(e) => deleteSingleOrder(e, order._id)}>
                          <Delete />
                        </div>
                      </td>
                    </tr>
                    {order._id === collapsedOrderId && (
                      <>
                        <tr
                          key={order._id}
                          className={`border-b`}
                          onClick={() => setCollapsedOrderId(order._id)}
                        >
                          <td
                            colSpan={5}
                            className="divide-y px-6 py-4 text-sm font-medium  text-gray-900"
                          >
                            {!singleOrder && !singleOrderError && (
                              <div className="flex w-full items-center justify-center">
                                <ClipLoader size={40} color="black" />
                              </div>
                            )}
                            {singleOrderError && !singleOrder && (
                              <div className="text-white">
                                Sorry , there is an error.
                              </div>
                            )}
                            {singleOrder &&
                              singleOrder?.map((item: any) => (
                                <div key={item._id}>
                                  <div className=" flex content-start justify-between">
                                    <div className="justify-items-start">
                                      <div className="bold block p-1 text-2xl">
                                        {item.title}
                                      </div>
                                      <div className="bold w-0 p-2 text-xl text-[#2784dc]">
                                        {`${item.count} `}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xl">
                                        Price : {item.price} €
                                      </div>
                                      <div className="text-xl">
                                        Total : {item.price * item.count} €
                                      </div>
                                    </div>
                                  </div>
                                  {item?.extras && (
                                    <div className="flex gap-4 text-xl text-stone-500">
                                      {item.extras.map(
                                        ({
                                          extra,
                                          count,
                                        }: {
                                          extra: Extra
                                          count: number
                                        }) => (
                                          <>
                                            {count > 0 ? (
                                              <div
                                                key={extra.price + extra.title}
                                                className="flex"
                                              >
                                                <div>{extra.title}:</div>
                                                <div>{count}</div>
                                                <div className="text-l mx-2">
                                                  Price : {extra.price * count}{' '}
                                                  €
                                                </div>
                                              </div>
                                            ) : undefined}
                                          </>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            {singleOrder && (
                              <div className="flex">
                                <div
                                  className={`${
                                    !order.hasTip && 'text-xl text-red-600'
                                  }`}
                                >
                                  Total :{' '}
                                  {(singleOrder as OrderItemType[])?.reduce(
                                    (a, b) => {
                                      return (
                                        a +
                                        (b.count * b.price +
                                          b.extras?.reduce(
                                            (acc, { extra, count }) =>
                                              acc + count * extra.price || 0,
                                            0
                                          ))
                                      )
                                    },
                                    0
                                  )}
                                  €
                                </div>
                                {order.hasTip && (
                                  <div className="whitespace-pre">
                                    {' '}
                                    x 10%(tip added by client) ={' '}
                                    <span className="text-red-600">
                                      {(singleOrder as OrderItemType[])?.reduce(
                                        (a, b) =>
                                          a +
                                          (b.count * b.price +
                                            b.extras.reduce(
                                              (acc, { extra, count }) =>
                                                acc + extra.price * count,
                                              0
                                            )),
                                        0
                                      ) * 1.1}{' '}
                                      €
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>{order.description || ''}</td>
                        </tr>
                      </>
                    )}
                  </>
                ))}
              </tbody>
            </table>
            {!!ordersSummary?.length && (
              <div className="fixed bottom-0 w-full p-9 ">
                <button
                  className=" w-fit rounded-xl border-2 border-red-500 bg-transparent bg-white/30 px-6 py-3 font-bold backdrop-blur-md hover:bg-black hover:text-white"
                  onClick={() => {
                    openModal()
                  }}
                  // onClick={openModal}
                  type="button"
                >
                  Reset All Tables
                </button>
              </div>
            )}
            
          </div>
          <div style={{width:"300px"}}>
            <h4>Set printer ip</h4>
            <input
                type="text"
                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={printerIp}
                placeholder="for example: 192.168.1.23"
                onChange={(e) => setPrinterIp(e.target.value)}
              />
                <button
                onClick={()=>setThePrinterIp()}
                // onClick={props.closeModal}
                type="button"
                className=" rounded-md mt-2 border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
          </div>
          {!modalIsOpen ? null : (
            <TailWindModal
              openModal={openModal}
              closeModal={closeModal}
              resetAllTables={() => {
                resetAllTables()
                closeModal()
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}
