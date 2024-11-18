import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva('relative block opacity-[0.65]', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

type SpinnerVariants = VariantProps<typeof spinnerVariants>

export { spinnerVariants, type SpinnerVariants }
export { default as Spinner } from './Spinner.vue'
