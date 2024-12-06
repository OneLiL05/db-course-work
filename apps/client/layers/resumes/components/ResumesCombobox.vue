<script setup lang="ts">
import type { Resume } from '@skill-swap/shared'
import { cn } from '~/core/lib/utils'

const props = defineProps<{
  modelValue?: string
  defaultValue?: string
  resumes: Resume[] | undefined
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
        class="w-full justify-between"
      >
        {{
          modelValue
            ? resumes?.find((resume) => resume.name === modelValue)?.name
            : 'Select resume'
        }}
        <Icon
          name="lucide:chevrons-up-down"
          class="ml-2 h-4 w-4 shrink-0 opacity-50"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 no-scrollbar" align="start">
      <Command>
        <CommandInput class="h-9" placeholder="Search resume..." />
        <CommandEmpty>No resume found.</CommandEmpty>
        <CommandList>
          <CommandGroup v-if="resumes">
            <CommandItem
              v-for="resume in resumes"
              :key="resume.id"
              :value="resume.name"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    $emit('update:modelValue', ev.detail.value)
                  }
                  open = false
                }
              "
            >
              {{ resume.name }}
              <Icon
                name="lucide:check"
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    modelValue === resume.name ? 'opacity-100' : 'opacity-0',
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
