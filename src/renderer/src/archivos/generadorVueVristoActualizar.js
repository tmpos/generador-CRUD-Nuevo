export async function generadorVueActualizar(datosJSON) {
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const camposActualizar = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
        const tamano = field.sizeXS+' '+field.sizeSM + ' '+field.sizeMD+ ' '+field.sizeLG+ ' '+field.sizeXL+ ' '+field.size2XL;
    if (field.frontType === 'input') {
    return `<div class="${tamano}">
                <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                <input type="${field.properties}" ${field.attributes} class="form-input ${field.classes}" v-model="datoscampos.${field.name}" name="${field.name}" placeholder="${field.name}" id="actualizar${field.name}" />
            </div>`;
        }else if(field.frontType === 'textarea'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                   <textarea id="actualizar${field.name}" ${field.attributes} v-model="datoscampos.${field.name}" name="${field.name}" rows="3" class="form-textarea ${field.classes}" placeholder="Enter ${capitalizeFirstLetter(field.name)}"></textarea>
                </div>`;
            }else if(field.frontType === 'tablajson'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                  <div class="table-responsive">
                      <div v-html="generarTablaFromStringJSON(datoscampos.${field.name})" class="border p-3 rounded mb-2">
                      </div>
                  </div>

                </div>`;
            }else if(field.frontType === 'select'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `'${option.trim()}'`) 
                .join(','); 
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <multiselect
                     v-model="datoscampos.${field.name}"
                      :options="[${formattedOptions}]"
                      class="custom-multiselect ${field.classes}"
                      :searchable="true"
                      placeholder="${capitalizeFirstLetter(field.name)}"
                      selected-label=""
                      select-label=""
                      ${field.attributes}
                      deselect-label=""
                    ></multiselect>

            </div>`;
            }else if(field.frontType === 'selectnormal'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `<option value="${option.trim()}">${option.trim()}</option>`); 

        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <select v-model="datoscampos.${field.name}" ${field.attributes}  class="w-full form-select ${field.classes}">
                    ${formattedOptions}
                    </select>
            </div>`;
            }else if(field.frontType === 'datepicker'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <flat-pickr v-model="datoscampos.${field.name}" ${field.attributes} class="form-input ${field.classes}" :config="basic"></flat-pickr>
            </div>`;
            }else if(field.frontType === 'timepicker'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <flat-pickr v-model="datoscampos.${field.name}" ${field.attributes} class="form-input ${field.classes}" :config="preloadingTime"></flat-pickr>
            </div>`;
            }else if(field.frontType === 'checkbox'){
        return `<div class="${tamano}">
               <label class="inline-flex">'. "\n";
               <input type="checkbox" ${field.attributes} v-model="datoscampos.${field.name}" class="form-checkbox ${field.classes}"  />
               <span>{{t('${field.name.toUpperCase()}')}}</span>
              </label>
              </div>`;
            }else if(field.frontType === 'radio'){
        return `<div class="${tamano}">
                <label class="inline-flex">'. "\n";
               <input type="radio" ${field.attributes} v-model="datoscampos.${field.name}" name="${field.name}" class="form-radio ${field.classes}" />
               <span>{{t('${field.name.toUpperCase()}')}}</span>
              </label>
              </div>`;
            }else if(field.frontType === 'toggle'){
        return `<div class="${tamano}">
                <label class="w-12 h-6 relative">'. "\n";
                <input type="checkbox" ${field.attributes} class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer ${field.classes}" id="crear${field.name}" v-model="datoscampos.${field.name}" />
                <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
              </label>
              </div>`;
            }else if(field.frontType === 'inputgroup'){

             if (field.properties === 'prepend') {

           return `<div class="${tamano}">
           <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else if(field.properties === 'append'){
          return `<div class="${tamano}">
                  <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else{
          return `<div class="${tamano}">
                      <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                        <div class="flex">
                      <div
                        class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]"
                      >
                        $
                      </div>
                      <input type="text" ${field.attributes} placeholder="${field.name}" v-model="datoscampos.${field.name}" class="form-input rounded-none ${field.classes}" />
                      <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                    </div>
                  </div>
                  </div>`;
             }



            }else if (field.name === 'imagen' && datosJSON.useImage) {  
      return `<div class="form-group col-span-12">
                <label for="imagen-Actualizador">{{ t('IMAGEN') }}</label>
                <FileUploader 
                  ref="fileUploaderRef"
                  :uploadUrl="uploadUrl" 
                  :additionalData="additionalData" 
                  :autoUpload="true" 
                  :onSuccess="handleSuccess"
                  :onError="handleError"
                  :showPreview="false"
                  class="${field.classes}"
                  ${field.attributes}
                />
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mt-2">
                  <div class="border rounded-lg shadow-md p-4" v-for="imagen in arrayIMG" :key="imagen">
                    <div class="mb-3">
                      <div class="relative mx-auto">
                        <img 
                          v-if="esImagen(imagen)"
                          :src="getImageSrc(imagen)" 
                          alt="Image" 
                          class="w-full h-auto rounded-md object-cover"
                        />
                        <div v-else-if="esPdf(imagen)" class="flex justify-center">
                          <i class="pi pi-file-pdf text-red-600 text-6xl"></i>
                        </div>
                        <div v-else-if="esWord(imagen)" class="flex justify-center">
                          <i class="pi pi-file-word text-blue-600 text-6xl"></i>
                        </div>
                        <div v-else class="flex justify-center">
                          <i class="pi pi-file text-gray-600 text-6xl"></i>
                        </div>
                      </div>
                    </div>
                    <div class="text-center mt-2">
                      <button 
                        class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center mb-2"
                        @click.prevent="downloadImage(imagen)"
                      >
                        <i class="pi pi-download mr-2"></i> Descargar
                      </button>
                      <button 
                        class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                        @click.prevent="deleteImage(imagen)"
                      >
                        <i class="pi pi-trash mr-2"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
    }
  })
  .join('\n');

const camposExcel = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
    return `${capitalizeFirstLetter(field.name)}: '${field.name}',`;
  })
  .join('\n');


const camposTabla = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
    return `{ field: '${field.name}', title: t('${capitalizeFirstLetter(field.name)}') },`;
  })
  .join('\n');

const camposArray = datosJSON.fields
  .filter(campo => campo.name !== 'ID')
  .map(field => `'${field.name}'`)
  .join(', ');


let fileUploader = ''
let linkImagen = ''
let imagenCodigo = ''
let imagenArray = ''
let imagenCrear = ''
let linkIMGUpload = ''
let noEsING = ''

if (datosJSON.useImage) {
    // Importación del componente FileUploader
     fileUploader = `import FileUploader from '../../components/FileUploader.vue';\n`;

    // Inicialización de referencias
    fileUploader += `const rutaIMAGEN = ref('');\n`;
    fileUploader += `const urlIMAGEN = ref(null);\n`;
    fileUploader += `const fileUpload = ref(null);\n`;
    fileUploader += `const arrayIMG = ref([]);\n`;
    fileUploader += `const uploadUrl = ref(null);\n`;
    fileUploader += `const additionalData = ref(null);\n`;
    fileUploader += `const fileUploaderRef = ref(null);\n`;

    // Construcción de la lógica de peticiones
    linkImagen = `arrayIMG.value = await peticiones(link.value + api.value + '/peticionimagenes', { origen: '../vista/img/${datosJSON.tableName}/' + datos.imagen }, 'POST', tokenCifrado.value);\n`;
    linkImagen += `additionalData.value = { ruta: '../vista/img/${datosJSON.tableName}/' + datos.imagen };\n`;

    imagenCodigo = `datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.imagen = generarCodigoUnico();\n
    additionalData.value = {ruta: '../vista/img/${datosJSON.tableName}/'+datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.imagen};`
  imagenArray = `arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":\`\${'../vista/img/${datosJSON.tableName}/'+datos.imagen}\`},'POST',tokenCifrado.value)\n
   additionalData.value = {ruta: '../vista/img/${datosJSON.tableName}/'+datos.imagen};`;
  imagenCrear = `const imagen = await peticionesFetch(\`\${link.value}\${api.value}\`,'creardirectorio',additionalData.value,tokenCifrado.value,'POST');\n
    await uploadImages();`
  linkIMGUpload = `uploadUrl.value = link.value+api.value+"/subirunaimagen";`
 
 noEsING = `/************************************************************************/\n
    const uploadImages = async() => {\n
  if (fileUpload.value) {
    fileUpload.value.fnSubirIMG();
  }\n
};
/************************************************************************/
  const handleSuccess = async(result) => {\n
  arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":\`../vista/img/${datosJSON.tableName}/\${datoscampos.value.imagen}\`},'POST',tokenCifrado.value)
  toast.add({ severity: 'success', summary: 'Éxito', detail: 'Imagen Subida Correctamente', life: 3000 });
};\n
/************************************************************************/\n
const handleError = ()=>{
    
}
/************************************************************************/\n
const deleteImage = async(imagen) => {
  const ruta = datoscampos.value.imagen;
  const url = link.value+api.value+"/borrararchivo";
  const datos = {
    ruta:'../vista/img/${datosJSON.tableName}/'+ruta,
    archivo:imagen,
  }\n
/************************************************************************/\n
  const envioDatos = await enviarDatosPorPost(url, datos,tokenCifrado.value);
    if (envioDatos[0] == 'ok') {
         arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":\`../vista/img/${datosJSON.tableName}/\${ruta}\`},'POST',tokenCifrado.value)
       toast.add({ severity: 'success', summary: 'Éxito', detail: 'Imagen Borrada', life: 3000 });
    }else{
      toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Borrar la Imagen.', life: 3000 });
   }
};
/************************************************************************/\n
const onRowSelect = async(event) => {
arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":\`\${'../vista/img/${datosJSON.tableName}/'+event.imagen}\`},'POST',tokenCifrado.value)
additionalData.value = {ruta: '../vista/img/${datosJSON.tableName}/'+event.imagen};
visible.value = true;
datoscampos.value = event;
};\n
/************************************************************************/\n
function onSelectionChange(selection) {\n
  selectedItems.value = selection; 
}\n
/************************************************************************/\n
const getImageSrc = (imagen) => {\n
  return \`\${link.value}/vista/img/${datosJSON.tableName}/\${datoscampos.value.imagen}/\${imagen}\`;
};\n
/************************************************************************/\n
const esImagen = (imagen) => /.(jpg|jpeg|png|gif)$/i.test(imagen);
const esPdf = (imagen) => /.(pdf)$/i.test(imagen);
const esWord = (imagen) => /.(doc|docx)$/i.test(imagen);
const downloadImage = (imagen) => {
  const url = getImageSrc(imagen);
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.setAttribute('download', imagen);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};`

}else{
    noEsING = `const onRowSelect = async(event) => {\n
visible.value = true;\n
datoscampos.value = event;\n
};\n
/************************************************************************/\n
function onSelectionChange(selection) {\n
  selectedItems.value = selection;\n
}`
}


    return `
<script setup>
import { ref, onMounted, nextTick, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute(); 
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { useMeta } from '@/composables/use-meta';
import { vMaska } from "maska/vue" 
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {enviarDatosPorPost,
  eliminarDatos, 
  obtenerIdsSeleccionados,
  borrarTodoslosDatos,
  lenguajeDataTable,
  nfecha,
  arrayToObjetoFromTabla,
  generarTablaFromStringJSON,
  peticionesFetch,
  encryptarPassword,
  envioElectron,
  enviarSolicitudGet,
  generarCodigoUnico,
  peticiones,
  toast,
  mensajetoast,
  lasMayusculas} from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
/************************************************************************/
useMeta({ title: 'Actualizando ${capitalizeFirstLetter(datosJSON.tableName)}' });
useMeta({ title: t('Update') +' '+t('${capitalizeFirstLetter(datosJSON.tableName)}') });
/************************************************************************/
import { useAppStore } from '@/stores/index';
 const store = useAppStore();
  const basic = ref({
    dateFormat: 'd/m/Y',
    position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
  });
const preloadingTime = ref({
    noCalendar: true,
    enableTime: true,
    dateFormat: 'H:i',
    position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
  });
/************************************************************************/
import FileUploader from '../../components/FileUploader.vue';
const rutaIMAGEN = ref('')
const urlIMAGEN = ref(null)
const fileUpload = ref(null);
const arrayIMG = ref([])
const uploadUrl = ref(null)
const additionalData = ref(null)
const fileUploaderRef = ref(null);
/************************************************************************/
import {useDatosEmpresa} from '../../stores'
const datosEmpresa = useDatosEmpresa();
const link = ref('');
const api = ref('');
const token = ref('');
const patronTelefono = ref('');
const linkImpresora = ref('');
const patroncedula = ref('');
const tokenCifrado = ref('');
const tokenCorto = ref('');
/************************************************************************/
const position = "top";
/************************************************************************/
const datoscampos = ref({})
const codigoUnico = ref(generarCodigoUnico());
const fecha = ref(nfecha('fecha'));
const todosLos${capitalizeFirstLetter(datosJSON.tableName)} = ref([]);
/************************************************************************/
/************************************************************************/
const fetchAllData = async () => {
    const response = await enviarSolicitudGet(\`\${link.value+api.value}/datosarray/${datosJSON.tableName}\`,tokenCifrado.value);
    const jsonData = response;
    todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value = jsonData;
    datoscampos.value = jsonData.find(datos=>datos.id == route.params.id)
arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":\`\${'../vista/img/${datosJSON.tableName}/'+datoscampos.value.imagen}\`},'POST',tokenCifrado.value)
additionalData.value = {ruta: '../vista/img/${datosJSON.tableName}/'+datoscampos.value.imagen};
};
/************************************************************************/
async  function navigate(action) {
    const currentIndex = todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.findIndex(${datosJSON.tableName} => ${datosJSON.tableName}.id == route.params.id);
    if (currentIndex === -1) return;
    let newIndex;
    switch (action) {
        case 'primero':
            newIndex = 0;
            break;
        case 'anterior':
            newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
            break;
        case 'siguiente':
            newIndex = currentIndex + 1 < todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.length ? currentIndex + 1 : currentIndex;
            break;
        case 'ultimo':
            newIndex = todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.length - 1;
            break;
        default:
            return;
    }
    datoscampos.value = todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value[newIndex];
    if (datoscampos.value.imagen == '') {
        datoscampos.value.imagen = generarCodigoUnico();
        funcionActualizar()
    }
arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":\`\${'../vista/img/${datosJSON.tableName}/'+datoscampos.value.imagen}\`},'POST',tokenCifrado.value)
additionalData.value = {ruta: '../vista/img/${datosJSON.tableName}/'+datoscampos.value.imagen};
    router.push({ path: \`/editar${datosJSON.tableName}/\${todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value[newIndex].id}\` });
}
/************************************************************************/
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
await fetchAllData()
uploadUrl.value = link.value+api.value+"/subirunaimagen";
additionalData.value = {ruta: '../vista/img/${datosJSON.tableName}/'+datoscampos.value.imagen};
});
/************************************************************************/
async function funcionActualizar(e) {
  e.preventDefault();
  if (fileUploaderRef.value && typeof fileUploaderRef.value.uploadFiles === 'function') {
    try {
      await fileUploaderRef.value.uploadFiles();
    } catch (error) {
      console.error('Error al subir archivos antes de actualizar:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error al subir archivos antes de actualizar.', life: 3000 });
      return;
    }
  }
  const url = link.value+api.value+"/actualizarcampos/${datosJSON.tableName}";
  if (!datoscampos.value) {
    console.error("Datos incompletos, no se puede actualizar.");
    return;
  }
  if (datoscampos.value.hasOwnProperty('created_at')) {
      datoscampos.value.updated_at = nfecha('timestamp')
    }
  const envioDatos = await enviarDatosPorPost(url, datoscampos.value,tokenCifrado.value);
  if (envioDatos[0] == 'ok') {
     toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos Actualizados', life: 3000 });
  }else{
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al actualizar los datos.', life: 3000 });
  }
}
/************************************************************************/
const deleteImage = async(imagen) => {
   const ruta = datoscampos.value.imagen;
  const url = link.value+api.value+"/borrararchivo";
  const datos = {
    ruta:'../vista/img/${datosJSON.tableName}/'+ruta,
    archivo:imagen,
  }
  const envioDatos = await enviarDatosPorPost(url, datos,tokenCifrado.value);
    if (envioDatos[0] == 'ok') {
         arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":\`../vista/img/${datosJSON.tableName}/\${ruta}\`},'POST',tokenCifrado.value)
       toast.add({ severity: 'success', summary: 'Éxito', detail: 'Imagen Borrada', life: 3000 });
    }else{
      toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Borrar la Imagen.', life: 3000 });
   }
};
/************************************************************************/
const fnEliminar = async () => {
  Swal.fire({
    title: "Introduce la contraseña",
    input: "password",
    inputPlaceholder: "Contraseña",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const contrasenaIngresada = result.value;
      if (
        contrasenaIngresada === token.value ||
        contrasenaIngresada === tokenCorto.value
      ) {
        const datosFactura = await peticionesFetch(
          \`\${link.value}\${api.value}\`,
          \`borrarporcampo/${datosJSON.tableName}\`,
          { campo: "id", valor: datoscampos.value.id },
          tokenCifrado.value,
          "POST",
        );
        if (datosFactura[0] == "ok") {
          toast.add({
            severity: "success",
            summary: "Éxito",
            detail: "Datos eliminados correctamente",
            life: 3000,
          });
          const currentIndex = todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.findIndex(
            (clientes) => clientes.id == route.params.id,
          );
          todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.splice(currentIndex, 1);
          if (todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.length === 0) {
            router.push({ path: "/clientes" });
            return;
          } else {
            let newIndex = currentIndex;
            if (currentIndex >= todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.length) {
              newIndex = todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value.length - 1;
            }
            const nextId = todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value[newIndex].id;
            router.push({ path: \`/editar${capitalizeFirstLetter(datosJSON.tableName)}/\${nextId}\` });
            datoscampos.value = todosLos${capitalizeFirstLetter(datosJSON.tableName)}.value[newIndex];
            pagosArray.value = JSON.parse(datoscampos.value.pagos);
            const datosFact = facturasArray.value.find(
              (fact) => fact.no_factura == datoscampos.value.no_factura,
            );
            if (datosFact) {
              productosArray.value = JSON.parse(datosFact.productos);
            }
          }
          await fetchAllData();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error al eliminar los datos",
            life: 3000,
          });
        }
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Contraseña incorrecta",
          life: 3000,
        });
      }
    }
  });
};
/************************************************************************/
const handleSuccess = async(data)=>{
          toast.add({
            severity: "success",
            summary: "Éxito",
            detail: "Archivos Subidos correctamente",
            life: 3000,
          });
await fetchAllData()
}
/************************************************************************/
const handleError = (error)=>{
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error al Subir los Archivos",
            life: 3000,
          });
}
/************************************************************************/
const getImageSrc = (imagen) => {
  return \`\${link.value}/vista/img/${datosJSON.tableName}/\${datoscampos.value.imagen}/\${imagen}\`;
};
const esImagen = (imagen) => /\.(jpg|jpeg|png|gif)$/i.test(imagen);
const esPdf = (imagen) => /\.(pdf)$/i.test(imagen);
const esWord = (imagen) => /\.(doc|docx)$/i.test(imagen);
const downloadImage = (imagen) => {
  const url = getImageSrc(imagen);
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.setAttribute('download', imagen);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>
<template>
  <div class="container-fluid mt-5">
<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
  <div class="flex flex-wrap items-center justify-start space-x-2 space-y-2">
  <router-link class="btn btn-primary btn-sm mt-2 flex items-center" to="/${datosJSON.tableName}">
    <i class="pi pi-home p-1 text-lg"></i>
  </router-link>
  <router-link class="btn btn-primary btn-sm flex items-center" to="/crear${datosJSON.tableName}">
    <i class="pi pi-plus-circle p-1 text-lg"></i>
  </router-link>
  <button type="button" class="btn btn-primary btn-sm flex items-center" @click="fnBorrar">
    <i class="pi pi-trash p-1 text-lg"></i>
  </button>
  <button type="button" class="btn btn-primary btn-sm flex items-center" @click="navigate('primero')">
    <i class="pi pi-fast-backward p-1 text-lg"></i>
  </button>
  <button type="button" class="btn btn-primary btn-sm flex items-center" @click="navigate('anterior')">
    <i class="pi pi-step-backward p-1 text-lg"></i>
  </button>
  <button type="button" class="btn btn-primary btn-sm flex items-center" @click="navigate('siguiente')">
    <i class="pi pi-step-forward p-1 text-lg"></i>
  </button>
  <button type="button" class="btn btn-primary btn-sm flex items-center" @click="navigate('ultimo')">
    <i class="pi pi-fast-forward p-1 text-lg"></i>
  </button>

  <button type="button" class="btn btn-primary btn-sm flex items-center" @click="funcionActualizar">
    <i class="pi pi-save p-1 text-lg"></i>
  </button>

  </div>
</div>
<section class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
    <form id="formularioActualizar" action="" method="">
         <div class="box-body">
          <div class="row grid grid-cols-12 gap-4" id="campos">
<div class="form-group " hidden>
<label for="id-Actualizador">{{t('ID')}}</label>
<input type="input" v-model="datoscampos.id" name="id"  class="form-input" id="id-Actualizador" readonly placeholder="id"  maxlength="11">
</div>

${camposActualizar}

<div class="form-group " hidden>
<label for="usuario-Actualizador">{{t('USUARIO')}}</label>
<input type="input" v-model="datoscampos.usuario" name="usuario"  class="form-input" id="usuario-Actualizador"  placeholder="usuario"  maxlength="250">
</div>
<div class="form-group col-span-12 mb-5 mt-5 flex justify-end">
  <button type="button" class="btn btn-primary btn-sm m-1 flex items-center" @click="funcionActualizar">
    <i class="pi pi-check p-1 text-lg"></i>
    Actualizar Datos
  </button>
</div>
  </div>
  </div>
   </form>
</section>
  </div>
</template>
<style scoped>
</style>

`;
}
