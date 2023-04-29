//library
import { createContext, useContext, useState, useEffect } from 'react'

//type
import { ApiStatus } from '../types/common'
import { PropsType } from '../types/common'
import { CategoryType, ExtraType } from '../types/extra'

const initialValues = {
  categories: [],
  extraApiCallStatus: ApiStatus.IDLE,
  setExtraApiCallStatus: (status: ApiStatus) => {},
}

//extra context
const ExtraContext = createContext<ExtraType>(initialValues)

//extra hook
export function useExtraContext() {
  return useContext(ExtraContext)
}

//extra provider
export function ExtraProvider({ children }: PropsType) {
  //state
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [extraApiCallStatus, setExtraApiCallStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  )

  //extra items data api call
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/extra`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data)
          setExtraApiCallStatus(ApiStatus.FULLFILLED)
        } else {
          setExtraApiCallStatus(ApiStatus.REJECTED)
        }
      })
      .catch((err) => {
        setExtraApiCallStatus(ApiStatus.REJECTED)
        console.log(err)
      })
  }, [])

  return (
    <ExtraContext.Provider
      value={{ categories, extraApiCallStatus, setExtraApiCallStatus }}
    >
      {children}
    </ExtraContext.Provider>
  )
}
