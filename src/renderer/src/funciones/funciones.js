// @ts-nocheck
import axios from 'axios';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { useRouter,useRoute } from 'vue-router';
import semver from 'semver';
//import { useToast } from "primevue/usetoast";
//const toast = useToast();
import Swal from 'sweetalert2'
/******************************************************/
// Definir el "toast" similar al que usas con Quasar
export const toast = {
  add({ severity = 'info', summary = '', detail = '', life = 3000, position = 'top-end', showCloseButton = true }) {
    // Mapeo de los tipos a los estilos de Swal
    const typeMap = {
      success: 'success',  // Verde
      danger: 'error',     // Rojo
      warning: 'warning',  // Amarillo
      info: 'info'         // Azul
    };

    // Crear la notificación con Swal
    const toast = Swal.mixin({
      toast: true,
      position: position || 'bottom-start',  // Posición del toast
      showConfirmButton: false,
      timer: life,                           // Duración en milisegundos
      showCloseButton: showCloseButton,      // Mostrar o no el botón de cierre
    });

    // Disparar la notificación
    toast.fire({
      icon: typeMap[severity] || 'info',     // Tipo de icono basado en "severity"
      title: detail,                        // Título o resumen del toast
       customClass: {
      popup: `color-${typeMap[severity] || 'info'}`
            },
      target: document.getElementById(typeMap[severity] + '-toast') || 'body',
    });
  }
};

/******************************************************/
export function datosLocalStorage(peticion){
  const dLocalStorage = JSON.parse(window.localStorage.getItem(peticion)) || {error:"No hay datos"};
  return dLocalStorage;
}
/******************************************************/
export function permisosPagina(router,otro=''){
     const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuarioLocal'))[0];
     const permisosPagina = ['Administrador', 'Gerente', 'Soporte'];
     const usuarioPermiso = usuarioLocalStorage.usuario;

      if (otro !='') {
         permisosPagina.push(otro)
      }

    if (usuarioPermiso && permisosPagina.includes(usuarioPermiso)) {

    } else {
      router.push('/notpermission')
    }
}
/******************************************************/
export function datosUsuarioLocal(){
    const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuarioLocal'))[0];
    return datos;
}
/******************************************************/
export function verificaAutentificado(router = useRouter()){
   // const router = useRouter();
        const verificaLocalStotage = window.localStorage.getItem('autenticacion')
    if (verificaLocalStotage) {
        const verificado = JSON.parse(verificaLocalStotage)
        if (!verificado.activo) {
            router.push('/login');
        }
    }else{
        localStorage.clear();
        router.push('/login');
    }
}
/******************************************************/
export async function cerrarSession(){
        localStorage.clear();
    }
/******************************************************/
export async function enviarDatosPorPost(url, data, token = null) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, false)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

  if (token) {
     xhr.setRequestHeader('Accept', '*/*');
     xhr.setRequestHeader('Authorization', token);
  }
    var dataToSend = Object.keys(data)

    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    })
    .join('&')
  xhr.send(dataToSend)

  if (xhr.status === 200) {
    try {
      var jsonResponse = JSON.parse(xhr.responseText)
      return jsonResponse
    } catch (error) {
      //console.error('Error al analizar la respuesta JSON', error)
      return null
    }
  } else {
    //console.error('Error en la solicitud: Código de estado ' + xhr.status)
    return null
  }
}

/***************************************************************/
export async function enviarSolicitudGet(url, token = null) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);

  // Añadir el encabezado de autenticación si se proporciona un token
  if (token) {
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Authorization', token);
  }

  xhr.send();

  if (xhr.status === 200) {
    try {
      var jsonResponse = JSON.parse(xhr.responseText);
      return jsonResponse;
    } catch (error) {
      console.error('Error al analizar la respuesta JSON', error);
      return null;
    }
  } else {
    console.error('Error en la solicitud: Código de estado ' + xhr.status);
    return null;
  }
}


/***************************************************************/
export function peticiones(url,datos,metodo='POST',jwt = null){

    if (metodo == 'POST') {
      return enviarDatosPorPost(url, datos,jwt);
    }else{
      return enviarSolicitudGet(url,jwt);
    }

 }
/***************************************************************/
export function downloadURI (uri, name){
    var link = document.createElement("a");
    link.href = uri;
    link.target = '_blank';
    link.download = name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/***************************************************************/
export async function peticionesFetch(link, peticion, datos, token, metodo = 'POST') {
  const validMethods = ['get', 'post', 'put', 'delete', 'patch'];
  const method = metodo.toLowerCase();

  if (!validMethods.includes(method)) {
    throw new Error('Método HTTP no válido');
  }

  try {
    const response = await axios({
      method: method,
      url: `${link}/${peticion}`,
      data: datos,
      headers: {
        'Accept': '*/*',
        'Authorization': `${token}`  // Usa el token proporcionado
      },
     // withCredentials: true // Añade esta línea
    });
    return response.data;
  } catch (error) {
    console.error('Error en la petición:', error);
    return { error: 'Ocurrió un error en la petición', details: error };
  }
}

/***************************************************************/
export async function encryptarPassword(password,saltRounds=10){
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    return ['error'];
  }
}
/***************************************************************/
export async function generadorPassword(url, data,token){
    return enviarDatosPorPost(url, data,token);
}
/***************************************************************/
export async function eliminarDatos(url,id,token){
    const data = {
        id:id
    }
    return enviarDatosPorPost(url, data,token);
}
/***************************************************************/
export async function borrarTodoslosDatos(url,tabla,token){
    const data = {
        tabla:tabla
    }
    return enviarDatosPorPost(url, data,token);
}
/***************************************************************/
export function obtenerIdsSeleccionados(primevueSelected = '') {
    let ids = [];
    if (primevueSelected != '') {
       ids = primevueSelected.map(item => item.id);
    }else{
      const checkboxes = document.querySelectorAll('.dt-checkbox:checked');
       ids = Array.from(checkboxes).map(checkbox => checkbox.value);
    }

    return ids;
}

/***************************************************************/
export function convertirAMayusculas(texto) {
  return texto.toUpperCase();
}
/***************************************************************/
export function lasMayusculas() {
  const elementos = document.querySelectorAll('.mayusc');
  elementos.forEach(elemento => {
    elemento.addEventListener('blur', function() {
      let valor = this.value;
      let mayuscula = valor.toUpperCase();
      this.value = mayuscula;
    });
  });
}

