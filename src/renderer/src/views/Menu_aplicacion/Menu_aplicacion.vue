<script setup lang="ts">
      // @ts-nocheck
import { ref, onMounted, nextTick, watchEffect,computed,reactive,watch } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useMeta } from '@/composables/use-meta';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
import axios from 'axios';
import { enviarDatosPorPost, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron,toast, crearTablaSiNoExiste, peticiones,generarCodigoUnico, lasMayusculas,generarTablaFromStringJSON } from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
import { vMaska } from "maska/vue"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
/************************************************************************/
useMeta({ title: 'Menu Aplicaciones' });
const search = ref('');
/************************************************************************/
const usuarioLocal = ref({})
/************************************************************************/
const excelColumns = () => {
    return {
        Label: 'label',
        Orden: 'orden',
        Icon: 'icon',
        Tipo: 'tipo',
        Parent: 'parent',
        Link: 'link',
        Permiso: 'permiso',
        Usuario: 'usuario',
    };
};
/************************************************************************/
const cols = ref([
    { field: 'options', title: 'Options' },
    { field: 'label', title: 'Label' },
    { field: 'orden', title: 'Orden' },
    { field: 'icon', title: 'Icon' },
    { field: 'tipo', title: 'Tipo' },
    { field: 'parent', title: 'Parent' },
    { field: 'link', title: 'Link' },

]) || [];
/************************************************************************/
 const excelItems = () => {
     return datosTabla.value;
 };
