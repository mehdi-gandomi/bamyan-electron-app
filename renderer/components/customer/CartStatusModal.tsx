import React, { useEffect } from 'react'

//components
import MediumMenuItem from './MediumMenuItem'

//icons
import Close from '../../components/icons/Close'

//hooks
import { useAuthContext } from '../../context/AuthContext'
import { useOrderContext } from '../../context/OrderContext'
import { useSharedContext } from '../../context/SharedContext'

//type
import { ApiStatus } from '../../types/common'
import { OrderItemType } from '../../types/order'
export default function CartStatusModal() {
  const {
    orderItems,
    hasTip,
    setHasTip,
    setOrderItems,
    setDescription,
    description,
  } = useOrderContext()

  console.log({ orderItemsss: orderItems })
  const { setCartModalStatus,setShowReviewModal } = useSharedContext()

  const {
    password,
    setPassword,
    passwordCheckResult,
    checkPasswordApiCallStatus,
    setCheckPasswordApiCallStatus,
    setPasswordCheckResult,
  } = useAuthContext()
  const checkPassword = (password: string) => {
    setCheckPasswordApiCallStatus(ApiStatus.PENDING)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/table/passwordCheck`, {
      method: 'POST',
      body: JSON.stringify({
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.isPasswordValid) {
          setCheckPasswordApiCallStatus(ApiStatus.FULLFILLED)
          setPasswordCheckResult(data)
        } else {
          setCheckPasswordApiCallStatus(ApiStatus.REJECTED)
        }
      })
      .catch((e) => {
        setCheckPasswordApiCallStatus(ApiStatus.REJECTED)
        console.log(e)
      })
  }

  useEffect(() => {
    checkPassword(password)
  }, [password])

  const submitOrder = () => {
    const pureOrderItemsList = Array.from(orderItems, (orderItem) => ({
      _id: orderItem._id,
      count: orderItem.count,
      extras: orderItem.plus ? orderItem.extras : null,
    }))
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
      method: 'POST',
      body: JSON.stringify({
        orderItems: pureOrderItemsList,
        password: password,
        hasTip: hasTip,
        description: description,
        orderType: 'Ordered',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      setShowReviewModal(true)
      setOrderItems([])
    })
  }

  return (
    <div className=" fixed top-0 left-0  z-10 h-screen w-screen bg-[#eee] p-2 ">
  
      <div className="relative h-full w-full overflow-scroll rounded-lg bg-white pb-36 shadow-lg">
        <div className="flex flex-col px-2 pt-2 pb-2 ">
          <div className="relative flex flex-col justify-between p-2 font-bold">
            <div className="text-[24px]">
              {orderItems &&
                `Gesamtpreis : ${(
                  (hasTip ? 1.1 : 1) *
                  orderItems
                    .map((orderItem) => {
                      const notKeineCount =
                        orderItem?.extras
                          .filter(
                            (item) => item.extra.title !== '628f7c40224a4536a324ea3f'
                          )
                          .reduce(
                            (a: any, b: any) =>
                              (Number.isInteger(a) ? a : a.count) + b.count,
                            0
                          ) || 0
                      const KeineCount =
                        orderItem?.extras.find(
                          (item) => item.extra.title === '628f7c40224a4536a324ea3f'
                        )?.count || 0

                      if (orderItem.plus) {
                        return (
                          notKeineCount * orderItem.price +
                          KeineCount * orderItem.price
                        )
                      } else {
                        return orderItem.count * orderItem.price
                      }
                    })
                    .reduce((a, b) => a + b, 0)
                ).toFixed(2)} €`}
            </div>
            <div className="">
              <label htmlFor="" className="block">
                Description
              </label>
              <textarea
                className="mt-2 mb-4 block rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center gap-[8px]">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={hasTip}
                onChange={() => setHasTip(!hasTip)}
              />
              <div>{` + Tip (%10 of total price)`}</div>
            </div>
            <button
              className="absolute top-4 right-4"
              onClick={() => setCartModalStatus(false)}
            >
              <Close />
            </button>
          </div>

          {orderItems.map((orderItem: OrderItemType) => {
            return <MediumMenuItem key={orderItem._id} menuItem={orderItem} />
          })}
          <div className="fixed left-0 bottom-0 flex w-screen items-center gap-2 bg-white py-1 px-6 shadow-all_sides">
            <button
              // disabled={!passwordCheckResult?.isPasswordValid}
              className={`h-[58px] flex-1 rounded-lg border ${
                passwordCheckResult?.isPasswordValid
                  ? 'bg-blue-400 text-black hover:bg-blue-500'
                  : 'bg-gray-400 text-gray-600'
              }`}
              onClick={() => submitOrder()}
            >
              Submit Order
            </button>
            <div className="flex h-fit w-fit items-center gap-2">
              {!passwordCheckResult?.isPasswordValid ? (
                <div className="p-2">
                  <input
                    value={password}
                    placeholder="Mini Pass"
                    maxLength={4}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`flex h-[58px] w-[100px] items-center justify-center rounded-lg border-2 text-center text-[20px] outline-none placeholder:text-[16px] ${
                      checkPasswordApiCallStatus === 'rejected' &&
                      'border-red-600'
                    } bg-white px-2`}
                  />
                </div>
              ) : (
                <img src="/icons/profile_ok.png" width={58} height={58} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
