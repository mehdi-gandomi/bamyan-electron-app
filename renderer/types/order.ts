//type
import { Extra } from './extra'
import { CategoryItemsType } from './menu'

export type ExtraItemOrderType = {
  count: number

  extra: Extra
}

export type OrderItemType = Omit<CategoryItemsType, 'extras'> & {
  count: number
  extras: ExtraItemOrderType[]
}

export type OrderType = {
  orderItems: OrderItemType[]
  setOrderItems: (items: OrderItemType[]) => void
  hasTip: boolean
  setHasTip: (status: boolean) => void
  description: string
  setDescription: (description: string) => void
}
