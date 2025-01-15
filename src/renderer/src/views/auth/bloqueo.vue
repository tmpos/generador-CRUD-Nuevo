<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#060818] px-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md text-center">
      <img src="/assets/images/auth/locked.svg" alt="Account Locked" class="mx-auto mb-4 w-16 h-16" />
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Cuenta Bloqueada</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Tu cuenta está actualmente bloqueada. Por favor, contacta al soporte si crees que esto es un error.
      </p>
      <router-link
        to="/login"
        class="text-primary font-semibold underline hover:text-primary-dark dark:hover:text-primary-light"
      >
        Volver a la página de inicio de sesión
      </router-link>
      <div class="mt-4">
        <a href="mailto:support@example.com" class="btn btn-primary mt-4">Contactar Soporte</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // @ts-nocheck
import { useMeta } from '@/composables/use-meta';

// Set page metadata
useMeta({ title: 'Cuenta Bloqueada' });
</script>

<style scoped>

</style>
