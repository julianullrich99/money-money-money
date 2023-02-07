<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text: string
  removeButton?: boolean
}>()
const emit = defineEmits(['deleted', 'selected'])
const tag = ref()
</script>

<template>
  <div ref="tag">
    <span
      class="inline-flex items-center py-0.5 pr-1 pl-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full cursor-pointer"
      @click="emit('selected')"
    >
      {{ text }}
      <button
        type="button"
        class="inline-flex shrink-0 justify-center items-center ml-0.5 w-4 h-4 text-gray-400 hover:text-gray-500 focus:text-white hover:bg-gray-200 focus:bg-gray-500 rounded-full focus:outline-none"
        @click.stop="emit('deleted')"
      >
        <span class="sr-only">{{ text }} entfernen</span>
        <svg class="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
  </div>
</template>
