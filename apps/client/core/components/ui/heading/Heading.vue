<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { headingVariants, type HeadingVariants } from '.'
import { cn } from '~/core/lib/utils'

interface HeadingProps {
  size?: HeadingVariants['size']
  class?: HTMLAttributes['class']
}

const props = defineProps<HeadingProps>()

const tag = computed(() => `h${props.size}`)
</script>

<template>
  <component :is="tag" :class="cn(headingVariants({ size }), props.class)">
    <slot />
  </component>
</template>
