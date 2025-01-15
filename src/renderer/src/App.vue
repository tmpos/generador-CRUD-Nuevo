
<template>
    <div
    class="main-section antialiased relative font-nunito text-sm font-normal"
    :class="[store.sidebar ? 'toggle-sidebar' : '', store.menu, store.layout, store.rtlClass]"
    >
    <component v-bind:is="mainLayout"></component>
</div>
<PWABadge />
</template>

<script lang="ts" setup>
// @ts-nocheck
import { computed } from 'vue';
import PWABadge from './components/PWABadge.vue'

import appLayout from '@/layouts/app-layout.vue';
import authLayout from '@/layouts/auth-layout.vue';

import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';

const store = useAppStore();

// meta
useMeta({ title: 'Sistema' });

const mainLayout = computed(() => {
    return store.mainLayout === 'auth' ? authLayout : appLayout;
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
