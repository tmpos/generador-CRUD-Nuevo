<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ltr:-ml-1 rtl:-mr-1 inline" :src="datosEmpresa.empresa.logo" alt="" />
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300">{{datosEmpresa.empresa.name}}</span>
                    </router-link>

                            <button type="button"
                               @click="store.toggleSidebar()"
                                class="block p-2 ltr:ml-2 rtl:mr-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <i class="p-1 pi pi-bars"></i>
                            </button>


                </div>
                <div class="ltr:mr-2 rtl:ml-2 hidden sm:block">
                    <ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                          <li>
                            <router-link to="/crud"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <i class="p-1 pi pi-cog"></i>
                            </router-link>

                        </li> 
                          <li>
                            <router-link to="/primevue"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <i class="p-1 pi pi-folder-plus"></i>
                            </router-link>

                        </li> 
                    </ul>
                </div>
                <div
                    class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
                        <form
                            class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
                            :class="{ '!block': search }" @submit.prevent="search = false">
                            <div class="relative">
<!--                                 <input type="text"
                                    class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                    placeholder="Search..." /> -->
<!--                                 <button type="button"
                                    class="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                    <i class=" m-auto pi pi-search mx-auto"></i>
                                </button> -->
<!--                                 <button type="button"
                                    class="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                                    @click="search = false">

                                    <i class="pi pi-times-circle"></i>
                                </button> -->
                            </div>
                        </form>

<!--                         <button type="button"
                            class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="search = !search">
                            <i class=" m-auto pi pi-search w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]"></i>
                        </button> -->
                    </div>
                    <div>
                        <a href="javascript:;" v-show="store.theme === 'light'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('dark')">
                            <i class="p-1 pi pi-sun"></i>
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'dark'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('system')">

                            <i class="p-1 pi pi-moon"></i>
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'system'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')">
                            <i class="p-1 pi pi-desktop"></i>
                        </a>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'"
                            offsetDistance="8">
                            <button type="button"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <img :src="currentFlag" alt="flag" class="w-5 h-5 object-cover rounded-full" />
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
                                                    :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                    alt="" />
                                                <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                                            </button>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>


                       
                    

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8"
                            class="!block">
                            <button type="button" class="relative group block">
                                <img class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    :src="datosEmpresa.usuario.imagen" alt="" />
                            </button>
                            <template #content="{ close }">
                                <ul
                                    class="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div class="flex items-center px-4 py-4">
                                            <div class="flex-none">
                                                <img class="rounded-md w-10 h-10 object-cover"
                                                    :src="datosEmpresa.usuario.imagen" alt="" />
                                            </div>
                                            <div class="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 class="text-base">
                                                    {{datosEmpresa.usuario.nombre}}
                                                </h4>
                                                <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                    href="javascript:;">{{datosEmpresa.usuario.email}}</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <router-link to="/profile" class="dark:hover:text-white" @click="close()">
                                            <i class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0 pi pi-bars"></i>
                                            Profile
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link to="/lock" class="dark:hover:text-white"
                                            @click="close()">
                                            <icon-lock-dots class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />

                                            Lock Screen
                                        </router-link>
                                    </li>
                                    <li class="border-t border-white-light dark:border-white-light/10">
                                        <a href="#" class="text-danger !py-3" @click="fnLogout">
                                            <icon-logout class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />

                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>
            </div>

            <!-- horizontal menu -->
            <ul
                class="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-[#0e1726] text-black dark:text-white-dark">

                <li v-for="menu in filteredMenu" :key="menu.id" class="menu nav-item relative">
                    <!-- Menú principal -->
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <!-- Icono del menú -->
                            <i :class="menu.icon" class="shrink-0 pi"></i>
                            <span class="px-2">{{ menu.label }}</span>
                        </div>
                        <div class="right_arrow">
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </a>

                    <!-- Submenú -->
                    <ul class="sub-menu ">
                        <li v-for="submenu in getSubmenu(menu.label)" :key="submenu.id">
                            <router-link :to="submenu.link">
                                {{ submenu.label }}
                            </router-link>
                        </li>
                    </ul>
                </li>


            </ul>
        </div>
    </header>
</template>

