<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#060818] px-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md text-center">
      <img src="/assets/images/auth/locked.svg" alt="Locked" class="mx-auto mb-4 w-16 h-16" />
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Pantalla Bloqueada</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Ingrese su contraseña para desbloquear
      </p>

      <!-- Password Input Field -->
      <form @submit.prevent="handleUnlock">
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:border-primary"
          />
        </div>
        
        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <!-- Unlock Button -->
        <button
          type="submit"
          class="w-full btn btn-primary mt-4"
        >
          Desbloquear
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
    // @ts-nocheck
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

    import { useAppStore,useDatosEmpresa } from '@/stores/index';
    const datosEmpresa = useDatosEmpresa();

    import { enviarDatosPorPost, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron,toast, crearTablaSiNoExiste, peticiones,peticionImagen,peticionImagenUsuarios,generarCodigoUnico, lasMayusculas } from '../../funciones/funciones.js';

const router = useRouter();
useMeta({ title: 'Pantalla Bloqueada' });

const password = ref('');
const errorMessage = ref('');

/*********************************************************************/
const link = ref('');
const api = ref('');
const token = ref('');
const patronTelefono = ref('');
const linkImpresora = ref('');
const patroncedula = ref('');
const tokenCifrado = ref('');

/*********************************************************************/

onMounted(async() => {
  
const datosJSON = await envioElectron('datosarchivo');
link.value = datosJSON.VITE_LINKURL;
api.value = datosJSON.VITE_LINK_API;
token.value = datosJSON.VITE_TOKEN;
patronTelefono.value = datosJSON.VITE_PATRON_TELEFONO;
linkImpresora.value = datosJSON.VITE_IMPRESORA_LOCAL;
patroncedula.value = datosJSON.VITE_PATRON_CEDULA;

tokenCifrado.value = await encryptarPassword(token.value, 10);



    });



// Mock function to validate the password (replace this with real authentication logic)

const handleUnlock = async () => {
  errorMessage.value = ''; // Reset error message

  try {

    const response = await peticiones(
      `${link.value}${api.value}/loginapi/usuarios`,
      {
        username: datosEmpresa.usuario.email,
        password: password.value,
        token: datosEmpresa.usuario.token,
      },
      "POST",
      tokenCifrado.value
    );


    if (Array.isArray(response)) {
      // Successful login scenario
      if (response.length > 1) {
        router.push({ name: 'Dashboard' });
      } 
      // Error in credentials
      else if (response[0] === "error") {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Correo o contraseña incorrectos.",
          life: 3000,
        });
        password.value = "";
      } 
      // Account blocked
      else if (response[0] === "bloqueo") {
        toast.add({
          severity: "error",
          summary: "Cuenta Bloqueada",
          detail: "Tu cuenta está bloqueada. Contacta al administrador.",
          life: 3000,
        });
        
        router.push("/bloqueo");
      }

  } 
  } catch (error) {
    errorMessage.value = 'Error al desbloquear. Inténtalo de nuevo más tarde.';
  }
};
</script>

<style scoped>
/* Custom styles */
</style>
