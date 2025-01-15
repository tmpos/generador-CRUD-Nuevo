<template>
  <div class="relative w-full">
    <input
      type="text"
      v-model="searchTerm"
      @input="handleInput"
      @keydown.down.prevent="handleArrowDown"
      @keydown.up.prevent="handleArrowUp"
      @keydown.enter.prevent="handleEnter"
      @keydown.esc.prevent="closeList"
      @blur="handleBlur"
      :placeholder="placeholder"
      class="w-full form-input"
    />
    <ul
      v-show="showResults && filteredItems.length > 0"
      class="absolute z-10 w-full mt-1 border rounded-md shadow-lg max-h-60 overflow-auto bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
    >
      <li
        v-for="(item, index) in filteredItems"
        :key="index"
        @mousedown.prevent="selectItem(item)"
        :class="[
          'px-4 py-2 cursor-pointer',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          {
            'bg-blue-500 text-white': index === selectedIndex,
            'text-gray-700 dark:text-gray-300': index !== selectedIndex
          }
        ]"
      >
        <span v-html="highlightMatch(getItemLabel(item))"></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  searchField: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  onSelect: {
    type: Function,
    required: true
  },
  autoFirst: {
    type: Boolean,
    default: false
  },
  minChars: {
    type: Number,
    default: 1
  },
  maxItems: {
    type: Number,
    default: 10
  }
})

const searchTerm = ref('')
const showResults = ref(false)
const selectedIndex = ref(-1)

const filteredItems = computed(() => {
  if (searchTerm.value.length < props.minChars) return []

  return props.items
    .filter(item => {
      const itemValue = getItemLabel(item).toLowerCase()
      return itemValue.includes(searchTerm.value.toLowerCase())
    })
    .slice(0, props.maxItems)
})

const getItemLabel = (item) => {
  if (props.searchField && typeof item === 'object') {
    return item[props.searchField]
  }
  return item
}

const handleInput = () => {
  showResults.value = true
  selectedIndex.value = props.autoFirst ? 0 : -1
}

const handleArrowDown = () => {
  if (selectedIndex.value < filteredItems.value.length - 1) {
    selectedIndex.value++
  } else {
    selectedIndex.value = -1
  }
}

const handleArrowUp = () => {
  if (selectedIndex.value > -1) {
    selectedIndex.value--
  } else {
    selectedIndex.value = filteredItems.value.length - 1
  }
}

const handleEnter = () => {
  if (selectedIndex.value > -1) {
    selectItem(filteredItems.value[selectedIndex.value])
  } else if (filteredItems.value.length > 0 && props.autoFirst) {
    selectItem(filteredItems.value[0])
  }
}

const selectItem = (item) => {
  searchTerm.value = getItemLabel(item)
  closeList()
  props.onSelect(item)
}

const closeList = () => {
  showResults.value = false
  selectedIndex.value = -1
}

const handleBlur = () => {
  nextTick(() => {
    closeList()
  })
}

const highlightMatch = (text) => {
  if (searchTerm.value.length < props.minChars) return text

  const regex = new RegExp(`(${searchTerm.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-white">$1</mark>')
}

watch(searchTerm, () => {
  if (searchTerm.value.length < props.minChars) {
    closeList()
  }
})

onMounted(() => {
  if (props.autoFirst) {
    selectedIndex.value = 0
  }
})
</script>