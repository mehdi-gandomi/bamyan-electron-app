//libraries
import { createContext, useContext, useState } from 'react'

//type
import { PropsType } from '../types/common'
import { SharedType } from '../types/shared'

//initial values
const initialValues = {
  selectedCategoryId: '',
  setSeletedCategoryId: (id: string) => {},
  cartModalStatus: false,
  setCartModalStatus: (id: boolean) => {},
  showReviewModal: false,
  setShowReviewModal: (status: boolean) => {},
  showMenuTypeModal: false,
  setShowMenuTypeModal: (status: boolean) => {},
  menuType:"",
  setMenuType:(menuType: string) => {},
  drawerStatus: false,
  setDrawerStatus: (status: boolean) => {},
  imageModalStatus: false,
  setImageModalStatus: (status: boolean) => {},
  imageModalUrl: '',
  setImageModalUrl: (url: string) => {},
}

//shared context
const SharedContext = createContext<SharedType>(initialValues)

//shared hook
export function useSharedContext() {
  return useContext(SharedContext)
}

//shared provider
export function SharedProvider({ children }: PropsType) {
  //state
  const [imageModalUrl, setImageModalUrl] = useState<string>('')
  const [drawerStatus, setDrawerStatus] = useState<boolean>(false)
  const [cartModalStatus, setCartModalStatus] = useState<boolean>(false)
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false)
  const [showMenuTypeModal, setShowMenuTypeModal] = useState<boolean>(false)
  const [menuType, setMenuType] = useState<string>("")
  const [selectedCategoryId, setSeletedCategoryId] = useState<
    string | undefined
  >(undefined)
  const [imageModalStatus, setImageModalStatus] = useState<boolean>(false)

  return (
    <SharedContext.Provider
      value={{
        selectedCategoryId,
        setSeletedCategoryId,
        showReviewModal,
        setShowReviewModal,
        showMenuTypeModal,
        setMenuType,
        setShowMenuTypeModal,
        menuType,
        cartModalStatus,
        setCartModalStatus,
        drawerStatus,
        setDrawerStatus,
        imageModalStatus,
        setImageModalStatus,
        imageModalUrl,
        setImageModalUrl,
      }}
    >
      {children}
    </SharedContext.Provider>
  )
}
