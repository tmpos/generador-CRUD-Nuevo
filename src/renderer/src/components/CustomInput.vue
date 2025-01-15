<template>
  <div class="relative">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="inputType"
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        'w-full form-input'
      ]"
    />
    <p v-if="error" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'number'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  }
});

const emit = defineEmits(['update:modelValue', 'blur']);

const inputType = computed(() => props.type === 'number' ? 'text' : props.type);

const error = ref('');
const internalValue = ref(props.modelValue);

const isValidNumber = (value) => {
  const regex = /^-?(\d+\.?\d*|\.\d+)$/;
  return regex.test(value);
};

const formatNumber = (value) => {
  if (value === '' || value === '-') return value;
  const num = parseFloat(value);
  return isNaN(num) ? '' : num.toString();
};

const handleInput = (event) => {
  let value = event.target.value;
  
  if (props.type === 'number') {
    const previousValue = internalValue.value;
    const cursorPosition = event.target.selectionStart;
    
    // Allow only numbers, one decimal point, and one minus sign at the start
    value = value.replace(/[^\d.-]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Ensure minus sign is only at the beginning
    if (value.lastIndexOf('-') > 0) {
      value = value.replace(/-/g, '');
    } else if (value.startsWith('-')) {
      value = '-' + value.substring(1).replace(/-/g, '');
    }

    // Validate the number
    if (value !== '' && value !== '-' && !isValidNumber(value)) {
      value = previousValue;
    }

    internalValue.value = value;
    event.target.value = value;
    event.target.setSelectionRange(cursorPosition, cursorPosition);
  } else {
    internalValue.value = value;
  }
  
  emit('update:modelValue', internalValue.value);
};

const handleBlur = (event) => {
  if (props.type === 'number') {
    internalValue.value = formatNumber(internalValue.value);
    emit('update:modelValue', internalValue.value);
  }
  emit('blur', event);
};

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});
</script>