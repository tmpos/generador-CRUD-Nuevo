  // @ts-nocheck
import {peticiones,nfecha,generarCodigoUnico} from './funciones.js';

export function facturaNueva(url,data,metodo,token){

	const datosUsuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal')) || [];
	if (!datosUsuarioLocal) {
		return ['error'];
	}

const productos = data.productosArray.map(prods => {
    const impuesto = Number(prods.precio_venta) * (prods.impuestos / 100);
    const producto = {
        "codigo": prods.codigo,
        "nombre": prods.nombre,
        "categoria": prods.categoria,
        "empaque": prods.empaque,
        "cantidad": prods.cantidad,
        "precio": prods.precio_venta,
        "precio_venta": prods.precio_venta,
        "descuento": prods.descuento,
        "impuesto_venta": prods.impuesto_venta,
        "impuestos": prods.impuestos,
        //"impuesto": impuesto,
        "impuesto": prods.impuesto_venta,
        "ganancia": prods.ganancia,
        "stock": prods.stock,
        "imagen": prods.imagen
    };

    // Agrega lista_imei si la categoría es CELULARES
    if (prods.categoria === 'CELULARES') {
        producto.lista_imei = prods.lista_imei;
    }

    return producto;
});

var datos = {
'no_factura':data.nofactura,
'tipo_factura':data.tipocomprobanteFN,
'comprobante':data.comprobanteFN,
'cod_cliente':data.cliente.codigo,
'nombre_cliente':data.cliente.nombre,
'telefono_cliente':data.cliente.telefono,
'productos':JSON.stringify(productos),
'vendedor':data.vendedorFN,
'metodo_pago':data.metodoPagoFN,
'fecha_emision':nfecha('fecha'),
'impuesto':data.impuesto,
'descuento':data.descuento,
'subtotal':data.subtotal,
'total':data.total,
'ganancia':data.ganancia,
'estado_factura':data.estadoFN,
'efectivo':data.efectivoFN,
'canal_venta':data.canalventa,
'transferencia':data.transferenciaFN,
'tarjeta':data.tarjetaFN,
'fecha_estado':nfecha('fecha'),
'financiera':'financiera',//cajero vendedor instalador
'nota':data.nota,
'otro':JSON.stringify([{'delivery':data.deliveryFN,'mesero':data.meseroFN,'mesa':data.mesaFN,'vendedor':data.vendedorFN,'instalador':data.instaladorFN,'pagocon':data.pagaCon,'sucambio':data.suCambio,'cajero':data.cajeroFN,'token':datosUsuarioLocal[0].token}]),
'mes':nfecha('mes'),
'cajero':data.cajeroFN,
'token':datosUsuarioLocal[0].token,
'year':nfecha('year'),
'hora':nfecha('hora'),
'created_at':nfecha('timestamp'),
'updated_at':nfecha('timestamp'),
'usuario':data.vendedorFN

};
   return peticiones(url,datos,metodo,token)
}

/*********************************************************/
export function facturaActualizar(url,data,metodo,token){
	const productos = data.productosArray.map(prods=>{
		const impuesto = Number(prods.precio_venta) * (prods.impuestos / 100);
		return {
		"codigo":prods.codigo,
		"nombre":prods.nombre,
		"categoria":prods.categoria,
		"empaque":prods.empaque,
		"cantidad":prods.cantidad,
		"precio":prods.precio_venta,
		"precio_venta":prods.precio_venta,
		"descuento":prods.descuento,
		"impuesto_venta":prods.impuesto_venta,
		"impuestos":prods.impuestos,
		//"impuesto":impuesto,
		"impuesto": prods.impuesto_venta,
		"ganancia":prods.ganancia,
		"stock":prods.stock,
		"imagen":prods.imagen}
	})

var datos = {
'id':data.id,
'no_factura':data.nofactura,
'tipo_factura':data.tipocomprobanteFN,
'comprobante':data.comprobanteFN,
'cod_cliente':data.cliente.codigo,
'nombre_cliente':data.cliente.nombre,
'telefono_cliente':data.cliente.telefono,
'productos':JSON.stringify(productos),
'vendedor':data.vendedorFN,
'metodo_pago':data.metodoPagoFN,
'fecha_emision':nfecha('fecha'),
'impuesto':data.impuesto,
'descuento':data.descuento,
'subtotal':data.subtotal,
'total':data.total,
'ganancia':data.ganancia,
'estado_factura':data.estadoFN,
'efectivo':data.efectivoFN,
'canal_venta':data.canalventa,
'transferencia':data.transferenciaFN,
'tarjeta':data.tarjetaFN,
'fecha_estado':nfecha('fecha'),
'financiera':'financiera',//cajero vendedor instalador
'nota':data.nota,
'otro':JSON.stringify([{'delivery':data.deliveryFN,'mesero':data.meseroFN,'mesa':data.mesaFN,'vendedor':data.vendedorFN,'instalador':data.instaladorFN,'pagocon':data.total,'sucambio':'0.00','cajero':data.cajeroFN,'token':generarCodigoUnico()}]),
'mes':nfecha('mes'),
'year':nfecha('year'),
'hora':nfecha('hora'),
'created_at':data.created_at,
'updated_at':nfecha('timestamp'),
'usuario':data.vendedorFN

};
   return peticiones(url,datos,metodo,token)
}

/*********************************************************/
export function cotizacionNueva(url,data,metodo,token){
	const productos = data.productosArray.map(prods=>{
		const impuesto = Number(prods.precio_venta) * (prods.impuestos / 100);
		return {
		"codigo":prods.codigo,
		"nombre":prods.nombre,
		"categoria":prods.categoria,
		"empaque":prods.empaque,
		"cantidad":prods.cantidad,
		"precio":prods.precio_venta,
		"precio_venta":prods.precio_venta,
		"descuento":prods.descuento,
		"impuesto_venta":prods.impuesto_venta,
		"impuestos":prods.impuestos,
		//"impuesto":impuesto,
		"impuesto": prods.impuesto_venta,
		"ganancia":prods.ganancia,
		"stock":prods.stock,
		"imagen":prods.imagen}
	})

var datos = {
'no_cotizacion':data.nofactura,
'cod_cliente':data.cliente.codigo,
'nombre_cliente':data.cliente.nombre,
'telefono_cliente':data.cliente.telefono,
'whatsapp_cliente':data.cliente.telefono,
'email_cliente':data.cliente.email,
'direccion_cliente':data.cliente.direccion,
'rnc_cliente':data.cliente.rnc,
'nombre_comercial':data.cliente.n_comercial,
'productos':JSON.stringify(productos),
'vendedor':data.vendedorFN,
'metodo_pago':data.metodoPagoFN,
'fecha_emision':nfecha('fecha'),
'impuesto':data.impuesto,
'descuento':data.descuento,
'subtotal':data.subtotal,
'total':data.total,
'estado_cotizacion':'estado',
'no_factura':'',
'fecha_cambio':'',
'entidad_financiera':'entidadF',
'vencimiento':data.vencimiento,
'nota':data.nota,
'mes':nfecha('mes'),
'year':nfecha('year'),
'hora':nfecha('hora'),
'usuario':data.vendedorFN,
};

   return peticiones(url,datos,metodo,token)
}
/*********************************************************/
export async function restarStock(url,productos,metodo,token){
  
     productos.forEach(async(prod)=>{
	    await peticiones(url,{id:prod.id,diferencia:prod.cantidad},metodo,token)

   })


}
/*********************************************************/