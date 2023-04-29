//library
import ClipLoader from 'react-spinners/ClipLoader'

export default function Loader() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <ClipLoader />
    </div>
  )
}