/***************************************************************/
export function generarTablaFromStringJSON(string, botones = false, onEditCallback, onDeleteCallback,indice = true) {
  if (!string) {
    return '';
  }

  let stringParse;

  try {
    stringParse = JSON.parse(string);
  } catch (e) {
    console.error("Error al parsear el JSON en generarTablaFromStringJSON:", e);
    return '';
  }

  const isArray = Array.isArray(stringParse);
  const data = isArray ? stringParse : [stringParse];

  if (data.length === 0) {
    return '';
  }

  let tableContent;

  if (isArray) {
    let headers = Object.keys(data[0]);
    if (indice) {
      headers = ['Índice', ...headers]; // Agregar índice al inicio de los headers
    }
    if (botones) {
      headers.push('actions'); // Agregar columna de acciones al final
    }

    const headerRow = headers.map(header => `<th>${header.toUpperCase()}</th>`).join('');
    const rows = data.map((producto, index) => {
      const cells = headers.map(header => {
        if (header === 'Índice') {
          return `<td>${index + 1}</td>`; // Mostrar el índice
        } else if (header === 'imagen') {
          return `<td><img src="${producto['imagen']}" alt="${producto['nombre']}" style="width: 50px; height: 50px;" /></td>`;
        } else if (header === 'actions') {
          return `
            <td>
              <button type="button" class="text-success mr-2 btn-edit" data-index="${index}" data-action="edit"><i class="pi pi-pencil"></i></button>
              <button type="button" class="text-danger btn-delete" data-index="${index}" data-action="delete"><i class="pi pi-trash"></i></button>
            </td>
          `;
        } else {
          return `<td data-key="${header}" data-index="${index}">${producto[header]}</td>`;
        }
      }).join('');
      return `<tr data-index="${index}">${cells}</tr>`;
    }).join('');

    tableContent = `
      <thead>
        <tr>${headerRow}</tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    `;
  } else {
    const rows = Object.entries(stringParse).map(([key, value]) => {
      if (key === 'imagen') {
        return `<tr><td>${key}</td><td><img src="${value}" alt="${stringParse['nombre']}" style="width: 50px; height: 50px;" /></td></tr>`;
      } else {
        return `<tr><td>${key}</td><td>${value}</td></tr>`;
      }
    }).join('');

    tableContent = `
      <thead>
        <tr><th>Propiedad</th><th>Valor</th></tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    `;
  }

  // En lugar de manejar la actualización del DOM aquí, simplemente llamamos a las callbacks
  setTimeout(() => {
    const editButtons = document.querySelectorAll('button[data-action="edit"]');
    const deleteButtons = document.querySelectorAll('button[data-action="delete"]');

    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        onEditCallback(parseInt(index, 10), data[parseInt(index, 10)]);
      });
    });

    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        onDeleteCallback(parseInt(index, 10));
      });
    });
  }, 0);

  return `
    <table class="table">
      ${tableContent}
    </table>
  `;
}


/***************************************************************/
export function convertirStringAArrayDeObjetos(input) {
    let elementos;

    // Determinar si la entrada es un string o un array
    if (typeof input === 'string') {
        // Si es un string, dividirlo por comas
        elementos = input.split(',');
    } else if (Array.isArray(input)) {
        // Si es un array, usarlo directamente
        elementos = input;
    } else {
        throw new Error('La entrada debe ser un string separado por comas o un array plano.');
    }

    // Crear un array de objetos
    const arrayDeObjetos = elementos.map(elemento => {
        return { propiedad: elemento.trim() }; // Usar trim() para eliminar espacios en blanco alrededor de los elementos
    });

    return arrayDeObjetos;
}
/***************************************************************/
export async function arrayToObjetoFromTabla(
  link,
  token,
  tabla,
  quitarPrimero = true,
  verificarCampos = [],
  fieldOrder = "usuario",
  toast = null
) {
  try {


    const array = await peticionesFetch(
      `${link}`,`campos/${tabla}`,
      {},
      token,
      "GET"
    );



    if (quitarPrimero) {
      array.shift();
    }

 var miObjeto = array.reduce(function(obj, elemento, index, array) {
    obj[elemento] = "";

  return obj;
}, {});

    return miObjeto;
  } catch (error) {
    console.error("Error in arrayToObjetoFromTabla:", error);
    throw error; // Rethrow the error after logging it
  }
}


/***************************************************************/
export function extraerCamposDeObjeto(array, quitarPrimero = true) {
  if (array.length === 0) {
    return {};
  }

  const primerObjeto = array[0];
  const nuevoObjeto = {};

  for (const key in primerObjeto) {
    if (primerObjeto.hasOwnProperty(key)) {
      nuevoObjeto[key] = '';
    }
  }

  if (quitarPrimero) {
    let firstKey = Object.keys(nuevoObjeto)[0];
    if (firstKey) {
      delete nuevoObjeto[firstKey];
    }
  }

  return nuevoObjeto;
}


