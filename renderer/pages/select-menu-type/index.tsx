//component
import CartStatusModal from '../../components/customer/CartStatusModal'
import Menu from '../../components/customer/Menu'

//provider
import { useEffect } from 'react'
import { AuthProvider } from '../../context/AuthContext'
import { ExtraProvider } from '../../context/ExtraContext'
import { MenuProvider } from '../../context/MenuContext'
import { OrderProvider, useOrderContext } from '../../context/OrderContext'
import { SharedProvider, useSharedContext } from '../../context/SharedContext'

const MenuPage = ({ tables }: any) => {
  return (
    <AuthProvider>
      <SharedProvider>
        <OrderProvider>
          <MenuProvider>
            <ExtraProvider>
              <Wrapper tables={tables} />
            </ExtraProvider>
          </MenuProvider>
        </OrderProvider>
      </SharedProvider>
    </AuthProvider>
  )
}

const Wrapper = ({ tables }: any) => {
  const { cartModalStatus, setCartModalStatus } = useSharedContext()
  const { orderItems } = useOrderContext()
  useEffect(() => {
    if (orderItems.length === 0) {
      setCartModalStatus(false)
    }
  }, [orderItems])
  if (cartModalStatus && orderItems.length) {
    return <CartStatusModal />
  } else {
    return <Menu tables={tables} />
  }
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/table`)
  const tables = await res.json()

  // const tables: any[] = []

  return {
    props: {
      //   tableCurrentStatus: tableCurrentStatus[0],
      tables: tables.map((table: any) => ({
        _id: table._id,
        tableNumber: table.tableNumber,
      })),
    },
  }
}

export default MenuPage
