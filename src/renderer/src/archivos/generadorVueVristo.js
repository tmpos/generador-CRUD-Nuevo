export async function generadorVue(datosJSON) {
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





const camposActualizar = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
        const tamano = field.sizeXS+' '+field.sizeSM + ' '+field.sizeMD+ ' '+field.sizeLG+ ' '+field.sizeXL+ ' '+field.size2XL;
    if (field.frontType === 'input') {
    return `<div class="${tamano}">
                <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                <input type="${field.properties}" ${field.attributes} class="form-input ${field.classes}" v-model="datoscampos.${field.name}" name="${field.name}" placeholder="${field.name}" id="actualizar${field.name}" />
            </div>`;
        }else if(field.frontType === 'textarea' || field.frontType === 'tablajson'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                   <textarea id="actualizar${field.name}" ${field.attributes} v-model="datoscampos.${field.name}" name="${field.name}" rows="3" class="form-textarea ${field.classes}" placeholder="Enter ${capitalizeFirstLetter(field.name)}"></textarea>
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

const camposColumnsPDF = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
    return `{ header: '${capitalizeFirstLetter(field.name)}', dataKey: '${field.name}' },`;
  })
  .join('\n');

const camposRowsPDF = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
    return `'${field.name}': item.${field.name},`;
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
<script setup lang="ts">
import { ref, onMounted, nextTick, watchEffect,computed } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useMeta } from '@/composables/use-meta';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
import axios from 'axios';
import { enviarDatosPorPost,generarTablaFromStringJSON, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron,toast, crearTablaSiNoExiste, peticiones,generarCodigoUnico, lasMayusculas } from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
import { vMaska } from "maska/vue"
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
useMeta({ title: '${capitalizeFirstLetter(datosJSON.tableName)}' });
const search = ref('');
/************************************************************************/
const usuarioLocal = ref({})
/************************************************************************/
/************************************************************************/
const excelColumns = () => {
    return {
        ${camposExcel}
    };
};
/************************************************************************/
const cols = ref([
    { field: 'options', title: 'Options' },

${camposTabla}


]) || [];
/************************************************************************/
 const excelItems = () => {
     return datosTabla.value;
 };
