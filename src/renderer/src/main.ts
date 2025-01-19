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
    let timeout = null;

    el.addEventListener('input', () => {
      clearTimeout(timeout); // Resetea el temporizador en cada tecla
      timeout = setTimeout(() => {
        el.value = el.value.toUpperCase(); // Convierte a mayúsculas
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
  }
});

/*****************************************************************************/
app.directive('primeramayusc', {
  beforeMount(el) {
    let timeout = null;

    el.addEventListener('input', () => {
      clearTimeout(timeout); // Reinicia el temporizador en cada tecla
      timeout = setTimeout(() => {
        el.value = el.value
          .toLowerCase() // Convierte todo a minúsculas primero
          .replace(/\b\w/g, letra => letra.toUpperCase()); // Capitaliza la primera letra de cada palabra
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
  }
});

/*****************************************************************************/
app.directive('minuscula', {
  beforeMount(el) {
    let timeout = null;

    el.addEventListener('input', () => {
      clearTimeout(timeout); // Resetea el temporizador en cada input
      timeout = setTimeout(() => {
        el.value = el.value.toLowerCase().replace(/\s+/g, ''); // Convierte a minúsculas y elimina espacios
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
  }
});

/*****************************************************************************/
app.directive('sin-espacios', {
  beforeMount(el) {
    let timeout = null;

    el.addEventListener('input', () => {
      clearTimeout(timeout); // Reinicia el temporizador en cada tecla
      timeout = setTimeout(() => {
        el.value = el.value.replace(/\s+/g, '_'); // Reemplaza espacios por _
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
  }
});
/*****************************************************************************/
app.directive('no-espacios', {
  beforeMount(el) {
    let timeout = null;

    el.addEventListener('input', () => {
      clearTimeout(timeout); // Reinicia el temporizador en cada tecla
      timeout = setTimeout(() => {
        el.value = el.value.replace(/\s+/g, ''); // Elimina los espacios
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
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
app.directive('solonumeros-demorado', {
  beforeMount(el) {
    let timeout = null;
    el.addEventListener('input', () => {
      clearTimeout(timeout); // Reinicia el temporizador en cada tecla
      timeout = setTimeout(() => {
        el.value = el.value.replace(/\D/g, ''); // Elimina cualquier cosa que no sea un número
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
  }
});

/*****************************************************************************/
app.directive('sololetras', {
  beforeMount(el) {
    let timeout = null;
    el.addEventListener('input', () => {
      clearTimeout(timeout); // Reinicia el temporizador en cada tecla
      timeout = setTimeout(() => {
        el.value = el.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Permite solo letras y espacios
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
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

app.directive('numero-decimal-demorado', {
  beforeMount(el) {
    let timeout = null;

    el.addEventListener('input', () => {
      clearTimeout(timeout); // Reinicia el temporizador en cada tecla
      timeout = setTimeout(() => {
        let num = parseFloat(el.value.replace(/[^0-9.]/g, '')); // Convierte a número y elimina caracteres inválidos
        if (!isNaN(num)) {
          el.value = num.toFixed(2); // Formatea a dos decimales
        } else {
          el.value = ''; // Si no es un número válido, deja el campo vacío
        }
        el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
      }, 500); // 500ms de espera antes de aplicar el cambio
    });
  }
});

/*****************************************************************************/
app.directive('focus-in-focus-out', {
  beforeMount(el) {
    // Evento cuando el input recibe el foco
    el.addEventListener('focus', () => {
      setTimeout(() => {
        el.select(); // Selecciona todo el contenido del input
      }, 0);
    });

    // Evento cuando el input pierde el foco
    el.addEventListener('blur', () => {
      let num = parseFloat(el.value.replace(/[^0-9.]/g, '')); // Convierte a número
      if (isNaN(num)) {
        num = 0.00; // Si el campo está vacío o tiene caracteres inválidos, asigna 0.00
      }
      el.value = num.toFixed(2); // Formatea a dos decimales
      el.dispatchEvent(new Event('input', { bubbles: true })); // Para actualizar v-model
    });
  }
});

/*****************************************************************************/
app.directive('only-alphanumeric', {
  beforeMount(el) {
    el.addEventListener('input', () => {
      el.value = el.value.replace(/[^a-zA-Z0-9]/g, '');
      el.dispatchEvent(new Event('input'));
    });
  }
});

/*****************************************************************************/
app.directive('max-length', {
  beforeMount(el, binding) {
    el.addEventListener('input', () => {
      if (el.value.length > binding.value) {
        el.value = el.value.slice(0, binding.value);
        el.dispatchEvent(new Event('input')); // Para actualizar v-model
      }
    });
  }
});

/*****************************************************************************/
app.directive('prevent-paste', {
  beforeMount(el) {
    el.addEventListener('paste', (event) => {
      event.preventDefault();
    });
  }
});

/*****************************************************************************/
app.directive('debounce', {
  beforeMount(el, binding) {
    let timeout = null;
    el.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (binding.value) binding.value(el.value); // Ejecuta la función enlazada con el valor actual
      }, binding.arg || 500); // Usa el valor del argumento como tiempo de espera
    });
  }
});

/*****************************************************************************/
app.directive('copy-on-click', {
  beforeMount(el) {
    el.addEventListener('click', () => {
      el.select();
      document.execCommand('copy');
    });
  }
});

/*****************************************************************************/
app.directive('enter-submit', {
  beforeMount(el, binding) {
    el.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita salto de línea en inputs tipo textarea
        if (binding.value) binding.value(); // Ejecuta la función enlazada
      }
    });
  }
});

/*****************************************************************************/
app.directive('auto-focus', {
  mounted(el) {
    el.focus();
  }
});

/*****************************************************************************/
app.directive('auto-uppercase', {
  beforeMount(el) {
    el.addEventListener('input', () => {
      el.value = el.value.toUpperCase();
      el.dispatchEvent(new Event('input'));
    });
  }
});

/*****************************************************************************/
app.directive('auto-lowercase', {
  beforeMount(el) {
    el.addEventListener('input', () => {
      el.value = el.value.toLowerCase();
      el.dispatchEvent(new Event('input'));
    });
  }
});

/*****************************************************************************/
app.directive('prevent-double-click', {
  beforeMount(el) {
    el.addEventListener('click', (event) => {
      el.disabled = true;
      setTimeout(() => {
        el.disabled = false;
      }, 2000); // Bloquea por 2 segundos
    });
  }
});

/*****************************************************************************/
app.directive('click-outside', {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(); // Llama a la función asociada
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
});

/*****************************************************************************/
app.directive('phone-format', {
  beforeMount(el) {
    el.addEventListener('input', () => {
      let numbers = el.value.replace(/\D/g, ''); // Elimina todo excepto números
      let formatted = numbers.replace(/^(\d{3})(\d{3})?(\d{4})?/, (match, p1, p2, p3) => {
        return p3 ? `(${p1}) ${p2}-${p3}` : p2 ? `(${p1}) ${p2}` : `(${p1}`;
      });
      el.value = formatted;
      el.dispatchEvent(new Event('input'));
    });
  }
});

/*****************************************************************************/
app.directive('credit-card-mask', {
  beforeMount(el) {
    el.addEventListener('input', () => {
      let numbers = el.value.replace(/\D/g, ''); // Solo deja números
      el.value = numbers.replace(/(\d{4})/g, '$1 ').trim(); // Agrupa en bloques de 4
      el.dispatchEvent(new Event('input'));
    });
  }
});

/*****************************************************************************/
app.directive('tooltip', {
  beforeMount(el, binding) {
    let tooltip = document.createElement('span');
    tooltip.textContent = binding.value;
    tooltip.style.cssText = `
      position: absolute;
      background: black;
      color: white;
      padding: 5px;
      border-radius: 5px;
      font-size: 12px;
      visibility: hidden;
      white-space: nowrap;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
    `;
    el.style.position = 'relative';
    el.appendChild(tooltip);
    
    el.addEventListener('mouseenter', () => {
      tooltip.style.visibility = 'visible';
    });
    el.addEventListener('mouseleave', () => {
      tooltip.style.visibility = 'hidden';
    });
  }
});

/*****************************************************************************/
app.directive('disable-future-dates', {
  beforeMount(el) {
    let today = new Date().toISOString().split('T')[0];
    el.setAttribute('max', today);
  }
});

/*****************************************************************************/



app.mount('#app');
