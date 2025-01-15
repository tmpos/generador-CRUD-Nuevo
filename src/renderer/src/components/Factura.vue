<template>
  <div id="invoice" ref="componentRef" class="invoice p-4">
    <div class="header">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6">
          <img :src="datosEmpresa.empresa.imagen" alt="Logo" style="max-width: 100px;" class="max-w-xs" />
          <p>
            {{ datosEmpresa.empresa.name || 'Nombre Legal de la Empresa' }}<br>
            Dirección: {{ datosEmpresa.empresa.address || 'Dirección de la Empresa' }}<br>
            Teléfono: {{ datosEmpresa.empresa.phone || '123456789' }}<br>
            Email: {{ datosEmpresa.empresa.email || 'empresa@example.com' }}
          </p>
        </div>
        <div class="col-span-2"></div>
        <div class="col-span-4 company-details">
          <div class="border border-black rounded-lg p-2 text-center">
           <div class="w-full border-b border-black min-h-8"><span><b>FECHA</b></span></div>
            <span>{{ recibosData.created_at || 'Fecha de Emisión' }}</span>
          </div>
          <div class="border border-black rounded-lg p-2 text-center mt-2">
             <div class="w-full border-b border-black min-h-8"><span><b>FACTURA</b></span></div>
            <span class="invoice-id pt-2"><b>{{ recibosData.invoice_number || 'Número de Factura' }}</b></span>
          </div>
          <div v-if="recibosData.invoice_type != 'NORMAL'" class="border border-black rounded-lg p-2 text-center mt-2">
            <div class="w-full border-b border-black min-h-8"><span><b>{{ recibosData.invoice_type || 'NORMAL' }}</b></span></div>
            <span class="invoice-id pt-2"><b>{{ recibosData.receipt || 'NORMAL' }}</b></span>
          </div>


        </div>
      </div>
    </div>
    <main>
      <div class="grid grid-cols-12 gap-4 mt-4">
        <div class="col-span-6 invoice-to">
          <div class="text-gray-500"><b>CLIENTE</b></div>
          <h4 class="to">{{ cliente.name || 'Nombre del Cliente' }}</h4>
          <div class="address">CEDULA: {{ cliente.id_card || 'RNC del Cliente' }}</div>
          <div class="address">Tel.: {{ cliente.phone || 'Teléfono del Cliente' }}</div>
        </div>
        <div class="col-span-6 invoice-details">
          <h3 class="invoice-id">DIRECCION</h3>
          <div class="date">{{ cliente.address || 'Dirección del Cliente' }}</div>
          <div v-if="cliente.email !=''" class="date">{{ cliente.email || 'Email del Cliente' }}</div>
        </div>
      </div>
      <div class="table-container mt-4">
      <table class="min-w-full bg-white" id="tabla">
        <colgroup>
          <col width="35mm" />
          <col />
          <col width="20mm" />
          <col width="20mm" />
          <col width="20mm" />
        </colgroup>
        <thead>
          <tr class="invoice_line">
            <th class="text-center">CODIGO</th>
            <th class="text-center">DESCRIPCION</th>
            <th class="text-right">CANT.</th>
            <th class="text-right" v-if="configuracionFacturas.impuestos === 'True'">{{configuracion.nombre_impuesto}}</th>
            <th class="text-right">SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in products" :key="index" class="invoice_line">
            <td class="text-center">{{ producto.code }}</td>
            <td class="text-center">{{ producto.name || buscarProducto(producto.code) }}</td>

            <td v-if="configuracionFacturas.empaque === 'True'" class="text-right">{{ producto.empaque || 'UND' }}</td>

            <td class="text-right">{{ producto.cantidad || 1 }}</td>

            <td v-if="configuracionFacturas.impuestos === 'True'" class="text-right">{{ producto.total_taxes || '0.00' }}</td>

            <td class="text-right">{{ configuracion.simbolo }}{{ decimales(producto.total, 2) }}</td>

          </tr>

        <tr class="fill-remaining">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>

            <td v-if="configuracionFacturas.empaque === 'True'">&nbsp;</td>
            <td v-if="configuracionFacturas.impuestos === 'True'">&nbsp;</td>
            <td>&nbsp;</td>


        </tr>


        </tbody>
      </table>
    </div>


      <div class="containerS mt-3">

             <!-- Totales -->
      <div class="grid grid-cols-12 gap-4 mt-6">
        <div class="col-span-8">
          <div class="border border-gray-800 rounded-lg p-4">
            <span><b>Recibido Conforme por:</b></span>
            <p>{{ cliente.name || 'Nombre del Cliente' }}</p>
          </div>
          <div class="border border-gray-800 rounded-lg p-4 mt-4">
            <span><b>Elaborado Por:</b></span>
            <p>{{ recibosData.saller || 'Vendedor' }}</p>
          </div>
        </div>
        <div class="col-span-4 border border-gray-800 rounded-lg p-4">
          <div class="grid grid-cols-2 gap-2">
            <div class="text-left">SUBTOTAL</div>
            <div class="text-right">{{ configuracion.simbolo }}{{ decimales(recibosData.subtotal, 2) }}</div>
            <div class="text-left">ITBIS 18.00 %</div>
            <div class="text-right">{{ configuracion.simbolo }}{{ decimales(recibosData.tax, 2) }}</div>
            <div v-if="configuracionFacturas.descuento === 'True'" class="text-left">DESCUENTO</div>
            <div v-if="configuracionFacturas.descuento === 'True'" class="text-right">{{ configuracion.simbolo }}{{ decimales(recibosData.discount, 2) }}</div>
            <div class="text-left font-bold">TOTAL A PAGAR</div>
            <div class="text-right font-bold">{{ configuracion.simbolo }}{{ decimales(recibosData.total, 2) }}</div>
          </div>
        </div>
      </div>


        <div class="border border-black rounded-lg p-2 mt-3">
          <div class="uppercase"><span>Observación</span></div>
          {{ factura.nota || 'Gracias por su compra' }}
          <template v-if="factura.metodo_pago === 'CREDITO'">
            <p>ESTA FACTURA ES A <b>CREDITO</b></p>
            <template v-if="datosCredito.estatus === 'PENDIENTE'">
              <p>ESTADO <b>PENDIENTE</b></p>
              <p>SALDO PENDIENTE: <b>{{ datosCredito.saldo || '100.00' }}</b></p>
            </template>
            <template v-else>
              <p>ESTADO <b>SALDADO</b></p>
              <p>SALDO PENDIENTE: <b>{{ datosCredito.saldo || '0.00' }}</b></p>
            </template>
          </template>
        </div>
      </div>




      <div class="text-center mt-5">
        <b>Gracias por Preferirnos!</b>
        <template v-if="tipoFactura === 'cotizacion'">
          <b><span>Esperamos su pronta Respuesta</span></b><br>
          <span><b>Estos precios están sujetos a cambios sin previo aviso.</b></span>
        </template>
      </div>
    </main>
  </div>
