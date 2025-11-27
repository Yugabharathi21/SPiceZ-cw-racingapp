<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h3
    data-slot="card-title"
    :class="cn('leading-none font-light uppercase tracking-[1.5px] text-white', props.class)"
  >
    <slot />
  </h3>
</template>
