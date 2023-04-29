//library
import { createPortal } from 'react-dom'
import { ReactNode, useEffect, useState } from 'react'

const Portal = ({ children }: any) => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children, document.querySelector('#portal')!)
    : null
}

export default Portal
