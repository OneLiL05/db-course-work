<script lang="ts" setup>
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const currencies = ['UAH', 'USD', 'EUR']
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger>
      <SelectValue placeholder="Select a currency" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Currency</SelectLabel>
        <SelectItem
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
          >{{ currency }}</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
