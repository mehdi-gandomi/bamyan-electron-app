
const printerIp = '192.168.0.230'
export const printOrder = async (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${order['_id']}/print`
      )
      const fullOrder = await data.json()
      let ePosDev = new window.epson.ePOSDevice()
      ePosDev.connect(printerIp, 8008, (data) => {
        if (data === 'OK') {
          ePosDev.createDevice(
            'local_printer',
            ePosDev.DEVICE_TYPE_PRINTER,
            { crypto: true, buffer: false },
            async (devobj, retcode) => {
              if (retcode === 'OK') {
                let printer = devobj
                try {
                  printer.addTextAlign(printer.ALIGN_CENTER)
                  printer.addText(
                    `${new Date(order.orderTime).toLocaleDateString(
                      'ko-KR'
                    )} ${new Date(order.orderTime).getHours()}:${new Date(
                      order.orderTime
                    ).getMinutes()}`
                  )
                  printer.addTextAlign(printer.ALIGN_LEFT)
                  printer.addText(`B.Nr: ${order.code}`)
                  printer.addTextAlign(printer.ALIGN_RIGHT)
                  printer.addText(`Table Nr: ${order.table.tableNumber}`)
                  printer.addPageLine(0, 50, 99, 50, printer.LINE_THIN)
                  printer.addTextAlign(printer.ALIGN_LEFT)
                  let total = 0
                  for (const item of fullOrder.order) {
                    const menuItem = await menuService.getMenuItem(item['_id'])
                    total += item.count * menuItem.price
                    let extraText = []
                    let extraPrice = 0
                    if (item.extras && item.extras.length) {
                      for (const extra of item.extras) {
                        total += extra.count * extra.extra.price
                        extraPrice += extra.count * extra.extra.price
                        extraText.push(`${extra.extra.title}(${extra.count})`)
                      }
                    }
                    if (extraText.length) extraText = extraText.join(',')

                    printer.addText(`${item.count}x`)
                    printer.addTextAlign(printer.ALIGN_CENTER)
                    printer.addText(menuItem.title)
                    printer.addTextAlign(printer.ALIGN_RIGHT)
                    printer.addText(
                      item.extras && item.extras.length
                        ? item.count * menuItem.price + extraPrice
                        : item.count * menuItem.price
                    )
                    printer.addTextAlign(printer.ALIGN_CENTER)
                    printer.addText(`${extraText}`)
                  }

                  printer.addPageLine(0, 50, 99, 50, printer.LINE_THIN)
                  printer.addTextAlign(printer.ALIGN_LEFT)
                  printer.addText(`Total: ${total}`)
                  printer.send()
                } catch (e) {
                  console.log(e)
                }
                return resolve(true)
              } else {
                throw retcode
              }
            }
          )
        } else {
          throw data
        }
      })
    } catch (e) {
      console.log('print error', e)
    }
    return resolve(true)
  })
}
