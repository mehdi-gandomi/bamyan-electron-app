//components
import MainMenu from '../customer/MainMenu'
import CategoriesList from '../customer/CategoriesList'
// import CustomerHeader from '../customer/CustomerHeader'

const Menu = () => (
  <div>
    <div className="flex min-h-screen w-full flex-col">
      {/* <CustomerHeader /> */}
      <div className="w-full flex-1 flex-col bg-[#eee] pb-2">
        <CategoriesList />
        <MainMenu />
      </div>
    </div>
  </div>
)

export default Menu