/***************************************************************/
export function arrayToObjeto(array,quitarprimero=true){

    if (quitarprimero) {
      array.shift();
    }

var miObjeto = array.reduce(function(obj, elemento, index, array) {
  if (index % 2 === 0) {
    obj[elemento] = "";
  }
  return obj;
}, {});

return miObjeto;

}
/***************************************************************/
export async function crearYDescargarExcel(link, api, tabla, tokenCifrado, Swal) {
  try {
    const response = await peticionesFetch(link + api, `crearexcel`, { tabla: tabla }, tokenCifrado, 'POST');

    if (response[0] === 'ok') {
      const { value: isConfirmed } = await Swal.fire({
        title: 'Archivo Creado',
        text: "¿Deseas Descargarlo?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Descargar',
        cancelButtonText: 'Cerrar'
      });

      if (isConfirmed) {
        const downloadLink = document.createElement('a');
        downloadLink.href = `${link}/excel/${tabla}.xlsx`;
        downloadLink.setAttribute('download', `${tabla}.xlsx`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el archivo.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema en la petición.',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
}

/***************************************************************/
export function extraerNumeros(cadena) {
   if (Array.isArray(cadena)) {
    return
   }
  var numeros = cadena.match(/\d+/g);
  var numerosConcatenados = numeros ? numeros.join('') : '';
  var numeroFinal = parseInt(numerosConcatenados, 10);
  return numeroFinal;
}
/***************************************************************/
export function extraerString(cadena) {
    var subcadena = "";
    for (var i = 0; i < cadena.length; i++) {
        if (!isNaN(parseInt(cadena[i]))) {
            break;
        }
        subcadena += cadena[i];
    }

    return subcadena;
}
/***************************************************************/
export  function buscadorObjeto(miArray,indice,datoBuscado){
  var resultado = miArray.find( buscador => buscador[indice] === datoBuscado );
  return resultado;
 }
/***************************************************************/
 export function eliminarObjetoFromArray(miArray,indice,datoBuscado){
  const posicion = miArray.findIndex(buscador => buscador[indice] === datoBuscado);
 miArray.splice( posicion, 1 );
}
/***************************************************************/
export function devuelveIndiceObjetoFromArray(miArray,indice,datoBuscado){
  var posicion = miArray.findIndex(buscador => buscador[indice] == datoBuscado);
  return posicion;
}
/***************************************************************/
export function actualizadorObjetoArray(miArray,indiceArray,indiceObjeto,datos){
  miArray[indiceArray][indiceObjeto]=datos;
}
/***************************************************************/
export function objectToArray(objeto) {
  return Object.entries(objeto);
}
/***************************************************************/
export async function crearGasto(link,cantidad,concepto,toast,tokenCifrado){
    const camposGastos = await arrayToObjetoFromTabla(link,tokenCifrado,'gastos');

     const url = link+"/insertar/gastos";
     camposGastos.created_at = nfecha('timestamp')
     camposGastos.updated_at = nfecha('timestamp')
     camposGastos.fecha = nfecha('fecha')
     camposGastos.hora = nfecha('hora')
     camposGastos.mes = nfecha('mes')
     camposGastos.year = nfecha('year')
     camposGastos.descripcion = concepto
     camposGastos.cantidad = cantidad
    const envioDatos = await enviarDatosPorPost(url, camposGastos,tokenCifrado);

   if (envioDatos[0] == 'ok') {
     toast.add({ severity: 'success', summary: 'Éxito', detail: 'Gasto Agregado con éxito.', life: 3000 });
  }else{
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Agregar el Gasto.', life: 3000 });
  }
}
/***************************************************************/
export async function crearNotaCredito(link,api,cod_cliente,cliente,cantidad,concepto,nota,toast,tokenCifrado){


      const camposNC = await arrayToObjetoFromTabla(link+api,tokenCifrado,'notacredito');

      const ultimaNC = await peticiones(`${link}${api}/datosmax`, {"tabla":"notacredito","campo":"no_credito"},'POST',tokenCifrado);

      const arrayConfiscal = await peticionesFetch(`${link+api}`, `datosarray/confiscal`, {}, tokenCifrado, 'GET');

      const ultimaB04 = arrayConfiscal.find(tipo=>tipo.prefijo == 'B04')


     const url = link+api+"/insertar/notacredito";
     camposNC.no_credito = generadorCodigo(ultimaNC[0], '', 7);
     camposNC.b04 = generadorCodigo(ultimaB04.contador, 'B04', 8);


  if (camposNC.hasOwnProperty('created_at')) {
     camposNC.created_at = nfecha('timestamp')
     camposNC.updated_at = nfecha('timestamp')
    }


     camposNC.fecha = nfecha('fecha')
     camposNC.hora = nfecha('hora')
     camposNC.cod_cliente = cod_cliente
     camposNC.cliente = cliente
     camposNC.concepto = concepto
     camposNC.total = cantidad
     camposNC.nota = nota
    const envioDatos = await enviarDatosPorPost(url, camposNC,tokenCifrado);

   if (envioDatos[0] == 'ok') {
     await sumaFiscal(link,api,ultimaB04,'B04',tokenCifrado);
     toast.add({ severity: 'success', summary: 'Éxito', detail: 'Nota de Crédito Agregada con éxito.', life: 3000 });
  }else{
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Agregar la Nota de Crédito.', life: 3000 });
  }
}
/***************************************************************/
export function eliminaDeArray ( arr, items ) {

if (Array.isArray(items)) {
     for(item of items){
        var i = arr.indexOf( item );

        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
     }

   }else{
        var i = arr.indexOf( items );

        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
   }


}
/***************************************************************/
export function stringParentesis(string){
 // devuelve ARRAY con lo encontrado y sin ello, solo devuelve la primera coincidencia
  var regExp = /\(([^)]+)\)/g;
var ejecutar = string.match(regExp);
if (ejecutar != null) {
  return string.match(/\((.*)\)/).pop();
}else{
   return string;
}


}
/***************************************************************/
export function extraerNumerosEntreParentesis(cadena) {
  // Esta expresión regular busca dígitos dentro de paréntesis
  const regex = /\((\d+)\)/g;
  let numeros = [];
  let coincidencia;

  while ((coincidencia = regex.exec(cadena)) !== null) {
    // La primera captura (\d+) está en el índice 1
    numeros.push(coincidencia[1]);
  }

  return numeros;
}
/***************************************************************/
export function extraerParentesis2(str) {
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(str);
  console.log("match", match);
  if (match) {
    return match[1];
  } else {
    return "";
  }
}
/***************************************************************/
export function extraerParentesis(texto) {
    const coincidencias = [...texto.matchAll(/\(([^)]+)\)/g)];
    const cantidadParentesis = coincidencias.length;
    if (cantidadParentesis > 0) {
        const ultimoContenido = coincidencias[cantidadParentesis - 1][1];
        return ultimoContenido;
    } else {
        return "";
    }
}
/***************************************************************/
export function rellenodecero(number, width) {
    // Si el número es vacío, asigna el valor cero
    if (number === "") {
        number = 0;
    }

    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = numberOutput.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString());
        } else {
             return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString());
        }
    }
}
/***************************************************************/
export function generadorCodigo(codigo,prefijo,cantidadCeros){

  if (prefijo != '') {
    if (Array.isArray(codigo)) {
      return prefijo + rellenodecero(1,cantidadCeros);

    }else{

      return prefijo + rellenodecero(Number(codigo.replace(/[^0-9]+/g, ""))+1,cantidadCeros);
    }
  }else{
        if (Array.isArray(codigo)) {
      return rellenodecero(1,cantidadCeros);

    }else{

      return rellenodecero(Number(codigo.replace(/[^0-9]+/g, ""))+1,cantidadCeros);
    }

  }


}
/***************************************************************/
export async function sumaFiscal(link,api,objeto,prefijo,tokenCifrado){
    const numeracion = generadorCodigo(objeto['contador'], prefijo, 8);
    objeto['secuencia'] = numeracion;
    objeto['contador'] = (Number(objeto['contador']) + 1);
    const envio = await peticionesFetch(`${link}${api}`,`actualizarcampos/confiscal`,objeto,tokenCifrado,'POST');

}
/***************************************************************/
export function decimales(valor){
  var operacion = Number(valor);
  return operacion.toFixed(2);
}
/***************************************************************/
export async function datosXcampo(link,dato,campo,tabla,token){
  const url = link+'/api/datosarraycondicion/'+tabla+'/'+token;
  const data = {"campo":campo,"valor":dato}
const datosObtenidos = await enviarDatosPorPost(url,data);
return datosObtenidos[0];

}
/***************************************************************/
export function nfecha(pedido){

     var hoy = new Date();
     var manana = new Date(hoy);
     manana.setDate(hoy.getDate() + 1);
     var mm = (hoy.getMonth() + 1).toString().padStart(2, "0");
     var dd = (hoy.getDate()).toString().padStart(2, "0");
     var yyyy = hoy.getFullYear();
     var pmam = 'am';
     const horas = String(hoy.getHours()).padStart(2, '0');
     const minutos = String(hoy.getMinutes()).padStart(2, '0');
     const segundos = String(hoy.getSeconds()).padStart(2, '0');
     var hor = hoy.getHours();
     if (hor > 12) {
      hor = hor - 12;
      pmam = 'pm';
     }
     var hora = hor+':'+(hoy.getMinutes()<10?'0':'') + hoy.getMinutes()+':'+hoy.getSeconds()+' '+pmam;
     var horaAmericana = `${horas}:${minutos}:${segundos}`;
     var fecha = dd+'/'+mm+'/'+yyyy;
     var fechaAmericana = yyyy+'-'+mm+'-'+dd;
     var diasemana = hoy.getDay();
     var mes = hoy.getMonth();
     var ndiasemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
     var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

     const fechaHoraActual = `${yyyy}-${mm}-${dd} ${horas}:${minutos}:${segundos}`;
     const fechaHoraFin = `${yyyy}-${mm}-${dd} 23:59:59`;
     var manana_dd = (manana.getDate()).toString().padStart(2, "0");
     var manana_mm = (manana.getMonth() + 1).toString().padStart(2, "0");
     var manana_yyyy = manana.getFullYear();
     var fechaManana = manana_dd + '/' + manana_mm + '/' + manana_yyyy;
     var fechaAmericanaManana = manana_yyyy + '-' + manana_mm + '-' + manana_dd;

     if (pedido=='dia') {
      return dd;
     }else if (pedido=='diasemana') {
      return ndiasemana[diasemana];
     }else if (pedido=='mesletra') {
      return meses[mes];
     }else if (pedido=='mes') {
      return mm;
     }else if (pedido=='year') {
      return yyyy;
     }else if (pedido=='fecha') {
      return fecha;
     }else if (pedido=='fechaAmericana') {
      return fechaAmericana;
     }else if (pedido=='timestamp') {
      return fechaHoraActual;
     }else if (pedido=='hora') {
      return hora;
     }else if (pedido=='horaAmericana') {
      return horaAmericana;
     } else if (pedido == 'fechaManana') {
      return fechaManana;
     } else if (pedido == 'fechaAmericanaManana') {
     return fechaAmericanaManana;
    } else if (pedido == 'timestampcompleta') {
        return { fechainicio: fechaAmericana+ ' 00:01:00', fechafin: fechaHoraFin };
    }

    }
