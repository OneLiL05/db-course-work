<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { cn } from '~/core/lib/utils'
import { spinnerVariants, type SpinnerVariants } from '.'
import type { HTMLAttributes } from 'vue'

interface SpinnerProps extends PrimitiveProps {
  size?: SpinnerVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  asChild: false,
  as: 'span',
  class: 'bg-black dark:bg-white',
})

const classes = computed(() => {
  const bgClass = props.class.match(/(?:dark:bg-|bg-)\S+/g) || []
  const filteredClasses = props.class.replace(/(?:dark:bg-|bg-)\S+/g, '').trim()

  return { bgClass, filteredClasses }
})
</script>

<template>
  <Primitive
    :class="cn(spinnerVariants({ size, className: classes.filteredClasses }))"
    :as-child
    :as
  >
    <span
      v-for="(n, index) in 8"
      class="absolute top-0 left-1/2 w-[12.5%] h-full animate-spinner-leaf-fade"
      :key="n"
      :style="{
        transform: `rotate(${index * 45}deg)`,
        animationDelay: `${-(7 - index) * 100}ms`,
      }"
    >
      <span :class="cn('block w-full h-[30%] rounded-full', classes.bgClass)" />
    </span>
  </Primitive>
</template>