<!--   <button @click="generatePDF" class="no-print btn btn-primary">Generar PDF</button>
  <button v-print="'#invoice'" class="no-print btn btn-primary">Print</button> -->
</template>



<script setup>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

import { defineProps, onMounted, ref } from 'vue';
    import { useAppStore,useDatosEmpresa } from '@/stores/index';
import { enviarDatosPorPost, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron, toast, crearTablaSiNoExiste, peticiones, generarCodigoUnico,generadorCodigo, lasMayusculas } from '../funciones/funciones.js';

    const datosEmpresa = useDatosEmpresa();
const props = defineProps({
  factura: Object
});

const componentRef = ref(null);


const empresa = ref({});
const configuracion = ref({});
const configuracionFacturas = ref({});
const datosVenta = ref({});
const productos = ref([]);
const cliente = ref({});
const factura = ref({});

const generatePDF = () => {
  const element = document.getElementById("invoice");
  html2canvas(element, {
    scale: 3 // Mayor resolución
  }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    let imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft > 0) {
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight-25);
      heightLeft -= pdfHeight;
      if (heightLeft > 0) {
        pdf.addPage();
        position = -pdfHeight;
      }
    }
    pdf.save("Factura"+recibosData.value.invoice_number+".pdf");
  });
};


const buscarProducto = (codigo) => {
  const producto = productos.value.find(p => p.codigo === codigo);
  return producto ? producto.nombre : "No Existe";
};

const decimales = (numero, decimales) => {
  return parseFloat(numero).toFixed(decimales);
};

/****************************************************************/
const recibosData = ref([])
const link = ref('');
const api = ref('');
const token = ref('');
const patronTelefono = ref('');
const linkImpresora = ref('');
const patroncedula = ref('');
const tokenCifrado = ref('');
const tokenCorto = ref('');
const usuarioLocal = ref({});
const ultimoRegistro = ref({});
const servicios = ref([]);
/****************************************************************/
const products = ref([])
/****************************************************************/

