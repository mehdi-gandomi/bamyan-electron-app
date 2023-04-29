import React, { FC, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { useSharedContext } from '../../context/SharedContext'
// import AsyncSelect from 'react-select/async'

import { ApiStatus } from '../../types/common'
import { Extra } from '../../types/extra'
import Loader from './Loader'

type Values = { title: string; isActive: boolean; extras: Extra[] }

type Props = {
  onClose: () => void
}



const SelectMenuTypeModal: FC<Props> = ({
  onClose,
}) => {
  const [values, setValues] = React.useState<Values>({
    title: '',
    isActive: true,
    extras: [{ title: '', price: 0 }],
  })
  const { menuType,setMenuType } = useSharedContext()
  const { showMenuTypeModal,setShowMenuTypeModal } = useSharedContext()
  const selectMenuType=(selectedMenu:string)=>{
    setMenuType(selectedMenu)
    setShowMenuTypeModal(false)
  }
  console.log({ values })
  useEffect(() => {
   
  }, []);

 
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
        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 flex-1  text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="my-3 mb-4 text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Select Menu Type
                </h3>
                <div className="menu-types-wrap">
                  <div onClick={()=>selectMenuType('dessert')} className="menu-type-item dessert-type">
                    <img src="/icons/sweets.png" alt="" />
                    <strong>Dessert</strong>
                  </div>
                  <div onClick={()=>selectMenuType('drinks')} className="menu-type-item drink-type">
                    <img src="/icons/healthy-drink.png" alt="" />
                    <strong>Drinks</strong>
                  </div>
                  <div onClick={()=>selectMenuType('food')} className="menu-type-item food-type">
                    <img src="/icons/burger.png" alt="" />
                    <strong>Food</strong>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {/* <button
                    onClick={onClose}
                    type="button"
                    className="mt-3 inline-flex   w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button> */}
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

export default SelectMenuTypeModal
