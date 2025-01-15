<template>
  <TransitionRoot as="template" :show="visible" @after-leave="onAfterLeave">
    <Dialog class="fixed inset-0 z-50 flex items-start justify-end " @close="closeDrawer">
      <!-- Fondo del Modal -->
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          v-if="modal"
          class="fixed inset-0 bg-gray-500/75 transition-opacity"
          @click.self="dismissable && closeDrawer"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div :class="['pointer-events-none fixed flex', positionClasses]">
            <!-- Panel del Drawer -->
            <TransitionChild
              as="template"
              :enter="enterTransition"
              :enter-from="enterFrom"
              :enter-to="'translate-x-0 translate-y-0'"
              :leave="leaveTransition"
              :leave-from="'translate-x-0 translate-y-0'"
              :leave-to="leaveTo"
            >
              <DialogPanel
                class="pointer-events-auto relative bg-white shadow-xl "
                :style="panelStyle"
              >
                <!-- Botón de Cerrar -->
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div v-if="showCloseIcon" class="absolute right-4 top-4">
                    <button
                      type="button"
                      class="rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      @click="closeDrawer"
                    >
                      <span class="sr-only">Close panel</span>
                      <i class="pi pi-times"></i>
                    </button>
                  </div>
                </TransitionChild>

                <!-- Contenido del Drawer -->
                <div class="flex h-full flex-col overflow-y-scroll py-6 dark:bg-gray-800 dark:text-gray-300">
                  <div class="px-4 sm:px-6">
                    <DialogTitle class="text-base font-semibold text-gray-900 dark:text-gray-300">
                      <slot name="header">{{ header }}</slot>
                    </DialogTitle>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 ">
                    <slot />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

// Props
const props = defineProps({
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
  },
  visible: {
    type: Boolean,
    default: false,
  },
  header: {
    type: String,
    default: 'Panel title',
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
  showCloseIcon: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  blockScroll: {
    type: Boolean,
    default: true,
  },
});

// Emitted Events
const emit = defineEmits(['update:visible', 'after-leave']);

// Close Drawer Handler
const closeDrawer = () => {
  if (props.dismissable) {
    emit('update:visible', false);
  }
};

// After Leave Event
const onAfterLeave = () => {
  emit('after-leave');
};

// Dynamic Classes
const positionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'inset-x-0 top-0 max-h-full justify-center';
    case 'bottom':
      return 'inset-x-0 bottom-0 max-h-full justify-center';
    case 'left':
      return 'inset-y-0 left-0 max-w-full';
    case 'right':
    default:
      return 'inset-y-0 right-0 max-w-full';
  }
});

// Dynamic Styles for Panel
const panelStyle = computed(() => {
  if (props.position === 'top' || props.position === 'bottom') {
    return { width: '100%', height: 'auto' };
  }
  return { width: 'auto', height: '100%' };
});

// Animations
const enterTransition = computed(() => 'transform transition ease-in-out duration-500 sm:duration-700');
const leaveTransition = computed(() => 'transform transition ease-in-out duration-500 sm:duration-700');
const enterFrom = computed(() => {
  switch (props.position) {
    case 'top':
      return '-translate-y-full';
    case 'bottom':
      return 'translate-y-full';
    case 'left':
      return '-translate-x-full';
    case 'right':
    default:
      return 'translate-x-full';
  }
});
const leaveTo = computed(() => {
  switch (props.position) {
    case 'top':
      return '-translate-y-full';
    case 'bottom':
      return 'translate-y-full';
    case 'left':
      return '-translate-x-full';
    case 'right':
    default:
      return 'translate-x-full';
  }
});
</script>