/***************************************************************/
export function agregarDiasalaFechaActual(dias){
  //RETORNA FECHA TIPO "15/01/2023";
const date = new Date();
const next_date = new Date(date.setDate(date.getDate() + dias));
var incrementedDate = next_date.toISOString().slice(0, 10);
var arrayFecha = incrementedDate.split('-');
return arrayFecha[2]+'/'+arrayFecha[1]+'/'+arrayFecha[0];
}
/***************************************************************/
export function generarCodigoUnico(limite=14) {
    const ahora = new Date();
    // Formatear la fecha como dd/mm/yyyy
    const fecha = ahora.getDate().toString().padStart(2, '0') + '/'
                + (ahora.getMonth() + 1).toString().padStart(2, '0') + '/'
                + ahora.getFullYear().toString();

    const hora = ahora.toTimeString().split(' ')[0]; // 'hh:mm:ss'
    const milisegundos = ahora.getMilliseconds();
    let random = Math.floor(Math.random() * 1000);

    let codigo = fecha.replace(/\//g, '') + hora.replace(/:/g, '') + milisegundos.toString() + random.toString();

    if (limite) {
        if (codigo.length > limite) {
            codigo = codigo.substring(0, limite);
        } else {
            while (codigo.length < limite) {
                // Añadir más números aleatorios hasta que la longitud sea suficiente
                random = Math.floor(Math.random() * 1000);
                codigo += random.toString();
                if (codigo.length > limite) {
                    codigo = codigo.substring(0, limite);
                }
            }
        }
    }

    return codigo;
}
/***************************************************************/
export function lenguajeDataTable(){
    return {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ningún dato disponible en esta tabla",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",
        "collection": "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
        "copySuccess": {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %ds fila al portapapeles"
        },
        "copyTitle": "Copiar al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "_": "Mostrar %d filas"
        },
        "pdf": "PDF",
        "print": "Imprimir",
        "renameState": "Cambiar nombre",
        "updateState": "Actualizar",
        "createState": "Crear Estado",
        "removeAllStates": "Remover Estados",
        "removeState": "Remover",
        "savedStates": "Estados Guardados",
        "stateRestore": "Estado %d"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ",",
    "searchBuilder": {
        "add": "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll": "Borrar todo",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "notBetween": "No entre",
                "notEmpty": "No Vacio",
                "not": "Diferente de"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacio",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "notBetween": "No entre",
                "notEmpty": "No vacío",
                "not": "Diferente de"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "notEmpty": "No Vacio",
                "startsWith": "Empieza con",
                "not": "Diferente de",
                "notContains": "No Contiene",
                "notStartsWith": "No empieza con",
                "notEndsWith": "No termina con"
            },
            "array": {
                "not": "Diferente de",
                "equals": "Igual",
                "empty": "Vacío",
                "contains": "Contiene",
                "notEmpty": "No Vacío",
                "without": "Sin"
            }
        },
        "data": "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Criterios anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Criterios de sangría",
        "title": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse": {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda",
        "title": "Filtros Activos - %d",
        "showMessage": "Mostrar Todo",
        "collapseMessage": "Colapsar Todo"
    },
    "select": {
        "cells": {
            "1": "1 celda seleccionada",
            "_": "%d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        },
        "rows": {
            "1": "1 fila seleccionada",
            "_": "%d filas seleccionadas"
        }
    },
    "thousands": ".",
    "datetime": {
        "previous": "Anterior",
        "next": "Proximo",
        "hours": "Horas",
        "minutes": "Minutos",
        "seconds": "Segundos",
        "unknown": "-",
        "amPm": [
            "AM",
            "PM"
        ],
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "weekdays": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ]
    },
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "title": "Crear Nuevo Registro",
            "submit": "Crear"
        },
        "edit": {
            "button": "Editar",
            "title": "Editar Registro",
            "submit": "Actualizar"
        },
        "remove": {
            "button": "Eliminar",
            "title": "Eliminar Registro",
            "submit": "Eliminar",
            "confirm": {
                "_": "¿Está seguro que desea eliminar %d filas?",
                "1": "¿Está seguro que desea eliminar 1 fila?"
            }
        },
        "error": {
            "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
        },
        "multi": {
            "title": "Múltiples Valores",
            "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
            "restore": "Deshacer Cambios",
            "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
        }
    },
    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
    "stateRestore": {
        "creationModal": {
            "button": "Crear",
            "name": "Nombre:",
            "order": "Clasificación",
            "paging": "Paginación",
            "search": "Busqueda",
            "select": "Seleccionar",
            "columns": {
                "search": "Búsqueda de Columna",
                "visible": "Visibilidad de Columna"
            },
            "title": "Crear Nuevo Estado",
            "toggleLabel": "Incluir:"
        },
        "emptyError": "El nombre no puede estar vacio",
        "removeConfirm": "¿Seguro que quiere eliminar este %s?",
        "removeError": "Error al eliminar el registro",
        "removeJoiner": "y",
        "removeSubmit": "Eliminar",
        "renameButton": "Cambiar Nombre",
        "renameLabel": "Nuevo nombre para %s",
        "duplicateError": "Ya existe un Estado con este nombre.",
        "emptyStates": "No hay Estados guardados",
        "removeTitle": "Remover Estado",
        "renameTitle": "Cambiar Nombre Estado"
    }
}
}
/***************************************************************/
export function navegacionDatos(objetos, puntoPartida) {
    const resultado = {
        primero: null,
        anterior: null,
        siguiente: null,
        ultimo: null
    };

    const totalObjetos = objetos.length;

    if (totalObjetos === 0) {
        return resultado;
    }

    resultado.primero = objetos[0].id;
    resultado.ultimo = objetos[totalObjetos - 1].id;

    const posicionPuntoPartida = objetos.findIndex(objeto => objeto.id == puntoPartida);

    if (posicionPuntoPartida !== -1) {
        resultado.anterior = posicionPuntoPartida > 0 ? objetos[(posicionPuntoPartida - 1 + totalObjetos) % totalObjetos].id : resultado.ultimo;
        resultado.siguiente = posicionPuntoPartida < totalObjetos - 1 ? objetos[(posicionPuntoPartida + 1) % totalObjetos].id : resultado.primero;
    } else {
        return resultado;
    }

    return resultado;
}
/***************************************************************/
export function navegacion(boton,tabla){
  var datosStorage = window.localStorage.getItem('datosArray');
  var datosServidor = JSON.parse(datosStorage);
  var datosNavegacion = navegacionDatos(datosServidor, getQueryVariable('id'));
  var datosID = datosNavegacion[boton];
  var datosPeticion = datosServidor.find((prod)=>prod.id == datosID)

//////////////////////////////////////////////////////////////////////////
  let campos = Object.keys(datosPeticion);
  campos.forEach(campo=>{$('#'+campo+'-Actualizador').val(datosPeticion[campo])})
///////////////////////////////////////////////////////////////////////////
  history.pushState({id:datosPeticion.id}, datosPeticion.id, 'datos_'+tabla+'?id='+datosPeticion.id);
///////////////////////////////////////////////////////////////////////////
  mensajetoast('Datos Cargados','Los datos Han sido cargado Exitosamente','success')
}
/***************************************************************/
export function navegacionPorFlechas(tabla='productos'){
  document.addEventListener('keydown', function(event) {

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    navegacion('siguiente',tabla)
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    navegacion('anterior',tabla)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    navegacion('ultimo',tabla)
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    navegacion('primero',tabla)
  }

});
}
/***************************************************************/
export function transformarFecha(fecha, americana = true) {
    var separador = fecha.includes('-') ? '-' : '/';
    var partes = fecha.split(separador);

    if (partes.length !== 3 || partes.some(parte => isNaN(parte))) {
        return 'Formato de fecha no válido';
    }

    if (americana) {
        // Convertir de dd/mm/YYYY a mm/dd/YYYY
        return `${partes[1]}/${partes[0]}/${partes[2]}`;
    } else {
        // Convertir de mm/dd/YYYY a dd/mm/YYYY
        return `${partes[1]}-${partes[0]}-${partes[2]}`;
    }
}
/***********************************************************************************************/
export function transformarFechaTimestamp(fecha,americana = true,horaInicio = false,horaFin = false){
    var separador = fecha.includes('-') ? '-' : '/';
    var partes = fecha.split(separador);

    if (partes.length !== 3 || partes.some(parte => isNaN(parte))) {
        return 'Formato de fecha no válido';
    }

    if (americana) {
        // Convertir de dd/mm/YYYY a mm/dd/YYYY
        if (horaInicio) {
            return `${partes[2]}-${partes[0]}-${partes[1]} 00:00:00`;
        }else if(horaFin){
            return `${partes[2]}-${partes[0]}-${partes[1]} 23:59:59`;
        }else{
            return `${partes[2]}-${partes[0]}-${partes[1]}`;
        }
    } else {
        // Convertir de mm/dd/YYYY a dd/mm/YYYY
        if (horaInicio) {
            return `${partes[2]}-${partes[1]}-${partes[0]} 00:00:00`;
        }else if(horaFin){
            return `${partes[2]}-${partes[1]}-${partes[0]} 23:59:59`;
        }else{
            return `${partes[2]}-${partes[1]}-${partes[0]}`;
        }

    }

}
/***************************************************************/
export function convertirAFechaTimestamp(fecha, hora) {

    // Descomponer la fecha en dd/mm/yyyy
    let [dia, mes, anio] = fecha.split('/').map(Number);

    // Descomponer la hora en partes (h:m:s AM/PM)
    let [horaParte, meridiano] = hora.split(' ');
    let [horas, minutos, segundos] = horaParte.split(':').map(Number);

    // Convertir la hora al formato 24 horas
    if (meridiano.toLowerCase() === 'pm' && horas < 12) {
        horas += 12;
    } else if (meridiano.toLowerCase() === 'am' && horas === 12) {
        horas = 0; // Medianoche
    }//

    mes = mes.toString().padStart(2, '0');
    dia = dia.toString().padStart(2, '0');
    horas = horas.toString().padStart(2, '0');
    minutos = minutos.toString().padStart(2, '0');
    segundos = segundos.toString().padStart(2, '0');

    // Crear el timestamp en formato "YYYY-MM-DD HH:MM:SS"
    const timestamp = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    
    return timestamp;
}
/***************************************************************/
export function esFechaEnRango(fechaObjetivo, fechaInicio, fechaFin) {
    // Convertir las fechas de formato timestamp a objetos Date
    const fechaObj = new Date(fechaObjetivo);
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Comprobar si la fecha objetivo está entre la fecha de inicio y fin
    return fechaObj >= inicio && fechaObj <= fin;
}
/***************************************************************/
export function formatearFecha(fecha) {

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(fecha)) {

        let nuevaFecha = new Date(fecha);
        let dia = nuevaFecha.getDate().toString().padStart(2, '0');
        let mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
        let anio = nuevaFecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }else{
        return fecha;
    }

}

