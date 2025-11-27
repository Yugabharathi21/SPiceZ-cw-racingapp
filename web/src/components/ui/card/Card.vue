<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-[rgba(38,38,38,0.9)] text-white flex flex-col gap-[3px] rounded-[3px] border border-[rgba(0,0,0,0.5)] py-6 shadow-lg backdrop-blur-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
