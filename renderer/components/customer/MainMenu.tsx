import React, { memo } from 'react'

//hooks
import { useMenuContext } from '../../context/MenuContext'
import { useSharedContext } from '../../context/SharedContext'

//icons
import { GrAddCircle } from 'react-icons/gr'

//components
import SmallMenuItem from './SmallMenuItem'

//type
import { useAuthContext } from '../../context/AuthContext'
import { ApiStatus } from '../../types/common'
import { CategoryType } from '../../types/menu'
import AddMenuItemFormModal, { Values as NewItem } from './AddNewMenuItemModal'

type Props = {}

function MainMenu({}: Props) {
  const { categories, refetchMenus } = useMenuContext()
  const { selectedCategoryId } = useSharedContext()
  const { isAdmin } = useAuthContext()

  const [addNewItemApiCallStatus, setAddNewItemApiCallStatus] =
    React.useState<ApiStatus>(ApiStatus.IDLE)

  const [updatePicApiCallStatus, setUpdatePicApiCallStatus] =
    React.useState<ApiStatus>(ApiStatus.IDLE)

  const [showAddMenuItemModal, setShowAddMenuItemModal] = React.useState(false)
  const isEditable = () => isAdmin

  const addNewItem = (newItem: NewItem) => {
    setAddNewItemApiCallStatus(ApiStatus.PENDING)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${category?._id}`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setShowAddMenuItemModal(false)
        refetchMenus()
      })
      .catch((e) => console.log(e))
      .finally(() => setAddNewItemApiCallStatus(ApiStatus.IDLE))
  }

  const updatePicUrl = (
    url: string,
    categoryId: string,
    menuItemId: string
  ) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${categoryId}/${menuItemId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          imageUrl: url,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((res) => {
        return res.json()
      })
      .then(refetchMenus)
      .catch((e) => console.log(e))
      .finally(() => setUpdatePicApiCallStatus(ApiStatus.IDLE))
  }

  const uploadItemPic: (
    file: File,
    categoryId: string,
    menuItemId?: string
  ) => Promise<string> = (file, categoryId, menuItemId) => {
    const formData = new FormData()
    formData.append('file', file)
    setUpdatePicApiCallStatus(ApiStatus.PENDING)
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloudinary/uploadImage`,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (menuItemId) updatePicUrl(res.url, categoryId, menuItemId)
        return res.url
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setUpdatePicApiCallStatus(ApiStatus.IDLE))
  }

  const category = categories.find(
    (category: CategoryType) => category._id === selectedCategoryId
  )
  return (
    <>
      {showAddMenuItemModal && (
        <AddMenuItemFormModal
          onClose={() => setShowAddMenuItemModal(false)}
          onUpload={(pic) => uploadItemPic(pic, selectedCategoryId as string)}
          onSubmit={(newItem) => addNewItem(newItem)}
          updatePicApiCallStatus={updatePicApiCallStatus}
          addNewItemApiCallStatus={addNewItemApiCallStatus}
          categoryId={category?._id || ''}
        />
      )}
      {category?.items.map((menuItem: any) =>
        !isAdmin && !menuItem.isActive ? (
          <div key={menuItem._id}></div>
        ) : (
          <SmallMenuItem
            key={menuItem._id || Math.random() * 1000}
            menuItem={menuItem}
            categoryId={selectedCategoryId || ''}
            refetchMenus={refetchMenus}
            uploadItemPic={uploadItemPic}
            updatePicApiCallStatus={updatePicApiCallStatus}
          />
        )
      )}
      {isEditable() && (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-2 text-center ">
          <button onClick={() => setShowAddMenuItemModal(true)}>
            <GrAddCircle size={25} />
          </button>
        </div>
      )}
    </>
  )
}

export default memo(MainMenu)
