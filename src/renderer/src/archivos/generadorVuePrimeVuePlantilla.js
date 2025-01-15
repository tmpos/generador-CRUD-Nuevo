export async function generadorVuePlantillaPrimeVue(datosJSON) {
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

    return `
<script setup>
import { ref, onMounted, nextTick, watchEffect,computed } from 'vue';
import axios from 'axios';
import { enviarDatosPorPost, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, lenguajeDataTable, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron, mensajetoast, crearTablaSiNoExiste, peticiones, lasMayusculas } from '../../funciones/funciones.js';
import Swal from 'sweetalert2'
import { useToast } from "primevue/usetoast";
const toast = useToast();
/************************************************************************/
const usuarioLocal = ref({})
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
const visible = ref(false);
const visiblecrear = ref(false);
/************************************************************************/
watchEffect(() => {
  /*if (visiblecrear.value) {
  }*/
});

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
usuarioLocal.value = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0] || {};
});
/************************************************************************/
 
/************************************************************************/
</script>
<template>
<main class="content-wrapper">
  <div class="mt-5">
<Card>
  <template #content>
    <div class="flex flex-col space-y-4">



    </div>
  </template>
</Card>

<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->

<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<Toast />
  </div>
</main>
</template>
<style scoped>
</style>
`;
}
