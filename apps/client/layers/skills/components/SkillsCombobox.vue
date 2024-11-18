<script setup lang="ts">
import type { Skill } from '@skill-swap/shared'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '~/core/lib/utils'

const props = defineProps<{
  modelValue?: string
  defaultValue?: string
  skills: Skill[] | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const open = ref(false)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-3/4 justify-between"
      >
        {{
          modelValue
            ? skills?.find((skill) => skill.name === modelValue)?.name
            : 'Select skill'
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 no-scrollbar" align="start">
      <Command>
        <CommandInput class="h-9" placeholder="Search framework..." />
        <CommandEmpty>No skill found.</CommandEmpty>
        <CommandList>
          <CommandGroup v-if="skills">
            <CommandItem
              v-for="skill in skills"
              :key="skill.id"
              :value="skill.name"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    $emit('update:modelValue', ev.detail.value)
                  }
                  open = false
                }
              "
            >
              {{ skill.name }}
              <Check
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    modelValue === skill.name ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
