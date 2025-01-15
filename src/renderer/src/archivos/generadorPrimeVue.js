export async function generadorPrimeVue(datosJSON) {
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





const camposActualizar = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
        const tamano = field.sizeXS+' '+field.sizeSM + ' '+field.sizeMD+ ' '+field.sizeLG+ ' '+field.sizeXL+ ' '+field.size2XL;
    if (field.frontType === 'input') {

     if (field.properties === 'text') {

    return `<div class="${tamano}">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                <InputText type="${field.properties}" ${field.attributes} class=" ${field.classes}" v-model="datoscampos.${field.name}" name="${field.name}" placeholder="${field.name}" id="actualizar${field.name}" />
            </div>`;
        }else if(field.properties === 'number'){
            return `<div class="${tamano}">
            <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-400">${field.name.toUpperCase()}</label>
                          <InputNumber 
                            v-model="datoscampos.${field.name}"
                            locale="en-US"
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
                          <InputText v-model="datoscampos.${field.name}" type="password" class="w-full" />
                    </div>`;
        }else{
    return `<div class="${tamano}">
                <label for="${field.name}">${field.name.toUpperCase()}</label>
                <input type="${field.properties}" ${field.attributes} class="form-input ${field.classes}" v-model="datoscampos.${field.name}" name="${field.name}" placeholder="${field.name}" id="actualizar${field.name}" />
            </div>`;
        }



        }else if(field.frontType === 'textarea' || field.frontType === 'tablajson'){
        return `<div class="${tamano}">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                   <Textarea id="actualizar${field.name}" ${field.attributes} v-model="datoscampos.${field.name}" name="${field.name}" rows="3" class="form-textarea w-full ${field.classes}" placeholder="Enter ${capitalizeFirstLetter(field.name)}"></textarea>
                </div>`;
            }else if(field.frontType === 'select'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `'${option.trim()}'`) 
                .join(',');  

        return `<div class="${tamano}">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                   <Dropdown editable v-model="datoscampos.${field.name}" :options="[${formattedOptions}]" placeholder="Seleccione ${field.name}" class="w-full" />

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
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                    <Dropdown editable v-model="datoscampos.${field.name}" :options="[${formattedOptions2}]" placeholder="Seleccione ${field.name}" class="w-full" />
            </div>`;
            }else if(field.frontType === 'datepicker'){
        return `<div class="${tamano}">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                    <flat-pickr v-model="datoscampos.${field.name}"  class="form-input w-full" :config="basic"></flat-pickr>
            </div>`;
            }else if(field.frontType === 'inputmask'){
        return `<div class="${tamano}">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                    <InputMask fluid class=""  :mask="patronTelefono" v-model="datoscampos.${field.name}" placeholder="${field.name}" name="actualizar${field.name}" id="${field.name}" />
                  </div>`;
            }else if(field.frontType === 'timepicker'){
        return `<div class="${tamano}">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                   <DatePicker  v-model="datoscampos.${field.name}" timeOnly fluid />
            </div>`;
            }else if(field.frontType === 'checkbox'){
        return `<div class="${tamano}">
                <div class="flex items-center gap-2">
                        <Checkbox v-model="datoscampos.${field.name}" inputId="${field.name}"  name="${field.name}" indeterminate :invalid="!datoscampos.${field.name}" binary />
                        <label for="${field.name}" class="text-xs text-gray-700 dark:text-white">${capitalizeFirstLetter(replaceUnderlineWithSpace(field.name))} </label>
                    </div>
              </div>`;
            }else if(field.frontType === 'radio'){
        return `<div class="${tamano}">
                <label class="inline-flex">'. "\n";
               <input type="radio" ${field.attributes}  v-model="datoscampos.${field.name}" name="${field.name}" class="form-radio ${field.classes}" />
               <span>${field.name.toUpperCase()}</span>
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
           <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else if(field.properties === 'append'){
          return `<div class="${tamano}">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else{
          return `<div class="${tamano}">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="${field.name}">${field.name.toUpperCase()}</label>
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-400" for="imagen-Actualizador">IMAGEN</label>
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

const columnasTabla = datosJSON.fields
  .filter(campo => campo.name !== 'ID')
  .map(field => `<Column field="${field.name}" header="${capitalizeFirstLetter(field.name)}"></Column>`)
  .join('\n');


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
import { ref, onMounted, nextTick, watchEffect,computed } from 'vue';
import axios from 'axios';
import { nfecha, arrayToObjetoFromTabla, peticionesFetch,obtenerIdsSeleccionados, crearTablaSiNoExiste,encryptarPassword,buscadorArrayObjeto } from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
import { useToast } from "primevue/usetoast";
const toast = useToast();
/************************************************************************/
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
/************************************************************************/
  const basic = ref({
    dateFormat: 'd/m/Y',
  });
/************************************************************************/
const usuarioLocal = ref({})
/************************************************************************/
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
const datosJSON = ref([]);
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
  }
});
/************************************************************************/
const fetchAndSetupData = async () => {
const response = await peticionesFetch('getDataAsArray', \'${datosJSON.tableName}\');
    const jsonData = response.reverse();
    data.value = jsonData;
};
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
onMounted(async () => {
await datosConfig()
tokenCifrado.value = await encryptarPassword(token.value, 10);
await crearTablaSiNoExiste(\'${datosJSON.tableName}\', camposArray, toast);
//usuarioLocal.value = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0] || {};
await campos();
await fetchAndSetupData();
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
                    const envioDatos = await peticionesFetch('deleteAll', \'${datosJSON.tableName}\');
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
  const datosEnviar = JSON.parse(JSON.stringify(datoscampos.value));
  const envioDatos = await peticionesFetch('updateData',\'${datosJSON.tableName}\', JSON.stringify(datosEnviar));
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
  const datosEnviar = JSON.parse(JSON.stringify(datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.value));
  const envioDatos = await peticionesFetch('insertData',\'${datosJSON.tableName}\', JSON.stringify(datosEnviar));
  if (envioDatos[0] == 'ok') {
    fetchAndSetupData();
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
                              const envioDatos = await peticionesFetch('deleteEntry',\'${datosJSON.tableName}\', id);
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
const items${capitalizeFirstLetter(datosJSON.tableName)} = ref([]);
const menu = ref(null);
const currentRowData = ref(null);
const toggle${capitalizeFirstLetter(datosJSON.tableName)} = (event, rowData) => {
currentRowData.value = rowData;
items${capitalizeFirstLetter(datosJSON.tableName)}.value = [
{ label: 'Editar', icon: 'pi pi-pencil', command: () => { 
visible.value = true;
datoscampos.value = currentRowData.value;
} },
{ label: 'Eliminar', icon: 'pi pi-trash', command: () => {
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
                        const datosFactura = await peticionesFetch('deleteEntry',\'${datosJSON.tableName}\', rowData.id);
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
    },
];
menu.value.toggle(event);
};
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
const onRowSelect = (event) => {
 
datoscampos.value = event.data;
visible.value = true;


};
/************************************************************************/
</script>
<template>
<main class="content-wrapper">
  <div class="mt-5">
<Card>
  <template #content>
    <div class="flex flex-col space-y-4">
<div class="w-full">
<fieldset class="border p-3 rounded-md mb-2">
  <legend class="px-2">Datos de ${capitalizeFirstLetter(datosJSON.tableName)}</legend>
  <div class="flex items-center">
    <div class="flex space-x-2">
      <Button icon="pi pi-refresh" severity="primary" @click="fetchAndSetupData" data-toggle="tooltip" title="Recargar" id="reload" />
      <Button icon="pi pi-plus" severity="primary" title="Agregar Nuevo" id="nuevoregistro" @click="visiblecrear = true" />
      <Button icon="pi pi-trash" severity="danger" @click="borrarSeleccionados" data-toggle="tooltip" title="Borrar Selección" id="borrador" />
    </div>
    <div class="ml-auto">
      <Button
        v-if="datosEmpresa.usuario.nivel_seguridad == 'Soporte'"
        label="Borrar Todo"
        icon="pi pi-trash"
        severity="danger"
        @click="borrarTodo"
        id="borrartodo"
      />
    </div>
  </div>
</fieldset>
</div>

      <div class="w-full">
        <div class="flex justify-end mb-4">
          <InputText v-model="searchQuery" placeholder="Buscar ${datosJSON.tableName}..." class="p-inputtext p-component" />
        </div>
        <DataTable
          :value="filtered${capitalizeFirstLetter(datosJSON.tableName)}"
          scrollable
          scrollHeight="600px"
          dataKey="id"
          paginator
          :rows="10"
          v-model:selection="selectedItems"
          @rowSelect="onRowSelect"
          selectionMode="single"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem">
         <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column header="Options">
            <template #body="slotProps">
              <Button
                icon="pi pi-cog"
                @click="toggle${capitalizeFirstLetter(datosJSON.tableName)}($event, slotProps.data)"
                aria-haspopup="true"
                aria-controls="overlay_menu_factura"
              />
              <Menu
                ref="menu"
                id="overlay_menu_${capitalizeFirstLetter(datosJSON.tableName)}"
                :model="items${capitalizeFirstLetter(datosJSON.tableName)}"
                :popup="true"
              />
            </template>
          </Column>
          ${columnasTabla}
        </DataTable>
      </div>
    </div>
  </template>
</Card>

<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<Dialog v-model:visible="visible" :position="position" modal header="Modificar ${capitalizeFirstLetter(datosJSON.tableName)}" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
  <template #header>
    <div class="inline-flex align-items-center justify-content-center gap-2">
      <span class="font-bold whitespace-nowrap">Modal Editar</span>
    </div>
  </template>
  <fieldset class="border p-3 rounded-md mb-2">
    <legend class="px-2">${capitalizeFirstLetter(datosJSON.tableName)}</legend>
    <form id="formularioActualizar${capitalizeFirstLetter(datosJSON.tableName)}" action="" method="">
      <div class="grid grid-cols-12 gap-4 mt-4 text-blue-600">
        <div class="hidden col-span-12">
          <label for="id-Actualizador" class="block text-sm font-medium text-gray-700">ID</label>
          <InputText v-model="datoscampos.id" name="id" id="id-Actualizador" readonly placeholder="id" maxlength="11" class="w-full" />
        </div>

         ${camposActualizar}
        <div class="hidden col-span-12">
          <label for="created_at-Actualizador" class="block text-sm font-medium text-gray-700">CREATED_AT</label>
          <InputText v-model="datoscampos.created_at" name="created_at" id="created_at-Actualizador" placeholder="created_at" class="w-full" />
        </div>
        <div class="hidden col-span-12">
          <label for="updated_at-Actualizador" class="block text-sm font-medium text-gray-700">UPDATED_AT</label>
          <InputText v-model="datoscampos.updated_at" name="updated_at" id="updated_at-Actualizador" placeholder="updated_at" class="w-full" />
        </div>
        <div class="hidden col-span-12">
          <label for="usuario-Actualizador" class="block text-sm font-medium text-gray-700">USUARIO</label>
          <InputText v-model="datoscampos.usuario" name="usuario" id="usuario-Actualizador" placeholder="usuario" maxlength="250" class="w-full" />
        </div>
      </div>
    </form>
  </fieldset>
  <template #footer>
    <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
    <Button label="Save" outlined severity="secondary" @click="funcionActualizar" autofocus />
  </template>
</Dialog>


<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<Dialog v-model:visible="visiblecrear" :position="position" modal header="Crear ${capitalizeFirstLetter(datosJSON.tableName)}" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
  <template #header>
    <div class="inline-flex align-items-center justify-content-center gap-2">
      <span class="font-bold whitespace-nowrap">Modal Crear</span>
    </div>
  </template>
  <fieldset class="border p-3 rounded-md mb-2">
    <legend class="px-2">${capitalizeFirstLetter(datosJSON.tableName)}</legend>
    <form id="formularioCrear${capitalizeFirstLetter(datosJSON.tableName)}" action="" method="">
      <div class="grid grid-cols-12 gap-4 mt-4 text-blue-600">

${camposCrear}


        <div class="hidden col-span-6">
          <label for="created_atAgregarDatos" class="block text-sm font-medium text-gray-700">CREATED_AT</label>
          <InputText v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.created_at" name="created_at" id="created_atAgregarDatos" placeholder="created_at" class="w-full" />
        </div>
        <div class="hidden col-span-6">
          <label for="updated_atAgregarDatos" class="block text-sm font-medium text-gray-700">UPDATED_AT</label>
          <InputText v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.updated_at" name="updated_at" id="updated_atAgregarDatos" placeholder="updated_at" class="w-full" />
        </div>
        <div class="hidden col-span-12">
          <label for="usuarioAgregarDatos" class="block text-sm font-medium text-gray-700">USUARIO</label>
          <InputText v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.usuario" name="usuario" id="usuarioAgregarDatos" placeholder="usuario" maxlength="250" class="w-full" />
        </div>
      </div>
    </form>
  </fieldset>
  <template #footer>
    <Button label="Cancel" text severity="secondary" @click="visiblecrear = false" autofocus />
    <Button label="Crear" outlined severity="secondary" @click="funcionCrear" autofocus />
  </template>
</Dialog>

<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<Toast />
  </div>
</main>
</template>
<style scoped>
</style>

`;
}
