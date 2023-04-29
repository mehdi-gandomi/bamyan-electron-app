import React, { FC } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
// import AsyncSelect from 'react-select/async'

import { ApiStatus } from '../../types/common'
import { Extra } from '../../types/extra'
import Loader from './Loader'

type Values = { title: string; isActive: boolean; extras: Extra[] }

type Props = {
  onSubmit: (values: Values) => void
  onClose: () => void
  apiCallStatus: ApiStatus
}

const InputField = ({
  fieldName,
  prefix,
  placeholder,
  value,
  onChange,
  className,
}: {
  fieldName: string
  prefix?: string
  placeholder: string
  value?: string
  onChange: (value: string) => void
  className?: string
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {fieldName}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type="text"
          name={fieldName}
          id={fieldName}
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder || ''}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
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

const AddCategoryFormModal: FC<Props> = ({
  onSubmit,
  onClose,
  apiCallStatus,
}) => {
  const [values, setValues] = React.useState<Values>({
    title: '',
    isActive: true,
    extras: [{ title: '', price: 0 }],
  })

  console.log({ values })

  const addExtraInputs = () => {
    setValues({
      ...values,
      extras: [...values.extras, { title: '', price: 0 }],
    })
  }

  const shouldDisable = () =>
    apiCallStatus === ApiStatus.PENDING || values.title == ''
  // const getExtras = () =>
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/extras/${cate}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const temp = res.map((item: CategoryType) => ({
  //         value: item,
  //         label: item.title,
  //       }))
  //       return temp
  //     })
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
                <div className="mt-3 flex-1  text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="my-3 mb-4 text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Add New Category
                  </h3>

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
                  </div>
                  <div className="my-4">
                    <label>Extras</label>
                    {values.extras.map((e, index) => (
                      <div key={index} className="my-2 flex w-full items-center justify-around">
                        <InputField
                          className="mx-2 w-1/2"
                          fieldName="Title"
                          placeholder="Title"
                          value={e.title || ''}
                          onChange={(value) => {
                            setValues({
                              ...values,
                              extras: [
                                ...values.extras?.map((e, i) => {
                                  if (i != index) return e
                                  return {
                                    title: value,
                                    price: e.price,
                                  }
                                }),
                              ],
                            })
                          }}
                        />
                        <InputField
                          prefix="€"
                          className="mx-2 w-1/4"
                          fieldName="Price"
                          placeholder="Price"
                          value={(e.price || 0) + ''}
                          onChange={(value) =>
                            setValues({
                              ...values,
                              extras: [
                                ...values.extras?.map((e, i) => {
                                  if (i != index) return e
                                  return {
                                    title: e.title,
                                    price: +value,
                                  }
                                }),
                              ],
                            })
                          }
                        />
                        <IoIosRemoveCircleOutline
                          className="mt-5 cursor-pointer"
                          size={15}
                          onClick={() => {
                            const newValues: Values = {
                              ...values,
                              extras: [
                                ...values.extras?.filter((e, i) => i != index),
                              ],
                            }
                            setValues(newValues)
                          }}
                        />
                      </div>
                    ))}
                    <div className="flex w-full">
                      <div style={{ flex: 1 }} />
                      <AiOutlinePlusCircle
                        size={20}
                        className="m-2 cursor-pointer"
                        onClick={addExtraInputs}
                      />
                      <div style={{ flex: 1 }} />
                    </div>
                    {/* <label className="mb-1 block text-sm font-medium text-gray-700">
                      Extras
                    </label>
                    <AsyncCreatableSelect
                      // isOptionDisabled={() => true}
                      isMulti
                      cacheOptions
                      defaultOptions
                      placeholder="type extra"
                      // noOptionsMessage={() => undefined}
                      options={['test']}
                      // noOptionsMessage={() => t('enterKeyword')}
                      closeMenuOnSelect={true}
                      // menuPlacement
                      components={makeAnimated()}
                      // loadOptions={debouncedLoadTags}
                      // styles={selectStyles}
                      // onChange={(value) => console.log({ value })}
                      onChange={(value) => {
                        // console.log({ values, value })
                        // if(values?.extras?.some(value))
                        setValues({
                          ...values,
                          extras: [
                            ...(
                              value as { label: string; value: string }[]
                            ).map((v) => v.value),
                          ],
                        })
                      }}
                      // value={tags}
                      // isLoading={isLoading}
                    /> */}
                    {/* <AsyncSelect
                      cacheOptions
                      isMulti
                      loadOptions={getExtras}
                      defaultOptions
                      isSearchable={false}
                      onChange={(value) => {
                        // console.log({ values, value })
                        // if(values?.extras?.some(value))
                        setValues({
                          ...values,
                          extras: [...value.map((v: any) => v.value)],
                        })
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {apiCallStatus === ApiStatus.PENDING ? (
                <Loader />
              ) : (
                <>
                  <button
                    disabled={shouldDisable()}
                    onClick={() => onSubmit(values)}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryFormModal
