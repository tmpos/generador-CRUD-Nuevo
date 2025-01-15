import { BrowserWindow, app } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import QRCode from 'qrcode';
import * as path from "path";
import fs from 'fs/promises';

import {
  peticiones,
  generadorCodigo,
  generarCodigoUnico,
  arrayToObjetoFromTabla,
  mensajetoast,
  actualizarLocalStorage,
  nfecha,
  envioElectron,
  peticionesFetch,
  encryptarPassword
} from '../funciones/funciones.js';

// Función para imprimir el ticket en formato HTML

async function loadConfig() {
  const userDataPath = app.getPath('userData');
  const configPath = path.join(userDataPath, 'config.json');

  try {
    const data = await fs.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo de configuración:', err);
    return {};
  }
}

export async function imprimirCredito(factura, datosEmpresa) {
  const datosJSON = await loadConfig();
  const datosLocalStorage = JSON.parse(datosEmpresa);

  const link = datosJSON.VITE_LINKURL;
  const api = datosJSON.VITE_LINK_API;
  const token = datosJSON.VITE_TOKEN;
  const patronTelefono = datosJSON.VITE_PATRON_TELEFONO;
  const linkImpresora = datosJSON.VITE_IMPRESORA_LOCAL;

  const tokenCifrado = await encryptarPassword(token, 10);

  const arrayPrinter = datosLocalStorage.printerconfig;
  if (!arrayPrinter || arrayPrinter.length === 0) {
    console.error('arrayPrinter is undefined or empty');
    return;
  }

  const datosFactura = await peticionesFetch(`${link}${api}`, `datoscampo/accounts_receivable/emission_number/${factura}`, {}, tokenCifrado, 'GET');
  const datosCliente = await peticionesFetch(`${link}${api}`, `datoscampo/clients/code/${datosFactura.client_code}`, {}, tokenCifrado, 'GET');
  const empresa = datosLocalStorage.empresa;

  const printerConfig = arrayPrinter[0].configuraciones ? JSON.parse(arrayPrinter[0].configuraciones) : {};
  const datosConfiguracion = datosLocalStorage.configuracion;

  const convertToBoolean = obj => {
    const newObj = {};
    for (let key in obj) {
      if (typeof obj[key] === "string") {
        newObj[key] = obj[key] === "True"; // Convertir a true si es "True", de lo contrario será false
      } else {
        newObj[key] = obj[key]; // Si no es string, mantener el valor original
      }
    }
    return newObj;
  };

  const configuracionfactura = convertToBoolean(datosLocalStorage.configuracionfactura);
  const printerName = arrayPrinter[0].nombre;


  const tablaDefault = datosLocalStorage.tabladefault;
  const cantidad = tablaDefault?.copias || 1;

  const pagos = JSON.parse(datosFactura.payments);


  const pagosHTML = pagos.map(pago=>{
    return `<tr>
        <td>${pago.fecha}</td>
        <td>${pago.hora}</td>
        <td>${datosConfiguracion.simbolo}${pago.cantidad}</td>
        <td>${pago.metodo}</td>
        <td>${datosConfiguracion.simbolo}${pago.pendiente}</td>
      </tr>`;
  }).join('');

  // Generar la tabla de productos en formato HTML
  const productos = JSON.parse(datosFactura.products);
  const productosHTML = productos.map(producto => {
    const totalProducto = (Number(producto.final_price) * Number(producto.quantity)).toFixed(2);
    return `
      <tr>
        <td colspan="5" class="" style="overflow-wrap: break-word; font-weight: bold; white-space: normal; word-break: break-word;">${producto.name}</td>
      </tr>
      <tr>
        <td style="padding-left:20px;">${producto.quantity}</td>
        ${configuracionfactura.empaque ? `<td class="precio centrado">${producto.packing}</td>` : ''}
        <td>${datosConfiguracion.simbolo}${Number(producto.sale_price).toFixed(2)}</td>
        ${configuracionfactura.impuestos ? `<td class="precio centrado">${datosConfiguracion.simbolo}${Number(producto.sale_tax).toFixed(2)}</td>` : ''}
        <td class="precio centrado" style="text-align:right;"><b>${datosConfiguracion.simbolo}${totalProducto}</b></td>
      </tr>
    `;
  }).join('');

  // Generar el contenido HTML para el ticket
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            * { font-size: ${printerConfig.fontSize}px; font-family: '${printerConfig.fontFamily}'; }
            @page { size: ${printerConfig.pageWidth}px auto; margin: ${printerConfig.margin || 5}px; }
            body { width: ${printerConfig.bodyWidth}px; margin: 5px; padding: 5px; }
            th { text-align: left; padding: 5px; border-bottom: 1px solid #000; }
            th.centrado { text-align: center; }
            th.precio { text-align: right; }
            .ticket {
                width: ${printerConfig.ticketWidth}px;
                padding-top:10px;
                padding-bottom:10px;
              }
            thead { border-bottom: 2px solid #000; }
            table { width: 100%; border-collapse: separate; border-spacing: 0 ${printerConfig.espacio || 0}px !important; }
            td, th { width: ${printerConfig.ticketWidth}px;}
            .bordeado2 {border:1px solid #000000; border-radius:5px; padding:3px;max-width:150px;margin-top:5px;}
            .centrado { text-align: center; align-content: center; }
            .derecha { text-align: right; }
            .linea { width: 100%; border-top: 1px solid #000; padding-top: 5px; padding-bottom: 5px; margin-bottom: 5px; padding-right: 10px; }
            .bordeado { border:1px solid #000000; border-radius:5px; padding-left:5px; }

            #descuento { display: ${configuracionfactura.descuento ? 'block' : 'none'}; }
            #subtotal { display: ${configuracionfactura.subtotal ? 'block' : 'none'}; }
            #impuesto { display: ${configuracionfactura.impuestos ? 'block' : 'none'}; padding-bottom:10px}
            #total { display: ${configuracionfactura.total ? 'block' : 'none'}; }
            #qrcode { display: ${configuracionfactura.barcode ? 'block' : 'none'}; }
            #firma { display: ${configuracionfactura.firma ? 'block' : 'none'}; }
            #nota { display: ${configuracionfactura.nota ? 'block' : 'none'}; }
            #sucambio { display: ${configuracionfactura.cambio ? 'block' : 'none'}; }
            #pagocon { display: ${configuracionfactura.cambio ? 'block' : 'none'}; }

.info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.left-column {
    flex: 1;
    padding-right: 10px;
}

.right-column {
    text-align: left;
    flex: 0 0 auto;
}

        </style>
    </head>
    <body>
        <div class="ticket">
            <center id="top">
                <div class="logos" style="text-align: center;">
                 ${configuracionfactura.logo ?
                    `<img src="${empresa.logoprinter}" alt="Logo" style="max-width: ${printerConfig.logoWidth}px">` :
                    `<div style="font-size:${Number(printerConfig.fontSize) + 8}px !important;font-weight:bold">${empresa.name}</div>`
                  }
                </div>
                <div class="info">
                    <p>${configuracionfactura.direccion ? empresa.address : ''}<br>${configuracionfactura.telefono ? empresa.phone : ''}  ${configuracionfactura.email ? '/ '+ empresa.email : ''}<br>${configuracionfactura.legal ? empresa.legal : ''}</p>
                </div>
            </center>

<div id="mid" class="bordeado">
    <div class="info">
        <div class="left-column">
            <p>
                ${configuracionfactura.no_factura ? `CREDITO #: <b style="font-size:16px">#${datosFactura.emission_number}</b><br>` : ''}
                ${configuracionfactura.comprobante ? `FACTURA #: ${datosFactura.invoice_number}<br>` : ''}
                ${configuracionfactura.nombre_cliente ? `CLIENTE: ${datosFactura.client_name || 'SIN REGISTRO'}<br>` : ''}
                ${configuracionfactura.telefono_cliente ? `TELEFONO: ${datosCliente.phone || 'SIN REGISTRO'}<br>` : ''}
                ${configuracionfactura.direccion_cliente ? `DIRECCION: ${datosCliente.address || 'SIN REGISTRO'}<br>` : ''}
                ${configuracionfactura.vendedor ? `VENDEDOR: ${datosFactura.seller}<br>` : ''}
                ${configuracionfactura.cajero ? `CAJERO: ${datosFactura.cashier}<br>` : ''}
                ${configuracionfactura.instalador ? `INSTALADOR: ${instalador}<br>` : ''}
                ${configuracionfactura.delivery ? `DELIVERY: ${delivery}<br>` : ''}
            </p>
        </div>
        <div class="right-column">
            <p>
                ${configuracionfactura.fecha ? `Fecha: ${datosFactura.issue_date}<br>` : ''}
                ${configuracionfactura.hora ? `Hora: ${datosFactura.time}<br>` : ''}
                Expira:${datosFactura.due_date}
            </p>
        </div>
    </div>
</div>

            <div  class="bordeado" style="text-align:center;padding:3px">
                 FACTURA A CREDITO
            </div>
            <table cellspacing="0" cellpadding="0">
                <thead class="linea">
                    <tr>
                        <th class="" style="text-align:left;padding-top: 5px;padding-bottom: 5px;">CANT.</th>
                        ${configuracionfactura.empaque ? `<th class="precio" style="text-align:left;padding-top: 5px;padding-bottom: 5px;">EMPAQ.</th>` : ''}
                        <th class="precio" style="text-align:left;padding-top: 5px;padding-bottom: 5px;">PRECIO</th>
                        ${configuracionfactura.impuestos ? `<th class="precio" style="text-align:left;padding-top: 5px;padding-bottom: 5px;">${datosConfiguracion.nombre_impuesto}</th>` : ''}
                        <th class="precio centrado" style="text-align:right;padding-top: 5px;padding-bottom: 5px;">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    ${productosHTML}
                </tbody>
            </table>

            <div class="linea" style="margin-top: 30px;"></div>

            <div id="subtotal" style="font-weight: bold;">
                <table>
                    <tr>
                        <td>CREDITO:</td>
                        <td style="text-align:right;"><span style="font-size: 1.5em !important;margin-top: 5px;margin-bottom: 5px;">${datosConfiguracion.simbolo}${datosFactura.credit_amount}</span></td>
                    </tr>
                </table>
            </div>

            <div style="font-weight: bold;">
                <table>
                    <tr>
                        <td>ABONADO:</td>
                        <td style="text-align:right;"><span style="font-size: 1.5em !important;margin-top: 5px;margin-bottom: 5px;">${datosConfiguracion.simbolo}${datosFactura.installments}</span></td>
                    </tr>
                </table>
            </div>

            <div id="impuesto" style="font-weight: bold;">
                <table>
                    <tr>
                        <td>PENDIENTE:</td>
                        <td style="text-align:right;"><span style="font-size: 1.5em !important;margin-top: 5px;margin-bottom: 5px;">${datosConfiguracion.simbolo}${datosFactura.balance}</span></td>
                    </tr>
                </table>
            </div>

            <div class="bordeado1" style="min-height:50px;max-width:${printerConfig.bodyWidth}">
                <table cellspacing="0" cellpadding="0">
                  <thead class="bordeado">
                    <tr>
                        <th>FECHA</th>
                        <th>HORA</th>
                        <th>CANT.</th>
                        <th>METODO</th>
                        <th>PEND</th>

                    </tr>
                </thead>
                     <tbody>
                    ${pagosHTML}
                     </tbody>
                 </table>
            </div>



            <div id="firma" class="firma bordeado" style="min-height:50px">
                <center style="margin-top:30px">
                  Firma:____________________________________
                 </center>
            </div>

            <div  class="bordeado" style="min-height:50px">
              <p>${datosFactura.note}</p>
            </div>


        </div>
    </body>
    </html>
    `;

  const win = new BrowserWindow({ width: 300, height: 600, show: false });

  // Cargar el contenido HTML
  win.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(htmlContent)}`);

  win.webContents.on('did-finish-load', () => {
    let copiesPrinted = 0;

    const printNextCopy = () => {
      // Inicia la impresión de una copia
      win.webContents.print({
        silent: true,  // Impresión silenciosa
        printBackground: true,  // Imprime con fondos
        deviceName: printerName,  // Nombre de la impresora
        margins: { marginType: 'none' },  // Sin márgenes
        pageSize: { width: 80000, height: 295000 },  // Tamaño de página (80mm de ancho)
        preview: false  // Evita mostrar el cuadro de diálogo de impresión
      }, (success, errorType) => {
        if (!success) {
          console.error('Error en la impresión:', errorType);
        } else {
          // Incrementa el contador de copias impresas
          copiesPrinted++;

          // Si aún faltan copias por imprimir, llama de nuevo a la función
          if (copiesPrinted < cantidad) {
            printNextCopy();  // Imprime la siguiente copia
          }
        }
      });
    };

    // Inicia el proceso de impresión en bucle
    printNextCopy();
  });
}
