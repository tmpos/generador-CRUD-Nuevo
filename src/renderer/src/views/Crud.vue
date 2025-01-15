<template>
  <div class="wizard-container">
    <form-wizard @on-complete="generateFiles" color="#4361ee" class="circle">
      
      <!-- Step 1: Información del Servidor -->
      <tab-content title="Paso 1: Información del Servidor" customIcon='<i class="pi pi-server"></i>'>
        <fieldset class="border p-3 round mb-2">
          <legend class="float-none w-auto px-2">Servidor</legend>
          <div class="grid grid-cols-12 gap-4 mt-4 text-teal-700">

            <div class="form-group col-span-4">
              <label>Nombre de la Tabla</label>
              <input type="text" placeholder="Tabla" v-model="formData.tableName" class="form-input" />
            </div>
            <div class="form-group col-span-4">
              <label>Tipo de Tabla</label>
              <select v-model="formData.tableType" class="form-input">
                <option value="DataTable">Data Table</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <div class="form-group col-span-4">
              <label>Ícono</label>
              <input type="text" placeholder="icon-circle-empty" v-model="formData.icon" class="form-input" />
            </div>
            <div class="grid grid-cols-12 gap-4 col-span-12">
              <div class="col-span-3 flex items-center" v-for="(label, key) in buttonLabels" :key="key">
                <label class="w-12 h-6 relative">
                  <input type="checkbox" v-model="formData[key]" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" />
                  <span class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                </label>
                <span class="ml-2">{{ label }}</span>
              </div>
            </div>
            <div class="form-group col-span-12">
              <label>From API</label>

          <div class="flex">
            <input v-model="formData.apiUrl" type="text" placeholder="API URL" class="form-input ltr:rounded-r-none rtl:rounded-l-none" />
            <button type="button" @click="fnBuscarApi" class="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none">Buscar</button>
          </div>

            </div>
          </div>
        </fieldset>
      </tab-content>


      <!-- Step 3: Generar Campos -->
      <tab-content title="Paso 2: Generar Campos" customIcon='<i class="pi pi-table"></i>'>
        <fieldset class="border p-3 round mb-2">
          <legend class="float-none w-auto px-2">Generar Campos</legend>
          <div class="grid grid-cols-12 gap-4 mt-4 text-teal-700">
            <button @click.prevent="addField" class="btn btn-outline-primary">Agregar Campo</button>
            <button @click.prevent="addFieldFromJSONmodal = true" class="btn btn-outline-primary">Agregar Campo From JSON</button>
            <button @click.prevent="clearFields" class="btn btn-outline-primary">Borrar todo</button>
          </div>

          <div class="panel mt-4">
            <div class="font-semibold text-lg dark:text-white mb-5">Campos Drag and Drop</div>
            <draggable
              group="fields"
              :animation="200"
              class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-8 place-items-center"
              :move="onMove"
              @end="onDragEnd"
            >
              <template v-for="(field, index) in formData.fields" :key="field.name">
                <div
                  :class="['w-24 h-24 border border-gray-300 rounded-md shadow flex items-center justify-center font-semibold', field.name === 'ID' ? '' : 'cursor-pointer']"
                  @click="field.name !== 'ID' && editField(index)"
                >
                  {{ field.name }}
                </div>
              </template>
            </draggable>
          </div>
        </fieldset>
      </tab-content>

      <!-- Step 4: Modal o Página -->
      <tab-content title="Paso 3: Modal o Página" customIcon='<i class="pi pi-window-maximize"></i>'>
        <fieldset class="border p-3 round mb-2">
          <legend class="float-none w-auto px-2">Configuración de Modal</legend>
          <div class="grid grid-cols-12 gap-4 mt-4 text-teal-700">
            <!-- Main Options in 12-column Grid -->
            <div class="col-span-3 flex items-center">
              <label class="w-12 h-6 relative">
                <input type="checkbox" v-model="formData.useModal" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" />
                <span class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
              </label>
                <span class="ml-2">Usarás Modal?</span>
            </div>
            <div class="col-span-3 flex items-center">
              <label class="w-12 h-6 relative">
                <input type="checkbox" v-model="formData.useImage" @change="fnAgregaIMG" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" />
                <span class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
              </label>
                <span class="ml-2">Usarás Imagen?</span>
            </div>
            <div class="col-span-3 flex items-center">
              <label class="w-12 h-6 relative">
                <input type="checkbox" v-model="formData.useNodejs" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" />
                <span class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
              </label>
                <span class="ml-2">Para Vristo?</span>
            </div>
            <div class="col-span-3 flex items-center">
              <label class="w-12 h-6 relative">
                <input type="checkbox" v-model="formData.usePrime" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" />
                <span class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
              </label>
                <span class="ml-2">Para PrimeVue?</span>
            </div>


            <div class="col-span-12">
              <label class="font-bold">Permisos:</label>
              <div class="grid grid-cols-12 gap-4 mt-2">
                <div class="col-span-3 flex items-center" v-for="(label, key) in permissionLabels" :key="key">
                  <label class="w-12 h-6 relative">
                    <input type="checkbox" v-model="formData.permissions[key]" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" />
                    <span class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                  </label>
                  <span class="ml-2">{{ label }}</span>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </tab-content>

      <!-- Step 5: Generar Archivos -->
      <tab-content title="Paso 4: Generar Archivos" customIcon='<i class="pi pi-file"></i>'>
