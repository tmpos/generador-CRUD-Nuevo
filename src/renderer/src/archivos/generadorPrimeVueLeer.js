export async function generadorPrimeVueLeer(datosJSON) {
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


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
    router.push({ path: \`/editar${datosJSON.tableName}/\${event.data.id}\` });
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
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
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
router.push({ path: \`/editar${datosJSON.tableName}/\${currentRowData.value.id}\` });
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
 router.push({ path: \`/editar${datosJSON.tableName}/\${event.data.id}\` });

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
      <Button as="router-link" icon="pi pi-plus-circle" to="/crear${datosJSON.tableName}" class="ms-1" />
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
<Toast />
  </div>
</main>
</template>
<style scoped>
</style>

`;
}