/***************************************************************/
export async function logout(link,api,tokenCifrado,toast){

const verifica = window.localStorage.getItem('usuarioLocal')
if (!verifica) {
    const router = useRouter();
    localStorage.clear();
    //router.push('/login');
}

const usuarioLocal = JSON.parse(verifica)[0];



const datosCaja = await peticiones(`${link}${api}/datoscampo/registrocaja/turno/${usuarioLocal.token}`, {}, 'GET', tokenCifrado);
const url = link+api+"/actualizarcampos/registrocaja";

   if (!datosCaja) {
      localStorage.clear();
      return
   }


   datosCaja.estado = 'Cerrada';
   datosCaja.updated_at = nfecha('timestamp');

  const envio = await peticiones(url, datosCaja, 'POST', tokenCifrado);

   if (envio[0] == 'ok') {
     mensajetoast(toast, 'Ok', 'Salio de la aplicación', 'success')
      localStorage.clear();
      //window.location.href = '/login'

   }else{

      mensajetoast(toast, 'Upps', 'Tenemos un error al Salir', 'error')

   }

}

/***************************************************************/
function compararVersiones(version1, version2) {
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);
  const maxLength = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLength; i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;

    if (num1 < num2) {
      return -1;
    }
    if (num1 > num2) {
      return 1;
    }
  }

  return 0;
}

