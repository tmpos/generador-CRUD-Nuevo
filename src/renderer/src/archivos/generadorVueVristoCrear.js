export async function generadorVueCrear(datosJSON) {
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const camposCrear = datosJSON.fields
    .filter(campo => campo.name !== 'ID') 
    .map(field => {

        const tamano = field.sizeXS+' '+field.sizeSM + ' '+field.sizeMD+ ' '+field.sizeLG+ ' '+field.sizeXL+ ' '+field.size2XL;
     if (field.frontType === 'input') {
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <input type="${field.properties}" class="form-input ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${field.name}" name="crear${field.name}" id="${field.name}" />
                </div>`;

            }else if(field.frontType === 'textarea' || field.frontType === 'tablajson'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                   <textarea id="crear${field.name}" rows="3" class="form-textarea ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${capitalizeFirstLetter(field.name)}"></textarea>
                </div>`;
            }else if(field.frontType === 'select'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `'${option.trim()}'`) 
                .join(','); 
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <multiselect
                     v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}"
                      :options="[${formattedOptions}]"
                      class="custom-multiselect ${field.classes}"
                      :searchable="true"
                      placeholder="${capitalizeFirstLetter(field.name)}"
                      selected-label=""
                      select-label=""
                      deselect-label=""
                      ${field.attributes}
                    ></multiselect>
            </div>`;
            }else if(field.frontType === 'selectnormal'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `<option value="${option.trim()}">${option.trim()}</option>`); 

        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <select v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" ${field.attributes}  class="w-full form-select ${field.classes}">
                    ${formattedOptions}
                    </select>
            </div>`;
            }else if(field.frontType === 'datepicker'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <flat-pickr v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ${field.classes}" :config="basic"></flat-pickr>
            </div>`;
            }else if(field.frontType === 'timepicker'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <flat-pickr v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ${field.classes}" :config="preloadingTime"></flat-pickr>
            </div>`;
            }else if(field.frontType === 'checkbox'){
        return `<div class="${tamano}">
                <label class="inline-flex">'. "\n";
               <input type="checkbox" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-checkbox ${field.classes}"  />
               <span>{{t('${field.name.toUpperCase()}')}}</span>
              </label>
              </div>`;
            }else if(field.frontType === 'radio'){
        return `<div class="${tamano}">
                <label class="inline-flex">'. "\n";
               <input type="radio" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" name="${field.name}" class="form-radio ${field.classes}" />
               <span>{{t('${field.name.toUpperCase()}')}}</span>
              </label>
              </div>`;
            }else if(field.frontType === 'toggle'){
        return `<div class="${tamano}">
                 <label class="w-12 h-6 relative">'. "\n";
                <input type="checkbox" ${field.attributes} class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer ${field.classes}" id="crear${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" />
                <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
              </label>
              </div>`;
            }else if(field.frontType === 'inputgroup'){

             if (field.properties === 'prepend') {

           return `<div class="${tamano}">
           <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else if(field.properties === 'append'){
          return `<div class="${tamano}">
                  <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
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
                      <input type="text" ${field.attributes} placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input rounded-none ${field.classes}" />
                      <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                    </div>
                  </div>
                  </div>`;
             }



            }else if (field.name === 'imagen' && datosJSON.useImage) {  
      return `<div class="form-group col-span-12" >
<label for="imagenAgregarDatos">{{t('IMAGEN')}}</label>
    <FileUploader 
       ref="fileUploaderRef"
      :uploadUrl="uploadUrl" 
      :additionalData="additionalData" 
      :autoUpload="false" 
      :onSuccess="handleSuccess"
      :onError="handleError"
      :showPreview="true"
      class="${field.classes}"
      ${field.attributes}
    /> 
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
import { vMaska } from "maska/vue"
import { useRouter, useRoute } from 'vue-router';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
const router = useRouter();
const route = useRoute(); 
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { useMeta } from '@/composables/use-meta';
import {enviarDatosPorPost,
  eliminarDatos, 
  obtenerIdsSeleccionados,
  borrarTodoslosDatos,
  lenguajeDataTable,
  nfecha,
  arrayToObjetoFromTabla,
  peticionesFetch,
  encryptarPassword,
  envioElectron,
  generarCodigoUnico,
  peticiones,
  toast,
  mensajetoast,
  lasMayusculas} from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
import LoadingOverlay from '../../Loading/LoadingOverlay.vue';
const loading = ref(false)
/************************************************************************/
useMeta({ title: t('Create') +' '+t('${capitalizeFirstLetter(datosJSON.tableName)}') });
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
  ${datosJSON.useImage? `import FileUploader from '../../components/FileUploader.vue';
const rutaIMAGEN = ref('')
const urlIMAGEN = ref(null)
const uploadUrl = ref(null)
const additionalData = ref(null)
const fileUploaderRef = ref(null);`:''}
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
const datoscampos${capitalizeFirstLetter(datosJSON.tableName)} = ref({})
const codigoUnico = ref(generarCodigoUnico());
const fecha = ref(nfecha('fecha'));
const position = "top";
/************************************************************************/
const fetchAndSetupData = async () => {
    const jsonData = await arrayToObjetoFromTabla(link.value+api.value,tokenCifrado.value,'${datosJSON.tableName}');
    datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value = jsonData;
    ${datosJSON.useImage? `datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.imagen = datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.imagen || generarCodigoUnico();`:''}
};
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
await fetchAndSetupData()
${datosJSON.useImage? `uploadUrl.value = link.value+api.value+"/subirunaimagen";`:''}
${datosJSON.useImage? `additionalData.value = {ruta: '../vista/img/${datosJSON.tableName}/'+datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.imagen};`:''}
});
/************************************************************************/
async function enviarDatos(event) {
    event.preventDefault();
  
  const url = link.value+api.value+"/insertar/${datosJSON.tableName}";

  const envioDatos = await enviarDatosPorPost(url, datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value,tokenCifrado.value);
  if (envioDatos[0] == 'ok') {
     toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos Agregados con éxito.', life: 3000 });
${datosJSON.useImage? `await uploadImages()`:''}

loading.value = false;
Swal.fire({
  title: "Datos Agregados",
  text: "Que hacemos ahora?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Agregar Otro!",
  cancelButtonText: "No, Regresar al Inicio!",
 }).then(async(result) => {
  if (result.isConfirmed) {
      fetchAndSetupData()
} else if (result.dismiss === Swal.DismissReason.cancel) {
    router.push({ path: \`/${datosJSON.tableName}\` });
  }
})
  }else{
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Agregar los datos.', life: 3000 });
  }
}
/************************************************************************/
  const handleSuccess = (result) => {
  console.log('Upload successful:', result);
};
/************************************************************************/
const handleError = (error) => {
  console.error('Upload failed:', error);
};
/************************************************************************/
${datosJSON.useImage? `const uploadImages = async () => {
  loading.value = true; 
  if (fileUploaderRef.value && typeof fileUploaderRef.value.uploadFiles === 'function') {
    try {
      await fileUploaderRef.value.uploadFiles(); 
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Archivos subidos correctamente.', life: 3000 });
    } catch (error) {
      console.error('Error al subir archivos:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error al subir archivos.', life: 3000 });
    } finally {
      loading.value = false;
    }
  } else {
    loading.value = false;
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo acceder al componente de subida.', life: 3000 });
  }
};`:''}

/************************************************************************/
</script>
<template>
  <div class="container-fluid mt-5">
<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
  <div class="flex flex-wrap items-center justify-start space-x-2 space-y-2">
    <router-link class="btn btn-primary btn-sm mt-2 flex items-center" to="/${datosJSON.tableName}">
      <i class="pi pi-home p-1 text-lg"></i>
    </router-link>
  </div>
</div>
<section class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
    <form id="formularioActualizar" action="" method="">
         <div class="box-body">
          <div class="row grid grid-cols-12 gap-4" id="campos">
${camposCrear}
<div class="form-group " hidden>
<label for="created_atAgregarDatos">{{t('CREATED_AT')}}</label>
<input type="input" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.created_at" name="created_at"  class="form-input " id="created_atAgregarDatos"   placeholder="created_at" maxlength="">
</div>
<div class="form-group " hidden>
<label for="updated_atAgregarDatos">{{t('UPDATED_AT')}}</label>
<input type="input" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.updated_at" name="updated_at"  class="form-input " id="updated_atAgregarDatos"   placeholder="updated_at" maxlength="">
</div>


<div class="form-group " hidden>
<label for="usuarioAgregarDatos">{{t('USUARIO')}}</label>
<input type="input" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.usuario" name="usuario"  class="form-input " id="usuarioAgregarDatos"   placeholder="usuario" maxlength="250">
</div>
<div class="form-group col-span-12 mb-5 mt-5 flex justify-end">
  <button type="button" class="btn btn-primary btn-sm m-1 flex items-center" @click="enviarDatos">
    <i class="pi pi-check p-1 text-lg"></i>
    Guardar Datos
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
