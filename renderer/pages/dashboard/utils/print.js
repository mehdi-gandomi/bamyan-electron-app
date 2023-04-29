
  const printerIp='192.168.0.230';
  export const printOrder = async (order) => {
    return new Promise(async (resolve, reject) => {
      const printer = new ThermalPrinter(PrinterTypes.EPSON);
      try {
        let data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${order['_id']}/print`)
        const fullOrder = await data.json();
        
        console.log("fullorder",fullOrder,order)
        
        // const isConnected = await printer.isPrinterConnected();
        // console.log('Printer connected:', isConnected);
        printer.alignCenter();
        printer.println(`${new Date(order.orderTime).toLocaleDateString('ko-KR')} ${new Date(order.orderTime).getHours()}:${new Date(
          order.orderTime
        ).getMinutes()}`);
        //   printer.leftRight('Left', 'Right');
        printer.tableCustom([
          { text: 'B.Nr', align: 'LEFT', bold: true },
          { text: 'Table Nr', align: 'RIGHT', bold: true },
        ]);
        printer.tableCustom([
          { text: order.code || "123", align: 'LEFT', bold: true },
          { text: order.table.tableNumber, align: 'RIGHT', bold: true },
        ]);
        printer.drawLine();
        let total = 0;
        for (const item of fullOrder.order) {
          const menuItem = item.menuItem;
          total += item.count * menuItem.price;
          let extraText = [];
          let extraPrice = 0;
          if (item.extras && item.extras.length) {
            for (const extra of item.extras) {
              total += (extra.count * extra.extra.price);
              extraPrice += (extra.count * extra.extra.price);
              extraText.push(`${extra.extra.title}(${extra.count})`);
            }

          }
          if (extraText.length) extraText = extraText.join(",")


          printer.tableCustom([
            { text: `${item.count}x`, align: 'LEFT', bold: true },
            { text: menuItem.title, align: 'CENTER' },
            { text: item.extras && item.extras.length ? (item.count * menuItem.price) + extraPrice : (item.count * menuItem.price), align: 'RIGHT', bold: true },
          ]);
          if (item.extras && item.extras.length) {
            printer.alignCenter();
            printer.println(`extras: ${extraText}`);
          }
          printer.alignLeft();
          printer.println('************************************************');
          printer.newLine();
        }

        printer.drawLine();
        if (order.hasTip) {
          let price = (total * 10) / 100;
          total += price;
        }
        printer.tableCustom([
          { text: 'Total', align: 'LEFT', bold: true },
          { text: `€${total}`, align: 'RIGHT', bold: true },
        ]);
        printer.newLine();
        printer.println(order.description);
        printer.cut();
        printer.openCashDrawer();

        console.log(printer.getText());

        // try {
        //   await printer.execute();
        //   console.log('Print success.');
        // } catch (error) {
        //   console.error('Print error:', error);
        // }
      } catch (e) {
        console.log(e);
      }
      return resolve(true);
        
    });
  };