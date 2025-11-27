<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    :class="cn('border-[rgba(0,0,0,0.5)] placeholder:text-white/40 focus-visible:border-white/40 focus-visible:ring-white/20 aria-invalid:ring-red-500/40 aria-invalid:border-red-500 bg-[rgba(25,22,22,0.95)] flex field-sizing-content min-h-16 w-full rounded-[3px] border px-3 py-2 text-base shadow-lg transition-all outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white font-light uppercase tracking-[1.5px] backdrop-blur-sm', props.class)"
  />
</template>