const fetchClientes = async () => {
  try {
    const response = await peticionesFetch(
      `${link.value}${api.value}`,
      'datoscampo/clients/code/'+recibosData.value.client_code,
      null,
      tokenCifrado.value,
      'GET'
    );
    cliente.value = response;
    console.log("cliente.value", cliente.value);
  } catch (error) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to fetch data from clientes', 
      life: 3000 
    });
  }
};

/****************************************************************/
const fetchRecibos = async (factura) => {
  try {
    const response = await peticionesFetch(
      `${link.value}${api.value}`,
      'datosarraycondicion/sales',
      { campo: 'invoice_number',valor: factura },
      tokenCifrado.value,
      'POST'
    );
    recibosData.value = response[0];
    products.value = JSON.parse(recibosData.value.products)
    console.log("products.value", products.value);
    //await fetchClientes(recibosData.value.nit_cliente)
  } catch (error) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to fetch data from recibos', 
      life: 3000 
    });
  }
};

/****************************************************************/

/****************************************************************/


onMounted(async() => {

  const datosJSON = await envioElectron('datosarchivo');
  link.value = datosJSON.VITE_LINKURL;
  api.value = datosJSON.VITE_LINK_API;
  token.value = datosJSON.VITE_TOKEN;
  patronTelefono.value = datosJSON.VITE_PATRON_TELEFONO;
  linkImpresora.value = datosJSON.VITE_IMPRESORA_LOCAL;
  patroncedula.value = datosJSON.VITE_PATRON_CEDULA;
  tokenCorto.value = datosJSON.VITE_TOKEN_CORTO;
  tokenCifrado.value = await encryptarPassword(token.value, 10);
  usuarioLocal.value = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0] || {};

  empresa.value = JSON.parse(localStorage.getItem('empresa')) || {};
  configuracion.value = JSON.parse(localStorage.getItem('configuracion')) || {};
  configuracionFacturas.value = JSON.parse(localStorage.getItem('configuracionfactura')) || {};
  datosVenta.value = JSON.parse(localStorage.getItem('datosVenta')) || {};
  productos.value = JSON.parse(localStorage.getItem('productos')) || [];
  //cliente.value = datosVenta.value.cliente || {};

await fetchRecibos(props.factura)
await fetchClientes()

  

});

/*******************************************************************/
const printInvoice = () => {
  // Esconde todo lo que no sea la factura
  const invoiceElement = document.getElementById("invoice");
  const originalContent = document.body.innerHTML;

  // Reemplaza el contenido del body con solo la factura
  document.body.innerHTML = invoiceElement.outerHTML;

  // Llama a la función de impresión
  window.print();

  // Restaura el contenido original
  document.body.innerHTML = originalContent;
  

};


/*******************************************************************/

/*******************************************************************/


</script>

<style scoped>
* {
  font-size: 12px !important;
  font-family: Arial, sans-serif !important;
  box-sizing: border-box;
}

#invoice {
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%; /* Asegura que ocupe toda la página */
}

.invoice {
  position: relative;
  background-color: #FFF;
  height: 100%; /* Asegura tamaño carta */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.invoice header {
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #3989c6;
}

.invoice .company-details {
  text-align: right;
}

.invoice .company-details .name {
  margin: 0;
}

.invoice main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.table-container {
  border-radius: 10px; /* Radio de las esquinas */
  overflow: hidden; /* Oculta los bordes de la tabla */
  border: 1px solid #000; /* Borde de la tabla */
  height: 100%;
}

#tabla {
  width: 100%;
  /*border: 1px solid #f0f0f0;*/
  border-collapse: collapse;
  height: 100%;
  border-radius: 5px;
}

#tabla th{
  border: 1px solid #000;
}

 #tabla td {

  padding: 5px;
  text-align: left;
  font-size: 10pt;
  border-radius: 5px;
  border-bottom: none;
}

#tabla th {
  text-align: center;
  background-color: #f5f5f5;
}

.invoice_line {
  height: auto; /* Cada fila se ajusta al contenido */
  border-bottom: none;
}

.invoice_line:last-child {
  height: auto; /* Ocupa espacio restante */
}

#totales {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.totales-section {
  width: 48%;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.font-bold {
  font-weight: bold;
}

.uppercase {
  text-transform: uppercase;
}

.fill-remaining {
  height: 100%; /* Se expande para llenar el espacio restante */
}

tbody {
  display: table-row-group;
  height: auto; /* Asegura que las filas previas ocupen su tamaño natural */
}

.fill-remaining td {
  height: 100%; /* Hace que la última fila se expanda */

}

@media print {
  #invoice {
    height: 100vh; /* Ocupa todo el alto de la página */
  }

  .no-print {
    display: none;
  }
}

</style>
