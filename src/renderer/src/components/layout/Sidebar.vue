<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ml-[5px] flex-none" :src="datosEmpresa.empresa.logo" alt="" />
                        <span
                            class="text-xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{{nombreRecortado(datosEmpresa.empresa.name)}}</span>
                    </router-link>
                    <a href="javascript:;"
                        class="collapse-icon p-2 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
                        @click="store.toggleSidebar()">

                        <i
                            class="m-auto pi pi-angle-double-right transition-transform duration-300 hover:rotate-180"></i>


                    </a>
                </div>
                <perfect-scrollbar :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }" class="h-[calc(100vh-80px)] relative">
                    <ul class="relative font-semibold space-y-0.5 p-4 py-0">

                        <li class="menu nav-item">

                            <router-link to="/" class="nav-link group">
                                <div class="flex items-center">
                                    <i class="group-hover:!text-primary shrink-0 pi pi-home"></i>
                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                        $t('home')
                                        }}</span>
                                </div>
                            </router-link>


                        </li>


                        <h2
                            class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>{{ $t('apps') }}</span>
                        </h2>


                        <li v-for="menu in filteredMenu" :key="menu.id" class="menu nav-item">
                            <!-- Menú principal -->
                            <button type="button" class="nav-link group w-full"
                                :class="{ active: activeDropdown === menu.label }" @click="toggleDropdown(menu.label)">
                                <div class="flex items-center">
                                    <!-- Icono -->
                                    <i :class="menu.icon" class="group-hover:!text-primary shrink-0 pi"></i>
                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        {{ $t(menu.label) }}
                                    </span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== menu.label }">
                                    <i class="group-hover:!text-primary shrink-0 pi pi-angle-down"></i>
                                </div>
                            </button>

                            <!-- Submenú -->
                            <vue-collapsible :isOpen="activeDropdown === menu.label">
                                <ul v-if="menu.tipo === 'MENU'" class="sub-menu text-gray-500">
                                    <li v-for="submenu in getSubmenu(menu.label)" :key="submenu.id">
                                        <router-link :to="submenu.link" @click="toggleMobileMenu">
                                            {{ $t(submenu.label) }}
                                        </router-link>
                                    </li>

                              </ul>
                            </vue-collapsible>
                        </li>



                        <h2
                            class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>{{ $t('supports') }}</span>
                        </h2>

                        <li class="menu nav-item">
                            <router-link to="/documentation"  class="nav-link group">
                                <div class="flex items-center">
                                    <i class="group-hover:!text-primary shrink-0 pi pi-book"></i>

                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                        $t('documentation')
                                        }}</span>
                                </div>
                            </router-link>
                        </li>



                        <li class="menu nav-item">
                            <a href="#" @click="fnLogout" class="nav-link group">
                                <div class="flex items-center">
                                    <i class="group-hover:!text-primary shrink-0 pi pi-sign-out"></i>
                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                        $t('logout')
                                        }}</span>
                                </div>
                            </a>
                        </li>

                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
    import { ref, onMounted,computed,watchEffect } from 'vue';
    import { useAppStore,useDatosEmpresa } from '@/stores/index';
    import { useAuthStore } from '@/stores/auth';
    const datosEmpresa = useDatosEmpresa();
    import { useRoute,useRouter } from 'vue-router';
    import VueCollapsible from 'vue-height-collapsible/vue3';
    const router = useRouter();

    import { enviarDatosPorPost, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron,toast, crearTablaSiNoExiste, peticiones,peticionImagen,peticionImagenUsuarios,generarCodigoUnico, lasMayusculas } from '../../funciones/funciones.js';


    const store = useAppStore();
    const activeDropdown: any = ref('');
    const subActive: any = ref('');

 const menuItems = ref([])

const link = ref('');
const api = ref('');
const token = ref('');
const patronTelefono = ref('');
const linkImpresora = ref('');
const patroncedula = ref('');
const tokenCifrado = ref('');
const tokenCorto = ref('');
const userRole = ref('');

/*****************************************************************/
const fetchMenuApp = async () => {
  try {
    const response = await peticionesFetch(
      `${link.value}${api.value}`,
      'datosarray/menu_aplicacion',
      {},
      tokenCifrado.value,
      'GET'
    );
    if (response.error) {
      throw new Error('Error al obtener los datos del menú');
    }
    menuItems.value = response;
  } catch (error) {
    console.error('Error en la solicitud del menú:', error.message);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al cargar el menú.', life: 3000 });
    menuItems.value = []; // o algún fallback
  }
};
/*****************************************************************/


onMounted(async() => {
const datosJSON = await envioElectron('datosarchivo');
link.value = datosJSON.VITE_LINKURL;
api.value = datosJSON.VITE_LINK_API;
token.value = datosJSON.VITE_TOKEN;
patronTelefono.value = datosJSON.VITE_PATRON_TELEFONO;
linkImpresora.value = datosJSON.VITE_IMPRESORA_LOCAL;
patroncedula.value = datosJSON.VITE_PATRON_CEDULA;

tokenCifrado.value = await encryptarPassword(token.value, 10);

//menuItems.value = JSON.parse(localStorage.getItem('menuApp')) || []

await fetchMenuApp()

        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }


  watchEffect(() => {
    if (datosEmpresa.usuario) {
      userRole.value = datosEmpresa.usuario.usuario;
    }
  });

});



const filteredMenu = computed(() => {
  return menuItems.value.filter((menu) => {
    const permisos = JSON.parse(menu.permiso);
    const permiso = permisos.find((perm) => perm.nombre === userRole.value);
    return permiso?.permiso.read === true && menu.tipo === 'MENU'; 
  });
});


// Obtener los submenús de un menú principal
const getSubmenu = (parentLabel) => {
  return menuItems.value.filter((submenu) => {
    const permisos = JSON.parse(submenu.permiso);
    const permiso = permisos.find((perm) => perm.nombre === userRole.value);
    return permiso?.permiso.read === true && submenu.parent === parentLabel && submenu.tipo === 'SUBMENU';
  });
};

// Manejar el dropdown activo
const toggleDropdown = (menuLabel) => {
  if (activeDropdown.value === menuLabel) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = menuLabel;
  }
};


const fnLogout = ()=>{
localStorage.clear();
datosEmpresa.resetStore();
//useAuthStore.logout();
router.push('/login')
}


    const toggleMobileMenu = () => {
        if (window.innerWidth < 1024) {
            store.toggleSidebar();
        }
    };


/***********************************************************/
    const nombreRecortado = (nombre) => {
   if(nombre){ 
  const maxLength = 10; // Define el límite de caracteres para mostrar el nombre completo

  // Si el nombre es corto, mostrar el nombre completo
  if (nombre.length <= maxLength) {
    return nombre;
  }

  // Si el nombre es largo, tomar la primera letra de cada palabra
  const iniciales = nombre.split(' ').map(word => word[0].toUpperCase()).join('');
  return iniciales;
}
};
/***********************************************************/

</script>
<style>
/* Personalizar los scrollbars con el color primary */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) #f1f1f1; /* Usamos la variable CSS */
}

*::-webkit-scrollbar {
  background-color: var(--color-primary); /* Usamos la variable CSS */
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: #f0f0f0; /* Color del track del scrollbar */
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  background: var(--color-primary); /* Color del thumb del scrollbar */
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
  background: #f1f1f1; /* Color del thumb cuando está en hover */
}



</style>
