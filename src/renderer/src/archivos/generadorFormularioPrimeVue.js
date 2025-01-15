export async function generadorFromularioPrimeVue(datosJSON) {
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const camposCrear = datosJSON.fields
    .filter(campo => campo.name !== 'ID') 
    .map(field => {

        const tamano = field.sizeXS+' '+field.sizeSM + ' '+field.sizeMD+ ' '+field.sizeLG+ ' '+field.sizeXL+ ' '+field.size2XL;
     if (field.frontType === 'input') {

        if (field.properties === 'text') {
        return `<div class="${tamano}">
                    <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-400">${field.name.toUpperCase()}</label>
                    <InputText type="${field.properties}" class="form-input w-full ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${field.name}" name="crear${field.name}" id="${field.name}" />
                </div>`;

        }else if(field.properties === 'number'){
            return `<div class="${tamano}">
            <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-400">${field.name.toUpperCase()}</label>
                          <InputNumber 
                            v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}"
                            locale="en-US"
                            :minFractionDigits="2" 
                            highlightOnFocus
                            class="form-input w-full"
                             placeholder="0.00" 
                             :inputStyle="{width:'3rem'}"
                            />
                    </div>`;
        }else{
        return `<div class="${tamano}">
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <input type="${field.properties}" class="form-input ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${field.name}" name="crear${field.name}" id="${field.name}" />
                </div>`;
        }



            }else if(field.frontType === 'textarea' || field.frontType === 'tablajson'){
        return `<div class="${tamano}">
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
                   <Textarea id="crear${field.name}" rows="3" class="form-textarea w-full ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${capitalizeFirstLetter(field.name)}"></textarea>
                </div>`;
            }else if(field.frontType === 'select'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `'${option.trim()}'`) 
                .join(','); 

        return `<div class="${tamano}">
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <Dropdown editable v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" :options="[${formattedOptions}]" placeholder="Seleccione ${field.name}" class="w-full" />
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
                    <label for="${field.name}">${field.name.toUpperCase()}</label>

              <Dropdown v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" :options="[${formattedOptions2}]" placeholder="Seleccione ${field.name}" class="w-full" />
            </div>`;


/*                    <select v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" ${field.attributes}  class="w-full form-select ${field.classes}">
                    ${formattedOptions}
                    </select>*/


            }else if(field.frontType === 'datepicker'){
        return `<div class="${tamano}">
                    <label class="font-bold block mb-2" for="${field.name}">${field.name.toUpperCase()}</label>
                   <DatePicker  v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" showButtonBar fluid />
            </div>`;
            }else if(field.frontType === 'timepicker'){
        return `<div class="${tamano}">
                    <label class="font-bold block mb-2" for="${field.name}">${field.name.toUpperCase()}</label>
                   <DatePicker  v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" timeOnly fluid />
            </div>`;
            }else if(field.frontType === 'checkbox'){
        return `<div class="${tamano}">
                <label class="inline-flex">'. "\n";
               <input type="checkbox" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-checkbox ${field.classes}"  />
               <span>${field.name.toUpperCase()}</span>
              </label>
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
                <label for="${field.name}">${field.name.toUpperCase()}</label>
                <InputText type="${field.properties}" ${field.attributes} class="form-input w-full ${field.classes}" v-model="datoscampos.${field.name}" name="${field.name}" placeholder="${field.name}" id="actualizar${field.name}" />
            </div>`;
        }else if(field.properties === 'number'){
            return `<div class="${tamano}">
            <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-400">${field.name.toUpperCase()}</label>
                          <InputNumber 
                            v-model="datoscampos.${field.name}"
                            locale="en-US"
                            :minFractionDigits="2" 
                            highlightOnFocus
                            class="form-input w-full"
                             placeholder="0.00" 
                             :inputStyle="{width:'3rem'}"
                            />
                    </div>`;
        }else{
    return `<div class="${tamano}">
                <label for="${field.name}">${field.name.toUpperCase()}</label>
                <input type="${field.properties}" ${field.attributes} class="form-input ${field.classes}" v-model="datoscampos.${field.name}" name="${field.name}" placeholder="${field.name}" id="actualizar${field.name}" />
            </div>`;
        }



        }else if(field.frontType === 'textarea' || field.frontType === 'tablajson'){
        return `<div class="${tamano}">
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
                   <Textarea id="actualizar${field.name}" ${field.attributes} v-model="datoscampos.${field.name}" name="${field.name}" rows="3" class="form-textarea w-full ${field.classes}" placeholder="Enter ${capitalizeFirstLetter(field.name)}"></textarea>
                </div>`;
            }else if(field.frontType === 'select'){
             const formattedOptions = field.options
                .split(',') 
                .map(option => `'${option.trim()}'`) 
                .join(',');  

        return `<div class="${tamano}">
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
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
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <Dropdown editable v-model="datoscampos.${field.name}" :options="[${formattedOptions2}]" placeholder="Seleccione ${field.name}" class="w-full" />
            </div>`;
            }else if(field.frontType === 'datepicker'){
        return `<div class="${tamano}">
                    <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <flat-pickr v-model="datoscampos.${field.name}" ${field.attributes} class="form-input ${field.classes}" :config="basic"></flat-pickr>
            </div>`;
            }else if(field.frontType === 'checkbox'){
        return `<div class="${tamano}">
               <label class="inline-flex">'. "\n";
               <input type="checkbox" ${field.attributes} v-model="datoscampos.${field.name}" class="form-checkbox ${field.classes}"  />
               <span>${field.name.toUpperCase()}</span>
              </label>
              </div>`;
            }else if(field.frontType === 'radio'){
        return `<div class="${tamano}">
                <label class="inline-flex">'. "\n";
               <input type="radio" ${field.attributes} v-model="datoscampos.${field.name}" name="${field.name}" class="form-radio ${field.classes}" />
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
           <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                  </div>
                  </div>`;
             }else if(field.properties === 'append'){
          return `<div class="${tamano}">
                  <label for="${field.name}">${field.name.toUpperCase()}</label>
                    <div class="flex">
                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
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
    <form id="formularioCrear${capitalizeFirstLetter(datosJSON.tableName)}" action="" method="">
      <div class="grid grid-cols-12 gap-4 mt-4 text-blue-600">
      ${camposCrear}
      </div>
    </form>


`;
}
