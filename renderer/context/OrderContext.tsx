//library
import { createContext, useContext, useState } from 'react'

//type
import { PropsType } from '../types/common'
import { OrderItemType, OrderType } from '../types/order'

//initial vlaues
const initialValues = {
  orderItems: [],
  setOrderItems: (items: OrderItemType[]) => {},
  hasTip: false,
  description:"",
  setHasTip: (status: boolean) => {},
  setDescription: (description: string) => {}
}

//order context
const OrderContext = createContext<OrderType>(initialValues)

//order hook
export function useOrderContext() {
  return useContext(OrderContext)
}

//order provider
export function OrderProvider({ children }: PropsType) {
  //state
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([])
  const [hasTip, setHasTip] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")

  return (
    <OrderContext.Provider
      value={{ orderItems, setOrderItems, hasTip, setHasTip,description, setDescription }}
    >
      {children}
    </OrderContext.Provider>
  )
}
