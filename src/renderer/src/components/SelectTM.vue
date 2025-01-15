<template>
  <div class="relative">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <div
      :class="[
        'relative',
        { 'pointer-events-none opacity-50': disabled }
      ]"
    >
      <input
        v-if="editable"
        :id="id"
        type="text"
        v-model="searchTerm"
        @input="filterOptions"
        @focus="open"
        @blur="handleBlur"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full form-input',
        ]"
      />
      <div
        v-else
        @click="toggle"
        :class="[
          'w-full px-3 py-2 text-gray-700 bg-white border rounded-md cursor-pointer',
          'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
          { 'ring-2 ring-blue-500 dark:ring-blue-600': isOpen }
        ]"
      >
        {{ selectedLabel || placeholder }}
      </div>
      <div
        v-show="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto dark:bg-gray-800 dark:border-gray-600"
      >
        <ul class="py-1">
          <li
            v-for="(option, index) in filteredOptions"
            :key="index"
            @mousedown="selectOption(option)"
            :class="[
              'px-3 py-2 cursor-pointer',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              { 'bg-blue-100 dark:bg-blue-900': isSelected(option) }
            ]"
          >
            {{ getOptionLabel(option) }}
          </li>
        </ul>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-400 dark:text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  valueField: {
    type: String,
    default: null
  },
  labelField: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).substr(2, 9)}`
  },
  onChange: {
    type: Function,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchTerm = ref('');
const filteredOptions = ref([]);

const selectedLabel = computed(() => {
  if (!props.modelValue) return '';
  return getOptionLabel(props.modelValue);
});

const getOptionLabel = (option) => {
  if (props.labelField && typeof option === 'object') {
    return option[props.labelField];
  }
  return option;
};

const getOptionValue = (option) => {
  if (option == null) return null;
  if (props.valueField && typeof option === 'object') {
    return option[props.valueField];
  }
  return option;
};

const isSelected = (option) => {
  const optionValue = getOptionValue(option);
  const modelValue = getOptionValue(props.modelValue);
  return optionValue != null && modelValue != null && optionValue === modelValue;
};

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option) => {
  emit('update:modelValue', option);
  props.onChange(option);
  searchTerm.value = getOptionLabel(option);
  close();
};

const handleBlur = () => {
  setTimeout(() => {
    close();
  }, 200);
};

const filterOptions = () => {
  if (!props.editable) {
    filteredOptions.value = [...props.options];
    return;
  }

  filteredOptions.value = props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase();
    return label.includes(searchTerm.value.toLowerCase());
  });
};

watch(() => props.options, (newOptions) => {
  filteredOptions.value = [...newOptions];
}, { immediate: true });

watch(() => props.modelValue, (newValue) => {
  if (newValue != null) {
    searchTerm.value = getOptionLabel(newValue);
  } else {
    searchTerm.value = '';
  }
});

// Initialize filteredOptions
filterOptions();
</script>