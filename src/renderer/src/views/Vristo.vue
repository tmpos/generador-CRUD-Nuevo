<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
      <h2 class="text-xl">Bienvenido al Generador de CRUD</h2>
  </div>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
    <div class="grid grid-cols-3 gap-4">

      <router-link 
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
        to="/components"
      >
        <i class="pi pi-box p-1 text-3xl"></i> 
        <span>COMPONENTS</span>
      </router-link>

      <router-link 
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
        to="/templates"
      >
        <i class="pi pi-pen-to-square p-1 text-3xl"></i> 
        <span>TEMPLATES</span>
      </router-link>
    </div>
  </div>
</template>
<script setup>
  // @ts-nocheck
</script>