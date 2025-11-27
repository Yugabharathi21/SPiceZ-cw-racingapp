<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList, type TabsListProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn(
      'bg-[rgba(25,22,22,0.95)] text-white inline-flex h-9 w-fit items-center justify-center rounded-[3px] p-[3px] border border-[rgba(0,0,0,0.5)] shadow-lg backdrop-blur-sm',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
