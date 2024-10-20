import { cva, type VariantProps } from 'class-variance-authority'

export const headingVariants = cva('scroll-m-20', {
  variants: {
    size: {
      '1': 'text-4xl font-extrabold tracking-tight lg:text-5xl',
      '2': 'border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      '3': 'text-2xl font-semibold tracking-tight',
      '4': 'text-xl font-semibold tracking-tight',
    },
  },
  defaultVariants: {
    size: '1',
  },
})

export type HeadingVariants = VariantProps<typeof headingVariants>

export { default as Heading } from './Heading.vue'
