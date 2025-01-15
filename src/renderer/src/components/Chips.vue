<template>
  <div class="w-full max-w-md mx-auto">
    <div class="relative">
      <div
        class="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white"
        :class="{ 'ring-2 ring-blue-500 border-blue-500': isFocused }"
        @click="focusInput"
      >
        <span
          v-for="(chip, index) in chips"
          :key="index"
          class="flex items-center gap-1 bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
        >
          {{ chip }}
          <button
            @click.stop="removeChip(index)"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            aria-label="Remove chip"
          >
            <i class="pi pi-times"></i>
          </button>
        </span>
        <input
          ref="inputRef"
          v-model="inputValue"
          @input="updateInputWidth"
          @keydown.enter.prevent="addChip"
          @keydown.backspace="handleBackspace"
          @focus="isFocused = true"
          @blur="isFocused = false"
          type="text"
          placeholder="Add chips..."
          class="outline-none bg-transparent flex-grow min-w-[4ch]"
          :style="{ width: inputWidth }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const chips = ref(props.modelValue)
const inputValue = ref('')
const inputWidth = ref('1ch')
const inputRef = ref(null)
const isFocused = ref(false)

const splitInput = (input) => {
  return input.split(',').map(item => item.trim()).filter(item => item.length > 0)
}

const addChip = () => {
  const trimmedValue = inputValue.value.trim()
  if (trimmedValue) {
    const newChips = splitInput(trimmedValue)
    chips.value.push(...newChips.filter(chip => !chips.value.includes(chip)))
    inputValue.value = ''
    updateInputWidth()
  }
}

const removeChip = (index) => {
  chips.value.splice(index, 1)
}

const handleBackspace = () => {
  if (inputValue.value === '' && chips.value.length > 0) {
    chips.value.pop()
  } else if (inputValue.value.length === 1) {
    inputValue.value = ''
    updateInputWidth()
  }
}

const updateInputWidth = () => {
  nextTick(() => {
    inputWidth.value = `${Math.max(1, inputValue.value.length)}ch`
  })
}

const focusInput = () => {
  inputRef.value.focus()
}

watch(chips, (newChips) => {
  emit('update:modelValue', newChips)
}, { deep: true })
</script>