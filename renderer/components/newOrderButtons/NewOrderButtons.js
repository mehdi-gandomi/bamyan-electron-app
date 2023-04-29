import { useState } from 'react'
import ChevronLeft from '../icons/ChevronLeft'
import ChevronRight from '../icons/ChevronRight'
import { callWaiterApiStatusesEnum } from '../../src/enums/callWaiterApiStatuses'
import BeatLoader from 'react-spinners/BeatLoader'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
const buttonsList = [
  { id: '6252eabd5d4d2f73e0ea147f', title: 'Fragen' },
  { id: '6257df06f9322b354f2f7833', title: 'Bezahlen' },
  { id: '6252eb1a5d4d2f73e0ea1485', title: 'Bestellen' },
]

const NewOrderButtons = (props) => {
  // console.log('props')
  // console.log(props)
  return (
    <div className="fixed bottom-0 z-10 flex h-[70px] w-full items-center justify-between bg-white px-[16px]">
      <div className="flex gap-[8px]">
        {buttonsList.map((item) => (
          <ActionButton
            {...props}
            key={item.id}
            title={item.title}
            id={item.id}
          />
        ))}
      </div>
      <div className="flex items-center gap-[4px]">
        <button
          onClick={() => {
            props.setMenuPageNumber(props.menuPageNumber - 1)
            // console.log('sosis back')
          }}
          disabled={!(props.menuPageNumber > 0)}
          className={`flex h-[34px] w-[34px] items-center justify-center rounded-full ${
            props.menuPageNumber > 0 ? 'bg-black' : 'bg-gray-500'
          } text-white`}
        >
          <ChevronLeft />
        </button>
        <div className="text-[25px]">{props.menuPageNumber + 1}</div>
        <button
          onClick={() => props.setMenuPageNumber(props.menuPageNumber + 1)}
          disabled={!(props.menuPageNumber < props.menuGallery.length - 1)}
          className={`flex h-[34px] w-[34px] items-center justify-center rounded-full ${
            props.menuPageNumber < props.menuGallery.length - 1
              ? 'bg-black'
              : 'bg-gray-500'
          } text-white`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

const ActionButton = (props) => {
  const createNotification = () => {
    NotificationManager.success(
      `Ihre Anforderung  (${props.title}) haben wir erhalten, unsere kollegin kommt zu ihnen, danke für ihre Geduld`,
      'Anforderung Erhalten'
    )
  }
  // props.tableCurrentStatus.tableStatus.title === props.title
  return (
    <>
      <NotificationContainer />
      {props.callWaiterApiStatus === callWaiterApiStatusesEnum.PENDING ? (
        <BeatLoader size={8} />
      ) : (
        <button
          className={`btn btn-success z-10 w-fit rounded-lg border border-black p-[4px] transition-all
    ${
      props.tableCurrentStatus.tableStatus.title === props.title
        ? ' bg-black text-white'
        : ' bg-transparent'
    }`}
          onClick={() => {
            createNotification()
            props.submitOrder(props.id)
          }}
          disabled={
            props.callWaiterApiStatus === callWaiterApiStatusesEnum.PENDING
          }
        >
          {props.title}
        </button>
      )}
    </>
  )
}
export default NewOrderButtons
