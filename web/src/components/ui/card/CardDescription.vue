<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="card-description"
    :class="cn('text-white/70 text-sm font-light uppercase tracking-[1.5px]', props.class)"
  >
    <slot />
  </p>
</template>
