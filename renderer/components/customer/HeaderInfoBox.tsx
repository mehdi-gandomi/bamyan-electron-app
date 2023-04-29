import { useEffect } from 'react'

//icons
import Lock from '../icons/Lock'

//hooks
import { useAuthContext } from '../../context/AuthContext'

//type
import { ApiStatus } from '../../types/common'

type Props = {}

export default function HeaderInfoBox({}: Props) {
  const {
    password,
    setPassword,
    passwordCheckResult,
    checkPasswordApiCallStatus,
    setCheckPasswordApiCallStatus,
    setPasswordCheckResult,
    setIsWaiter,
    setIsAdmin,
  } = useAuthContext()
  const checkPassword = (password: string) => {
    if (password.length >= 2 && password.length < 6) {
      console.log({ password })

      setCheckPasswordApiCallStatus(ApiStatus.PENDING)
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/table/passwordCheck`, {
        method: 'POST',
        body: JSON.stringify({
          password: password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.isPasswordValid) {
            setCheckPasswordApiCallStatus(ApiStatus.FULLFILLED)
            setPasswordCheckResult(data)
          } else {
            setCheckPasswordApiCallStatus(ApiStatus.REJECTED)
          }
        })
        .catch((e) => {
          setCheckPasswordApiCallStatus(ApiStatus.REJECTED)
          console.log(e)
        })
    } else {
      if (password === '123456') {
        setIsWaiter(true)
        setIsAdmin(false)
        setPassword('')
      }
      if (password === 'AdminBm') {
        setIsAdmin(true)
        setIsWaiter(false)
        setPassword('')
      }
    }
  }

  useEffect(() => {
    if (password.length >= 2) {
      // console.log('xxx')
      checkPassword(password)
    }
  }, [password])

  return (
    <div className="flex h-fit w-fit items-center gap-2">
      {!passwordCheckResult?.isPasswordValid ? (
        <>
          <div className="flex items-center gap-4 pr-3">
            <img className="h-16" src="/images/logo.png" />
          </div>
          <input
            value={password}
            placeholder="Mini Pass"
            onChange={(e) => setPassword(e.target.value)}
            className={`flex h-10 w-[100px] items-center justify-center rounded-lg border-2 text-center text-[20px] outline-none placeholder:text-[16px] ${
              checkPasswordApiCallStatus === 'rejected' && 'border-red-600'
            } bg-white px-2`}
          />
        </>
      ) : (
        <span className="text-[32px] text-white">{`#${
          passwordCheckResult.tableNumber
        } - ${new Date(passwordCheckResult.date).getHours()}:${new Date(
          passwordCheckResult.date
        ).getMinutes()}`}</span>
      )}
    </div>
  )
}
