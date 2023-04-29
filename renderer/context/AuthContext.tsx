//libraries
import { createContext, useContext, useState } from 'react'

//type
import { PropsType, ApiStatus } from '../types/common'
import { PasswordCheckResultType, AuthType } from '../types/auth'

//initial values
const initialValues = {
  password: '',
  passwordCheckResult: null,
  setPassword: (pass: string) => {},
  checkPasswordApiCallStatus: ApiStatus.IDLE,
  setCheckPasswordApiCallStatus: (apiStatus: ApiStatus) => {},
  setPasswordCheckResult: (result: PasswordCheckResultType | null) => {},
  isWaiter: false,
  setIsWaiter: (status: boolean) => {},
  isAdmin: false,
  setIsAdmin: (status: boolean) => {},
}

//auth context
const AuthContext = createContext<AuthType>(initialValues)

//auth hook
export function useAuthContext() {
  return useContext(AuthContext)
}

//auth provider
export function AuthProvider({ children }: PropsType) {
  //state
  const [isWaiter, setIsWaiter] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [passwordCheckResult, setPasswordCheckResult] =
    useState<PasswordCheckResultType | null>(null)
  const [password, setPassword] = useState<string>('')
  const [checkPasswordApiCallStatus, setCheckPasswordApiCallStatus] =
    useState<ApiStatus>(ApiStatus.IDLE)

  return (
    <AuthContext.Provider
      value={{
        password,
        setPassword,
        passwordCheckResult,
        setPasswordCheckResult,
        checkPasswordApiCallStatus,
        setCheckPasswordApiCallStatus,
        isWaiter,
        setIsWaiter,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
