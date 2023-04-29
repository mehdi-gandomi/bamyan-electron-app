//libraries
import { ReactNode } from 'react'

export type PropsType = {
  children: ReactNode
}

export enum ApiStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULLFILLED = 'fulfilled',
  REJECTED = 'rejected',
}
