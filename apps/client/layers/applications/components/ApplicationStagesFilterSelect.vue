<script lang="ts" setup>
import { APPLICATION_STAGES_SCHEMA } from '@skill-swap/shared'
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const stages = APPLICATION_STAGES_SCHEMA.options
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger class="w-[200px]">
      <SelectValue placeholder="Select stage" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="stage in stages" :key="stage" :value="stage">
        {{ stage }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
