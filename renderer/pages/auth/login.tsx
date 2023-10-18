import { useEffect, useRef, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import Delete from '../../components/icons/Delete'
import Cookies from 'js-cookie'
import ClipLoader from 'react-spinners/ClipLoader'
import TailWindModal from '../../components/tailWindModal/TailWindModal'
import UserLoginModal from '../../components/userLoginModal/UserLoginModal'
import { Extra } from '../../types/extra'
import { OrderItemType } from '../../types/order'
import WorkingHoursModal from './dashboard/WorkingHoursModal'
import { useRouter } from 'next/router'
export default function Login(): JSX.Element {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading,setIsLoading]=useState(false);
  const [loginError,setLoginError]=useState("");
  const router = useRouter();
  const doLogin=()=>{
    setIsLoading(true)
    fetch(`https://bamiyan-kebab-backend.herokuapp.com/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        username,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginError("")
        setIsLoading(false)
        console.log(data)
        
        if(data.access_token){
          // localStorage.setItem("access_token",data.access_token)
          Cookies.set('access_token', data.access_token)
          localStorage.setItem("user",JSON.stringify(data.user))
          router.push("/")
        }else{
          setLoginError("Username or password is incorrect")
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
        if(err.response){
          console.log(err.response)
        }
      })
  }
  return (
    <div className="m:overflow-auto flex min-h-screen w-screen flex-col bg-transparent text-center ">

      <div>
        <img
          src="https://res.cloudinary.com/ingootag-com/image/upload/v1650366747/samples/food/pexels-lukas-349610_y0to1k.jpg"
          alt="background"
          className="absolute top-0 right-0 -z-10 h-full w-full object-cover "
        />
      </div>
      <div className="login-card w-1/2 m-auto bg-white p-3 text-left">
        <h3 className="text-center text-xl font-bold">Login</h3>
        <div className="p-5">
          <div>
            <label htmlFor="">Username</label>
            <input
              type="text"
              name=''
              id=''
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder='Username'

            />
          </div>
          <div className='my-2'>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name=''
              id=''
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder='Password'

            />
          </div>
          <div className='my-2'>
            {loginError && <div>{loginError}</div>}
          </div>
          <div>
            <button
              onClick={doLogin}
              type="button"
              disabled={isLoading}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-3 sm:w-auto sm:text-sm"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
