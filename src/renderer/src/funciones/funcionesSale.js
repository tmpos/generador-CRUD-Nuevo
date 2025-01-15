// @ts-nocheck
import {peticiones,nfecha,generarCodigoUnico,agregarDiasalaFechaActual,enviarDatosPorPost,arrayToObjetoFromTabla,generadorCodigo,peticionesFetch} from './funciones.js';

export async function facturaNueva(url,data,metodo,token,linkApi){

let datosCLiente = data.cliente;
if(!data.cliente.name){
  datosCLiente = await arrayToObjetoFromTabla(linkApi,token,'clients');
  datosCLiente.name = 'NO REGISTRADO';
  datosCLiente.code = '00000000';
  datosCLiente.address = 'NO REGISTRADO';
  datosCLiente.phone = '000-000-0000';
}

if (!data.note || data.note == '' ) {
  const datosNota = await peticionesFetch(`${linkApi}`,`datoscampo/notes/tittle/THANKS`,{},token,'GET');
  data.note = datosNota.note
}

/*      cliente:clienteSelected.value,
        productos:productosVentaArray.value,
        total: totalFactura.value,
        subtotal: subtotalFactura.value,
        impuestos: totalImpuestos.value,
        estado
        ganancia: totalGanancias.value*/

    const datosUsuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal')) || [];
    if (!datosUsuarioLocal) {
        return ['error'];
    }

      const ultimaFactura = await peticiones(`${linkApi}/datosmax`, {"tabla":'sales',"campo":'invoice_number'},'POST',token);

      const invoiceNumber = generadorCodigo(ultimaFactura[0], '', 7);

  //const datosCliente = await peticionesFetch(`${link.value}${api.value}`,`datoscampo/tabladefault/id/1`,{},tokenCifrado.value,'GET');

let datosComprobante = '';


if (data.receipt == 'NORMAL') {
  //data.receipt = 'SIN COMPROBANTE'
  data.comprobante = 'SIN COMPROBANTE'
}else{
  datosComprobante = await peticionesFetch(`${linkApi}`,`datoscampo/tax_config/name/${data.receipt}`,{},token,'GET');
  data.comprobante = generadorCodigo(datosComprobante.counter, datosComprobante.prefix, 8);
}

let efectivo = 0;
let transferencia = 0;
let tarjeta = 0;

if (data.metodoPago == 'EFECTIVO') {
   efectivo = data.total;
}else if(data.metodoPago == 'TRANSFERENCIA'){
  transferencia = data.total;
}else if(data.metodoPago == 'TARJETA'){
  tarjeta = data.total;
}else if(data.metodoPago == 'MIXTO'){
  tarjeta = data.pagoMixto.tarjeta;   
  efectivo = data.pagoMixto.efectivo;
  transferencia = data.pagoMixto.transferencia;
}


var datos = {
  'invoice_number':invoiceNumber , 
  'invoice_type':data.receipt, 
  'receipt':data.comprobante , 
  'issue_date':nfecha('fecha') , 
  'client_code':data.cliente.code , 
  'client_email':data.cliente.email , 
  'client_phone':data.cliente.phone , 
  'client_name':data.cliente.name , 
  'products':JSON.stringify(data.productos), 
  'seller':'' , 
  'payment_method':data.metodoPago , 
  'tax':data.impuestos , 
  'discount':'' , 
  'subtotal':data.subtotal, 
  'total':data.total , 
  'profit':data.ganancia , 
  'invoice_status':'' , 
  'payment_status':'' , 
  'cash':efectivo , 
  'sales_channel':'LOCAL' , 
  'transfer':transferencia , 
  'card':tarjeta , 
  'status_date':nfecha('fecha') , 
  'financial':'' , 
  'cashier':'' , 
  'month':'' , 
  'year':nfecha('year'), 
  'token':'' , 
  'time':nfecha('hora') , 
  'user':'' , 
  'currency':'' , 
  'note':data.note, 
  'additional_notes':'' , 
  'other':'' , 
  'tracking_number':'' , 
  'shipping_method':'' ,
  //'due_date':'' , 
  'shipping_address':'' , 
  'return_information': ''
};

   const envioFactura = await peticiones(url,datos,metodo,token);
   console.log("envioFactura", envioFactura);

   if (envioFactura[0] === 'ok') {
            console.log("datosComprobante", datosComprobante);

           if(typeof datosComprobante == 'object'){

  const urlComporbante = linkApi+"/actualizarcampos/tax_config";

  if (datosComprobante.hasOwnProperty('created_at')) {
    datosComprobante.updated_at = nfecha('timestamp');
  }
           datosComprobante.counter = (Number(datosComprobante.counter) + 1)
           datosComprobante.sequence = data.comprobante

  const envioDatos = await enviarDatosPorPost(urlComporbante, datosComprobante, token);
  console.log("envioDatos", envioDatos);


           }

  return ['ok',invoiceNumber];
}

}
/********************************************************************************************/
//cotizacionNueva
export async function cotizacionNueva(url,data,metodo,token,linkApi){
  console.log("data", data);

let datosCLiente = data.cliente;
if(!data.cliente.name){
  datosCLiente = await arrayToObjetoFromTabla(linkApi,token,'clients');
  datosCLiente.name = 'NO REGISTRADO';
  datosCLiente.code = '00000000';
  datosCLiente.address = 'NO REGISTRADO';
  datosCLiente.phone = '000-000-0000';
}

if (!data.note || data.note == '' ) {
  const datosNota = await peticionesFetch(`${linkApi}`,`datoscampo/notes/tittle/THANKS`,{},token,'GET');
  data.note = datosNota.note
}

/*      cliente:clienteSelected.value,
        productos:productosVentaArray.value,
        total: totalFactura.value,
        subtotal: subtotalFactura.value,
        impuestos: totalImpuestos.value,
        estado
        ganancia: totalGanancias.value*/

    const datosUsuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal')) || [];
    if (!datosUsuarioLocal) {
        return ['error'];
    }

      const ultimaFactura = await peticiones(`${linkApi}/datosmax`, {"tabla":'quotes',"campo":'quote_number'},'POST',token);

      const invoiceNumber = generadorCodigo(ultimaFactura[0], '', 7);

  const diasDefault = await peticionesFetch(`${linkApi}`,`datoscampo/default_settings/name/DIAS_COTIZACION`,{},token,'GET');

let datosComprobante = '';



let efectivo = 0;
let transferencia = 0;
let tarjeta = 0;

if (data.metodoPago == 'EFECTIVO') {
   efectivo = data.total;
}else if(data.metodoPago == 'TRANSFERENCIA'){
  transferencia = data.total;
}else if(data.metodoPago == 'TARJETA'){
  tarjeta = data.total;
}else if(data.metodoPago == 'MIXTO'){
  tarjeta = data.pagoMixto.tarjeta;   
  efectivo = data.pagoMixto.efectivo;
  transferencia = data.pagoMixto.transferencia;
}


const datos = {
  'quote_number':invoiceNumber, 
  'issue_date':nfecha('fecha'), 
  'expiration_date':agregarDiasalaFechaActual(diasDefault.value), 
  'status':'PENDIENTE', 
  'client_code':data.cliente.code , 
  'client_email':data.cliente.email , 
  'client_phone':data.cliente.phone , 
  'client_name':data.cliente.name , 
  'products':JSON.stringify(data.productos),  
  'seller':'', 
  'cashier':'', 
  'user':'', 
  'status_date':nfecha('fecha'), 
  'tax':data.impuestos, 
  'discount':'' , 
  'subtotal':data.subtotal, 
  'total':data.total , 
  'profit':data.ganancia , 
  'invoice_number':'', 
  'cash':'0.00', 
  'sales_channel':'LOCAL', 
  'transfer':'0.00', 
  'card':'0.00', 
  'financial':'', 
  'currency':'DOP', 
  'time':nfecha('hora') , 
  'month':nfecha('mes'), 
  'year':nfecha('year'), 
  'token':'', 
  'note':data.note, 
  'additional_notes':'', 
  'other':''
}

   const envioFactura = await peticiones(url,datos,metodo,token);
   console.log("envioFactura", envioFactura);

   if (envioFactura[0] === 'ok') {
            console.log("datosComprobante", datosComprobante);

           if(typeof datosComprobante == 'object'){

  const urlComporbante = linkApi+"/actualizarcampos/tax_config";

  if (datosComprobante.hasOwnProperty('created_at')) {
    datosComprobante.updated_at = nfecha('timestamp');
  }
           datosComprobante.counter = (Number(datosComprobante.counter) + 1)
           datosComprobante.sequence = data.comprobante

  const envioDatos = await enviarDatosPorPost(urlComporbante, datosComprobante, token);
  console.log("envioDatos", envioDatos);


           }

  return ['ok',invoiceNumber];
}

}
/********************************************************************************************/
/********************************************************************************************/
//cotizacionNueva
export async function creditoNueva(url,data,metodo,token,linkApi){

let datosCLiente = data.cliente;
if(!data.cliente.name){
  datosCLiente = await arrayToObjetoFromTabla(linkApi,token,'clients');
  datosCLiente.name = 'NO REGISTRADO';
  datosCLiente.code = '00000000';
  datosCLiente.address = 'NO REGISTRADO';
  datosCLiente.phone = '000-000-0000';
}

if (!data.note || data.note == '' ) {
  const datosNota = await peticionesFetch(`${linkApi}`,`datoscampo/notes/tittle/THANKS`,{},token,'GET');
  data.note = datosNota.note
}

/*      cliente:clienteSelected.value,
        productos:productosVentaArray.value,
        total: totalFactura.value,
        subtotal: subtotalFactura.value,
        impuestos: totalImpuestos.value,
        estado
        ganancia: totalGanancias.value*/

    const datosUsuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal')) || [];
    if (!datosUsuarioLocal) {
        return ['error'];
    }

      const ultimaFactura = await peticiones(`${linkApi}/datosmax`, {"tabla":'accounts_receivable',"campo":'emission_number'},'POST',token);

      const invoiceNumber = generadorCodigo(ultimaFactura[0], '', 7);

  const diasDefault = await peticionesFetch(`${linkApi}`,`datoscampo/default_settings/name/DIAS_COTIZACION`,{},token,'GET');

let datosComprobante = '';



let efectivo = 0;
let transferencia = 0;
let tarjeta = 0;

if (data.metodoPago == 'EFECTIVO') {
   efectivo = data.total;
}else if(data.metodoPago == 'TRANSFERENCIA'){
  transferencia = data.total;
}else if(data.metodoPago == 'TARJETA'){
  tarjeta = data.total;
}else if(data.metodoPago == 'MIXTO'){
  tarjeta = data.pagoMixto.tarjeta;   
  efectivo = data.pagoMixto.efectivo;
  transferencia = data.pagoMixto.transferencia;
}

const primerPago = {
  fecha:nfecha('fecha'),
  hora:nfecha('hora'),
  cantidad:data.credito.abono,
  metodo:data.credito.metodo_pago,
  pendiente:data.credito.saldo,
}
   const crearFactura = await facturaNueva(linkApi+'/insertar/sales',data,metodo,token,linkApi)

const datosR = {
  'emission_number': invoiceNumber,
  'invoice_number': '',
  'client_code': data.cliente.code,
  'client_name': data.cliente.name,
  'client_id': data.cliente.code,
  'client_phone': data.cliente.phone,
  'client_whatsapp': data.cliente.phone,
  'client_email': data.cliente.email,
  'client_address': data.cliente.address,
  'client_rnc': data.cliente.code,
  'client_trade_name': '',
  'issue_date': nfecha('fecha'),
  'credit_amount': data.total,
  'interest_rate': '0.00',
  'due_date': data.credito.expiracion,
  'installments': data.credito.abono,
  'balance': data.credito.saldo,
  'payment_date': nfecha('fecha'),
  'payments': JSON.stringify([primerPago]),
  'products': JSON.stringify(data.productos),
  'late_fees': '0.00',
  'status': 'PENDIENTE',
  'time': nfecha('hora'),
  'salesperson': '',
  'delivery': '',
  'note': data.credito.nota,
  'imagen':invoiceNumber
}


      if (crearFactura[0] === 'ok') {
      const ultimaFacturaR = await peticiones(`${linkApi}/datosmax`, {"tabla":'sales',"campo":'invoice_number'},'POST',token);
      const invoiceNumberR = generadorCodigo(ultimaFacturaR[0], '', 7);
         
         datosR.invoice_number = invoiceNumberR

         const envioFactura = await peticiones(url,datosR,metodo,token);
         if (envioFactura[0] === 'ok') {
        return ['ok',invoiceNumber];
      }

 
}


}
/********************************************************************************************/