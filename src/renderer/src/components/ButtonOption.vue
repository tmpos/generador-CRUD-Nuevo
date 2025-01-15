<template>
  <div role="groupS" class="w-fullS" @keydown.enter.prevent>
    <label class="block  text-gray-700 dark:text-gray-300 ">
      {{ label }}
    </label>
    <div class="inline-flex rounded-md shadow-sm ">
      <ButtonGroup>
      <ButtonTM
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
        :class="[
          isSelected(option) ? 'btn-primary' : 'btn-secondary',
          'p-button-md'
        ]"
        :label="option"
      />
      </ButtonGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ButtonTM from './ButtonTM.vue';
import ButtonGroup from './ButtonGroup.vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => ['RNC', 'CEDULA'],
  },
  label: {
    type: String,
    required: true,
  },
});

//const emit = defineEmits(['update:modelValue']);
const emit = defineEmits(['update:modelValue', 'change']);
const selectedValue = ref(props.modelValue || props.options[0]);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== selectedValue.value) {
      selectedValue.value = newVal;
    }
  }
);

const selectOption = (option) => {
  if (selectedValue.value !== option) {
    selectedValue.value = option;
    emit('update:modelValue', option);
     emit('change', option);
  }
};

const isSelected = (option) => selectedValue.value === option;
</script>

<style scoped>

.h-[38px] {
  height: 38px;
}
</style>