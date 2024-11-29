<script lang="ts" setup>
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const { data: categories } = useCategories()
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Categories</SelectLabel>
        <template v-if="categories">
          <SelectItem
            v-for="(category, index) in categories"
            :key="index"
            :value="category.id"
          >
            {{ category.name }}
          </SelectItem>
        </template>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
