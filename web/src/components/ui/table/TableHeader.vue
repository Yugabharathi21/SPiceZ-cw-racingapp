<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <thead
    data-slot="table-header"
    :class="cn('[&_tr]:border-b [&_tr]:border-[rgba(0,0,0,0.5)] bg-[rgba(25,22,22,0.95)]', props.class)"
  >
    <slot />
  </thead>
</template>
