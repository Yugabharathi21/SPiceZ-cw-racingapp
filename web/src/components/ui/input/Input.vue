<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
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
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'file:text-white placeholder:text-white/40 selection:bg-[rgba(255,140,0,0.9)] selection:text-white bg-[rgba(25,22,22,0.95)] border-[rgba(0,0,0,0.5)] flex h-9 w-full min-w-0 rounded-[3px] border px-3 py-1 text-base shadow-lg transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-light disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm uppercase tracking-[1.5px] text-white font-light backdrop-blur-sm',
      'focus-visible:border-white/40 focus-visible:ring-white/20 focus-visible:ring-2',
      'aria-invalid:ring-red-500/40 aria-invalid:border-red-500',
      props.class,
    )"
  >
</template>
