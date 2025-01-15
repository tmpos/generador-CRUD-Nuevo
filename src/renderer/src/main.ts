// @ts-nocheck
import { createApp } from 'vue';
import App from '@/App.vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';



const app = createApp(App);


// pinia store
import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

//app.use(PrimeVue,{ theme: 'none' });


import router from '@/router';
app.use(router);

// main app css
import '@/assets/css/app.css';

/*import '@/assets/styles.scss';
import '@/assets/base.css';*/

//import '@/assets/tailwind.css';



import 'primeicons/primeicons.css'
// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
app.use(PerfectScrollbar);

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();
app.use(head);

// set default settings
import appSetting from '@/app-setting';
appSetting.init();

//vue-i18n
import i18n from '@/i18n';
app.use(i18n);

// popper
import Popper from 'vue3-popper';
app.component('Popper', Popper);

import vue3JsonExcel from 'vue3-json-excel';
app.use(vue3JsonExcel);



/*****************************************************************************/
app.directive('mayuscula', {
  beforeMount(el) {
    el.oninput = function(e) {
      if (e.target.value != e.target.value.toUpperCase()) {
        e.target.value = e.target.value.toUpperCase();
        el.dispatchEvent(new Event('input'));
      }
    }
  }
});
/*****************************************************************************/
app.directive('primeramayusc', {
  beforeMount(el) {
    el.oninput = function(e) {
      if (e.target.value.length > 0) {
        let value = e.target.value;
        let newValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        if (value !== newValue) {
          e.target.value = newValue;
          el.dispatchEvent(new Event('input'));
        }
      }
    }
  }
});

/*****************************************************************************/
app.directive('datepicker', {
  beforeMount(el, binding) {
    $(el).datepicker({
      format: 'dd/mm/yyyy',
      language: 'es',
      multidate: false,
      todayHighlight: true,
      autoclose: true
    });
  },
  unmounted(el) {
    // Destruir el datepicker cuando el elemento sea desmontado
    $(el).datepicker('destroy');
  }
});
/*****************************************************************************/
app.directive('minuscula', {
  beforeMount(el) {
    el.oninput = function(e) {
      if (e.target.value != e.target.value.toLowerCase()) {
        e.target.value = e.target.value.toLowerCase();
        el.dispatchEvent(new Event('input'));
      }
    }
  }
});
/*****************************************************************************/
app.directive('mayusculablur', {
  beforeMount(el) {
    el.addEventListener('blur', () => {
      el.value = el.value.toUpperCase();
      el.dispatchEvent(new Event('input')); // Sincroniza el v-model
    });
  },
});
/*****************************************************************************/
app.directive('solonumeros', {
  beforeMount(el) {
    el.oninput = function(e) {
      let value = e.target.value.replace(/[^\d.-]/g, '');
      if (e.target.value !== value) {
        e.target.value = value;
        el.dispatchEvent(new Event('input'));
      }
    }
  }
});
/*****************************************************************************/
app.directive('sololetras', {
  beforeMount(el) {
    el.oninput = function(e) {
      let value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      if (e.target.value !== value) {
        e.target.value = value;
        el.dispatchEvent(new Event('input'));
      }
    }
  }
});
/*****************************************************************************/
app.directive('decimales', {
  beforeMount(el) {
    el.onblur = function() {
      let valor = Number(el.value);
      let decimal = valor.toFixed(2);
      el.value = decimal;
    }
  }
});

/*****************************************************************************/
app.directive('numeroFocusinOut', {
  beforeMount(el) {
    el.addEventListener('focusin', () => {
      if (el.value === '0' || el.value === '0.00') {
        el.value = '';  // Limpiar el campo para permitir nueva entrada
      } else {
        el.select();  // Seleccionar el contenido si no es 0 o 0.00
      }
    });

    el.addEventListener('focusout', () => {
      // Asegurarse de que el campo está realmente vacío antes de establecer el valor a '0'
      if (el.value.trim() === '') {
        //el.value = '0.00';  // Si el campo está vacío, establecer el valor a '0'
      } else if (!isNaN(el.value) && parseFloat(el.value) !== 0) {
        el.value = parseFloat(el.value).toString();
      }
    });
  }
});



app.mount('#app');
