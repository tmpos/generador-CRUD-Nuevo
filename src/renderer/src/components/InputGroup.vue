<template>
  <div
    class="flex  dark:border-gray-600 dark:bg-gray-800  dark:focus-within:ring-blue-600">
    <!-- Prepended Slot -->
    <div v-if="prepend" class="flex items-center px-3 bg-gray-100  dark:bg-gray-700 dark:border-gray-600">
      <slot name="prepend"></slot>
    </div>

    <!-- Main Input -->
    <slot />

    <!-- Appended Slot -->
    <div v-if="append" class="flex items-center px-3 bg-gray-100 border-l border-gray-300 dark:bg-gray-700 dark:border-gray-600">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  prepend: { type: Boolean, default: false }, // Si hay un slot prepend
  append: { type: Boolean, default: false } // Si hay un slot append
});
</script>

<style scoped>
/* Esto asegura que los bordes internos se junten correctamente */
</style>
