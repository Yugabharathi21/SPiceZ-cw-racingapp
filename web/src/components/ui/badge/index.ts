import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[3px] border border-[rgba(0,0,0,0.5)] px-2 py-0.5 text-xs font-light uppercase tracking-[1.5px] w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-white/20 focus-visible:ring-2 transition-all overflow-hidden backdrop-blur-sm',
  {
    variants: {
      variant: {
        default:
          'bg-[rgba(38,38,38,0.9)] text-white [a&]:hover:bg-[rgba(48,48,48,0.9)] shadow-lg',
        secondary:
          'bg-[rgba(255,140,0,0.9)] text-white [a&]:hover:bg-[rgba(255,140,0,0.8)] shadow-lg',
        destructive:
         'bg-[rgba(255,0,0,0.9)] text-white [a&]:hover:bg-[rgba(255,0,0,0.8)] shadow-lg',
        outline:
          'text-white bg-transparent border-white/20 [a&]:hover:bg-[rgba(38,38,38,0.5)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
