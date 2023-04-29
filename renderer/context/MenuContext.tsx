//library
import { createContext, useContext, useEffect, useState } from 'react'

//context
import { useSharedContext } from './SharedContext'

//type
import { ApiStatus, PropsType } from '../types/common'
import { CategoryType, MenuType } from '../types/menu'

//initial values
const initialValues = {
  categories: [],
  menuApiCallStatus: ApiStatus.IDLE,
  setMenuApiCallStatus: (status: ApiStatus) => {},
  refetchMenus: () => {},
}

//menu context
const MenuContext = createContext<MenuType>(initialValues)

//menu hook
export function useMenuContext() {
  return useContext(MenuContext)
}

//menu provider
export function MenuProvider({ children }: PropsType) {
  //state
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [menuApiCallStatus, setMenuApiCallStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  )

  //shared hook
  const { selectedCategoryId, setSeletedCategoryId } = useSharedContext()
  const refetchMenus = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data)
          if (!selectedCategoryId) setSeletedCategoryId(data[0]._id)
          setMenuApiCallStatus(ApiStatus.FULLFILLED)
        } else {
          setMenuApiCallStatus(ApiStatus.REJECTED)
        }
      })
      .catch((err) => {
        setMenuApiCallStatus(ApiStatus.REJECTED)
        console.log(err)
      })
  }

  //menu items data api call
  useEffect(() => {
    setMenuApiCallStatus(ApiStatus.PENDING)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data)
          setSeletedCategoryId(data[0]._id)
          setMenuApiCallStatus(ApiStatus.FULLFILLED)
        } else {
          setMenuApiCallStatus(ApiStatus.REJECTED)
        }
      })
      .catch((err) => {
        setMenuApiCallStatus(ApiStatus.REJECTED)
        console.log(err)
      })
  }, [])

  return (
    <MenuContext.Provider
      value={{
        categories,
        menuApiCallStatus,
        setMenuApiCallStatus,
        refetchMenus,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
