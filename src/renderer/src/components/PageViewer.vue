<template>
  <div class="web-page-viewer">
    <iframe :src="decodedUrl" class="web-page-iframe"></iframe>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const decodedUrl = computed(() => decodeURIComponent(props.url));
</script>

<style scoped>
.web-page-viewer {
  width: 100%;
  height: 100%;
  position: relative;
}

.web-page-iframe {
  width: 100%;
  height: 100vh;
  border: none;
}
</style>