export async function buscarActualizaciones(linkActualizaciones, tokenCifrado, Swal) {
  try {
    const ultimoDato = await peticiones(`${linkActualizaciones}/ultimosx/version/1`, {}, 'GET', tokenCifrado);
    const versionActual = JSON.parse(window.localStorage.getItem('actualizaciones')) || { version: "1.0.0", cuando: 'AHORA' };

    if (ultimoDato.length > 0 && compararVersiones(ultimoDato[0].version, versionActual.version) > 0 && versionActual.cuando === 'AHORA') {
      Swal.fire({
        title: 'Actualizaciones Nuevas',
        text: "Tienes una Actualización disponible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Actualizar Ahora',
        cancelButtonText: 'Luego'
      }).then(async(result) => {
        if (result.isConfirmed) {
          const respuesta = await window.electron.ipcRenderer.invoke('actualizarSistema',ultimoDato[0].archivo);
          console.log("respuesta", respuesta);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.localStorage.setItem('actualizaciones', JSON.stringify([{ version: versionActual[0].version, cuando: 'LUEGO' }]));
        }
      });
    }
  } catch (error) {
    console.error('Error fetching updates:', error);
  }
}
/***************************************************************/
export async function peticionImagenUsuarios(link,api,location,tokenCifrado){
     const envio = await peticiones(link+api+'/peticionimagenes',{"origen":`../vista/img/usuarios/${location}`},'POST',tokenCifrado);
   if (envio) {
    return link+'/vista/img/usuarios/'+location+'/'+envio[0];
   }else{
    return link+'/vista/img/usuario.png';

   }
}
/***************************************************************/
export async function peticionImagen(link,api,carpeta,location,tokenCifrado,cantidad = 1){
     const envio = await peticiones(link+api+'/peticionimagenes',{"origen":`../vista/img/${carpeta}/${location}`},'POST',tokenCifrado);
   if (envio) {
    if (cantidad === 1) {
        return link+'/vista/img/'+carpeta+'/'+location+'/'+envio[0];
    }else{
        return envio;
    }
   }else{
    return link+'/assets/icons/icon-512x512.png';

   }
}
/***************************************************************/
export function mensajetoast(toast, cabecera, mensaje, tipo, tiempo = 3000) {
  if (toast) {
    toast.add({ severity: tipo, summary: cabecera, detail: mensaje, life: tiempo });
  } else {
    console.error('No PrimeVue Toast provided!');
  }
}
/***************************************************************/
export async function verificaLocalStorage(link,tabla,full=true,nombre='',cantidad='total'){
  const datos = window.localStorage.getItem(nombre);
  if (datos) {
    return JSON.parse(datos)
  }else{
    return await actualizarLocalStorage(link,tabla,full,nombre,cantidad);
  }
}
/***************************************************************/
async function obtenerTokenCifrado() {
  const usuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0] || {};
  return await encryptarPassword(usuarioLocal.tokenaplicacion, 10);
}

async function obtenerDatos(tabla, link, cantidad) {
  const tokenCifrado = await obtenerTokenCifrado();
  if (cantidad === 'total') {
    return datosTabla(tabla);
  } else {
    return await peticiones(`${link}/ultimosx/${tabla}/${cantidad}`, {}, 'GET', tokenCifrado);
  }
}

export async function actualizarLocalStorage(link, tabla, full = true, nombre = '', cantidad = 'total') {
  if (full) {
    const todoslosDatos = await obtenerDatos(tabla, link, cantidad);
    window.localStorage.setItem(tabla, JSON.stringify(todoslosDatos));
  } else {
    const tokenCifrado = await obtenerTokenCifrado();
    const datosJSON = await peticiones(`${link}/datoscampo/${tabla}/id/1`, {}, 'GET', tokenCifrado);
    window.localStorage.setItem(nombre, JSON.stringify(datosJSON));
    return datosJSON;
  }
}

