import React, { FC, useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
// import AsyncSelect from 'react-select/async'

import { ApiStatus } from '../../types/common'
import { Extra } from '../../types/extra'


type Values = { title: string; isActive: boolean; extras: Extra[] }

type Props = {
  onClose: (res: any) => void
}



const WorkingHoursModal: FC<Props> = ({
  onClose,
}) => {
  const [values, setValues] = React.useState<Values>({
    title: '',
    isActive: true,
    extras: [{ title: '', price: 0 }],
  })

  const saveWorkingHours = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/setting/business_hours`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: workingHours })
    })
    res = await res.json()
    onClose(res)
    alert("Settings saved successfully")
  }
  const saveShopDescription = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/setting/shop_description`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: { text: shopDescription } })
    })
    res = await res.json()
    onClose(res)
    alert("Settings saved successfully")
  }

  const [workingHours, setWorkingHours] = useState<any>({
    'monday': {
      'from': '',
      'to': '',
      'closed': false
    },
    'tuesday': {
      'from': '',
      'to': '',
      'closed': false
    },
    'wednesday': {
      'from': '',
      'to': '',
      'closed': false
    },
    'thursday': {
      'from': '',
      'to': '',
      'closed': false
    },
    'friday': {
      'from': '',
      'to': '',
      'closed': false
    },
    'saturday': {
      'from': '',
      'to': '',
      'closed': false
    },
    'sunday': {
      'from': '',
      'to': '',
      'closed': false
    }
  })
  const [shopDescription, setShopDescription] = useState<any>("")
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/setting`)
      .then((res) => res.json())
      .then((res) => {
        setWorkingHours(res?.business_hours?.value)
        setShopDescription(res?.shop_description?.value.text)
      })
  }, [])


  const updateHours = (day: string, fieldName: string, e: any) => {
    let items: any = { ...workingHours }
    console.log(items)
    items[day][fieldName] = e;
    setWorkingHours(items)
  }
  return (
    <div className="relative z-1000">
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
          <div  className="relative inline-block transform rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle setting-modal">
            <a href="javascript:void(0)" onClick={onClose} className="close-btn">
            &times;
            </a>
            <div  className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mt-4 " style={{height:"100%"}}>
              <div className="sm:flex sm:items-start my-3">
                <div className="mt-3 flex-1  text-center sm:mt-0 sm:ml-4 sm:text-left">

                  <div >
                    <div className="hours">
                      <h4>Set working hours</h4>
                      <div className='working-hours-wrap'>{[['monday', 'tuesday'], ['wednesday', 'thursday'], ['friday', 'saturday'], ['sunday']].map((e, i) => {
                        return <div key={i} className='gap-[30px] my-4 working-hour-items'>
                          {e.map((item: any, index) => (
                            <div key={index}>
                              <strong>{item}</strong>
                              <div className='working-hour-item my-2'>
                                <div className='flex gap-[10px] items-center'>
                                  <span>From</span>
                                  <input
                                    type="text"
                                    name=''
                                    id=''
                                    className="block w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder='From'
                                    value={workingHours[item]?.from}
                                    onChange={(e: any) => updateHours(item, 'from', e.target.value)}
                                  />
                                </div>
                                <div className='flex gap-[10px] items-center'>
                                  <span>To</span>
                                  <input
                                    type="text"
                                    name=''
                                    id=''
                                    className="block w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder='To'
                                    value={workingHours[item]?.to}
                                    onChange={(e: any) => updateHours(item, 'to', e.target.value)}
                                  />
                                </div>
                                <div className=''>
                                  <div className="flex items-center gap-[8px]">
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4"
                                      checked={workingHours[item]?.closed}
                                      placeholder='closed'
                                      onChange={(e: any) => updateHours(item, 'closed', e.target.checked)}
                                    />
                                    <div>{`Closed`}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      })}

                      </div>
                      <button
                        onClick={saveWorkingHours}
                        // onClick={props.closeModal}
                        type="button"
                        className=" rounded-md mt-2 border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Submit
                      </button>
                    </div>

                    <div className="shop-description">
                      <div>
                      <h4>Shop description</h4>
                      <div className="description-wrap">

                        <textarea
                          id="shop_description"
                          rows={4}
                          className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="Description"
                          value={shopDescription}
                          onChange={(e) =>
                            setShopDescription(e.target.value)
                          }
                        ></textarea>
                      </div>
                      </div>
                      <button
                        onClick={saveShopDescription}
                        // onClick={props.closeModal}
                        type="button"
                        className=" rounded-md mt-2 border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default WorkingHoursModal
