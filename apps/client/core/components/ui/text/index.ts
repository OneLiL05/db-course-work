import { cva, type VariantProps } from 'class-variance-authority'

export const textVariants = cva('', {
  variants: {
    size: {
      '1': 'text-xl text-muted-foreground',
      '2': 'text-lg font-semibold',
      '3': 'leading-7 [&:not(:first-child)]:mt-6',
      '4': 'text-sm font-medium leading-none',
      '5': 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    size: '3',
  },
})

export type TextVariants = VariantProps<typeof textVariants>

export { default as Text } from './Text.vue'
