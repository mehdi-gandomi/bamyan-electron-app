//library
import { useState, useEffect } from 'react'

//icons
import Add from '../icons/Add'
import Remove from '../icons/Remove'

const SmallMenuItem = ({
  menuItem,
  orderItems,
  setOrderItems = () => {},
  hasSelectButton = true,
  passwordCheckResult,
  extras,
  isInCart = false,
}: {
  menuItem: any
  orderItems: any
  setOrderItems?: any
  hasSelectButton?: any
  passwordCheckResult?: any
  extras?: any
  isInCart?: boolean
}) => {
  let count = 0

  count = orderItems.filter((item: any) => item._id === menuItem._id).length
    ? orderItems.filter((item: any) => item._id === menuItem._id)[0].count
    : 0

  const [selectedExtras, setSelectedExtras] = useState([])
  const [selectedPolos, setSelectedPolos] = useState([
    { _id: '6271079021cd1db1aa756636', count },
  ])

  const addExtra = (item: { _id: string; remainedCount: number }) => {
    const newSelectedExtras: any = structuredClone(selectedExtras)
    const result = newSelectedExtras.find((extra: any) => extra._id == item._id)
    if (item.remainedCount) {
      if (result) {
        result.count++
        setSelectedExtras(newSelectedExtras)
      } else {
        newSelectedExtras.push({ _id: item._id, count: 1 })
        setSelectedExtras(newSelectedExtras)
      }
    }
  }

  const removeExtra = (item: { _id: string }) => {
    const newSelectedExtras: any = structuredClone(selectedExtras)
    const result = newSelectedExtras.find((extra: any) => extra._id == item._id)

    if (result?.count > 0) {
      result.count--
      setSelectedExtras(newSelectedExtras)
    }
  }

  const addPolo = (item: { _id: string; remainedCount: number }) => {
    const newSelectedPolos: any = structuredClone(selectedPolos)
    const result = newSelectedPolos.find((polo: any) => polo._id == item._id)
    if (item.remainedCount) {
      if (result) {
        result.count++
        setSelectedPolos(newSelectedPolos)
      } else {
        newSelectedPolos.push({ _id: item._id, count: 1 })
        setSelectedPolos(newSelectedPolos)
      }
    }
  }

  const removePolo = (item: { _id: string }) => {
    const newSelectedPolos: any = structuredClone(selectedPolos)
    const result = newSelectedPolos.find((polo: any) => polo._id == item._id)

    if (result?.count > 0) {
      result.count--
      setSelectedPolos(newSelectedPolos)
    }
  }

  return (
    <div className="flex h-fit w-full flex-col py-1 px-2">
      <div className=" relative flex h-full w-full flex-col items-center gap-2 rounded-lg bg-white p-2 shadow-lg">
        <div className="flex w-full ">
          <div className="flex h-full flex-1 flex-col">
            <div className="flex items-center gap-2 text-[16px] font-bold">
              <span>{menuItem.title}</span>

              {!hasSelectButton && <span className="text-red-500">X</span>}
              {!hasSelectButton && (
                <div className="flex h-fit w-fit items-center justify-center rounded-full border bg-white  px-1 shadow-xl">
                  {count}
                </div>
              )}
            </div>
            <div className="text-[12px] text-[#666]">
              {menuItem.description}
            </div>
            <div>{menuItem.price} €</div>
          </div>
          <div className="flex h-full items-center gap-2 ">
            <div className="h-full w-[80px] overflow-hidden rounded-lg">
              <img src={menuItem.imageUrl} className="h-full w-full" />
            </div>
            {hasSelectButton && passwordCheckResult?.isPasswordValid && (
              <div className="flex flex-col items-center gap-1 ">
                <button
                  onClick={() => {
                    const result = orderItems.findIndex(
                      (item: any) => item._id === menuItem._id
                    )

                    if (result === -1) {
                      setOrderItems([...orderItems, { ...menuItem, count: 1 }])
                    } else {
                      setOrderItems((prevState: any) => {
                        const oldOrdersItems = structuredClone(prevState)
                        oldOrdersItems[result].count =
                          oldOrdersItems[result].count + 1
                        return oldOrdersItems
                      })
                    }
                  }}
                  className="rounded-lg bg-white "
                >
                  <Add />
                </button>

                <div className="rounded-lg bg-white ">{count}</div>

                <button
                  onClick={() => {
                    const result = orderItems.findIndex(
                      (item: any) => item._id === menuItem._id
                    )
                    if (result !== -1) {
                      if (orderItems[result].count === 1) {
                        const newOrderItems = structuredClone(
                          orderItems
                        ).filter((item: any) => item._id !== menuItem._id)

                        setOrderItems(newOrderItems)
                      } else {
                        setOrderItems((prevState: any) => {
                          const newOrderItems = structuredClone(prevState)
                          newOrderItems[result].count =
                            newOrderItems[result].count - 1
                          return newOrderItems
                        })
                      }
                    }
                  }}
                  className="rounded-lg bg-white "
                >
                  <Remove />
                </button>
              </div>
            )}
          </div>
        </div>

        {isInCart && extras && (
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full">
              {extras[0].isActive && (
                <div className="w-full">
                  {extras[0].items.map((item: any) => (
                    <Extra
                      key={item._id}
                      item={item}
                      addExtra={addExtra}
                      removeExtra={removeExtra}
                      remainedCount={
                        count - // @ts-ignore
                        selectedExtras.reduce((a: any, b: any) => {
                          if (typeof a == 'number') {
                            return a + b.count
                          } else {
                            return a.count + b.count
                          }
                        }, 0)
                      }
                      selectedExtras={selectedExtras}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full">
              {extras[1].isActive && (
                <div className="w-full">
                  {extras[1].items.map((item: any) => (
                    <Polo
                      key={item._id}
                      item={item}
                      addPolo={addPolo}
                      removePolo={removePolo}
                      remainedCount={
                        count - // @ts-ignore
                        selectedPolos.reduce((a: any, b: any) => {
                          if (typeof a == 'number') {
                            return a + b.count
                          } else {
                            return a.count + b.count
                          }
                        }, 0)
                      }
                      selectedPolos={selectedPolos}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Extra = ({
  item,
  addExtra,
  removeExtra,
  selectedExtras,
  remainedCount,
}: {
  item: any
  addExtra: any
  removeExtra: any
  selectedExtras: any
  remainedCount: number
}) => {
  return (
    <div className="flex w-full justify-between">
      <div>{item.title}</div>

      <div className="flex gap-[10px]">
        <button onClick={() => removeExtra({ _id: item._id })}>
          <Remove />
        </button>
        <div className="flex w-[30px] justify-center">
          {selectedExtras.find((extra: any) => extra._id == item._id)?.count ||
            0}
        </div>
        <button onClick={() => addExtra({ _id: item._id, remainedCount })}>
          <Add />
        </button>
      </div>
    </div>
  )
}

const Polo = ({
  item,
  addPolo,
  removePolo,
  selectedPolos,
  remainedCount,
}: {
  item: any
  addPolo: any
  removePolo: any
  selectedPolos: any
  remainedCount: number
}) => {
  return (
    <div className="flex w-full justify-between">
      <div>{item.title}</div>
      <div className="flex gap-[10px]">
        <button onClick={() => removePolo({ _id: item._id })}>
          <Remove />
        </button>
        <div className="flex w-[30px] justify-center">
          {selectedPolos.find((polo: any) => polo._id == item._id)?.count || 0}
        </div>
        <button onClick={() => addPolo({ _id: item._id, remainedCount })}>
          <Add />
        </button>
      </div>
    </div>
  )
}

export default SmallMenuItem
