<script lang="ts" setup>
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'
import { APPLICATION_STAGES } from '../constants'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger>
      <SelectValue placeholder="Select stage" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="stage in APPLICATION_STAGES"
        :key="stage"
        :value="APPLICATION_STAGES.indexOf(stage).toString()"
      >
        {{ stage }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
