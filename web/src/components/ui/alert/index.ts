import { cva, type VariantProps } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertTitle } from './AlertTitle.vue'

export const alertVariants = cva(
  'relative w-full rounded-[3px] border border-[rgba(0,0,0,0.5)] px-4 py-3 text-sm font-light uppercase tracking-[1.5px] grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current shadow-lg backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'bg-[rgba(38,38,38,0.9)] text-white',
        destructive:
          'text-white bg-[rgba(255,0,0,0.9)] [&>svg]:text-current *:data-[slot=alert-description]:text-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
