<template>
                            <form class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-[#0e1726]">
                                <h6 class="text-lg font-bold mb-5">General Information</h6>
                                <div class="flex flex-col sm:flex-row">
                                    <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                        <img :src="datosEmpresa.usuario.imagen" alt="" class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                    </div>
                                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label for="name">Full Name</label>
                                            <input id="name" type="text" v-model="datosEmpresa.usuario.nombre" placeholder="Jimmy Turner" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="profession">Email</label>
                                            <input id="profession" type="text" v-model="datosUsuario.email" placeholder="Email" class="form-input" />
                                        </div>

                                        <div>
                                            <label for="location">Location</label>
                                            <input id="location" type="text" placeholder="Location" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="phone">Phone</label>
                                            <input id="phone" type="text" placeholder="+1 (530) 555-12121" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="email">Email</label>
                                            <input id="email" type="email" placeholder="Jimmy@gmail.com" class="form-input" />
                                        </div>
                                        <div>
                                            <label for="web">Website</label>
                                            <input id="web" type="text" placeholder="Enter URL" class="form-input" />
                                        </div>
                                        <div>
                                            <label class="inline-flex cursor-pointer">
                                                <input type="checkbox" class="form-checkbox" />
                                                <span class="text-white-dark relative checked:bg-none">Make this my default address</span>
                                            </label>
                                        </div>
                                        <div class="sm:col-span-2 mt-3">
                                            <button type="button" class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
</template>
<script setup lang="ts">
      // @ts-nocheck
import { ref, onMounted, nextTick, watchEffect,computed } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useMeta } from '@/composables/use-meta';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
import axios from 'axios';
import { enviarDatosPorPost, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron,toast, crearTablaSiNoExiste, peticiones,generarCodigoUnico, lasMayusculas } from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
import { vMaska } from "maska/vue"
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { useAppStore,useDatosEmpresa } from '@/stores/index';
    import { useAuthStore } from '@/stores/auth';
    const datosEmpresa = useDatosEmpresa();
useMeta({ title: 'Profile' });

/********************************************************************/
const link = ref('');
const api = ref('');
const token = ref('');
const patronTelefono = ref('');
const linkImpresora = ref('');
const patroncedula = ref('');
const tokenCifrado = ref('');
const tokenCorto = ref('');
const uploadUrl = ref('');
const datosUsuario = ref({});
/********************************************************************/
const fetchDataUsuario = async () => {
const response = await peticionesFetch(`${link.value}${api.value}`,`datoscampo/usuarios/email/${datosEmpresa.usuario.email}`,{},tokenCifrado.value,'GET');
    const jsonData = response;
    console.log(response)
    datosUsuario.value = jsonData;
};
/********************************************************************/


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
uploadUrl.value = link.value+api.value+"/subirunaimagen";
await fetchDataUsuario();

});



</script>
<style scoped>
</style>