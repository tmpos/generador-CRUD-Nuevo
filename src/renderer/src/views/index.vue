<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
      <h2 class="text-xl">Bienvenido al Generador de CRUD</h2>
  </div>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
    <div class="grid grid-cols-4 gap-4">
      <router-link 
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
        to="/crud"
      >
        <i class="pi pi-cog p-1 text-3xl"></i> 
        <span>CRUD</span>
      </router-link>


      <router-link 
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
        to="/templates"
      >
        <i class="pi pi-pen-to-square p-1 text-3xl"></i> 
        <span>VRISTRO</span>
      </router-link>

      <router-link 
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
        to="/primevue"
      >
        <i class="pi pi-pen-to-square p-1 text-3xl"></i> 
        <span>PRIMEVUE</span>
      </router-link>

      <router-link 
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
        to="/terminal"
      >
        <i class="pi pi-external-link p-1 text-3xl"></i> 
        <span>TERMINAL</span>
      </router-link>

    </div>
  </div>
</template>

<script setup>
  // @ts-nocheck
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(route) {
  router.push({ name: route });
}
</script>

<style>
/* Agrega estilos adicionales aquí si es necesario */
</style>
