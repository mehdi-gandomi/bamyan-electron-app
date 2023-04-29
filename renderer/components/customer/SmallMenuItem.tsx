//library
import Image from 'next/image'
import { useRef, useState } from 'react'

//components

//hooks
import { useAuthContext } from '../../context/AuthContext'
import { useOrderContext } from '../../context/OrderContext'
import { useSharedContext } from '../../context/SharedContext'
import { useOnClickOutside } from '../../src/hooks/useOnClickOutside'

//icons
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import Add from '../icons/Add'
import Remove from '../icons/Remove'

//type
import { CategoryItemsType } from '../../types/menu'
import { ExtraItemOrderType } from '../../types/order'

//portal
import { ApiStatus } from '../../types/common'
import ConfirmModal from '../confirmModal/confirmModal'
import Portal from '../portal/Portal'
import EditMenuItemFormModal from './EditMenuItemFormModal'
import Loader from './Loader'
import OrderChip from './OrderChip'

const SmallMenuItem = ({
  menuItem,
  categoryId,
  refetchMenus,
  uploadItemPic,
  updatePicApiCallStatus,
}: {
  menuItem: CategoryItemsType
  categoryId: string
  refetchMenus: () => void
  uploadItemPic: (file: File, categoryId: string, menuItemId: string) => void
  updatePicApiCallStatus: ApiStatus
}) => {
  const { orderItems, setOrderItems } = useOrderContext()
  const { isAdmin } = useAuthContext()
  const imageModalContentRef = useRef()
  const { imageModalUrl, setImageModalUrl } = useSharedContext()
  const [perOrdarModalStatus, setPerOrdarModalStatus] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [updateApiCallStatus, setUpdateApiCallStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  )

  const [deleteApiCallStatus, setDeleteApiCallStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  )

  const [showConfirmDelete, setShowConfirmDelete] = useState<Boolean>(false)
  const [showEditFormModal, setShowEditFormModal] = useState<Boolean>(false)

  const [newMenuItem, setNewMenuItem] = useState<CategoryItemsType>(menuItem)

  const count = orderItems.find((item: any) => item._id === menuItem._id)?.count

  const isEditable = () => isAdmin

  const updateMenuItem = () => {
    setShowEditFormModal(false)
    setUpdateApiCallStatus(ApiStatus.PENDING)
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${categoryId}/${menuItem._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          price: newMenuItem.price,
          plus: newMenuItem.plus,
          description: newMenuItem.description,
          isActive: newMenuItem.isActive,
          title: newMenuItem.title,
          vegan: newMenuItem.vegan,
          vegetarian: newMenuItem.vegetarian,
          extras: newMenuItem.extras,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((res) => {
        console.log('done')
        return res.json()
      })
      .then(refetchMenus)
      .catch((e) => console.log(e))
      .finally(() => setUpdateApiCallStatus(ApiStatus.IDLE))
  }

  const deleteMenuItem = () => {
    setShowConfirmDelete(false)
    setDeleteApiCallStatus(ApiStatus.PENDING)
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${categoryId}/${menuItem._id}`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => res.json())
      .then(refetchMenus)
      .catch((e) => console.log(e))
      .finally(() => setDeleteApiCallStatus(ApiStatus.IDLE))
  }

  const addItemWithExtra = (e: any) => {
    e.stopPropagation()
    if (menuItem.plus && menuItem?.extras?.length) {
      setPerOrdarModalStatus(true)
    } else {
      const result = orderItems.findIndex(
        (item: any) => item._id === menuItem._id
      )

      if (result === -1) {
        const newOrdersItems = structuredClone(orderItems)
        newOrdersItems.push({
          ...menuItem,
          count: 1,
          extras: [
            {
              extra: { title: 'kabuli', price: 0 },
              count: 1,
            },
          ],
        })
        setOrderItems(newOrdersItems)
      } else {
        const newOrdersItems = structuredClone(orderItems)
        newOrdersItems[result].count = newOrdersItems[result].count + 1
        const kabuliObject = newOrdersItems[result].extras.find(
          ({ extra }) => extra.title == 'kabuli'
        ) as ExtraItemOrderType
        kabuliObject.count = kabuliObject.count + 1
        setOrderItems(newOrdersItems)
      }
    }
    // alert('xxxx')
  }

  const remove = (e: any) => {
    e.stopPropagation()
    const result = orderItems.findIndex(
      (item: any) => item._id === menuItem._id
    )
    if (result !== -1) {
      if (orderItems[result].count === 1) {
        const newOrderItems = structuredClone(orderItems).filter(
          (item: any) => item._id !== menuItem._id
        )

        setOrderItems(newOrderItems)
      } else {
        const newOrderItems = structuredClone(orderItems)
        newOrderItems[result].count = newOrderItems[result].count - 1
        const subractableExtra = newOrderItems[result].extras
          .filter((extra) => extra.count > 0)
          .at(-1) as ExtraItemOrderType | undefined

        if (subractableExtra?.count) {
          subractableExtra.count--
        }
        setOrderItems(newOrderItems)
      }
    }
  }

  useOnClickOutside(imageModalContentRef, () => setImageModalUrl(''))

  const founded = orderItems.find((oItem) => oItem._id === menuItem._id)

  const notKeineCount =
    founded?.extras
      .filter(({ extra }) => extra.title !== 'kabuli')
      .reduce(
        (a: any, b: any) => (Number.isInteger(a) ? a : a.count) + b.count,
        0
      ) || 0
  const KeineCount =
    founded?.extras.find(({ extra }) => extra.title === 'kabuli')?.count || 0

  // useEffect(() => {
  //   const newOrdersItems = structuredClone(orderItems)
  //   const founded = newOrdersItems.find(
  //     (oItem) => oItem._id === menuItem._id
  //   ) as OrderItemType | undefined

  //   if (founded) {
  //     const existenceKeine = founded.extras.find(
  //       (extra) => extra._id == 'kabuli'
  //     )
  //     if (existenceKeine) {
  //       existenceKeine.count = founded?.count - notKeineCount
  //     } else {
  //       founded.extras.push({
  //         count: founded?.count - notKeineCount,
  //         _id: 'kabuli',
  //       })
  //     }
  //     if (
  //       orderItems
  //         .find((item) => item._id == menuItem._id)
  //         ?.extras.find((item) => item._id == 'kabuli')
  //         ?.count !==
  //       newOrdersItems
  //         .find((item) => item._id == menuItem._id)
  //         ?.extras.find((item) => item._id == 'kabuli')?.count
  //     ) {
  //       setOrderItems(newOrdersItems)
  //     }
  //   }
  // }, [orderItems])

  // console.log(orderItems)

  return (
    <div
      // onClick={() => menuItem?.imageUrl && setImageModalUrl(menuItem.imageUrl)}
      className="flex h-fit w-full flex-col py-1 px-2"
    >
      {perOrdarModalStatus && menuItem.plus && !!menuItem.extras?.length && (
        <Portal>
          <OrderChip
            menuItem={menuItem}
            closeModal={() => setPerOrdarModalStatus(false)}
          />
        </Portal>
      )}

      {showConfirmDelete && (
        <ConfirmModal
          onConfirm={deleteMenuItem}
          onCancel={() => setShowConfirmDelete(false)}
          title={`Delete ${menuItem.title}`}
          description="Are you sure you want to delete this item ?"
        />
      )}

      {showEditFormModal && (
        <EditMenuItemFormModal
          onClose={() => setShowEditFormModal(false)}
          onSubmit={updateMenuItem}
          title={`Edit "${menuItem.title}"`}
          values={newMenuItem}
          setValues={setNewMenuItem}
          categoryId={categoryId}
        />
      )}

      <div className=" relative flex h-full w-full flex-col items-center gap-2 rounded-lg bg-white p-4 shadow-lg">
        <div className="flex w-full flex-col items-center gap-2">
          <div className="  flex h-full flex-col items-center gap-4">
            {menuItem?.imageUrl && (
              <>
                <div className="relative flex h-[260px] w-[260px] items-center overflow-hidden rounded-lg">
                  {isEditable() &&
                    (updatePicApiCallStatus === ApiStatus.PENDING ? (
                      <div className="absolute top-0 right-0 z-20">
                        <Loader />
                      </div>
                    ) : (
                      <div className="absolute top-1 right-1 z-20 ">
                        <button
                          className="rounded-full bg-white"
                          onClick={() =>
                            fileInputRef.current && fileInputRef.current.click()
                          }
                        >
                          <MdOutlineModeEditOutline size={15} />
                        </button>
                      </div>
                    ))}

                  <Image
                    layout="fill"
                    src={menuItem.imageUrl}
                    className="  h-full w-full rounded-lg"
                    alt={menuItem.title}
                    placeholder="blur"
                    blurDataURL="/images/fallback-image.jpeg"
                  />
                  {menuItem.vegan && (
                    <div className="absolute top-0 left-0">
                      <img
                        src="/images/vegan.png"
                        alt="vegan"
                        placeholder="blur"
                        width={50}
                        height={50}
                        className=""
                      />
                    </div>
                  )}
                  {menuItem.vegetarian && (
                    <div className="absolute bottom-0 right-0">
                      <img
                        width={50}
                        height={50}
                        src="/images/vegetarian.png"
                        alt="vegetarian"
                        placeholder="blur"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* {imageModalUrl == menuItem.imageUrl && (
              <Portal>
                <div
                  ref={imageModalContentRef}
                  className="h-fit w-fit rounded-lg bg-white p-4"
                >
                  <Image
                    width={280}
                    height={280}
                    src={menuItem.imageUrl}
                    className="h-full w-full rounded-lg"
                    alt={menuItem.title} 
                    placeholder="blur"
                    blurDataURL="/images/fallback-image.jpeg"
                  />
                </div>
              </Portal>
            )} */}

            <div className="flex items-center gap-4 ">
              <button
                disabled={count == 0}
                onClick={remove}
                className={`rounded-lg bg-white ${
                  count ? 'text-[#FF8C01]' : 'text-[#bbb]'
                }`}
              >
                <Remove />
              </button>
              <div className="rounded-lg bg-white text-[20px] ">
                {count || 0}
              </div>

              <button
                onClick={addItemWithExtra}
                className={`rounded-lg bg-white text-[#FF8C01]`}
              >
                <Add />
              </button>
            </div>
          </div>
          <input
            style={{ display: 'none' }}
            type="file"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => {
              const file = Array.from(e.target.files as FileList)[0]
              uploadItemPic(file, categoryId, menuItem._id)
            }}
            ref={fileInputRef}
          />

          <div className="flex h-full flex-1 flex-col items-center">
            <div className="flex items-center gap-2 text-[16px] font-bold"></div>
            <span className="text-[14px] font-semibold text-[#3c6c08]">
              Food ID : #{menuItem.foodId}
            </span>
            <div className="flex items-center gap-4 text-[20px] font-bold">
              <span>{menuItem.title}</span>
              <div>
                <span className="m-1 px-1 text-[20px]">{menuItem.price}</span>
                <span>€</span>
              </div>
            </div>
            <div className="text-center text-[12px]">
              {menuItem.description}
            </div>
          </div>
        </div>
        {/* edit and delete part */}
        {isEditable() && (
          <div className="flex flex-row items-center gap-20 p-2">
            {deleteApiCallStatus === ApiStatus.PENDING ? (
              <Loader />
            ) : (
              <button onClick={() => setShowConfirmDelete(true)}>
                <RiDeleteBinLine color="red" size={30} />
              </button>
            )}
            {updateApiCallStatus === ApiStatus.PENDING ? (
              <Loader />
            ) : (
              <button onClick={() => setShowEditFormModal(true)}>
                <AiOutlineEdit size={30} />
              </button>
            )}
          </div>
        )}
        <div className="w-full">
          {menuItem.plus && founded && (
            <div className="flex w-full flex-col items-center gap-2">
              <div className="text-[20px]">
                Total price for this item:{' '}
                {notKeineCount * menuItem.price + KeineCount * menuItem.price} €
              </div>
            </div>
          )}
          {!menuItem.plus && founded && (
            <div className="flex w-full flex-col items-center gap-2">
              <div className="text-[20px]">
                Total price for this item: {founded.count * menuItem.price} €
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SmallMenuItem
