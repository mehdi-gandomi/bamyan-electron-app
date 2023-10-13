

const {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} = require('node-thermal-printer');
import axios from 'axios'
export const print = async (order:any,ip:any) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${order['_id']}/print`)
      //   const fullOrder = await data.json();
      ip=ip ? ip:"192.168.2.36";
      const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON, // 'star' or 'epson'
        interface: `tcp://${ip}`,
        options: {
          timeout: 1000,
        },
        width: 48, // Number of characters in one line - default: 48
        characterSet: CharacterSet.SLOVENIA, // Character set - default: SLOVENIA
        breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
        removeSpecialCharacters: false, // Removes special characters - default: false
        lineCharacter: '-', // Use custom character for drawing lines - default: -
      });
      const isConnected = await printer.isPrinterConnected();
      console.log('Printer connected:', isConnected);

      // printer.setTextNormal();                                    // Set text to normal
      printer.setTextDoubleHeight();                              // Set text to double height
      printer.setTextDoubleWidth();                               // Set text to double width
      // printer.setTextQuadArea();                                  // Set text to quad area
      // printer.setTextSize(7,7);  


    let {data:fullOrder} = await axios.get(`https://bamiyan-kebab-backend.herokuapp.com/order/${order['_id']}/print`)
      // const fullOrder = await data.json();
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
        { text: order.code, align: 'LEFT', bold: true },
        { text: order.table.tableNumber || "", align: 'RIGHT', bold: true },
      ]);
      printer.drawLine();
      let total=0;
      for(const item of fullOrder.order){
        const menuItem = item.menuItem;
        total+=item.count * menuItem.price;
        let extraText:any=[];
        let extraPrice:any=0;
        if(item.extras && item.extras.length){
          for(const extra of item.extras){
            // total+=(extra.count * extra.extra.price);
            extraPrice+=(extra.count * extra.extra.price);
            extraText.push(`${extra.extra.title}(${extra.count})`);
          }

        }
        if(extraText.length) extraText=extraText.join(",")


        // printer.tableCustom([
        //   { text: `${item.count}x`, align: 'LEFT', bold: true },
        //   { text: menuItem.title, align: 'CENTER' },
        //   { text: item.extras && item.extras.length ? (item.count * menuItem.price)+extraPrice:(item.count * menuItem.price), align: 'RIGHT', bold: true },
        // ]);
        // printer.println(`${item.count}x  ${menuItem.title}  ${item.extras && item.extras.length ? (item.count * menuItem.price)+extraPrice:(item.count * menuItem.price)}`);
        printer.println(`${item.count}x  ${menuItem.title}  ${(item.count * menuItem.price)}`);
        if (item.extras && item.extras.length) {
          printer.alignCenter();
          printer.println(`Beilage: ${extraText}`);
        }
        printer.alignLeft();
        // printer.println('************************');
        printer.drawLine();
        printer.newLine();
      }

      printer.drawLine();
      if(order.hasTip){
        let price=(total * 10) / 100;
        total+=price;
      }

      printer.tableCustom([
        { text: 'Total', align: 'LEFT', bold: true },
        { text: `€${total}  ${order.hasTip ? 'x 10%(tip added by client)':''}`, align: 'RIGHT', bold: true },
      ]);
      printer.newLine();
      printer.println(order.description);
      printer.cut();
      printer.openCashDrawer();

      console.log(printer.getText());

      try {
        await printer.execute();
        console.log('Print success.');
      } catch (error) {
        console.error('Print error:', error);
      }
    } catch (e) {
      console.log(e);
    }
    return resolve(true);
  });
};
