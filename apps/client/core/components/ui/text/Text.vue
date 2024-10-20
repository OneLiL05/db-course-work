<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { textVariants, type TextVariants } from '.'
import { cn } from '~/core/lib/utils'

interface TextProps {
  size?: TextVariants['size']
  class?: HTMLAttributes['class']
}

const props = defineProps<TextProps>()

const tags = new Map<TextVariants['size'], 'p' | 'small'>([
  ['1', 'p'],
  ['2', 'p'],
  ['3', 'p'],
  ['4', 'small'],
  ['5', 'small'],
])

const tag = computed(() => tags.get(props.size))
</script>

<template>
  <component :is="tag" :class="cn(textVariants({ size }), props.class)">
    <slot />
  </component>
</template>
