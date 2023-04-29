//library
import Image from 'next/image'
import { memo } from 'react'

//hooks
import { useExtraContext } from '../../context/ExtraContext'
import { useOrderContext } from '../../context/OrderContext'

//icons
import Trash from '../icons/Trash'

//type
import { OrderItemType } from '../../types/order'

const MediumMenuItem = ({ menuItem }: { menuItem: OrderItemType }) => {
  console.log({ menuItem })
  const { orderItems, setOrderItems } = useOrderContext()
  console.log({ orderItems })
  // const { passwordCheckResult } = useAuthContext()
  const { categories } = useExtraContext()

  const deleteItem = (selectedId: string) => {
    const newOrdersItems = structuredClone(orderItems)
    const filteredData = newOrdersItems.filter(
      (item) => item._id !== selectedId
    )
    setOrderItems(filteredData)
  }

  const founded = orderItems.find((oItem) => oItem._id === menuItem._id)
  const extrasPrice = founded?.extras.reduce(
    (acc, current) => acc + current.count * current.extra.price,
    0
  )

  console.log({ extrasPrice })
  return (
    <div className="flex h-fit w-full flex-col py-1 px-2">
      <div className=" relative flex h-full w-full flex-col items-center gap-2 rounded-lg border bg-white p-2 shadow-lg">
        <div className="flex h-full w-full items-start  ">
          <div className="flex h-full flex-1 flex-col gap-[4px]">
            <div className="flex w-fit flex-col items-center justify-start gap-1 text-[20px] font-bold">
              <span className="w-full">{menuItem.title}</span>
              {/* <span className="text-red-600">x {count}</span>
              <span className="text-red-600">=</span> */}
              <div className="w-full">
                {menuItem.plus && founded && (
                  <div className="text-[20px]">
                    Total price:{' '}
                    {founded.count * founded.price + (extrasPrice || 0)}€
                  </div>
                )}
                {!menuItem.plus && founded && (
                  <div className="flex w-full flex-col items-center gap-2">
                    <div className="text-[20px]">
                      Total price: {founded.count * founded.price} €
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              {/* {menuItem.plus &&
                categories[0].items.map((extra) => {
                  const count =
                    menuItem.extras.find((item) => item._id == extra._id)
                      ?.count || 0
                  return (
                    <div key={extra._id}>{`${extra.title} : ${count}`}</div>
                  )
                })} */}
              {menuItem.plus &&
                founded?.extras.map(({ extra }) => {
                  console.log({ extra })
                  const count =
                    menuItem.extras.find(
                      ({ extra: extraa }) => extraa.title == extra.title
                    )?.count || 0
                  return (
                    <div key={extra.title}>{`${extra.title} : ${count}`}</div>
                  )
                })}
            </div>
          </div>
          <div className="relative flex h-full gap-2 self-center">
            {menuItem?.imageUrl && (
              <div className="flex h-full w-[120px] items-center overflow-hidden rounded-lg">
                <Image
                  width={120}
                  height={120}
                  src={menuItem.imageUrl}
                  className="h-full w-full overflow-hidden rounded-lg"
                  alt={menuItem.title}
                />
              </div>
            )}

            <button
              onClick={() => deleteItem(menuItem._id)}
              className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full border-2 bg-white p-1 text-[#C62C2C]"
            >
              <Trash />
            </button>
            <div className="absolute -top-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white p-1 text-2xl text-[#333]">
              {menuItem.count}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(MediumMenuItem)
