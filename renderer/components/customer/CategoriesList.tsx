//components
import CategoryButton from './CategoryButton'
//hooks
import { useMenuContext } from '../../context/MenuContext'
//type
import { useAuthContext } from '../../context/AuthContext'
import { CategoryType } from '../../types/menu'

//icons
import React from 'react'
import { GrAddCircle } from 'react-icons/gr'
import { ApiStatus } from '../../types/common'
import ConfirmModal from '../confirmModal/confirmModal'
import AddCategoryFormModal from './AddNewCategoryModal'
import ReviewModal from './ReviewModal'
import EditCategoryFormModal from './EditCategoryFormModal'
import Loader from './Loader'
import { useSharedContext } from '../../context/SharedContext'
import SelectMenuTypeModal from './SelectMenuTypeModal'

export type categorySpecification = {
  title: string
  _id: string
}

const CategoriesList = () => {
  const { categories, refetchMenus } = useMenuContext()
  const { isAdmin } = useAuthContext()

  const [showEditCategoryModal, setShowEditCategoryModal] =
    React.useState<Boolean>(false)

  const [showConfirmDelete, setShowConfirmDelete] =
    React.useState<Boolean>(false)

  const [showAddCategoryModal, setShowAddCategoryModal] =
    React.useState<boolean>(false)

  const [addCategoryApiCallStatus, setAddCategoryApiCallStatus] =
    React.useState<ApiStatus>(ApiStatus.IDLE)

  const [removingCategoryId, setRemovingCategoryId] = React.useState<
    string | undefined
  >(undefined)

  const [editingCategoryId, setEditingCategoryId] = React.useState<
    string | undefined
  >(undefined)

  const [removeCategoryApiCallStatus, setRemoveCategoryApiCallStatus] =
    React.useState<ApiStatus>(ApiStatus.IDLE)

  const [editCategoryApiCallStatus, setEditCategoryApiCallStatus] =
    React.useState<ApiStatus>(ApiStatus.IDLE)

  const isEditable = () => isAdmin

  const addCategory = (
    category: Omit<CategoryType, '_id' | 'items' | '__v'>
  ) => {
    setAddCategoryApiCallStatus(ApiStatus.PENDING)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu`, {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setShowAddCategoryModal(false)
        refetchMenus()
      })
      .catch((e) => console.log(e))
      .finally(() => setAddCategoryApiCallStatus(ApiStatus.IDLE))
  }

  const removeCategory = () => {
    setShowConfirmDelete(false)
    setRemoveCategoryApiCallStatus(ApiStatus.PENDING)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${removingCategoryId}`, {
      method: 'Delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(() => {
        refetchMenus()
      })
      .catch((e) => console.log(e))
      .finally(() => setRemoveCategoryApiCallStatus(ApiStatus.IDLE))
  }

  const editCategory = (
    category: Omit<CategoryType, '_id' | 'items' | '__v'>
  ) => {
    setEditCategoryApiCallStatus(ApiStatus.PENDING)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${editingCategoryId}`, {
      method: 'PATCH',
      body: JSON.stringify(category),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setShowEditCategoryModal(false)
        refetchMenus()
      })
      .catch((e) => console.log(e))
      .finally(() => setEditCategoryApiCallStatus(ApiStatus.IDLE))
  }

  const showConfirmModal = (id: string) => {
    setRemovingCategoryId(id)
    setShowConfirmDelete(true)
  }
  const { showReviewModal,setShowReviewModal } = useSharedContext()
  const { showMenuTypeModal,setShowMenuTypeModal } = useSharedContext()
  const showEditModal = (id: string) => {
    setEditingCategoryId(id)
    setShowEditCategoryModal(true)
  }
  const categoriesSpecification = categories.map(
    (category: CategoryType): categorySpecification => ({
      title: category.title,
      _id: category._id,
    })
  )
  return (
    <div className="hide-scrollbar l-[100px] flex h-[60px] items-center gap-2 overflow-scroll pl-3">
        {showMenuTypeModal && (
        <SelectMenuTypeModal onClose={() => setShowMenuTypeModal(false)} />
      )}
      
      {showAddCategoryModal && (
        <AddCategoryFormModal
          onClose={() => setShowAddCategoryModal(false)}
          apiCallStatus={addCategoryApiCallStatus}
          onSubmit={addCategory}
        />
      )}
     {showReviewModal && (
              <ReviewModal
              onClose={() => setShowReviewModal(false)}
              />
            )}
      {showEditCategoryModal && (
        <EditCategoryFormModal
          onClose={() => setShowEditCategoryModal(false)}
          apiCallStatus={addCategoryApiCallStatus}
          onSubmit={editCategory}
          categoryId={editingCategoryId as string}
        />
      )}

      {showConfirmDelete && (
        <ConfirmModal
          onConfirm={removeCategory}
          onCancel={() => setShowConfirmDelete(false)}
          description="Are you sure you want to delete this menu ?"
        />
      )}
      {isEditable() && (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-2 text-center ">
          <button onClick={() => setShowAddCategoryModal(true)}>
            <GrAddCircle size={25} />
          </button>
        </div>
      )}
      {removeCategoryApiCallStatus == ApiStatus.PENDING ? (
        <Loader />
      ) : (
        categoriesSpecification.map((category: categorySpecification) => (
          <CategoryButton
            key={category._id}
            category={category}
            isEditable={isEditable()}
            removeCategory={showConfirmModal}
            updateCategory={showEditModal}
          />
        ))
      )}
    </div>
  )
}

export default CategoriesList
