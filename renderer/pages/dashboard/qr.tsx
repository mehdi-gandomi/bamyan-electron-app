//library
import { useEffect, useState } from 'react'

// components
import Card from '../../components/common/Card'

type Props = {}

const calculateMargin = (Number: number) => {
  let marginPixel = ` ${167 + Number * 2.7}px`
  // console.log(marginPixel)
  return marginPixel
}

export default function Qr({}: Props) {
  const [tables, setTables] = useState([])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/table`)
      .then((res) => res.json())
      .then((data) => {
        setTables(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  return (
    <div className="flex flex-wrap gap-[14px]">
      {tables &&
        tables.map((table: any) => (
          <div
            key={table._id}
            style={{
              marginBottom:
                table.tableNumber % 6 === 0
                  ? `${calculateMargin(table.tableNumber)}`
                  : '0px',
            }}
          >
            <Card key={table._id} table={table} />
          </div>
        ))}
    </div>
  )
}
