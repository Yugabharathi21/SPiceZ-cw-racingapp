<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tr
    data-slot="table-row"
    :class="cn('hover:bg-[rgba(48,48,48,0.5)] data-[state=selected]:bg-[rgba(255,140,0,0.5)] border-b border-[rgba(0,0,0,0.5)] transition-colors', props.class)"
  >
    <slot />
  </tr>
</template>
