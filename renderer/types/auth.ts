//type
import { ApiStatus } from './common'

export type PasswordCheckResultType = {
  _id: string
  password: string
  tableNumber: number
  date: string
  isPasswordValid: boolean
}

export type AuthType = {
  passwordCheckResult: PasswordCheckResultType | null
  setPasswordCheckResult: (result: PasswordCheckResultType) => void
  password: string
  setPassword: (pass: string) => void
  checkPasswordApiCallStatus: ApiStatus
  setCheckPasswordApiCallStatus: (apiStatus: ApiStatus) => void
  isWaiter: boolean
  setIsWaiter: (status: boolean) => void
  isAdmin: boolean
  setIsAdmin: (status: boolean) => void
}