const camposArray = ["label","orden","icon","tipo","parent","link","permiso","usuario"];
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
/************************************************************************/
const visible = ref(false);
const visiblecrear = ref(false);
const value = ref(null);
const id = ref(null);
const datoscampos = ref({
  permiso: [],  // Esto es un array de permisos
  permisoString: '' // Esto es la representación en JSON del campo 'permiso'
});
const data = ref([]);
const searchQuery = ref('');
const Menu_aplicacionEditar = ref(null);
/************************************************************************/
const datoscamposMenu_aplicacion = ref({
  permiso: [
    { nombre: 'Soporte', permiso: 'FULL', activo: true },
    { nombre: 'Administrador', permiso: 'LIMITED', activo: false },
    { nombre: 'Vendedor', permiso: 'LIMITED', activo: false },
    { nombre: 'Cajero', permiso: 'LIMITED', activo: false },
    { nombre: 'Tecnico', permiso: 'LIMITED', activo: false }
  ],
  permisoString: '' // Esto es la representación en JSON del campo 'permiso'
});
/************************************************************************/
async function limpiarCamposCrear() {
datoscamposMenu_aplicacion.value = {}
await campos();
}
/************************************************************************/
watchEffect(() => {
  if (visiblecrear.value) {

      datoscamposMenu_aplicacion.value.permiso = `[{"nombre":"Soporte","permiso":"FULL","activo":true},{"nombre":"Administrador","permiso":"LIMITED","activo":false},{"nombre":"Vendedor","permiso":"LIMITED","activo":false},{"nombre":"Cajero","permiso":"LIMITED","activo":false},{"nombre":"Tecnico","permiso":"LIMITED","activo":false}]`;
  }

/*  if (datoscamposMenu_aplicacion.value.permiso.length) {
    datoscamposMenu_aplicacion.value.permisoString = JSON.stringify(datoscamposMenu_aplicacion.value.permiso);
  }

  if (datoscampos.value.permiso.length) {
    datoscampos.value.permisoString = JSON.stringify(datoscampos.value.permiso);
    console.log("datoscampos.value.permisoString", datoscampos.value.permisoString);
  }*/


});
/************************************************************************/
const popoverVisible = ref<Record<number, boolean>>({});
const togglePopover = (id: number) => {
  popoverVisible.value = { ...popoverVisible.value, [id]: !popoverVisible.value[id] };
};
const dropdownOptions = ['Editar', 'Borrar'];
const selectOption = async(row: any, option: string) => {
  popoverVisible.value[row.id] = false;
  const datos = row;
  if(option === 'Editar'){
arrayIMG.value = await peticiones(link.value+api.value+'/peticionimagenes',{"origen":`${'../vista/img/menu_aplicacion/'+datos.imagen}`},'POST',tokenCifrado.value)
additionalData.value = {ruta: '../vista/img/menu_aplicacion/'+datos.imagen};
//datoscampos.value = datos;
datoscampos.value.permiso = JSON.parse(datos.permiso)
console.log("datoscampos.value.permiso", datoscampos.value.permiso);
visible.value = true;

//const permisos = reactive(datos.permiso);



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
                        const datosFactura = await peticionesFetch(`${link.value}${api.value}`, `borrarporcampo/menu_aplicacion`, { campo: 'id', valor: datos.id }, tokenCifrado.value, 'POST');
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
function abrirModalEditar(datos) {
  datoscampos.value = { ...datos };

  // Si el campo permiso es una cadena, conviértelo en un array de objetos
  if (typeof datoscampos.value.permiso === 'string') {
    datoscampos.value.permiso = JSON.parse(datos.permiso);
  }
}
/************************************************************************/
const handleToggleChange = (index) => {
  const permiso = permisos[index];
  console.log(`Permiso de ${permiso.nombre} cambiado a: ${permiso.activo ? 'Activo' : 'Inactivo'}`);
  
  // Aquí podrías realizar acciones adicionales como actualizar el estado en la API
  //actualizarPermiso(permiso);
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
     `${link.value}${api.value}`,
     'datosarray/menu_aplicacion',
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
  const campos = await arrayToObjetoFromTabla(link.value+api.value, tokenCifrado.value, 'menu_aplicacion', true,camposArray,'usuario');
  datoscamposMenu_aplicacion.value = campos;
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
await crearTablaSiNoExiste(link.value, api.value, 'menu_aplicacion', camposArray, tokenCifrado.value,toast);
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
                    const envioDatos = await borrarTodoslosDatos(link.value + api.value + '/borrartodo', 'menu_aplicacion', tokenCifrado.value);
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
  const url = link.value+api.value+"/actualizarcampos/menu_aplicacion";
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
  const url = link.value+api.value+"/insertar/menu_aplicacion";
  if (datoscamposMenu_aplicacion.value.hasOwnProperty('created_at')) {
    datoscamposMenu_aplicacion.value.created_at = nfecha('timestamp');
    datoscamposMenu_aplicacion.value.updated_at = nfecha('timestamp');
  }
  const envioDatos = await enviarDatosPorPost(url, datoscamposMenu_aplicacion.value, tokenCifrado.value);
  if (envioDatos[0] == 'ok') {
    await fetchAndSetupData();
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
                                const envioDatos = await eliminarDatos(`${link.value}${api.value}/borrar/menu_aplicacion`, id, tokenCifrado.value);
                            } catch (error) {
                                console.error(`Error al eliminar datos para ID: ${id}`, error);
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
const filteredMenu_aplicacion = computed(() => {
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
const onRowSelect = async(event) => {
visible.value = true;
datoscampos.value = event;
};
/************************************************************************/
function onSelectionChange(selection) {
  selectedItems.value = selection;
}
/************************************************************************/
const getImageSrc = (imagen) => {
  return `${link.value}/vista/img/menu_aplicacion/${datoscampos.value.imagen}/${imagen}`;
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
/************************************************************************/
const generatePDF = () => {
  const doc = new jsPDF();
  const columns = [
    { header: 'Label', dataKey: 'label' },
    { header: 'Orden', dataKey: 'orden' },
    { header: 'Icon', dataKey: 'icon' },
    { header: 'Tipo', dataKey: 'tipo' },
    { header: 'Parent', dataKey: 'parent' },
    { header: 'Link', dataKey: 'link' },
    { header: 'Permiso', dataKey: 'permiso' },
    { header: 'Usuario', dataKey: 'usuario' },
  ];
  const rows = datosTabla.value.map((item) => ({
  'label': item.label,
  'orden': item.orden,
  'icon': item.icon,
  'tipo': item.tipo,
  'parent': item.parent,
  'link': item.link,
  'permiso': item.permiso,
  'usuario': item.usuario,
  }));
  doc.autoTable({
    head: [columns.map(col => col.header)],
    body: rows.map(row => columns.map(col => row[col.dataKey])),
  });
  doc.save('tabla_menu_aplicacion.pdf');
};
/************************************************************************/
const visibleEditar = ref(false)
/************************************************************************/
const fnEdit = (index) => {
const objetoJSON = JSON.parse(datoscampos.value.permiso)
const permiso = objetoJSON[index]

  Swal.fire({
    title: `Editar Permiso de ${permiso.nombre}`,
    input: 'checkbox',
    inputValue: permiso.activo ? 1 : 0, 
    inputPlaceholder: `Activar ${permiso.nombre}`,
    confirmButtonText: 'Guardar',
    showCancelButton: true,
    inputValidator: (value) => {
      return null;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevoEstado = result.value === 1;  
      permiso.activo = nuevoEstado;
            objetoJSON[index] = permiso;
      datoscampos.value.permiso = JSON.stringify(objetoJSON);
    }
  });
};



const fnDel = (index)=>{
    console.log("index", index);

}
/************************************************************************/
const parentOptions = ref([]);
/************************************************************************/
const esSubmenu = computed(() => datoscamposMenu_aplicacion.value.tipo === 'SUBMENU');

watch(
  () => datoscamposMenu_aplicacion.value.tipo,
  (nuevoTipo) => {
    if (nuevoTipo === 'SUBMENU') {
      parentOptions.value = datosTabla.value.filter((item) => item.tipo === 'MENU').map(item => item.label);
      console.log("parentOptions.value", parentOptions.value);
      datoscamposMenu_aplicacion.value.parent = ''; 
    } else {
      datoscamposMenu_aplicacion.value.parent = '';
    }
  }
);
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
        <button type="button" class="btn btn-primary btn-sm m-1" @click="visiblecrear = true">
            <i class="pi pi-plus-circle p-1 text-lg"></i>
        </button>
        <button type="button" class="btn btn-primary btn-sm m-1" @click="borrarSeleccionados">
            <i class="pi pi-trash p-1 text-lg"></i>
        </button>
        <vue3-json-excel class="btn btn-primary btn-sm m-1 cursor-pointer" name="table.xls" :fields="excelColumns()" :json-data="excelItems()">
            <i class="pi pi-file-excel p-1 text-lg"></i>
           </vue3-json-excel>
        <button type="button" class="btn btn-primary btn-sm m-1" @click="generatePDF">
           <i class="pi pi-file-pdf p-1 text-lg"></i>
        </button>
    </div>
    <div class="text-right">
        <input v-model="search" type="text" class="form-input " placeholder="Buscar..." />
    </div>
</div>
<div class="datatable">
    <!-- :totalRows="rows?.length" -->
<vue3-datatable
    :rows="datosTabla"
    :columns="cols"
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
              <i v-if="option === 'Editar'" class="pi pi-pencil text-blue-500"></i>
              <i v-if="option === 'Borrar'" class="pi pi-trash text-red-500"></i>
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </vue3-datatable>
            </div>      </div>
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
               <svg> ... </svg>
             </button>
             <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Modal Agregar Menu_aplicacion</div>
             <div class="p-5">
  <fieldset class="border p-3 round mb-2">
    <legend class="float-none w-auto px-2">Menu_aplicacion</legend>
     <form id="formularioActualizarMenu_aplicacion" action="" method="">
         <div  style="margin-top: 15px;color: #34AAB2;" class="grid grid-cols-1 gap-4">
<div class="form-group " hidden>
<label for="id-Actualizador">ID</label>
<input type="input" v-model="datoscampos.id" name="id"  class="form-input" id="id-Actualizador" readonly placeholder="id"  maxlength="11">
</div>
<div class="form-group col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12" >
<label for="label-Actualizador">LABEL</label>
<input type="input" v-model="datoscampos.label" name="label"  class="form-input" id="label-Actualizador"  placeholder="label"  maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4" >
<label for="orden-Actualizador">ORDEN</label>
<input type="input" v-model="datoscampos.orden" name="orden"  class="form-input" id="orden-Actualizador"  placeholder="orden"  maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4" >
<label for="icon-Actualizador">ICON</label>
<input type="input" v-model="datoscampos.icon" name="icon"  class="form-input" id="icon-Actualizador"  placeholder="icon"  maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4" >
<label for="tipo-Actualizador">TIPO</label>
<multiselect
 v-model="datoscamposMenu_aplicacion.tipo"
  :options="['MENU','SUBMENU']"
  class="custom-multiselect"
  :searchable="true"
  placeholder="Tipo"
  selected-label=""
  select-label=""
  deselect-label=""
></multiselect>
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6" >
<label for="parent-Actualizador">PARENT</label>
<input type="input" v-model="datoscampos.parent" name="parent"  class="form-input" id="parent-Actualizador"  placeholder="parent"  maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6" >
<label for="link-Actualizador">LINK</label>
<input type="input" v-model="datoscampos.link" name="link"  class="form-input" id="link-Actualizador"  placeholder="link"  maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-12" >
<label for="tipo-Actualizador">PERMISOS</label>
<div class="table-responsive">
  <div v-html="generarTablaFromStringJSON(datoscampos.permiso,true,fnEdit,fnDel)" class="border p-3 rounded mb-2"></div>
</div>
</div>
<div class="form-group " hidden>
<label for="created_at-Actualizador">CREATED_AT</label>
<input type="input" v-model="datoscampos.created_at" name="created_at"  class="form-input" id="created_at-Actualizador"  placeholder="created_at"  maxlength="">
</div>
<div class="form-group " hidden>
<label for="updated_at-Actualizador">UPDATED_AT</label>
<input type="input" v-model="datoscampos.updated_at" name="updated_at"  class="form-input" id="updated_at-Actualizador"  placeholder="updated_at"  maxlength="">
</div>
<div class="form-group " hidden>
<label for="usuario-Actualizador">USUARIO</label>
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
               <svg> ... </svg>
             </button>
             <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Modal Agregar Menu_aplicacion</div>
             <div class="p-5">
  <fieldset class="border p-3 round mb-2">
    <legend class="float-none w-auto px-2">Menu_aplicacion</legend>
     <form id="formularioActualizarMenu_aplicacion" action="" method="">
         <div  style="margin-top: 15px;color: #34AAB2;" class="grid grid-cols-1 gap-4">
<div class="form-group col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12" >
<label for="labelAgregarDatos">LABEL</label>
<input type="input" v-model="datoscamposMenu_aplicacion.label" name="label"  class="form-input " id="labelAgregarDatos"   placeholder="label" maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4" >
<label for="ordenAgregarDatos">ORDEN</label>
<input type="input" v-model="datoscamposMenu_aplicacion.orden" name="orden"  class="form-input " id="ordenAgregarDatos"   placeholder="orden" maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4" >
<label for="iconAgregarDatos">ICON</label>
<input type="input" v-model="datoscamposMenu_aplicacion.icon" name="icon"  class="form-input " id="iconAgregarDatos"   placeholder="icon" maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4" >
<label for="tipoAgregarDatos">TIPO</label>
<multiselect
 v-model="datoscamposMenu_aplicacion.tipo"
  :options="['MENU','SUBMENU']"
  class="custom-multiselect"
  :searchable="false"
  placeholder="Tipo"
  selected-label=""
  select-label=""
  deselect-label=""
></multiselect>
</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6" >
<label for="parentAgregarDatos">PARENT</label>
<!-- <input type="input" v-model="datoscamposMenu_aplicacion.parent" name="parent"  class="form-input " id="parentAgregarDatos"   placeholder="parent" maxlength="250"> -->


<div v-if="esSubmenu">
                        <multiselect
                          v-model="datoscamposMenu_aplicacion.parent"
                          :options="parentOptions"
                          class="custom-multiselect"
                          :searchable="true"
                          placeholder="Seleccionar Parent"
                          selected-label=""
                          select-label=""
                          deselect-label=""
                        />
                      </div>
                      <div v-else>
                        <input
                          type="input"
                          v-model="datoscamposMenu_aplicacion.parent"
                          name="parent"
                          class="form-input"
                          id="parentAgregarDatos"
                          placeholder="parent"
                          maxlength="250"
                          disabled
                        />
                      </div>


</div>
<div class="form-group col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6" >
<label for="linkAgregarDatos">LINK</label>
<input type="input" v-model="datoscamposMenu_aplicacion.link" name="link"  class="form-input " id="linkAgregarDatos"   placeholder="link" maxlength="250">
</div>
<div class="form-group col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12" >
<label for="permisoAgregarDatos">PERMISO</label>

<div class="table-responsive">
  <div v-html="generarTablaFromStringJSON(datoscamposMenu_aplicacion.permiso)" class="border p-3 rounded mb-2"></div>
</div>

</div>
<div class="form-group " hidden>
<label for="created_atAgregarDatos">CREATED_AT</label>
<input type="input" v-model="datoscamposMenu_aplicacion.created_at" name="created_at"  class="form-input " id="created_atAgregarDatos"   placeholder="created_at" maxlength="">
</div>
<div class="form-group " hidden>
<label for="updated_atAgregarDatos">UPDATED_AT</label>
<input type="input" v-model="datoscamposMenu_aplicacion.updated_at" name="updated_at"  class="form-input " id="updated_atAgregarDatos"   placeholder="updated_at" maxlength="">
</div>
<div class="form-group " hidden>
<label for="usuarioAgregarDatos">USUARIO</label>
<input type="input" v-model="datoscamposMenu_aplicacion.usuario" name="usuario"  class="form-input " id="usuarioAgregarDatos"   placeholder="usuario" maxlength="250">
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
<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
</template>
<style scoped>
</style>