<script lang="ts" setup>
// @ts-nocheck
    import { ref, onMounted, computed, reactive, watch,watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';

    import appSetting from '@/app-setting';

    import { useRoute,useRouter } from 'vue-router';
    import { useAppStore,useDatosEmpresa } from '@/stores/index';
    import { useAuthStore } from '@/stores/auth';
    const datosEmpresa = useDatosEmpresa();
    import { enviarDatosPorPost, eliminarDatos, obtenerIdsSeleccionados, borrarTodoslosDatos, nfecha, arrayToObjetoFromTabla, peticionesFetch, encryptarPassword, envioElectron,toast, crearTablaSiNoExiste, peticiones,peticionImagen,peticionImagenUsuarios,generarCodigoUnico, lasMayusculas } from '../../funciones/funciones.js';



    const store = useAppStore();
    const route = useRoute();
    const router = useRouter();
    const search = ref(false);

    // multi language
    const i18n = reactive(useI18n());
    const changeLanguage = (item: any) => {
        i18n.locale = item.code;
        appSetting.toggleLanguage(item);
    };
    const currentFlag = computed(() => {
        return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
    });
/********************************************************/
const link = ref('');
const api = ref('');
const token = ref('');
const patronTelefono = ref('');
const linkImpresora = ref('');
const patroncedula = ref('');
const tokenCifrado = ref('');
const tokenCorto = ref('');
const userRole = ref('');
/********************************************************/


    const notifications = ref([
        {
            id: 1,
            profile: 'user-profile.jpeg',
            message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
            time: '45 min ago',
        },
        {
            id: 2,
            profile: 'profile-34.jpeg',
            message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
            time: '9h Ago',
        },
        {
            id: 3,
            profile: 'profile-16.jpeg',
            message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
            time: '9h Ago',
        },
    ]);

    const messages = ref([
        {
            id: 1,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
            title: 'Congratulations!',
            message: 'Your OS has been updated.',
            time: '1hr',
        },
        {
            id: 2,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
            title: 'Did you know?',
            message: 'You can switch between artboards.',
            time: '2hr',
        },
        {
            id: 3,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
            title: 'Something went wrong!',
            message: 'Send Reposrt',
            time: '2days',
        },
        {
            id: 4,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
            title: 'Warning',
            message: 'Your password strength is low.',
            time: '5days',
        },
    ]);

/***************************************************************************/
const datosMenu = ref([])
/***************************************************************************/
const fetchMenuApp = async () => {
   try {
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
   datosMenu.value = response;
   } catch (error) {
   console.error('Error en la solicitud:', error.message);
   toast.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al cargar los datos.', life: 3000 });
   } finally {
   }
};
/***************************************************************************/

/***************************************************************************/
onMounted(async() => {
        setActiveDropdown();
const datosJSON = await envioElectron('datosarchivo');
link.value = datosJSON.VITE_LINKURL;
api.value = datosJSON.VITE_LINK_API;
token.value = datosJSON.VITE_TOKEN;
patronTelefono.value = datosJSON.VITE_PATRON_TELEFONO;
linkImpresora.value = datosJSON.VITE_IMPRESORA_LOCAL;
patroncedula.value = datosJSON.VITE_PATRON_CEDULA;

tokenCifrado.value = await encryptarPassword(token.value, 10);

const empresaLocalStorage = JSON.parse(window.localStorage.getItem('empresa'))

if(!empresaLocalStorage){
    router.push('/login')
}else{
const imagenEmpresa = await peticionImagen(link.value, api.value, 'company', empresaLocalStorage.imagen, tokenCifrado.value, 'full');
  empresaLocalStorage.imagen = link.value + '/vista/img/company/' + empresaLocalStorage.imagen + '/' + imagenEmpresa[0];

 const datosUsuarioLocal = JSON.parse(window.localStorage.getItem('usuarioLocal'))[0]
 const imagenUsuario =  await peticionImagenUsuarios(link.value,api.value,datosUsuarioLocal.imagen,tokenCifrado.value)
 datosUsuarioLocal.imagen = imagenUsuario
  datosEmpresa.setDatosEmpresa(empresaLocalStorage);
  datosEmpresa.setDatosUsuario(datosUsuarioLocal);

}
  console.log("datosEmpresa", datosEmpresa);

await fetchMenuApp()


  watchEffect(() => {
    if (datosEmpresa.usuario) {
      userRole.value = datosEmpresa.usuario.usuario;
    }
  });



    });
/********************************************************/
    const activeDropdown = ref(null);
/********************************************************/


const filteredMenu = computed(() => {
  return datosMenu.value.filter((menu) => {
    const permisos = JSON.parse(menu.permiso);
    const permiso = permisos.find((perm) => perm.nombre === userRole.value);
    return permiso?.activo === true && menu.tipo === 'MENU'; // Filtra solo elementos tipo 'MENU'
  });
});

// Función para obtener los submenús
const getSubmenu = (parentLabel) => {
  return datosMenu.value.filter(
    (submenu) => submenu.parent === parentLabel && submenu.tipo === 'SUBMENU'
  );
};


/********************************************************/
const fnLogout = ()=>{
localStorage.clear();
datosEmpresa.resetStore();
//useAuthStore.logout();
router.push('/login')
}
/********************************************************/

/********************************************************/
    watch(route, (to, from) => {
        setActiveDropdown();
    });

    const setActiveDropdown = () => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    };


/**********************************************************/


const showDropdown = (menuLabel) => {
  activeDropdown.value = menuLabel;
};

const hideDropdown = () => {
  activeDropdown.value = null;
};

/**********************************************************/
    const removeNotification = (value: number) => {
        notifications.value = notifications.value.filter((d) => d.id !== value);
    };

    const removeMessage = (value: number) => {
        messages.value = messages.value.filter((d) => d.id !== value);
    };
</script>
<style scoped>
    /* Estilos globales para scrollbars */



.sub-menu {
  display: none;
  position: absolute;
  z-index: 10;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.menu:hover .sub-menu {
  display: block;
}

.sub-menu {
  display: none;
  position: absolute;
  top: 100%; /* Posiciona el submenú justo debajo del menú */
  left: 0;
  z-index: 1000; /* Asegúrate de que el submenú esté por encima de otros elementos */
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: max-content; /* Ajusta el submenú al contenido */
}




</style>
