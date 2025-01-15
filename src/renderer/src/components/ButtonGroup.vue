<template>
  <div class="inline-flex items-center  overflow-hidden">
    <!-- Detectar automáticamente los hijos -->
    <slot />
  </div>
</template>

<script setup>
import { provide } from 'vue';

// Recopilar todos los botones dentro del grupo
const props = defineProps({
  group: { type: Boolean, default: true } // Flag para activar el comportamiento de grupo
});

// Proveer datos de grupo a los botones hijos
provide('buttonGroup', { group: props.group });
</script>
