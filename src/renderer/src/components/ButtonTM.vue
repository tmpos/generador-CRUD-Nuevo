<template>
  <component
    :is="asChild ? 'span' : as"
    :class="[ // Clases dinámicas y personalizables
      'inline-flex items-center justify-center font-medium transition-all',
      buttonClasses,
      sizeClasses,
      groupClasses,
      rounded ? 'rounded-full' : 'rounded-md',
      fluid ? 'w-full' : 'inline-block',
      raised ? 'shadow-md' : '',
      loading ? 'cursor-wait opacity-70' : '',
      severityClass,
      outlined && !text ? outlinedClass : '',
      text && !outlined ? textClass : '',
      link ? linkClass : '',
      plain ? plainClass : '',
      { 'opacity-50 cursor-not-allowed': disabled },
      iconPosClass,
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner o Ícono -->
    <template v-if="loading">
      <i :class="[loadingIcon, iconClass, 'animate-spin']"></i>
    </template>
    <template v-else-if="icon">
      <i :class="[icon, iconClass]"></i>
    </template>

    <!-- Label -->
    <span v-if="label" class="flex-1">{{ label }}</span>

    <!-- Badge -->
    <span
      v-if="badge"
      :class="[ // Estilos dinámicos para el badge
        'inline-flex items-center justify-center rounded-full text-xs font-semibold px-2 py-1',
        badgeClass,
        badgeSeverityClass
      ]"
    >
      {{ badge }}
    </span>
  </component>
</template>

<script setup>
import { computed,inject } from 'vue';

const props = defineProps({
  label: { type: String, default: null },
  icon: { type: String, default: null },
  iconPos: { type: String, default: 'left' }, // Posiciones del ícono
  iconClass: { type: [String, Object], default: null },
  badge: { type: String, default: null },
  badgeClass: { type: [String, Object], default: null },
  badgeSeverity: { type: String, default: null },
  loading: { type: Boolean, default: false },
  loadingIcon: { type: String, default: null },
  as: { type: [String, Object], default: 'button' },
  asChild: { type: Boolean, default: false },
  link: { type: Boolean, default: false },
  severity: { type: String, default: null },
  raised: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  text: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  size: { type: String, default: null },
  variant: { type: String, default: undefined },
  plain: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

/** Computed Classes */

// Clases según severidad
const buttonClasses = computed(() => {
  if (props.severity) {
    switch (props.severity) {
      case 'primary': // Para el caso explícito de primary
        return 'bg-primary text-white hover:bg-primary-light dark:bg-primary-light dark:hover:bg-primary';
      case 'info':
        return 'bg-info text-white hover:bg-info-light dark:bg-info-light dark:hover:bg-info';
      case 'success':
        return 'bg-success text-white hover:bg-success-light dark:bg-success-light dark:hover:bg-success';
      case 'warn':
        return 'bg-warning text-white hover:bg-warning-light dark:bg-warning-light dark:hover:bg-warning';
      case 'danger':
        return 'bg-danger text-white hover:bg-danger-light dark:bg-danger-light dark:hover:bg-danger';
      case 'contrast':
        return 'bg-black text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700';
    }
  }

  // Por defecto, aplica el color primary
  return 'bg-primary text-white hover:bg-primary-light dark:bg-primary-light dark:hover:bg-primary';
});


// Clases según tamaño
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'px-3 py-1 text-sm';
    case 'large':
      return 'px-5 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
});

// Clases para bordes
const severityClass = computed(() => {
  return props.severity
    ? `bg-${props.severity}-500 hover:bg-${props.severity}-600`
    : '';
});

// Clases para variantes
const outlinedClass = computed(() => {
  return 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700';
});

const textClass = computed(() => {
  return 'bg-transparent text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100';
});

const linkClass = computed(() => {
  return 'bg-transparent text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500';
});

const plainClass = computed(() => {
  return 'bg-transparent text-gray-700 dark:text-gray-300';
});

/** Clases de Posición del Ícono */
const iconPosClass = computed(() => {
  switch (props.iconPos) {
    case 'top':
      return 'flex-col space-y-1';
    case 'bottom':
      return 'flex-col-reverse space-y-reverse space-y-1';
    case 'right':
      return 'flex-row-reverse space-x-reverse space-x-2';
    default: // 'left'
      return 'flex-row space-x-2';
  }
});

const buttonGroup = inject('buttonGroup', null);

const groupClasses = computed(() => {
  if (buttonGroup?.group) {
    const index = buttonGroup.index; // Índice del botón
    const total = buttonGroup.total; // Total de botones en el grupo

    if (index === 0) {
      return 'ltr:rounded-r-none rtl:rounded-l-none';
    }
    if (index === total - 1) {
      return 'ltr:rounded-l-none rtl:rounded-r-none';
    }
    return 'rounded-none';
  }
  return ''; // No está en grupo
});

/** Clases del Badge según severidad */
const badgeSeverityClass = computed(() => {
  switch (props.badgeSeverity) {
    case 'info':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    case 'success':
      return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
    case 'warn':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    case 'danger':
      return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200';
    case 'contrast':
      return 'bg-black text-white dark:bg-white dark:text-black';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
});
</script>
