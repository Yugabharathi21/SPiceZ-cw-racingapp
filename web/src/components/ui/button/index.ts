import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-sm font-light uppercase tracking-[1.5px] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white/20 border border-[rgba(0,0,0,0.5)]',
  {
    variants: {
      variant: {
        default:
          'bg-[rgba(38,38,38,0.9)] text-white shadow-lg hover:bg-[rgba(48,48,48,0.9)] backdrop-blur-sm',
        destructive:
          'bg-[rgba(255,0,0,0.9)] text-white shadow-lg hover:bg-[rgba(255,0,0,0.8)] backdrop-blur-sm',
        outline:
          'bg-transparent border-white/20 text-white shadow-lg hover:bg-[rgba(38,38,38,0.5)] backdrop-blur-sm',
        secondary:
          'bg-[rgba(255,140,0,0.9)] text-white shadow-lg hover:bg-[rgba(255,140,0,0.8)] backdrop-blur-sm',
        ghost:
          'border-transparent hover:bg-[rgba(38,38,38,0.5)] hover:text-white backdrop-blur-sm',
        link: 'text-[#ff8c00] underline-offset-4 hover:underline border-transparent',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-[3px] gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-[3px] px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
