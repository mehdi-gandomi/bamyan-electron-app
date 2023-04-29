//type
import { ApiStatus } from './common'

export type ItemType = string[]

export type CategoryType = {
  isActive: boolean
  items: ItemType[]
  title: string
  extras: Extra[]
  _id: string
  __v: number
}

export type ExtraType = {
  categories: CategoryType[]
  extraApiCallStatus: ApiStatus
  setExtraApiCallStatus: (status: ApiStatus) => void
}

export type Extra = { title: string; price: number }
