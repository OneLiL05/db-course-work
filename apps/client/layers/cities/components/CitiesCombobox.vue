<script setup lang="ts">
import type { City } from '@skill-swap/shared'
import { cn } from '~/core/lib/utils'

const props = defineProps<{
  modelValue?: string
  defaultValue?: string
  cities: City[] | undefined
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
            ? cities?.find((city) => city.name === modelValue)?.name
            : 'Select skill'
        }}
        <Icon
          name="lucide:chevrons-up-down"
          class="ml-2 h-4 w-4 shrink-0 opacity-50"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 no-scrollbar" align="start">
      <Command>
        <CommandInput class="h-9" placeholder="Search city..." />
        <CommandEmpty>No city found.</CommandEmpty>
        <CommandList>
          <CommandGroup v-if="cities">
            <CommandItem
              v-for="city in cities"
              :key="city.id"
              :value="city.name"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    $emit('update:modelValue', ev.detail.value)
                  }
                  open = false
                }
              "
            >
              {{ city.name }}
              <Icon
                name="lucide:check"
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    modelValue === city.name ? 'opacity-100' : 'opacity-0',
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
