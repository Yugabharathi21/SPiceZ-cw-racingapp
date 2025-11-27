<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<DropdownMenuItemProps & {
  class?: HTMLAttributes['class']
  inset?: boolean
  variant?: 'default' | 'destructive'
}>(), {
  variant: 'default',
})

const delegatedProps = reactiveOmit(props, 'inset', 'variant', 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwardedProps"
    :class="cn(`focus:bg-[rgba(255,140,0,0.5)] focus:text-white data-[variant=destructive]:text-white data-[variant=destructive]:focus:bg-[rgba(255,0,0,0.5)] data-[variant=destructive]:focus:text-white data-[variant=destructive]:*:[svg]:!text-white [&_svg:not([class*='text-'])]:text-[#ff8c00] relative flex cursor-default items-center gap-2 rounded-[3px] px-2 py-1.5 text-sm font-light uppercase tracking-[1.5px] outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 text-white`, props.class)"
  >
    <slot />
  </DropdownMenuItem>
</template>
