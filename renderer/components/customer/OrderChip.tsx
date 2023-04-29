import React from 'react'
import { useExtraContext } from '../../context/ExtraContext'
import { useOrderContext } from '../../context/OrderContext'
import { ExtraItemOrderType } from '../../types/order'

export default function OrderChip({ menuItem, closeModal, foodTitle }: any) {
  const [extra, setExtra] = React.useState<
    { title: string; price: number } | undefined
  >(undefined)
  const { categories } = useExtraContext()

  console.log({ extra })

  const { orderItems, setOrderItems } = useOrderContext()
  console.log({ orderItems })
  const addItem = (extra: { title: string; price: number }) => {
    const indexOfSelectedItem = orderItems.findIndex(
      (item: any) => item._id === menuItem._id
    )

    console.log({ indexOfSelectedItem })

    const newOrdersItems = structuredClone(orderItems)
    console.log({ newOrdersItems })
    if (indexOfSelectedItem === -1) {
      newOrdersItems.push({
        ...menuItem,
        count: 1,
        extras: [
          {
            extra,
            count: 1,
          },
        ],
      })
      setOrderItems(newOrdersItems)
    } else {
      if (Array.isArray(newOrdersItems[indexOfSelectedItem]?.extras)) {
        console.log({ newOrdersItemst: newOrdersItems, extra })
        const indexOfSelectedExtraInSelectedItem = newOrdersItems[
          indexOfSelectedItem
        ].extras?.findIndex(
          (item: ExtraItemOrderType) => item.extra.title === extra.title
        )
        console.log({ indexOfSelectedExtraInSelectedItem })
        if (indexOfSelectedExtraInSelectedItem == -1) {
          newOrdersItems[indexOfSelectedItem].count++
          newOrdersItems[indexOfSelectedItem].extras = [
            ...newOrdersItems[indexOfSelectedItem].extras,
            { extra: { title: extra.title, price: extra.price }, count: 1 },
          ]
          // newOrdersItems[indexOfSelectedItem].extras?.push({
          //   title: extra,
          //   count: 1,
          // })
        } else {
          newOrdersItems[indexOfSelectedItem].count++
          newOrdersItems[indexOfSelectedItem].extras[
            indexOfSelectedExtraInSelectedItem
          ].count++
        }
      }

      setOrderItems(newOrdersItems)
    }
    closeModal()
  }

  React.useEffect(() => {
    if (menuItem) setExtra(menuItem?.extras[0])
  }, [menuItem])
  return (
    <div className="relative z-50">
      <div
        className="fixed inset-0  overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="relative inline-block transform overflow-hidden rounded-lg bg-gray-200 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
            <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* <div className="flex w-full flex-col items-center gap-2">
            <div>{foodTitle}</div>
            <div>
              {categories[0].items.map((extra) => {
                const count =
                  menuItem.extras.find((item: any) => item._id == extra._id)
                    ?.count || 0
                return (
                  <ActionButton
                    key={extra._id}
                    extra={extra}
                    count={count}
                    menuItem={menuItem}
                  />
                )
              })}
            </div>
            <button onClick={closeModal} className="border px-2">
              done
            </button>
          </div> */}

                <div
                  className="flex w-full flex-col items-center gap-4"
                  onChange={(e: any) => {
                    console.log({ e: e.target.value })
                    const item = menuItem.extras.find(
                      (ex: { title: string; price: number }) =>
                        e.target.value == ex.title
                    )
                    console.log('onChange:', item)
                    setExtra(item)
                    // console.log('farbod')
                    // console.log(e.target.value)
                    // console.log(categories[0].items)

                    // closeModal()
                  }}
                >
                  {menuItem.extras?.map(
                    (e: { title: string; price: number }, index: any) => (
                      <label
                        key={e.title}
                        className="form-check-label flex gap-2 text-gray-800"
                      >
                        <input
                          className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value={e.title}
                          defaultChecked={index == 0}
                          placeholder="tat"
                        />
                        <div className="w-[80px] text-lg font-semibold  ">
                          {e.title}
                        </div>
                      </label>
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center px-4 py-3 pt-7 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() =>
                    addItem(extra as { title: string; price: number })
                  }
                  type="button"
                  className="mt-3 inline-flex   w-full justify-center rounded-md border border-gray-300 bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
