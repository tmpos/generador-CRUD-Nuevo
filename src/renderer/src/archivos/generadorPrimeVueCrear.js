export async function generadorPrimeVueCrear(datosJSON) {
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const replaceUnderlineWithSpace = (str)=> {
  return str.replace(/_/g, ' ');
}

const camposCrear = datosJSON.fields
    .filter(campo => campo.name !== 'ID') 
    .map(field => {

        const tamano = field.sizeXS+' '+field.sizeSM + ' '+field.sizeMD+ ' '+field.sizeLG+ ' '+field.sizeXL+ ' '+field.size2XL;
     if (field.frontType === 'input') {

        if (field.properties === 'text') {
        return `<div class="${tamano}">
                    <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-400">${field.name.toUpperCase()}</label>
                    <InputText type="${field.properties}" fluid class=" ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${field.name}" name="crear${field.name}" id="${field.name}" />
                </div>`;

        }else if(field.properties === 'number'){
            return `<div class="${tamano}">
            <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-400">${field.name.toUpperCase()}</label>
                          <InputNumber 
                            v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}"
                            locale="en-US"
                            fluid
                            :minFractionDigits="2" 
                            highlightOnFocus
                            class=""
                             placeholder="0.00" 
                             :inputStyle="{width:'3rem'}"
                            />
                    </div>`;
        }else if(field.properties === 'password'){
            return `<div class="${tamano}">
            <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-400">${field.name.toUpperCase()}</label>
                          <InputText fluid v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" type="password" class="" />
                    </div>`;
        }else{
        return `<div class="${tamano}">
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <input type="${field.properties}" class="form-input ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${field.name}" name="crear${field.name}" id="${field.name}" />
                </div>`;
        }



            }else if(field.frontType === 'textarea' || field.frontType === 'tablajson'){
        return `<div class="${tamano}">
                    <label  class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                   <Textarea id="crear${field.name}" rows="3" fluid class="form-textarea w-full ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${capitalizeFirstLetter(field.name)}" />
                </div>`;
            }else if(field.frontType === 'select'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `'${option.trim()}'`) 
                .join(','); 

        return `<div class="${tamano}">
                    <label  class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                    <Dropdown editable fluid v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" :options="[${formattedOptions}]" placeholder="Seleccione ${field.name}" class="" />
            </div>`;
            }else if(field.frontType === 'selectnormal'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `<option value="${option.trim()}">${option.trim()}</option>`); 

             const formattedOptions2 = field.options
                .split(',') 
                .map(option => `'${option.trim()}'`) 
                .join(','); 


        return `<div class="${tamano}">
                    <label  class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>

              <Dropdown v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" :options="[${formattedOptions2}]" placeholder="Seleccione ${field.name}" fluid class="" />
            </div>`;


/*                    <select v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" ${field.attributes}  class="w-full form-select ${field.classes}">
                    ${formattedOptions}
                    </select>*/


            }else if(field.frontType === 'datepicker'){
        return `<div class="${tamano}">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                        <flat-pickr v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}"  class="form-input w-full" :config="basic"></flat-pickr>
            </div>`;
            }else if(field.frontType === 'inputmask'){
        return `<div class="${tamano}">
                    <label  class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                    <InputMask fluid class=""  :mask="patronTelefono" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${field.name}" name="crear${field.name}" id="${field.name}" />
                  </div>`;
            }else if(field.frontType === 'timepicker'){
        return `<div class="${tamano}">
                    <label class="font-bold block mb-2" for="${field.name}">${field.name.toUpperCase()}</label>
                   <DatePicker  v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" timeOnly fluid />
            </div>`;
            }else if(field.frontType === 'checkbox'){
        return `<div class="${tamano}">
                <div class="flex items-center gap-2">
                        <Checkbox v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" inputId="${field.name}" name="${field.name}" indeterminate :invalid="!datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" binary />
                        <label for="${field.name}" class="text-xs text-gray-700 dark:text-white"> ${capitalizeFirstLetter(replaceUnderlineWithSpace(field.name))} </label>
                    </div>
              </div>`;
            }else if(field.frontType === 'radio'){
        return `<div class="${tamano}">
                <label class="inline-flex">'. "\n";
               <input type="radio" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" name="${field.name}" class="form-radio ${field.classes}" />
               <span>${field.name.toUpperCase()}</span>
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
           <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else if(field.properties === 'append'){
          return `<div class="${tamano}">
                  <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else{
          return `<div class="${tamano}">
                      <label for="${field.name}">${field.name.toUpperCase()}</label>
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
<label for="imagenAgregarDatos">IMAGEN</label>
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
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute(); 
import { nfecha, arrayToObjetoFromTabla, peticionesFetch,obtenerIdsSeleccionados, crearTablaSiNoExiste,encryptarPassword,buscadorArrayObjeto,generarCodigoUnico } from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
const toast = useToast();
/************************************************************************/
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
/************************************************************************/
  const basic = ref({
    dateFormat: 'd/m/Y',
  });
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
const datosJSON = ref([]);
/************************************************************************/
const datoscampos${capitalizeFirstLetter(datosJSON.tableName)} = ref({})
const codigoUnico = ref(generarCodigoUnico());
const fecha = ref(nfecha('fecha'));
const position = "top";
/************************************************************************/
async function campos() {
  const campos = await arrayToObjetoFromTabla(\'${datosJSON.tableName}\');
  datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value = campos;
}
/************************************************************************/
const datosConfig = async()=>{
    const response = await peticionesFetch('getDataAsArray', 'datos_config');
    datosJSON.value = response;
    link.value = buscadorArrayObjeto('nombre','LINKURL',response,'valor')
    api.value = buscadorArrayObjeto('nombre','LINK_API',response,'valor');
    token.value = buscadorArrayObjeto('nombre','TOKEN',response,'valor');
    patronTelefono.value = buscadorArrayObjeto('nombre','PATRON_TELEFONO',response,'valor');
    patroncedula.value = buscadorArrayObjeto('nombre','PATRON_CEDULA',response,'valor');
    tokenCorto.value = buscadorArrayObjeto('nombre','TOKEN_CORTO',response,'valor');
}
/************************************************************************/
onMounted(async() => {
await datosConfig()
tokenCifrado.value = await encryptarPassword(token.value, 10);
await campos()
});
/************************************************************************/
async function enviarDatos(event) {
    event.preventDefault();
  const url = link.value+api.value+"/insertar/${datosJSON.tableName}";
  if (!datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Datos incompletos, no se puede Enviar.', life: 3000 });
    return;
  }
  if (datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.hasOwnProperty('created_at')) {
     datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.created_at = nfecha('timestamp')
     datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value.updated_at = nfecha('timestamp')
    }

  const datosEnviar = JSON.parse(JSON.stringify(datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value));
  const envioDatos = await peticionesFetch('insertData',\'${datosJSON.tableName}\', JSON.stringify(datosEnviar));
  if (envioDatos[0] == 'ok') {
     toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos Agregados con éxito.', life: 3000 });
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
</script>
<template>
<main class="content-wrapper">
  <div class="container-fluid mt-5 card">
        <fieldset class="border p-3 rounded mb-2">
          <legend class="float-none w-auto px-2">Datos de ${capitalizeFirstLetter(datosJSON.tableName)}</legend>
    <div class="row">
      <div class="col-sm-12">
        <Button as="router-link" icon="pi pi-home" to="/${datosJSON.tableName}" />
      </div>
    </div>
</fieldset>
<section>
<fieldset class="border p-3 rounded mb-2">
  <legend class="float-none w-auto px-2">Campos</legend>
    <form id="formularioGenerar" action="" method="">
         <div class="box-body">
          <div class="grid grid-cols-12 gap-4 mt-4 text-blue-600" id="campos">

${camposCrear}

<div class="form-group col-6" hidden>
<label for="created_atAgregarDatos">CREATED_AT</label>
<input type="input" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.created_at" name="created_at"  class="form-control " id="created_atAgregarDatos"  placeholder="created_at" maxlength="">
</div>
<div class="form-group col-6" hidden>
<label for="updated_atAgregarDatos">UPDATED_AT</label>
<input type="input" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.updated_at" name="updated_at"  class="form-control " id="updated_atAgregarDatos"  placeholder="updated_at" maxlength="">
</div>

<div class="form-group col-12" hidden>
<label for="usuarioAgregarDatos">USUARIO</label>
<input type="input" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.usuario" name="usuario"  class="form-control " id="usuarioAgregarDatos"  placeholder="usuario" maxlength="250">
</div>

<div class="form-group col-span-12 mb-5 mt-5">
  <Button label="Enviar Datos" fluid  @click="enviarDatos" />
</div>

  </div>
  </div>
   </form>
   </fieldset>
</section>
  </div>
   </main>
<Toast />
</template>
<style scoped>
</style>

`;
}