const camposArray = [${camposArray}];
/************************************************************************/
import { useDatosEmpresa } from '../../stores'
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
const selectedItems = ref([]);
/************************************************************************/
const position = ref('top');
const openPosition = (pos) => {
    position.value = pos;
    visible.value = true;
}
/************************************************************************/
const datoscampos${capitalizeFirstLetter(datosJSON.tableName)} = ref({})
/************************************************************************/
${fileUploader}
/************************************************************************/
const visible = ref(false);
const visiblecrear = ref(false);
const value = ref(null);
const id = ref(null);
const datoscampos = ref({});
const data = ref([]);
const searchQuery = ref('');
const ${capitalizeFirstLetter(datosJSON.tableName)}Editar = ref(null);
/************************************************************************/
async function limpiarCamposCrear() {
datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value = {}
await campos();
}
/************************************************************************/
watchEffect(() => {
  if (visiblecrear.value) {
   ${imagenCodigo}
  }
});
/************************************************************************/
/************************************************************************/
const popoverVisible = ref<Record<number, boolean>>({});
const togglePopover = (id: number) => {
  popoverVisible.value = { ...popoverVisible.value, [id]: !popoverVisible.value[id] };
};
const dropdownOptions = [${datosJSON.updateButton ? `'Editar',`:''}${datosJSON.deleteButton ? `'Borrar'`:''}];
const selectOption = async(row: any, option: string) => {
  popoverVisible.value[row.id] = false;
  const datos = row;
  if(option === 'Editar'){

  ${imagenArray}

${linkImagen}

visible.value = true;
datoscampos.value = datos;
   }else if(option === 'Borrar'){
            Swal.fire({
                title: 'Introduce la contraseña',
                input: 'password',
                inputPlaceholder: 'Contraseña',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const contrasenaIngresada = result.value;
                    if (contrasenaIngresada === token.value || contrasenaIngresada === tokenCorto.value) {
                        const datosFactura = await peticionesFetch(\`\${link.value}\${api.value}\`, \`borrarporcampo/${datosJSON.tableName}\`, { campo: 'id', valor: datos.id }, tokenCifrado.value, 'POST');
                        if (datosFactura[0] == 'ok') {
                            toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos eliminados correctamente', life: 3000 });
                            await fetchAndSetupData()
                        } else {
                            toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar los datos', life: 3000 });
                        }
                    } else {
                        toast.add({ severity: 'error', summary: 'Error', detail: 'Contraseña incorrecta', life: 3000 });
                    }
                }
            });
  }
};
/************************************************************************/
const closeAllPopovers = (event: MouseEvent) => {
  const popoverElements = document.querySelectorAll('.popover-content, .btn');
  let clickedInside = false;
  popoverElements.forEach((element) => {
    if (element.contains(event.target as Node)) {
      clickedInside = true;
    }
  });
  if (!clickedInside) {
    popoverVisible.value = {};
  }
};
/************************************************************************/
const loadingdata = ref(false)
/*************************************************************************/
const datosTabla = ref([])
/*************************************************************************/
const fetchAndSetupData = async () => {
   try {
   loadingdata.value = true;
   const response = await peticionesFetch(
     \`\${link.value}\${api.value}\`, 
     'datosarray/${datosJSON.tableName}',
     {}, 
     tokenCifrado.value,
     'GET'
   );
   if (!response || response.error) {
     throw new Error('Error al obtener los datos');
   }
   datosTabla.value = response;
   } catch (error) {
   console.error('Error en la solicitud:', error.message);
   toast.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al cargar los datos.', life: 3000 });
   } finally {
   loadingdata.value = false;
   }
};
/************************************************************************/
async function campos() {
  const campos = await arrayToObjetoFromTabla(link.value+api.value, tokenCifrado.value, '${datosJSON.tableName}', true,camposArray,'usuario');
  datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value = campos;
}
/************************************************************************/
onMounted(async () => {
const datosJSON = await envioElectron('datosarchivo');
link.value = datosJSON.VITE_LINKURL;
api.value = datosJSON.VITE_LINK_API;
token.value = datosJSON.VITE_TOKEN;
patronTelefono.value = datosJSON.VITE_PATRON_TELEFONO;
linkImpresora.value = datosJSON.VITE_IMPRESORA_LOCAL;
patroncedula.value = datosJSON.VITE_PATRON_CEDULA;
tokenCorto.value = datosJSON.VITE_TOKEN_CORTO;
tokenCifrado.value = await encryptarPassword(token.value, 10);
await crearTablaSiNoExiste(link.value, api.value, '${datosJSON.tableName}', camposArray, tokenCifrado.value,toast);
usuarioLocal.value = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0] || {};
await campos();
await fetchAndSetupData();
${linkIMGUpload}
});
/************************************************************************/
  async function borrarTodo() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Se borrarán los datos!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, de acuerdo",
        cancelButtonText: "No, cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { value: password } = await Swal.fire({
                title: 'Introduce la contraseña',
                input: 'password',
                inputPlaceholder: 'Contraseña',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            });
            if (password) {
               if (password === token.value || password === tokenCorto.value) {
                    const envioDatos = await borrarTodoslosDatos(link.value + api.value + '/borrartodo', '${datosJSON.tableName}', tokenCifrado.value);
                    if (envioDatos[0] == 'ok') {
                        fetchAndSetupData();
                        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos borrados', life: 3000 });
                    } else {
                        toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al borrar datos.', life: 3000 });
                   }
                } else {
                    toast.add({ severity: 'error', summary: 'Error', detail: 'Contraseña incorrecta', life: 3000 });
                }
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            toast.add({ severity: 'success', summary: 'No te preocupes', detail: 'Datos seguros', life: 3000 });
        }
    });
}
/************************************************************************/
async function funcionActualizar() {
  const url = link.value+api.value+"/actualizarcampos/${datosJSON.tableName}";
  if (!datoscampos.value) {
    console.error("Datos incompletos, no se puede actualizar.");
    return;
  }
  if (datoscampos.value.hasOwnProperty('created_at')) {
    datoscampos.value.updated_at = nfecha('timestamp');
  }
  const envioDatos = await enviarDatosPorPost(url, datoscampos.value, tokenCifrado.value);
  if (envioDatos[0] == 'ok') {
    visible.value = false;
    fetchAndSetupData();
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos Actualizados', life: 3000 });
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al actualizar los datos.', life: 3000 });
  }
}
/************************************************************************/
async function funcionCrear() {
  const url = link.value+api.value+"/insertar/${datosJSON.tableName}";
  if (datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.hasOwnProperty('created_at')) {
    datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.created_at = nfecha('timestamp');
    datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.updated_at = nfecha('timestamp');
  }
  const envioDatos = await enviarDatosPorPost(url, datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value, tokenCifrado.value);
  if (envioDatos[0] == 'ok') {
    await fetchAndSetupData();
   ${imagenCrear}
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos Agregados', life: 3000 });
    limpiarCamposCrear();
    visiblecrear.value = false;
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Agregar los datos.', life: 3000 });
  }
}
/************************************************************************/
async function borrarSeleccionados() {
  const ids = obtenerIdsSeleccionados(selectedItems.value);
    Swal.fire({
        title: "¿Estas Seguro?",
        text: "Se Borraran los Datos!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, de acuerdo!",
        cancelButtonText: "No, cancelar!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { value: password } = await Swal.fire({
                title: 'Introduce la contraseña',
                input: 'password',
                inputPlaceholder: 'Contraseña',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            });
            if (password) {
                if (password === token.value || password === tokenCorto.value) {
                    let exitoTotal = true;
                    if (ids.length > 0) {
                        for (const id of ids) {
                            try {
                                const envioDatos = await eliminarDatos(\`\${link.value}\${api.value}/borrar/${datosJSON.tableName}\`, id, tokenCifrado.value);
                            } catch (error) {
                               console.error(\`Error al eliminar datos para ID: \${id}\`, error);
                                exitoTotal = false;
                            }
                        }
                        if (exitoTotal) {
                            fetchAndSetupData();
                            toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos Borrados', life: 3000 });
                        } else {
                            toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al Borrar los datos.', life: 3000 });
                        }
                    } else {
                        toast.add({ severity: 'error', summary: 'Error', detail: 'No hay datos para borrar', life: 3000 });
                    }
                } else {
                    toast.add({ severity: 'error', summary: 'Error', detail: 'Contraseña incorrecta', life: 3000 });
                }
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            toast.add({ severity: 'success', summary: 'No te preocupes', detail: 'Datos Seguros', life: 3000 });
        }
    });
}
/************************************************************************/
const filtered${capitalizeFirstLetter(datosJSON.tableName)} = computed(() => {
if (!searchQuery.value) return data.value;
return data.value.filter(busqueda => {
  return Object.values(busqueda).some(value =>
    String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
   );
  });
});
/************************************************************************/
const fnAwesomplete = ()=>{
}
const handleSelectComplete = async(selected)=>{
}
/************************************************************************/
const fnRouter = (ruta) => {
  router.push(ruta);
};
/************************************************************************/
${noEsING}
/************************************************************************/
const generatePDF = () => {
  const doc = new jsPDF();
  const columns = [
   ${camposColumnsPDF}
  ];
  const rows = datosTabla.value.map((item) => ({
  ${camposRowsPDF}
  }));
  doc.autoTable({
    head: [columns.map(col => col.header)],
    body: rows.map(row => columns.map(col => row[col.dataKey])),
  });
  doc.save('tabla_${datosJSON.tableName}.pdf');
};
/************************************************************************/

</script>

<template>

  <div>
<div class="panel pb-1.5 mt-5">
<div class="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
    <div class="flex items-center flex-wrap">

        <button type="button" class="btn btn-primary btn-sm m-1" @click="fetchAndSetupData">
            <i class="pi pi-sync p-1 text-lg"></i>
        </button>
        ${datosJSON.newButton ? `<button type="button" class="btn btn-primary btn-sm m-1" @click="visiblecrear = true">
            <i class="pi pi-plus-circle p-1 text-lg"></i>
        </button>` : ''}

        ${datosJSON.selectionButton ? `<button type="button" class="btn btn-primary btn-sm m-1" @click="borrarSeleccionados">
            <i class="pi pi-trash p-1 text-lg"></i>
        </button>` : ''}

        ${datosJSON.excelButton ? `<vue3-json-excel class="btn btn-primary btn-sm m-1 cursor-pointer" name="table.xls" :fields="excelColumns()" :json-data="excelItems()">
            <i class="pi pi-file-excel p-1 text-lg"></i>
           </vue3-json-excel>` : ''}

        ${datosJSON.pdfButton ? `<button type="button" class="btn btn-primary btn-sm m-1" @click="generatePDF">
           <i class="pi pi-file-pdf p-1 text-lg"></i>
        </button>` : ''}

        ${datosJSON.deleteAllButton ? `<button type="button" v-if="usuarioLocal.usuario === 'Soporte'" class="btn btn-primary btn-sm m-1" @click="borrarTodo">
           <i class="pi pi-trash p-1 text-lg"></i> Borrar Todo
        </button>` : ''}


    </div>
    <div class="text-right">
        <input v-model="search" type="text" class="form-input " placeholder="Buscar..." />
    </div>
</div>
<div class="datatable">
<vue3-datatable
    :rows="datosTabla"
    :columns="cols"
    :totalRows="rows?.length"
    :sortable="true"
    :search="search"
    pageSize="20"
    hasCheckbox="true"
    :loading="loadingdata"
    :stickyHeader="true"
    @rowSelect="onSelectionChange"
    @rowClick="onRowSelect" 
    skin="whitespace-nowrap bh-table-hover"
    firstArrow='<i class="pi pi-fast-backward p-1 text-lg"></i>'
    lastArrow='<i class="pi pi-fast-forward p-1 text-lg"></i>'
    previousArrow='<i class="pi pi-step-backward p-1 text-lg"></i>'
    nextArrow='<i class="pi pi-step-forward p-1 text-lg"></i>'
  >
    <!-- Template personalizado para la columna 'options' -->
    <template #options="data">
      <div class="relative inline-block">
        <!-- Botón que abrirá el popover -->
        <button
          type="button"
          class="btn btn-primary"
          @click.stop="togglePopover(data.value.id)"
        >
          <i class="pi pi-bars"></i>
        </button>

        <!-- Popover con las opciones (solo visible si popoverVisible[id] es true) -->
        <div
          v-if="popoverVisible[data.value.id]"
          class="absolute z-10 mt-2 py-2 w-48 bg-white rounded-md shadow-lg"
        >
          <ul>
            <li
              v-for="option in dropdownOptions"
              :key="option"
              @click.stop="selectOption(data.value, option)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <!-- Mostrar el ícono correspondiente a la opción -->
              ${datosJSON.updateButton ? `<i v-if="option === 'Editar'" class="pi pi-pencil text-blue-500"></i>` : ''}
              ${datosJSON.deleteButton ? `<i v-if="option === 'Borrar'" class="pi pi-trash text-red-500"></i>` : ''}
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </vue3-datatable>
            </div>     
             </div>
    </div>

<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
 <TransitionRoot appear :show="visible" as="template">
     <Dialog as="div" @close="visible = false" class="relative z-50">
       <TransitionChild
         as="template"
         enter="duration-300 ease-out"
         enter-from="opacity-0"
         enter-to="opacity-100"
         leave="duration-200 ease-in"
         leave-from="opacity-100"
         leave-to="opacity-0"
       >
 <DialogOverlay class="fixed inset-0 bg-[black]/60" />
       </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto">
         <div class="flex min-h-full items-start justify-center px-4 py-8">
           <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark animate__animated animate__slideInDown">
             <button type="button" class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none" @click="visible = false">
              <i class="pi pi-times"></i>
             </button>
             <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Modal Agregar ${capitalizeFirstLetter(datosJSON.tableName)}</div>
             <div class="p-5">
  <fieldset class="border p-3 round mb-2">
    <legend class="float-none w-auto px-2">${capitalizeFirstLetter(datosJSON.tableName)}</legend>
     <form id="formularioActualizar${capitalizeFirstLetter(datosJSON.tableName)}" action="" method="">
         <div  style="margin-top: 15px;color: #34AAB2;" class="grid grid-cols-12 gap-4">
<div class="form-group " hidden>
<label for="id-Actualizador">{{t('ID')}}</label>
<input type="input" v-model="datoscampos.id" name="id"  class="form-input" id="id-Actualizador"  placeholder="id"  maxlength="11">
</div>

${camposActualizar}

<div class="form-group " hidden>
<label for="created_at-Actualizador">{{t('CREATED_AT')}}</label>
<input type="input" v-model="datoscampos.created_at" name="created_at"  class="form-input" id="created_at-Actualizador"  placeholder="created_at"  maxlength="">
</div>
<div class="form-group " hidden>
<label for="updated_at-Actualizador">{{t('UPDATED_AT')}}</label>
<input type="input" v-model="datoscampos.updated_at" name="updated_at"  class="form-input" id="updated_at-Actualizador"  placeholder="updated_at"  maxlength="">
</div>


<div class="form-group " hidden>
<label for="usuario-Actualizador">{{t('USUARIO')}}</label>
<input type="input" v-model="datoscampos.usuario" name="usuario"  class="form-input" id="usuario-Actualizador"  placeholder="usuario"  maxlength="250">
</div>

        </div>
        </form>
</fieldset>
              <div class="flex justify-end items-center mt-8">
                <button type="button" @click="visible = false" class="btn btn-outline-danger">Cerrar</button>
                <button type="button" @click="funcionActualizar" class="btn btn-primary ltr:ml-4 rtl:mr-4">Actualizar</button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->

<TransitionRoot appear :show="visiblecrear" as="template">
     <Dialog as="div" @close="visiblecrear = false" class="relative z-50">
       <TransitionChild
         as="template"
         enter="duration-300 ease-out"
         enter-from="opacity-0"
         enter-to="opacity-100"
         leave="duration-200 ease-in"
         leave-from="opacity-100"
         leave-to="opacity-0"
       >
 <DialogOverlay class="fixed inset-0 bg-[black]/60" />
       </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto">
         <div class="flex min-h-full items-start justify-center px-4 py-8">
           <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark animate__animated animate__slideInDown">
             <button type="button" class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none" @click="visiblecrear = false">
               <i class="pi pi-times"></i>
             </button>
             <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Modal Agregar ${datosJSON.tableName}</div>
             <div class="p-5">
  <fieldset class="border p-3 round mb-2">
    <legend class="float-none w-auto px-2">${datosJSON.tableName.toUpperCase()}</legend>
     <form id="formularioActualizar${capitalizeFirstLetter(datosJSON.tableName)}" action="" method="">
         <div  style="margin-top: 15px;color: #34AAB2;" class="grid grid-cols-12 gap-4">

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

        </div>
        </form>
</fieldset>
              <div class="flex justify-end items-center mt-8">
                <button type="button" @click="visiblecrear = false" class="btn btn-outline-danger">Cerrar</button>
                <button type="button" @click="funcionCrear" class="btn btn-primary ltr:ml-4 rtl:mr-4">Crear</button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.form-container {
    /* Agrega tus estilos aquí */
}
</style>
`;
}
