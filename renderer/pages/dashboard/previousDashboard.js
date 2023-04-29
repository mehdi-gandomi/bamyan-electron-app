import useSWR, { SWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import TailWindModal from '../../components/tailWindModal/TailWindModal'

// import DropDownMenu from '../../components/tailWindModal/DropDownMenu'

const fetcher = (url) => fetch(url).then((res) => res.json())
const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/lastOrders`

function getHumanReadableTIme(numericTime) {
  let d = new Date(numericTime)
  let curr_second = d.getSeconds()
  let curr_minute = d.getMinutes()
  let curr_hour = d.getHours()
  // let curr_date = d.getDate()
  // let curr_month = d.getMonth()
  // let curr_year = d.getFullYear()
  return curr_hour + ':' + curr_minute + ':' + curr_second
}

export async function getServerSideProps() {
  const repoInfo = await fetcher(API)
  return {
    props: {
      fallback: {
        [API]: repoInfo,
      },
    },
  }
}
/////////===========COMPONENT===========================
function OrderPanel() {
  // const { mutate } = useSWRConfig()
  const { data, error, mutate } = useSWR(API, fetcher, {
    refreshInterval: 5000,
  })
  const [modalIsOpen, setIsOpen] = useState(false)

  useEffect(() => {}, [modalIsOpen])
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  // there should be no `undefined` state
  // console.log('Is data ready?', !!data)
  // console.log(data)

  const resetTable = (tableId) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableId: tableId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        mutate()
      })
      .catch((err) => console.log(err))
  }
  const resetAllTables = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/allOrder`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        mutate()
      })
      .catch((err) => console.log(err))
  }
  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  // console.log(data)

  return (
    <div className="flex min-h-screen w-screen flex-col bg-transparent text-center">
      <img
        src="https://res.cloudinary.com/ingootag-com/image/upload/v1650366747/samples/food/pexels-lukas-349610_y0to1k.jpg"
        alt="sosis khone"
        className="absolute top-0 right-0 -z-10 h-full w-full object-cover"
      />
      {data.length ? (
        <>
          <table className="table border-separate border border-[#ffffff] bg-[#ffffff] ">
            <thead className="">
              <tr className="bg-black text-white">
                <th>Table Number</th>
                <th>status</th>
                <th>time</th>
                <th>Admin table control</th>
                <th>Waiter Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 bg-white">
              {data
                ?.sort((a, b) => a.time - b.time)
                .map(
                  (
                    tableRecord // loading
                  ) => (
                    <tr
                      className="whitespace-nowrap"
                      key={tableRecord.table[0]._id}
                    >
                      <td className="td font-bold">
                        {tableRecord.table[0].tableNumber}
                      </td>
                      <td>{tableRecord.tableStatus[0].title}</td>
                      <td className="td">
                        {getHumanReadableTIme(tableRecord.time)}
                      </td>
                      <td>
                        <button
                          onClick={() => resetTable(tableRecord.table[0]._id)}
                          type="button"
                          className=" center-center border-lg rounded-md border border-black bg-transparent p-[10px] px-6 py-2 text-center font-bold text-red-600 shadow-md backdrop-blur-md hover:bg-black hover:text-white"
                        >
                          Reset Table
                        </button>
                      </td>
                      <td>
                        {/* <DropDownMenu /> */}
                        Waiter names
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          <div className="fixed bottom-0 w-full p-9 ">
            <button
              className=" w-fit rounded-xl border-2 border-red-500 bg-transparent px-6 py-3 font-bold backdrop-blur-sm hover:bg-black hover:text-white"
              // onClick={() => resetAllTables()}
              onClick={openModal}
              type="button"
            >
              Reset All Tables
            </button>
          </div>
          {!modalIsOpen ? null : (
            <TailWindModal
              openModal={openModal}
              closeModal={closeModal}
              resetAllTables={resetAllTables}
            />
          )}
        </>
      ) : (
        'Nothing is not here'
      )}
    </div>
  )
}

export default function App({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <OrderPanel />
    </SWRConfig>
  )
}
