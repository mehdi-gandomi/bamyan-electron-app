import React from 'react'
import { useEffect, useState } from 'react'

export default function UserLoginModal(props) {
  function checkPassword(pass) {
    console.log(dashboardPassword)
    if (pass === '123bam') {
      // alert('Welcome')
      props.closeModal()
    }
  }

  const [dashboardPassword, setDashboardPassword] = useState(true)
  useEffect(() => {
    checkPassword(dashboardPassword)
  }, [dashboardPassword])
  return (
    <div>
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-300 bg-opacity-75 opacity-30 transition-opacity"
            ariaHidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            ariaHidden="true"
          >
            &#8203;
          </span>
          <div
            className="absolute 
             bottom-2 right-2
          inline-block
           transform overflow-hidden rounded-lg bg-white text-left align-bottom opacity-60 shadow-xl transition-all sm:w-full sm:max-w-lg sm:align-middle"
          >
            <div className="bg-white sm:p-1 sm:pb-1">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ariaHidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  ></h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500"></p>
                    <div className="flex justify-center pt-4 pr-6">
                      <div className="mb-3 xl:w-96">
                        <label
                          htmlFor="examplePassword0"
                          className="form-label mb-2 inline-block text-gray-700"
                        >
                          Password input
                        </label>
                        <input
                          type="password"
                          className=" form-controlm-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3

                          py-1.5 text-base font-normal
                          text-gray-700
                  
                          transition
                          ease-in-out
                          focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none  "
                          id="examplePassword0"
                          placeholder="Password input"
                          onChange={(e) => setDashboardPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={checkPassword()}
                // onClick={props.closeModal}
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Dashboard Pass
              </button>
              {/* <button
                onClick={props.closeModal}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
