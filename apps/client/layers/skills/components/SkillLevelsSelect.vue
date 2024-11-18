<script lang="ts" setup>
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const { data: levels } = useSkillsLevels()
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger class="w-1/4">
      <SelectValue placeholder="Select a level" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Levels</SelectLabel>
        <template v-if="levels">
          <SelectItem
            v-for="level in levels"
            :key="level.name.toLowerCase()"
            :value="level.id.toString()"
          >
            {{ level.name }}
          </SelectItem>
        </template>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
