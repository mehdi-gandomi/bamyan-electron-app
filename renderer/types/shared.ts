export type SharedType = {
  selectedCategoryId: string | undefined
  setSeletedCategoryId: (id: string) => void
  cartModalStatus: boolean
  setCartModalStatus: (id: boolean) => void
  drawerStatus: boolean
  setDrawerStatus: (status: boolean) => void
  imageModalStatus: boolean
  setImageModalStatus: (status: boolean) => void
  imageModalUrl: string
  setImageModalUrl: (url: string) => void
  showReviewModal: boolean
  setShowReviewModal: (status: boolean) => void
  setMenuType: (menuType: string) => void
  menuType: string
  setShowMenuTypeModal: (status: boolean) => void
  showMenuTypeModal: boolean
}
