//hooks
import { useSharedContext } from '../../context/SharedContext'

//type
import { categorySpecification } from './CategoriesList'

import { AiFillEdit } from 'react-icons/ai'
import { IoMdRemoveCircle } from 'react-icons/io'

const CategoryButton = ({
  category,
  isEditable,
  removeCategory,
  updateCategory,
}: {
  category: categorySpecification
  isEditable: boolean
  removeCategory: (id: string) => void
  updateCategory: (id: string) => void
}) => {
  const { selectedCategoryId, setSeletedCategoryId } = useSharedContext()
  return (
    <button
      onClick={() => setSeletedCategoryId(category._id)}
      className={`relative flex h-[50px] min-w-fit items-center justify-center rounded-lg border bg-white p-5 font-bold shadow-all_sides ${
        selectedCategoryId &&
        category._id === selectedCategoryId &&
        'bg-[#FF8C01]'
      }`}
    >
      {isEditable && (
        <>
          <IoMdRemoveCircle
            className="absolute top-0 right-0"
            onClick={(e) => {
              e.stopPropagation()
              removeCategory(category._id)
            }}
          />
          <AiFillEdit
            className="absolute top-0 left-0"
            onClick={(e) => {
              e.stopPropagation()
              updateCategory(category._id)
            }}
          />
        </>
      )}
      {category.title}
    </button>
  )
}

export default CategoryButton
