<script lang="ts" setup>
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const { data: positions } = usePositions()
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger>
      <SelectValue placeholder="Select a position" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Positions</SelectLabel>
        <template v-if="positions">
          <SelectItem
            v-for="(position, index) in positions"
            :key="index"
            :value="position.id.toString()"
          >
            {{ position.name }}
          </SelectItem>
        </template>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
