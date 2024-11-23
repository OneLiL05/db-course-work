<script lang="ts" setup>
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const periods = [
  { value: 'one-time', label: 'One time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger>
      <SelectValue placeholder="Select a period" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Period</SelectLabel>
        <SelectItem v-for="{ label, value } in periods" :value>
          {{ label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
