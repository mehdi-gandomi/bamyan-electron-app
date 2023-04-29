//components
import CategoriesList from '../../components/customer/CategoriesList'
import CustomerHeader from '../../components/customer/CustomerHeader'

import IssueBox from './IssueBox'
import Loader from './Loader'
import MainMenu from './MainMenu'

//provider
import { useMenuContext } from '../../context/MenuContext'

//type
import { ApiStatus } from '../../types/common'


const Menu = ({ tables }: any) => {
  //menu hook
  const { menuApiCallStatus } = useMenuContext()
  
  // console.log('tables')
  // console.log(tables)

  //sg:h-[70px] fixed top-[0px] z-10 flex h-[80px] w-full justify-between gap-[3px] bg-[#eee] bg-[#c62c2c] bg-opacity-95 lg:h-[120px]
  return (
    <div className="text-[#333333]">
      <div>
        <div className="fixed z-50 w-full">
          <CustomerHeader tables={tables} />
          <div className="bg-[#eee] pt-1 pb-1 shadow-xl">
       
            <h3></h3>
          </div>
        </div>
        <div className="pt-16">
          {menuApiCallStatus == ApiStatus.PENDING && <Loader />}
          {menuApiCallStatus == ApiStatus.FULLFILLED && <CustomerMenu />}
          {menuApiCallStatus == ApiStatus.REJECTED && <IssueBox />}
        </div>
      </div>
    </div>
  )
}

const CustomerMenu = () => (
  <div className="flex h-full w-full flex-1 flex-col justify-between bg-[#eee]">
    <div className="flex flex-col gap-2">
      <div className="pt-20">
        <MainMenu />
      </div>
    </div>
    <a
      href="https://www.ingootag.com/"
      target="_blank"
      rel="noreferrer"
      className="flex h-[30px] w-full  items-center justify-center  text-[12px]"
    >
      © Copyright April 2022, Ingootag Software Group
    </a>
  </div>
)

export default Menu
