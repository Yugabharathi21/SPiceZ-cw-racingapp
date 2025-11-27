<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    data-slot="switch"
    v-bind="forwarded"
    :class="cn(
      'peer data-[state=checked]:bg-[rgba(255,140,0,0.9)] data-[state=unchecked]:bg-[rgba(25,22,22,0.95)] focus-visible:border-white/40 focus-visible:ring-white/20 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-[rgba(0,0,0,0.5)] shadow-lg transition-all outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm',
      props.class,
    )"
  >
    <SwitchThumb
      data-slot="switch-thumb"
      :class="cn('bg-white data-[state=unchecked]:bg-white/70 data-[state=checked]:bg-white pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 shadow-md')"
    >
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>
