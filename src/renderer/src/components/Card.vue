<template>
  <div :class="`p-4 rounded-lg shadow-md text-white ${bgColor}`">
    <div class="flex items-center">
      <div class="text-4xl mr-4">{{ icon }}</div>
      <div>
        <p class="text-xl font-bold">{{ value }}</p>
        <p class="text-sm">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  bgColor: String
})
</script>
