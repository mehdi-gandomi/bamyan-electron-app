//library
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: JSX.Element
}

const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(
        <div className="fixed top-0 left-0  flex h-screen w-screen items-center justify-center bg-black bg-opacity-40">
          {children}
        </div>,
        document.querySelector('#big_food_image') as HTMLDivElement
      )
    : null
}

export default Portal
