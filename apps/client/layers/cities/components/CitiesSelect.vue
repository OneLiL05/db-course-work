<script lang="ts" setup>
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const { data: cities } = useCities()
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger>
      <SelectValue placeholder="Select a city" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Cities</SelectLabel>
        <template v-if="cities">
          <SelectItem
            v-for="(city, index) in cities"
            :key="index"
            :value="city.id"
          >
            {{ city.name }}
          </SelectItem>
        </template>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
