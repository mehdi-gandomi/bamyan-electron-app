import { Dispatch, FC, SetStateAction } from 'react'
import AsyncSelect from 'react-select/async'
import { Extra } from '../../types/extra'
import { CategoryItemsType } from '../../types/menu'

interface Props {
  onSubmit: () => void
  onClose: () => void
  title: string
  values: CategoryItemsType
  setValues: Dispatch<SetStateAction<CategoryItemsType>>
  categoryId?: string
}

const InputField = ({
  fieldName,
  prefix,
  placeholder,
  value,
  onChange,
}: {
  fieldName: string
  prefix?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <div>
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {fieldName}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
        )}
        <input
          type="text"
          name={fieldName}
          id={fieldName}
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder || ''}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

const Toggle = ({
  title,
  checked,
  onChange,
}: {
  title: string
  checked: boolean
  onChange: () => void
}) => {
  return (
    <label
      htmlFor={title}
      className="relative inline-flex cursor-pointer items-center"
    >
      <input
        type="checkbox"
        value=""
        checked={checked}
        id={title}
        className="peer sr-only"
        onChange={(e) => onChange()}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300  dark:bg-red-800 "></div>
      <span className="ml-3 text-sm font-medium text-black dark:text-black">
        {title}
      </span>
    </label>
  )
}

const EditMenuItemFormModal: FC<Props> = ({
  onSubmit,
  onClose,
  title,
  values,
  setValues,
  categoryId,
}) => {
  console.log({ values })
  const getCategoryExtras = () =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/extras/${categoryId}`)
      .then((res) => res.json())
      .then((res) => {
        const temp = res.map((item: Extra) => ({
          value: item,
          label: item.title + '-' + (item.price || 0) + '€',
        }))
        console.log(temp)
        return temp
      })

  return (
    <div className="relative z-50">
      <div
        className="fixed inset-0  overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
            <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div> */}
                <div className="mt-3 flex-1  text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="my-3 mb-4 text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title || ''}
                  </h3>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to Delete all the table orders ?
                    </p>
                  </div> */}

                  <div className="my-4">
                    <InputField
                      fieldName="Price"
                      prefix="€"
                      placeholder="0.00"
                      value={values.price.toString()}
                      onChange={(value) =>
                        setValues({ ...values, price: +value })
                      }
                    />
                  </div>
                  <div className="my-4">
                    <InputField
                      fieldName="Title"
                      placeholder="TItle"
                      value={values.title}
                      onChange={(value) =>
                        setValues({ ...values, title: value })
                      }
                    />
                  </div>
                  {values.plus && (
                    <div className="my-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Extras
                      </label>
                      <AsyncSelect
                        cacheOptions
                        defaultValue={values.extras?.map((extra) => {
                          return {
                            label: extra.title + '-' + (extra.price || 0) + '€',
                            value: extra,
                          }
                        })}
                        isMulti
                        loadOptions={getCategoryExtras}
                        defaultOptions
                        isSearchable={false}
                        onChange={(value) => {
                          // console.log({ values, value })
                          // if(values?.extras?.some(value))
                          console.log({ value })
                          setValues({
                            ...values,
                            extras: [
                              ...(
                                value as {
                                  label: string
                                  value: string | Extra
                                }[]
                              ).map((v) => {
                                if (typeof v.value != 'string') return v.value
                                const temp = v.value.split('-')
                                return { title: temp[0], price: +temp[1] }
                              }),
                            ],
                          })
                        }}
                      />
                    </div>
                  )}
                  <div className=" my-2 flex flex-row flex-wrap items-center justify-center">
                    <div className="flex-1">
                      <Toggle
                        title={values.isActive ? 'enable' : 'disable'}
                        checked={values.isActive}
                        onChange={() =>
                          setValues({ ...values, isActive: !values.isActive })
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Toggle
                        title="vegan"
                        checked={values.vegan}
                        onChange={() =>
                          setValues({ ...values, vegan: !values.vegan })
                        }
                      />
                    </div>
                  </div>
                  <div className=" my-2 flex flex-row flex-wrap items-center justify-center ">
                    <div className="flex-1">
                      <Toggle
                        title="vegetarian"
                        checked={values.vegetarian}
                        onChange={() =>
                          setValues({
                            ...values,
                            vegetarian: !values.vegetarian,
                          })
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Toggle
                        title="plus"
                        checked={values.plus}
                        onChange={() =>
                          setValues({
                            ...values,
                            plus: !values.plus,
                          })
                        }
                      />
                    </div>
                  </div>

                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Description"
                    value={values.description}
                    onChange={(e) =>
                      setValues({ ...values, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => onSubmit()}
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 inline-flex   w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMenuItemFormModal
