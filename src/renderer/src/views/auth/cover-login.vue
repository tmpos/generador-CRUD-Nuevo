<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="absolute inset-0 overflow-hidden">
      <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
    </div>
    <div
      class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16 overflow-hidden">
      <img src="/assets/images/auth/coming-soon-object1.png" alt="image"
        class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
      <img src="/assets/images/auth/coming-soon-object2.png" alt="image"
        class="absolute left-24 top-0 h-40 md:left-[30%]" />
      <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
      <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
      <div
        class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
        <div
          class="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
          <div
            class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20">
          </div>
          <div class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
            <router-link to="/" class="w-48 block lg:w-72 ms-12 text-center">
              <span class="text-white font-bold text-xl lg:text-6xl">{{ empresa.name }}</span>
            </router-link>

            <div class="mt-24 hidden w-full max-w-[430px] lg:block">
              <img src="/assets/images/auth/login.svg" alt="Cover Image" class="w-full" />
            </div>
          </div>
        </div>
        <div
          class="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px] overflow-hidden">
          <div class="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
            <router-link to="/" class="w-8 block lg:hidden">
              <img src="/assets/images/logo.svg" alt="Logo" class="mx-auto w-10" />
            </router-link>
            <div class="dropdown ms-auto w-max">
              <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
                <button type="button"
                  class="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black">
                  <div>
                    <img :src="currentFlag" alt="image" class="h-5 w-5 rounded-full object-cover" />
                  </div>
                  <div class="text-base font-bold uppercase">{{ store.locale }}</div>
                  <span class="shrink-0">
                    <icon-caret-down />
                  </span>
                </button>
                <template #content="{ close }">
                  <ul
                    class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                    <template v-for="item in store.languageList" :key="item.code">
                      <li>
                        <button type="button" class="w-full hover:text-primary"
                          :class="{ 'bg-primary/10 text-primary': i18n.locale === item.code }"
                          @click="changeLanguage(item), close()">
                          <img class="w-5 h-5 object-cover rounded-full"
                            :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`" alt="" />
                          <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                        </button>
                      </li>
                    </template>
                  </ul>
                </template>
              </Popper>
            </div>
          </div>
          <div class="w-full max-w-[440px] lg:mt-16">
            <div class="mb-10">
              <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in
              </h1>
              <p class="text-base font-bold leading-normal text-white-dark">Enter your email and password
                to login</p>
            </div>
            <form class="space-y-5 dark:text-white" @submit.prevent="onSubmit">
              <div>
                <label for="Email">Email</label>
                <div class="relative text-white-dark">
                  <input id="Email" v-model="email" type="email" placeholder="Enter Email"
                    class="form-input ps-10 placeholder:text-white-dark" />
                  <span class="absolute start-4 top-1/2 -translate-y-1/2">
                    <icon-mail :fill="true" />
                  </span>
                </div>
              </div>
              <div>
                <label for="Password">Password</label>
                <div class="relative text-white-dark">
                  <input id="Password" v-model="password" type="password" placeholder="Enter Password"
                    class="form-input ps-10 placeholder:text-white-dark" />
                  <span class="absolute start-4 top-1/2 -translate-y-1/2">
                    <icon-lock-dots :fill="true" />
                  </span>
                </div>
              </div>

              <button @click="onSubmit"
                class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                Sign in
              </button>
            </form>

            <div class="relative my-7 text-center md:mb-9">
              <span
                class="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>

            </div>

          </div>
          <p class="absolute bottom-6 w-full text-center dark:text-white">© {{ new Date().getFullYear()
            }}.TMPOS SRL All Rights
            Reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
    // @ts-nocheck
import { computed, reactive, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import appSetting from '@/app-setting';
import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from "vue-router";


const authStore = useAuthStore();

useMeta({ title: 'Login' });
const router = useRouter();
const store = useAppStore();
// multi language
const i18n = reactive(useI18n());
const changeLanguage = (item: any) => {
  i18n.locale = item.code;
  appSetting.toggleLanguage(item);
};
const currentFlag = computed(() => {
  return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
});

import { useDatosEmpresa } from '../../stores'
const datosEmpresa = useDatosEmpresa();
const empresa = ref({});
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
} from "../../funciones/funciones.js";
/*********************************************************************/
/*********************************************************************/
// const datosEmpresa = useDatosEmpresa();
const link = ref("");
const api = ref("");
const token = ref("");
const patronTelefono = ref("");
const linkImpresora = ref("");
const patroncedula = ref("");
const tokenCifrado = ref("");
const tokenCorto = ref("");
const idImpresa = ref("");
const config = ref(null);
const appName = ref("")
const version = ref("")
/*********************************************************************/

const email = ref("");
const password = ref("");
/*********************************************************************/
const loadConfig = async () => {
  try {
    const response = await fetch("/config.json");
    if (!response.ok) {
      throw new Error("Error al cargar la configuración");
    }
    const data = await response.json();
    config.value = data;
  } catch (error) {
    console.error("Error:", error);
  }
};
/*********************************************************************/
const datosEmpresaP = ref({})
const fndatosEmpresaP = async () => {
  datosEmpresaP.value = await peticiones(
    `${link.value}${api.value}/datoscampo/company/id/${idImpresa.value}`,
    {},
    "GET",
    tokenCifrado.value
  );
  window.localStorage.setItem("empresa", JSON.stringify(datosEmpresaP.value));
}
/*********************************************************************/
const onSubmit = async () => {
  if (!email.value || !password.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete el formulario', life: 3000 });
    return;
  }

  try {
    const tokenLocal = ref(generarCodigoUnico());
    const response = await peticiones(
      `${link.value}${api.value}/loginapi/usuarios`,
      {
        username: email.value,
        password: password.value,
        token: tokenLocal.value,
      },
      "POST",
      tokenCifrado.value
    );

    if (Array.isArray(response)) {
      // Successful login scenario
      if (response.length > 1) {
        handleSuccessfulLogin(response, tokenLocal.value);
      } 
      // Error in credentials
      else if (response[0] === "error") {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Correo o contraseña incorrectos.",
          life: 3000,
        });
        email.value = "";
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
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.",
      life: 3000,
    });
  }
};

const handleSuccessfulLogin = async (response, tokenLocalValue) => {
  window.localStorage.setItem(
    "usuarioLocal",
    JSON.stringify([
      {
        usuario: response[2],
        imagen: response[1],
        nombre: response[0],
        email: email.value,
        tokenaplicacion: token.value,
        token: tokenLocalValue,
        fecha: nfecha("fecha"),
      },
    ])
  );

  const user = { username: email.value };
  authStore.login(user);
  toast.add({
    severity: "success",
    summary: "Éxito",
    detail: "Inicio de sesión exitoso",
    life: 3000,
  });

  // Fetch additional configuration
  await fetchAdditionalConfig();

  router.push("/");
};

const fetchAdditionalConfig = async () => {
  const datosConfiguracion = await peticiones(
    `${link.value}${api.value}/datoscampo/configuracion/id/1`,
    {},
    "GET",
    tokenCifrado.value
  );
  const configuracionfactura = await peticiones(
    `${link.value}${api.value}/datoscampo/configuracionfactura/id/1`,
    {},
    "GET",
    tokenCifrado.value
  );
  const tablaDefault = await peticiones(
    `${link.value}${api.value}/datoscampo/tabladefault/id/1`,
    {},
    "GET",
    tokenCifrado.value
  );

  window.localStorage.setItem("configuracion", JSON.stringify(datosConfiguracion));
  window.localStorage.setItem("configuracionfactura", JSON.stringify(configuracionfactura));
  window.localStorage.setItem("datosDefault", JSON.stringify(tablaDefault));
};

/*********************************************************************/
onMounted(async () => {
  //await loadConfig();
  //const datosJSON = config.value;
  const datosJSON = await envioElectron('datosarchivo');
  link.value = datosJSON.VITE_LINKURL;
  api.value = datosJSON.VITE_LINK_API;
  token.value = datosJSON.VITE_TOKEN;
  patronTelefono.value = datosJSON.VITE_PATRON_TELEFONO;
  linkImpresora.value = datosJSON.VITE_IMPRESORA_LOCAL;
  patroncedula.value = datosJSON.VITE_PATRON_CEDULA;
  tokenCorto.value = datosJSON.VITE_TOKEN_CORTO;
  idImpresa.value = datosJSON.VITE_ID_EMPRESA;

  appName.value = datosJSON.VITE_NOMBRE_EMPRESA;
  version.value = datosJSON.VITE_VERSION_APP;

  tokenCifrado.value = await encryptarPassword(token.value, 10);

  await fndatosEmpresaP()

  empresa.value = JSON.parse(window.localStorage.getItem('empresa'))

 if(datosEmpresa.usuario.usuario && datosEmpresa.usuario.usuario ==='Soporte'){

email.value = datosEmpresa.usuario.email
password.value = 'soporte'
await onSubmit()
 }



});
/*********************************************************************/


</script>