<fieldset class="border p-3 rounded mb-2">
  <legend class="px-2">Generar Archivos</legend>
  <div class="flex justify-between">
    <button @click.prevent="generateFiles" class="btn btn-generate">Generar</button>
    <button @click.prevent="generateFormulario" class="btn btn-generate">Solo Formulario VRISTO</button>
    <button @click.prevent="generateFormularioPrimeVue" class="btn btn-generate">Solo Formulario PRIMEVUE</button>
  </div>
</fieldset>

      </tab-content>
    </form-wizard>


    <TransitionRoot appear :show="showFieldModal" as="template">
    <Dialog as="div" @close="closeFieldModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-black/60" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center px-4 py-8">
          <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl text-black dark:text-white-dark animate__animated animate__slideInDown">
            <!-- Modal Header -->
            <div class="flex justify-between items-center p-4 border-b">
              <h5 class="text-lg font-bold">Propiedades de los Campos</h5>
              <button @click="closeFieldModal" class="text-gray-400 hover:text-gray-600">
                <i class="pi pi-times"></i>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 grid grid-cols-12 gap-4">
              <!-- Form Fields -->
              <div class="col-span-4">
                <label class="block mb-1 font-medium">Nombre del Campo</label>
                <input type="text" @blur="fnEliminarEspacios('name')" v-model="currentField.name" class="w-full form-input" placeholder="Nombre del Campo" />
              </div>

              <div class="col-span-4">
                <label class="block mb-1 font-medium">Tipo Campo Front</label>
                <select v-model="currentField.frontType" @change="fnCambioTipoFront" class="w-full form-select">
                  <option value="input">INPUT</option>
                  <option value="inputmask">INPUTMASK</option>
                  <option value="datepicker">DATE PICKER</option>
                  <option value="timepicker">TIME PICKER</option>
                  <option value="selectnormal">SELECT NORMAL</option>
                  <option value="select">SELECT CON BUSCADOR</option>
                  <option value="textarea">TEXTAREA</option>
                  <option value="tablajson">TABLA JSON</option>
                  <option value="inputgroup">INPUT GROUP</option>
                  <option value="checkbox">CHECKBOX</option>
                  <option value="toggle">TOGGLE</option>
                  <option value="radio">RADIO</option>
                  <option value="slider">SLIDER</option>
                </select>
              </div>

              <div class="col-span-4">
                <label class="block mb-1 font-medium">Asignación</label>
                <select v-model="currentField.assignment" @change="fnAsignacion" class="w-full form-select">
                  <option value="no">NO</option>
                   <option value="selectpicker">SELECT PICKER</option>
                  <option value="timepicker">TIMEPICKER</option>
                  <option value="verificaDuplicado">NO DUPLICADOS</option>
                  <option value="datamask">DATA-MASK</option>
                  <option value="decimales">DECIMALES</option>
                  <option value="mayusc">MAYUSCULAS</option>
                  <option value="verifica">VERIFICA</option>
                  <option value="igualar">IGUALAR CAMPO</option>
                  <option value="readonly">READONLY</option>
                  <option value="nopassword">NO PASSWORD</option>
                  <option value="soloNumero">SOLO NUMERO</option>
                  <option value="soloLetra">SOLO LETRA</option>
                </select>
              </div>

              <div class="col-span-3">
                <label class="block mb-1 font-medium">Propiedades</label>
                <select v-model="currentField.properties" class="w-full form-select">
                  <option v-for="option in currentFieldOptions.properties" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>


              <div class="col-span-5">
                <label class="block mb-1 font-medium">Clases</label>
                <input type="text" v-model="currentField.classes" class="w-full form-input" placeholder="Clases" />
              </div>

              <div class="col-span-4">
                <label class="block mb-1 font-medium">Atributos</label>
                <input type="text" v-model="currentField.attributes" class="w-full form-input" placeholder="Atributos" />
              </div>

              <fieldset class="col-span-12 border p-4 rounded">
                <legend class="font-bold">OPTIONS</legend>
                <div class="grid grid-cols-1">
                  <textarea id="actualizarother" v-if="currentField.frontType === 'select' || currentField.frontType === 'selectnormal'"  v-model="currentField.options" name="other" rows="3" class="form-textarea " placeholder="Options"></textarea>

               </div>
              </fieldset>



              <fieldset class="col-span-12 border p-4 rounded">
                <legend class="font-bold">TAILWINDS</legend>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block mb-1 font-medium">Tamaño XS</label>
                    <select v-model="currentField.sizeXS" @change="fnAsignarTamano('xs')" class="w-full form-select">
                      <option v-for="i in 12" :key="`col-span-${i}`" :value="`col-span-${i}`">col-span-{{ i }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block mb-1 font-medium">Tamaño SM</label>
                    <select v-model="currentField.sizeSM" @change="fnAsignarTamano('sm')" class="w-full form-select">
                      <option v-for="i in 12" :key="`sm:col-span-${i}`" :value="`sm:col-span-${i}`">sm:col-span-{{ i }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block mb-1 font-medium">Tamaño MD</label>
                    <select v-model="currentField.sizeMD" @change="fnAsignarTamano('md')" class="w-full form-select">
                      <option v-for="i in 12" :key="`md:col-span-${i}`" :value="`md:col-span-${i}`">md:col-span-{{ i }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block mb-1 font-medium">Tamaño LG</label>
                    <select v-model="currentField.sizeLG" @change="fnAsignarTamano('lg')" class="w-full form-select">
                      <option v-for="i in 12" :key="`lg:col-span-${i}`" :value="`lg:col-span-${i}`">lg:col-span-{{ i }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block mb-1 font-medium">Tamaño XL</label>
                    <select v-model="currentField.sizeXL" @change="fnAsignarTamano('xl')" class="w-full form-select">
                      <option v-for="i in 12" :key="`xl:col-span-${i}`" :value="`xl:col-span-${i}`">xl:col-span-{{ i }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block mb-1 font-medium">Tamaño 2XL</label>
                    <select v-model="currentField.size2XL" @change="fnAsignarTamano('2xl')" class="w-full form-select">
                      <option v-for="i in 12" :key="`2xl:col-span-${i}`" :value="`2xl:col-span-${i}`">2xl:col-span-{{ i }}</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <div class="col-span-6">
                <label class="block mb-1 font-medium">Tipo Campo en DB</label>
                <select v-model="currentField.dbType" class="w-full form-select">
                  <option value="int">INT</option>
                  <option value="text">TEXT</option>
                  <option value="varchar">VARCHAR</option>
                </select>
              </div>

              <div class="col-span-6">
                <label class="block mb-1 font-medium">Cant. Caracteres</label>
                <input type="number" v-model="currentField.characterLimit" class="w-full form-input" placeholder="255" />
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end items-center p-4 border-t">
              <button @click="fnEliminarCampo" class="btn btn-secondary mr-2">Eliminar</button>
              <button @click="closeFieldModal" class="btn btn-secondary mr-2">Cerrar</button>
              <button @click="saveFieldProperties" class="btn btn-primary">Salvar</button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

<!-- ========================================================================================= -->


<TransitionRoot appear :show="addFieldFromJSONmodal" as="template">
    <Dialog as="div" @close="addFieldFromJSONmodal = false" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <DialogOverlay class="fixed inset-0 bg-[black]/60" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-start justify-center px-4 py-8">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark max-w-xl">
              <button type="button" class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none" @click="addFieldFromJSONmodal = false">
                <i class="pi pi-times"></i>
              </button>
              <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">FromJSON</div>
              <div class="p-5">
                
                <form>
                    <div>
                      <label for="camposjson">CAMPOS -- OBJETO || ARRAY</label>
                      <textarea id="camposjson" v-model="camposModal" rows="6" class="form-textarea" placeholder="CAMPOS" ></textarea>
                  </div>
               </form>

                <div class="flex justify-end items-center mt-8">
                  <button type="button" @click="addFieldFromJSONmodal = false" class="btn btn-outline-danger">Discard</button>
                  <button type="button" @click="fnCamposModal" class="btn btn-primary ltr:ml-4 rtl:mr-4">Generar</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>




  </div>
</template>

<script lang="ts" setup>
  // @ts-nocheck
import { ref,reactive, watch,onMounted,watchEffect } from 'vue';
import { FormWizard, TabContent } from 'vue3-form-wizard';
import 'vue3-form-wizard/dist/style.css';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import { VueDraggableNext as draggable } from 'vue-draggable-next';

import {
  enviarDatosPorPost,
  eliminarDatos,
  obtenerIdsSeleccionados,
  borrarTodoslosDatos,
  lenguajeDataTable,
  nfecha,
  encryptarPassword,
  generarCodigoUnico,
  arrayToObjetoFromTabla,
  peticionesFetch,
  envioElectron,
  mensajetoast,
  toast,
  crearTablaSiNoExiste,
  peticiones,
  lasMayusculas,
} from "../funciones/funciones.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
/*********************************************************************/
const link = ref('');
const api = ref('');
const token = ref('');
const patronTelefono = ref('');
const linkImpresora = ref('');
const patroncedula = ref('');
const tokenCifrado = ref('');

/*********************************************************************/
const addFieldFromJSONmodal = ref(false)
const camposModal = ref('')
/*********************************************************************/
const camposGenerar = (campos)=>{
  for(let campo of campos){
    formData.value.fields.push({ name: campo.nombre, visible: true });
  }
}
/*********************************************************************/
const fnCamposModal = () => {
  try {
    let camposN;

    // Verificar si el string contiene comas
    if (camposModal.value.includes(',')) {
       camposN = camposModal.value.split(',').map(item => item.trim().replace(/['"]+/g, '').replace(/:+/g, '').replace(/\n+/g, '').replace(/\s+/g, '').replace(/[{}\[\]]/g, ''));
    } else {
       camposN = JSON.parse(camposModal.value);
    }


    const tipoCampos = typeof camposN;
 
    // Generar campos según el tipo de la estructura
    if (tipoCampos === 'object' && !Array.isArray(camposN)) {
      // Si es un objeto, tomar las propiedades
      const campos = Object.keys(camposN).map(key => ({
        nombre: key.replace(/['"]+/g, '').replace(/:+/g, '').replace(/\n+/g, '').replace(/\s+/g, '').replace(/[{}\[\]]/g, ''), // Eliminar comillas simples o dobles, dos puntos, saltos de línea, espacios en blanco y caracteres especiales
        valor: camposN[key]
      }));
      console.log("Campos del objeto:", campos);
    } else if (Array.isArray(camposN)) {
      if (camposN.length > 0 && typeof camposN[0] === 'object') {
        // Si es un array de objetos, tomar los nombres de los campos
        const campos = camposN.map(item => ({
          nombre: item.nombre.replace(/['"]+/g, '').replace(/:+/g, '').replace(/\n+/g, '').replace(/\s+/g, '').replace(/[{}\[\]]/g, ''), // Eliminar comillas simples o dobles, dos puntos, saltos de línea, espacios en blanco y caracteres especiales
          valor: item.valor
        }));
        console.log("Campos del array de objetos:", campos);
      } else {
        // Si es un array plano, tomar los valores directamente
        const campos = camposN.map(item => ({
          nombre: item.replace(/['"]+/g, '').replace(/:+/g, '').replace(/\n+/g, '').replace(/\s+/g, '').replace(/[{}\[\]]/g, ''), // Eliminar comillas simples o dobles, dos puntos, saltos de línea, espacios en blanco y caracteres especiales
          valor: item
        }));
        camposGenerar(campos)
      }
    } else {
      console.error("El tipo de datos no es soportado");
    }
  } catch (error) {
    console.error("Error al parsear JSON:", error);
  }
};


/*********************************************************************/

const formData = ref({
  tableName: 'prueba',
  apiUrl: '',
  tableType: 'DataTable',
  icon: '',
  newButton: true,
  updateButton: true,
  deleteButton: true,
  deleteAllButton: true,
  excelButton: true,
  pdfButton: true,
  selectionButton: true,
  fields: [{ name: 'ID', visible: true }, { name: 'New Field', visible: true }],
  useModal: true,
  useImage: false,
  useNodejs: true,
  permissions: {
    administrator: true,
    support: true,
    restricted: false,
    other: false,
  },
});



onMounted(async() => {

const datosJSON = await envioElectron('datosarchivo');
link.value = datosJSON.VITE_LINKURL;
api.value = datosJSON.VITE_LINK_API;
token.value = datosJSON.VITE_TOKEN;
patronTelefono.value = datosJSON.VITE_PATRON_TELEFONO;
linkImpresora.value = datosJSON.VITE_IMPRESORA_LOCAL;
patroncedula.value = datosJSON.VITE_PATRON_CEDULA;

tokenCifrado.value = await encryptarPassword(token.value, 10);

  const savedData = localStorage.getItem('formData');
  if (savedData) {
    formData.value = JSON.parse(savedData);
  }
});


watch(
  () => formData.value,
  (newData) => {
    localStorage.setItem('formData', JSON.stringify(newData));
  },
  { deep: true }
);

function clearLocalStorage() {
  localStorage.removeItem('formData');
  formData.value = {
    tableName: 'prueba',
    apiUrl: '',
    tableType: 'DataTable',
    icon: '',
    newButton: true,
    updateButton: true,
    deleteButton: true,
    deleteAllButton: true,
    fields: [{ name: 'ID', visible: true }, { name: 'New Field', visible: true }],
    useModal: true,
    useImage: false,
    useNodejs: true,
    permissions: {
      administrator: true,
      support: true,
      restricted: false,
      other: false,
    },
  };
}


const fnAgregaIMG = () => {
  const imagenFieldIndex = formData.value.fields.findIndex(field => field.name === 'imagen');

  if (formData.value.useImage) {
    if (imagenFieldIndex === -1) {
      formData.value.fields.push({ name: 'imagen', visible: true });
    }
  } else {
    if (imagenFieldIndex !== -1) {
      formData.value.fields.splice(imagenFieldIndex, 1);
    }
  }
};

/**************************************************************/
const fnEliminarCampo = ()=>{
  const findFieldIndex = formData.value.fields.findIndex(field => field.name === currentField.value.name);
      if (findFieldIndex !== -1) {
      formData.value.fields.splice(findFieldIndex, 1);
      closeFieldModal()
    }

}
/**************************************************************/

const buttonLabels = { newButton: 'Botón Nuevo', updateButton: 'Botón Actualizar', deleteButton: 'Botón Borrar', deleteAllButton: 'Botón Borrar Todo',selectionButton: 'Botón Borrar Selección',excelButton: 'Botón Excel',pdfButton: 'Botón PDF' };
const permissionLabels = { administrator: 'Administrador', support: 'Soporte', restricted: 'Restringido', other: 'Otro' };

const showFieldModal = ref(false);
const currentField = ref({ name: '', frontType: 'input', assignment: '', properties: 'text', classes: '', attributes: '', sizeXS: 'col-span-12', sizeSM: 'sm:col-span-12', sizeMD: 'md:col-span-12', sizeLG: 'lg:col-span-12', sizeXL: 'xl:col-span-12', size2XL: '2xl:col-span-12', dbType: 'TEXT',options:'', characterLimit: 255 });
let currentFieldIndex = ref(null);

function openFieldModal() {
  showFieldModal.value = true;
}

function closeFieldModal() {
  showFieldModal.value = false;
}

function saveFieldProperties() {
  if (currentFieldIndex.value !== null) {
    Object.assign(formData.value.fields[currentFieldIndex.value], currentField.value);
    closeFieldModal();
  }
}

function editField(index) {
  if (formData.value.fields[index].name !== 'ID') {
    currentFieldIndex.value = index;
    Object.assign(currentField.value, formData.value.fields[index]);
    showFieldModal.value = true;
  }
}

function clearFields() {
  formData.value.fields = formData.value.fields.filter(field => field.name === 'ID');
}

function addField() {
  const newField = { name: `Field ${formData.value.fields.length}`, visible: true };
  formData.value.fields.push(newField);
  const newIndex = formData.value.fields.length - 1; 
  editField(newIndex);
}


function onMove(event) {
  const draggedItem = event.draggedContext.element;
  const relatedItem = event.relatedContext.element;

  // Validar que el campo 'ID' no se pueda mover
  if (draggedItem.name === 'ID' || relatedItem?.name === 'ID') {
    return false;
  }

  return true; 
}




function updateFieldOrder(newOrder) {
  formData.value.fields = newOrder;
  // Actualizar el localStorage después del reordenamiento
  localStorage.setItem('formData', JSON.stringify(formData.value));
}


function onDragEnd(event) {
  try {
    // Obtener el contenedor con el nuevo orden
    const container = event.to;

    // Obtener los nombres de los campos en el nuevo orden
    const newOrderNames = Array.from(container.children).map((child) => {
      return child.textContent.trim(); // Extraer el texto dentro del div
    });

    // Reorganizar `formData.fields` basado en los nombres
    const newOrder = newOrderNames.map(name => {
      return formData.value.fields.find(field => field.name === name);
    });

    // Actualizar `formData.fields` con el nuevo orden
    formData.value.fields = [...newOrder];

    // Guardar en localStorage
    localStorage.setItem('formData', JSON.stringify(formData.value));
  } catch (error) {
    console.error("Error al procesar el nuevo orden desde el DOM:", error);
  }
}








function toggleField(index) {
  formData.value.fields[index].visible = !formData.value.fields[index].visible;
}


const fnEliminarEspacios = (campo) => {
  // Elimina espacios y convierte a minúsculas en el campo actual
  currentField.value[campo] = currentField.value[campo]?.replace(/\s+/g, '').toLowerCase();
};



// Agrega un objeto reactive que almacenará las opciones para currentField.properties
const currentFieldOptions = ref({
  properties: [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'password', label: 'Password' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Tel' },
    { value: 'file', label: 'File' },
    { value: 'date', label: 'Date' },
    { value: 'hidden', label: 'Hidden' }
  ]
});

// Modifica la función fnCambioTipoFront para actualizar las opciones de currentField.properties
function fnCambioTipoFront() {
  if (currentField.value.frontType === 'inputgroup') {
    currentField.value.properties = ''; // Reinicia el valor seleccionado
    currentFieldOptions.value.properties = [
      { value: 'prepend', label: 'Prepend' },
      { value: 'append', label: 'Append' },
      { value: 'both', label: 'Both' }
    ];
  } else {
    currentField.value.properties = ''; // Reinicia el valor seleccionado
    currentFieldOptions.value.properties = [
      { value: 'text', label: 'Text' },
      { value: 'number', label: 'Number' },
      { value: 'password', label: 'Password' },
      { value: 'email', label: 'Email' },
      { value: 'tel', label: 'Tel' },
      { value: 'file', label: 'File' },
      { value: 'date', label: 'Date' },
      { value: 'hidden', label: 'Hidden' }
    ];
  }
}





function generarCampos(){
    const campos = formData.value.fields;
}


async function generateFiles() {
  try {
    // Generar los campos (si la función está implementada)
    await generarCampos();

    const jsonData = formData.value;

    // Enviar los datos al backend usando Electron
    const envio = await window.electron.ipcRenderer.invoke('datosjson', JSON.stringify(jsonData));
    console.log("envio", envio);

    if (envio.success) {
      toast.add({
        severity: 'success',
        summary: 'OK',
        detail: 'CRUD generado correctamente',
        life: 3000,
      });
    } else {
      toast.add({
        severity: 'danger',
        summary: 'Error',
        detail: 'Error al Generar el CRUD',
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error al generar archivos:", error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un error al generar los archivos. Verifica la consola para más detalles.',
      life: 3000,
    });
  }
}


const generateFormulario = async()=>{
    try {
    // Generar los campos (si la función está implementada)
    await generarCampos();

    const jsonData = formData.value;

    // Enviar los datos al backend usando Electron
    const envio = await window.electron.ipcRenderer.invoke('formularioVristo', JSON.stringify(jsonData));

    if (envio.success) {
      toast.add({
        severity: 'success',
        summary: 'OK',
        detail: 'FOMRULARIO generado correctamente',
        life: 3000,
      });

      console.log("envio.formulario", envio.formulario);
  await Swal.fire({
    title: "Generated Modal Code",
    html: `
      <textarea 
        readonly 
        style="width: 100%; height: 200px; border: 1px solid #ccc; border-radius: 5px; padding: 10px; font-family: monospace;"
      >${envio.formulario}</textarea>
    `,
    showCloseButton: true,
    confirmButtonText: "Copy to Clipboard",
    didOpen: () => {
      const textarea = document.querySelector("textarea");
      if (textarea) textarea.select(); // Automatically select the code
    },
  }).then((result) => {
    if (result.isConfirmed) {
      navigator.clipboard.writeText(envio.formulario).then(() => {
        Swal.fire("Copied!", "The modal code has been copied to your clipboard.", "success");
      });
    }
  });



    } else {
      toast.add({
        severity: 'danger',
        summary: 'Error',
        detail: 'Error al Generar el CRUD',
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error al generar archivos:", error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un error al generar los archivos. Verifica la consola para más detalles.',
      life: 3000,
    });
  }
}

/*************************************************************************/
const generateFormularioPrimeVue = async()=>{
    try {
    // Generar los campos (si la función está implementada)
    await generarCampos();

    const jsonData = formData.value;
    const envio = await window.electron.ipcRenderer.invoke('formularioPrimeVue', JSON.stringify(jsonData));

    if (envio.success) {
      toast.add({
        severity: 'success',
        summary: 'OK',
        detail: 'FOMRULARIO generado correctamente',
        life: 3000,
      });

      console.log("envio.formulario", envio.formulario);
  await Swal.fire({
    title: "Generated Modal Code",
    html: `
      <textarea 
        readonly 
        style="width: 100%; height: 200px; border: 1px solid #ccc; border-radius: 5px; padding: 10px; font-family: monospace;"
      >${envio.formulario}</textarea>
    `,
    showCloseButton: true,
    confirmButtonText: "Copy to Clipboard",
    didOpen: () => {
      const textarea = document.querySelector("textarea");
      if (textarea) textarea.select(); // Automatically select the code
    },
  }).then((result) => {
    if (result.isConfirmed) {
      navigator.clipboard.writeText(envio.formulario).then(() => {
        Swal.fire("Copied!", "The modal code has been copied to your clipboard.", "success");
      });
    }
  });



    } else {
      toast.add({
        severity: 'danger',
        summary: 'Error',
        detail: 'Error al Generar el CRUD',
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error al generar archivos:", error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un error al generar los archivos. Verifica la consola para más detalles.',
      life: 3000,
    });
  }
}
/*************************************************************************/


const fnBuscarApi = async () => {
  try {
    const url = formData.value.apiUrl;

    // Validar URL
    if (!url) {
      console.error("La URL de la API está vacía.");
      alert("Por favor, ingresa una URL válida para la API.");
      return;
    }

    // Realizar la solicitud
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenCifrado.value}`, // Asegúrate de que tokenCifrado esté definido y sea válido
      },
    });

    if (!response.ok) {
      console.error(`Error al consultar la API: ${response.status} ${response.statusText}`);
      alert(`Error al consultar la API: ${response.statusText}`);
      return;
    }

    // Procesar los datos
    const data = await response.json();

    // Limpiar los campos existentes
    clearFields();

    // Filtrar campos y agregarlos
    data.forEach((campo) => {
      if (!['id', 'created_at', 'updated_at','imagen'].includes(campo)) {
        formData.value.fields.push({ name: campo, frontType: 'input', assignment: '', properties: 'text', classes: '', attributes: '', sizeXS: 'col-12', sizeSM: 'col-sm-12', sizeMD: 'col-md-12', sizeLG: 'col-lg-12', sizeXL: 'col-xl-12', dbType: 'TEXT', characterLimit: 255 });
      }
    });

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Datos obtenidos y campos generados correctamente',
      life: 3000,
    });
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    alert("Ocurrió un error al realizar la petición. Verifica la consola para más detalles.");
  }
};



const fnAsignacion = ()=>{
  const asig = currentField.value.assignment;
  let asisgnacionN = '';
  if(asig === 'mayusc'){
     asisgnacionN = 'v-mayuscula';
  }else if(asig === 'readonly'){
    asisgnacionN = 'readonly';
  }else if(asig === 'soloNumero'){
    asisgnacionN = 'v-solonumeros';
  }else if(asig === 'decimales'){
    asisgnacionN = 'v-decimales v-numeroFocusinOut';
  }else if(asig === 'datamask'){
    asisgnacionN = 'v-maska="patronTelefono"';
  }
  currentField.value.attributes = currentField.value.attributes + ' '+asisgnacionN
}
//decimales
//soloNumero
const fnAsignarTamano = (tam)=>{
/*  currentField.sizeXS
sizeSM
sizeMD
sizeLG
sizeXL
size2XL*/

if(tam === 'xs'){
  currentField.value.sizeSM = 'sm:'+currentField.value.sizeXS;
  currentField.value.sizeMD = 'md:'+currentField.value.sizeXS;
  currentField.value.sizeLG = 'lg:'+currentField.value.sizeXS;
  currentField.value.sizeXL = 'xl:'+currentField.value.sizeXS;
  currentField.value.size2XL = '2xl:'+currentField.value.sizeXS;
}else if(tam === 'sm'){
  const tamN = currentField.value.sizeSM.split(':')
  currentField.value.sizeMD = 'md:'+tamN[1];
  currentField.value.sizeLG = 'lg:'+tamN[1];
  currentField.value.sizeXL = 'xl:'+tamN[1];
  currentField.value.size2XL = '2xl:'+tamN[1];
}else if(tam === 'md'){
  const tamN = currentField.value.sizeMD.split(':')
  currentField.value.sizeLG = 'lg:'+tamN[1];
  currentField.value.sizeXL = 'xl:'+tamN[1];
  currentField.value.size2XL = '2xl:'+tamN[1];
}else if(tam === 'lg'){
  const tamN = currentField.value.sizeLG.split(':')
  currentField.value.sizeXL = 'xl:'+tamN[1];
  currentField.value.size2XL = '2xl:'+tamN[1];
}else if(tam === 'xl'){
  const tamN = currentField.value.sizeXL.split(':')
  currentField.value.size2XL = '2xl:'+tamN[1];
}



}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin: 0 5px;
}
</style>
