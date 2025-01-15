// @ts-nocheck
import { defineStore } from 'pinia';
import i18n from '@/i18n';
import appSetting from '@/app-setting';
import { verificaLocalStorage } from '../funciones/funciones.js';

// Store de la aplicación (useAppStore)
export const useAppStore = defineStore('app', {
    state: () => ({
        isDarkMode: false,
        mainLayout: 'app',
        theme: 'light',
        menu: 'vertical',
        layout: 'full',
        rtlClass: 'ltr',
        animation: '',
        navbar: 'navbar-sticky',
        locale: 'en',
        sidebar: false,
        languageList: [
            { code: 'en', name: 'English' },
            { code: 'es', name: 'Spanish' },
        ],
        isShowMainLoader: true,
        semidark: false,
    }),

    actions: {
        setMainLayout(payload: any = null) {
            this.mainLayout = payload; // app , auth
        },
        toggleTheme(payload: any = null) {
            payload = payload || this.theme; // light|dark|system
            localStorage.setItem('theme', payload);
            this.theme = payload;
            this.isDarkMode = payload === 'dark' || (payload === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

            if (this.isDarkMode) {
                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleMenu(payload: any = null) {
            payload = payload || this.menu; // vertical, collapsible-vertical, horizontal
            this.sidebar = false; // reset sidebar state
            localStorage.setItem('menu', payload);
            this.menu = payload;
        },
        toggleLayout(payload: any = null) {
            payload = payload || this.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            this.layout = payload;
        },
        toggleRTL(payload: any = null) {
            payload = payload || this.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            this.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', this.rtlClass || 'ltr');
        },
        toggleAnimation(payload: any = null) {
            payload = payload || this.animation; // animate__fadeIn, animate__fadeInDown, etc.
            localStorage.setItem('animation', payload.trim());
            this.animation = payload.trim();
            appSetting.changeAnimation();
        },
        toggleNavbar(payload: any = null) {
            payload = payload || this.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            this.navbar = payload;
        },
        toggleSemidark(payload: any = null) {
            payload = payload || false;
            localStorage.setItem('semidark', payload);
            this.semidark = payload;
        },
        toggleLocale(payload: any = null) {
            payload = payload || this.locale;
            i18n.global.locale.value = payload;
            localStorage.setItem('i18n_locale', payload);
            this.locale = payload;
            if (this.locale?.toLowerCase() === 'ae') {
                this.toggleRTL('rtl');
            } else {
                this.toggleRTL('ltr');
            }
        },
        toggleSidebar(state: boolean = false) {
            this.sidebar = !this.sidebar;
        },
        toggleMainLoader(state: boolean = false) {
            this.isShowMainLoader = true;
            setTimeout(() => {
                this.isShowMainLoader = false;
            }, 500);
        },
    },
    getters: {},
});

export const useDatosEmpresa = defineStore('datosEmpresa', {
        state: () => ({
        empresa: {},
        usuario: {} 
    }),
    
    getters: {
        empresaCompleta: (state) => {
            return state;
        },
        datosUsuario: (state) => {
            return state.usuario; 
        },
    },
    
    actions: {
        async inicializarDatosEmpresa(link) {
            const empresa = await verificaLocalStorage(link, 'empresa', false, 'empresa', 1);
            this.$patch(empresa);
        },
        setDatosEmpresa(nuevosDatos) {
            this.$patch({ empresa: nuevosDatos });
        },
        setDatosUsuario(nuevosDatosUsuario) {
            this.$patch({ usuario: nuevosDatosUsuario }); 
        },
        resetStore() {
            this.$reset();  
        },
    },


});
