//type
import { ApiStatus } from './common'

export type CategoryItemsType = {
  description: string
  foodId: number
  imageUrl: string
  isActive: boolean
  plus: boolean
  price: number
  title: string
  vegan: boolean
  vegetarian: boolean
  _id: string
  extras?: { title: string; price?: number }[]
}

export type CategoryType = {
  isActive: boolean
  items: CategoryItemsType[]
  title: string
  extras?: { title: string; price: number }[]
  _id: string
  __v: number
}

export type MenuType = {
  categories: CategoryType[]
  menuApiCallStatus: ApiStatus
  setMenuApiCallStatus: (status: ApiStatus) => void
  refetchMenus: () => void
}