/***************************************************************/
/*export async function pedidoNoElectron(envio) {
  if (envio === 'datosarchivo') {
    try {
      const response = await fetch('config.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching the JSON file:', error);
      throw error; // Propagate the error so the calling function can handle it
    }
  }
}*/
export async function pedidoNoElectron(envio) {
  console.log("envio", envio);
  if (envio === 'datosarchivo') {
    try {
      const response = await fetch('/config.json');
      if (!response.ok) {
        console.error(`Error fetching config.json: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      try {
        const json = JSON.parse(text);  // Intenta parsear el texto como JSON
        return json;
      } catch (jsonError) {
        console.error("Error parsing JSON file:", jsonError);
        throw new Error("Invalid JSON format in config.json");
      }

    } catch (error) {
      console.error('Error fetching the JSON file:', error);
      throw error; // Propagate the error so the calling function can handle it
    }
  }
}

/***************************************************************/
export async function envioElectron(envio){
  if (window.electron) {
    return await window.electron.ipcRenderer.invoke(envio);
   }else{
    return pedidoNoElectron(envio);
   }
}
/***************************************************************/
export function enviarDatosLocalStorage() {
    const todasLasEntradas = {};

    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i); 
        const valor = localStorage.getItem(clave); 
        todasLasEntradas[clave] = JSON.parse(valor);
    }

    return todasLasEntradas;
}
/***************************************************************/
export async function ultimoRegistro(link,tabla){
   const usuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0];
   const tokenCifrado = await encryptarPassword(usuarioLocal.tokenaplicacion, 10);
   var registro = await peticiones(link+'/ultimosx/'+tabla+'/1',{},'GET',tokenCifrado);
   return registro;
}
/***************************************************************/
export async function cajeroACtivo(link) {
  const usuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0];
  const tokenCifrado = await encryptarPassword(usuarioLocal.tokenaplicacion, 10);
  let datosObtenidos = await peticiones(link+'/datosarraydoblecondicion/registrocaja', { 'campo1': 'estado', 'valor1': 'Abierta','campo2': 'fecha', 'valor2': nfecha('fecha') }, 'POST',tokenCifrado) ;

  if (datosObtenidos) {
      for (let datos of datosObtenidos) {
          if (datos.username != '') {
          let datosRetornado = await peticiones(link+'/datoscampo/usuarios/email/' + datos.username, {}, 'GET', tokenCifrado);
          if (datosRetornado.nivel_seguridad === 'Cajero') {
            return datos;
          }
        }
      }
  }

  // Si no se encontró Cajero en el bucle, realizar otra petición adicional
  let datosRetornadoAuxiliar = await peticiones(link+'/datoscampo/registrocaja/turno/'+usuarioLocal.token, {}, 'GET',tokenCifrado);

  // Verificar si se obtuvieron datos en la segunda petición
  if (datosRetornadoAuxiliar) {
    return datosRetornadoAuxiliar;
  } else {
    // En caso de no encontrar Cajero, devolver un objeto indicando que no se encontró
    return { mensaje: 'Error: No se encontró Cajero.' };
  }
}
/***************************************************************/
export function variableEnString(str, data) {
    if (typeof str === 'string' && (data instanceof Array)) {

        return str.replace(/({\d})/g, function(i) {
            return data[i.replace(/{/, '').replace(/}/, '')];
        });
    } else if (typeof str === 'string' && (data instanceof Object)) {

        if (Object.keys(data).length === 0) {
            return str;
        }

        for (let key in data) {
            return str.replace(/({([^}]+)})/g, function(i) {
                let key = i.replace(/{/, '').replace(/}/, '');
                if (!data[key]) {
                    return i;
                }

                return data[key];
            });
        }
    } else if (typeof str === 'string' && data instanceof Array === false || typeof str === 'string' && data instanceof Object === false) {

            return str;
    } else {

        return false;
    }
}
/***************************************************************/
export function esObjeto(variable) {
  return variable !== null && typeof variable === 'object' && !Array.isArray(variable);
}
/***************************************************************/
export async function buscarDatosIMEI(servicio,imeiConsulta,tokenCifrado,toast,Swal,mostrar=true){

  const url = "https://apiprincipal.tmposrd.com/api2/infoencriptada";
  const envioDatos = await enviarDatosPorPost(url, {variable:'API_KEY_IMEI'},tokenCifrado);

const decryptedData = descifrar64(envioDatos.dato_cifrado);

  const datos =
{
  "service": servicio,
  "imei": imeiConsulta,
  //"key": "WLZ-OJ2-7HJ-0XH-DJ6-AVZ-OXU-1XB"
  "key": decryptedData
}
    try {
        const prueba = await enviarDatosPorPost('https://api.ifreeicloud.co.uk', datos,tokenCifrado);

        if (prueba.success) {
          if (mostrar) {
                const formattedData = Object.entries(prueba.object)
                  .map(([key, value]) => `
                    <tr>
                      <td style="padding: 8px; text-align: left;"><strong>${key}:</strong></td>
                      <td style="padding: 8px; text-align: left;">${value}</td>
                    </tr>
                  `)
                  .join('');

                Swal.fire({
                  title: 'Datos del IMEI',
                  html: `
                    <table style="width: 100%; border-collapse: collapse;">
                      ${formattedData}
                    </table>
                  `,
                  icon: 'success',
                  confirmButtonText: 'Cerrar'
                });
          }else{
            toast.add({ severity: 'success', summary: 'Ok', detail: 'Datos encontrados', life: 3000 });
            return prueba.object;
          }
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: 'No se encuentran Datos', life: 3000 });
        }
    } catch (error) {
         toast.add({ severity: 'error', summary: 'Error', detail: 'Error de peticion', life: 3000 });
    }

}
/***************************************************************/
export function descifrar64(claveCifrada) {
    var ciphertext = atob(claveCifrada);

    return ciphertext;
}
/***************************************************************/
export function generateMicrosoftStyleLicense() {
  // Define characters that can appear in the license key
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const licenseLength = 25;
  const blockSize = 5;
  const separator = '-';

  let license = '';

  for (let i = 0; i < licenseLength; i++) {
    if (i > 0 && i % blockSize === 0) {
      license += separator;
    }
    const randomIndex = Math.floor(Math.random() * chars.length);
    license += chars[randomIndex];
  }

  return license;
}
/***************************************************************/
export async function crearTablaSiNoExiste(
  link,
  api,
  tabla,
  campos,
  tokenCifrado,
  toast = null // default value set to null
) {
  try {
    // Verify if the table exists
    const verificaTabla = await peticionesFetch(
      `${link}${api}`,`verificatabla/${tabla}`,
      {}, // No payload for GET request
      tokenCifrado,
      "GET"
    );

    if (verificaTabla[0] === "error") {
      // Create the table if it doesn't exist
      const crearTabla = await peticionesFetch(
        `${link}${api}`,`creartabla/${tabla}`,
        {}, // No payload for GET request
        tokenCifrado,
        "GET"
      );

      if (crearTabla[0] === "ok") {
        if (toast) {
          toast.add({
            severity: "success",
            summary: "Éxito",
            detail: "Tabla creada correctamente",
            life: 3000,
          });

          toast.add({
            severity: "warning",
            summary: "Advertencia",
            detail: "Agregando campos faltantes...",
            life: 3000,
          });
        }

        // Add missing fields to the new table
        if (Array.isArray(campos)) {
          campos.reverse(); // Ensure fields are added in the correct order
          for (const campo of campos) {
            if (campo !== "actions") {
              const envio = await peticionesFetch(
                `${link}${api}`,'agregarcampodb',
                { tabla: tabla, campo: campo, despuesde: "id" },
                tokenCifrado,
                "POST"
              );
              if (envio[0] !== "ok") {
                return envio;
              }
            }
          }

          if (toast) {
            toast.add({
              severity: "success",
              summary: "Éxito",
              detail: "Todos los campos fueron agregados exitosamente.",
              life: 3000,
            });
          }
          return ["ok"];
        } else {
          // If 'campos' is not an array, add the single field if it's not "actions"
          if (campos !== "actions") {
            const envio = await peticionesFetch(
              `${link}${api}`,'agregarcampodb',
              { tabla: tabla, campo: campos, despuesde: "id" },
              tokenCifrado,
              "POST"
            );
            if (toast) {
              toast.add({
                severity: "success",
                summary: "Éxito",
                detail: "Campo agregado exitosamente.",
                life: 3000,
              });
            }
            return envio;
          }
        }
      }
    } else {
      // Table exists, check for missing fields
      const array = await peticionesFetch(
        `${link}${api}`,`campos/${tabla}`,
        {}, // No payload for GET request
        tokenCifrado,
        "GET"
      );

      if (Array.isArray(campos)) {
        const missingCampos = campos.filter(
          (campo) => !array.includes(campo) && campo !== "actions" // Exclude "actions"
        );

        if (missingCampos.length > 0) {
          if (toast) {
            toast.add({
              severity: "warning",
              summary: "Advertencia",
              detail: "Agregando campos faltantes...",
              life: 3000,
            });
          }

          for (const campo of missingCampos) {
            const envio = await peticionesFetch(
              `${link}${api}`,'agregarcampodb',
              { tabla: tabla, campo: campo, despuesde: "id" },
              tokenCifrado,
              "POST"
            );

            if (envio[0] !== "ok") {
              return envio;
            }
          }

          if (toast) {
            toast.add({
              severity: "success",
              summary: "Éxito",
              detail: "Campos agregados correctamente",
              life: 3000,
            });
          }
        }
      } else {
        if (!array.includes(campos) && campos !== "actions") {
          const envio = await peticionesFetch(
            `${link}${api}`,'agregarcampodb',
            { tabla: tabla, campo: campos, despuesde: "id" },
            tokenCifrado,
            "POST"
          );
          if (toast) {
            toast.add({
              severity: "success",
              summary: "Éxito",
              detail: "Campo agregado exitosamente.",
              life: 3000,
            });
          }
          return envio;
        }
      }

      return ["ok"];
    }
  } catch (error) {
    console.error("Error in crearTablaSiNoExiste:", error);
    throw error; // Rethrow the error after logging it
  }
}


/***************************************************************/
export async function crearTransferencia(link,api,token,toast,numero,cantidad,banco,cliente,empresa){

      let ultimaTransaccion = 0;
        const ultimaTransacciones = await peticionesFetch(
            `${link}${api}`,
            `datosarray/transaccionesbancarias`,
            {},
            token,
            'GET'
        );

        if (Array.isArray(ultimaTransacciones) && ultimaTransacciones.length > 0) {
             ultimaTransaccion = ultimaTransacciones[ultimaTransacciones.length - 1].balance_actual || 0;
        } else {
            ultimaTransaccion = 0;
        }


  const camposTransferencia = await arrayToObjetoFromTabla(link+api,token,'transaccionesbancarias');

  const url = link+api+"/insertar/transaccionesbancarias";
  if (!camposTransferencia) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Datos incompletos, no se puede Enviar.', life: 3000 });
    return;
  }
  if (camposTransferencia.hasOwnProperty('created_at')) {
     camposTransferencia.created_at = nfecha('timestamp')
     camposTransferencia.updated_at = nfecha('timestamp')
    }

  const balanceActual = (parseFloat(ultimaTransaccion) + parseFloat(cantidad)).toFixed(2);

  camposTransferencia.balance_anterior = ultimaTransaccion;
  camposTransferencia.balance_actual = balanceActual;
  camposTransferencia.monto = parseFloat(cantidad).toFixed(2)
  camposTransferencia.metodo = 'TRANSFERENCIA';
  camposTransferencia.tipo = 'TRANSFERENCIA';
  camposTransferencia.depositante = cliente;
  camposTransferencia.estado = 'COMPLETADA';
  camposTransferencia.fecha = nfecha('fecha');
  camposTransferencia.hora = nfecha('hora');
  camposTransferencia.beneficiario = empresa;
  camposTransferencia.descripcion = 'TRANSFERENCIA REALIZADA POR VENTA ('+numero+')';
  camposTransferencia.cuenta_origen = 'VENTA ('+numero+')-'+cliente;
  camposTransferencia.cuenta_destino = banco.cuenta;

  const envioDatos = await enviarDatosPorPost(url, camposTransferencia,token);
  if (envioDatos[0] == 'ok') {

  const urlBanco = link+api+"/actualizarcampos/banco";
  if (!banco) {
    console.error("Datos incompletos, no se puede actualizar.");
    return;
  }
  if (banco.hasOwnProperty('created_at')) {
    banco.updated_at = nfecha('timestamp');
  }
  banco.saldo = balanceActual;
  const envioDatosBanco = await enviarDatosPorPost(urlBanco, banco,token);

     return ['ok'];
  }else{
    return ['error'];
  }

}
/***************************************************************/
export async function asientoDiario(link,api,token,toast,debito,credito,cantidad,descripcion){

      let ultimaTransaccion = '00000001';
      let camposAsientoDiario = {};
        const ultimaTransacciones = await peticionesFetch(
            `${link}${api}`,
            `datosarray/asientodiario`,
            {},
            token,
            'GET'
        );

        if (Array.isArray(ultimaTransacciones) && ultimaTransacciones.length > 0) {
            const lastNumber = parseFloat(ultimaTransacciones[ultimaTransacciones.length - 1].numero) + 1 || 1;
            ultimaTransaccion = lastNumber.toString().padStart(8, '0');
            camposAsientoDiario = extraerCamposDeObjeto(ultimaTransacciones[ultimaTransacciones.length - 1])
        } else {
             camposAsientoDiario = await arrayToObjetoFromTabla(link+api,token,'asientodiario');
        }


const url =  link+api+"/insertar/asientodiario";


    const asientoJSON = {
        debito: debito,
        cantidadDebito: cantidad,
        credito: credito,
        cantidadCredito: cantidad
    };

camposAsientoDiario.numero = ultimaTransaccion;
camposAsientoDiario.fecha = nfecha('fecha');
camposAsientoDiario.hora = nfecha('hora');
camposAsientoDiario.asiento = JSON.stringify([asientoJSON]);
camposAsientoDiario.descripcion = descripcion;

  const envioDatos = await enviarDatosPorPost(url, camposAsientoDiario,token);
  if (envioDatos[0] == 'ok') {
     return ['ok'];
  }else{
    return ['error'];
  }

}
