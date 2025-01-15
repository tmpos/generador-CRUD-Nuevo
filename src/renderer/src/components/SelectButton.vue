<template>
  <label
      v-if="label"
      :for="id"
      class="block mb-2  text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
  <div :class="['select-button', sizeClass, { 'invalid': invalid, 'disabled': disabled }]">
    <button
      v-for="(option, index) in options"
      :key="index"
      :class="['select-button-item', { 'selected': isSelected(option), 'disabled': isDisabled(option) }]"
      @click="handleClick(option)"
      :disabled="disabled || isDisabled(option)"
      :aria-labelledby="ariaLabelledby"
    >
      {{ getOptionLabel(option) }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object],
    default: null
  },
  defaultValue: {
    type: [String, Number, Array, Object],
    default: null
  },
    label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  optionLabel: {
    type: [String, Function],
    default: null
  },
  optionValue: {
    type: [String, Function],
    default: null
  },
  optionDisabled: {
    type: [String, Function],
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  invalid: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  dataKey: {
    type: String,
    default: null
  },
  allowEmpty: {
    type: Boolean,
    default: true
  },
  ariaLabelledby: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null,
    validator: (value) => ['small', 'large'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue !== null ? props.modelValue : props.defaultValue);

watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal;
});

const sizeClass = computed(() => {
  return props.size ? `select-button-${props.size}` : '';
});

const getOptionLabel = (option) => {
  if (typeof props.optionLabel === 'function') {
    return props.optionLabel(option);
  }
  if (typeof option === 'object' && props.optionLabel) {
    return option[props.optionLabel];
  }
  return option;
};

const getOptionValue = (option) => {
  if (typeof props.optionValue === 'function') {
    return props.optionValue(option);
  }
  if (typeof option === 'object' && props.optionValue) {
    return option[props.optionValue];
  }
  return option;
};

const isDisabled = (option) => {
  if (typeof props.optionDisabled === 'function') {
    return props.optionDisabled(option);
  }
  if (typeof option === 'object' && props.optionDisabled) {
    return option[props.optionDisabled] || false;
  }
  return false;
};

const isSelected = (option) => {
  const value = getOptionValue(option);
  if (props.multiple) {
    return Array.isArray(internalValue.value) && internalValue.value.includes(value);
  }
  return internalValue.value === value;
};

const handleClick = (option) => {
  if (props.disabled || isDisabled(option)) return;

  const value = getOptionValue(option);

  if (props.multiple) {
    let newValue = Array.isArray(internalValue.value) ? [...internalValue.value] : [];
    if (isSelected(option)) {
      newValue = newValue.filter(v => v !== value);
      if (newValue.length === 0) {
        newValue.push(getOptionValue(props.options[0])); // Ensure at least one option is selected
      }
    } else {
      newValue.push(value);
    }
    internalValue.value = newValue;
  } else {
    internalValue.value = value;
  }

  emit('update:modelValue', internalValue.value);
};

onMounted(() => {
  if (internalValue.value === null && props.options.length > 0) {
    internalValue.value = getOptionValue(props.options[0]);
    emit('update:modelValue', internalValue.value);
  }
});
</script>

<style scoped>
.select-button {
  @apply flex flex-wrap gap-2;
}

.select-button-small {
  @apply text-sm;
}

.select-button-large {
  @apply text-lg;
}

.select-button-item {
  @apply px-4 py-2 border rounded;
}

.select-button-item.selected {
  @apply bg-blue-500 text-white;
}

.select-button-item.disabled {
  @apply bg-gray-300 cursor-not-allowed;
}

.select-button.invalid .select-button-item {
  @apply border-red-500;
}

.select-button.disabled .select-button-item {
  @apply cursor-not-allowed;
}
</style>
