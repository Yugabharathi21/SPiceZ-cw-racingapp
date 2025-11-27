<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="cn(
      `data-[state=active]:bg-[rgba(255,140,0,0.9)] data-[state=active]:text-white focus-visible:border-white/40 focus-visible:ring-white/20 data-[state=active]:border-[rgba(0,0,0,0.5)] text-white/70 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-[3px] border border-transparent px-2 py-1 text-sm font-light uppercase tracking-[1.5px] whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-lg [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
      props.class,
    )"
  >
    <slot />
  </TabsTrigger>
</template>
