<script lang="ts" setup>
import {
  JOB_FILTERS_SCHEMA,
  type JOB_FILTERS_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { FILTER_PERIODS } from '../constants'

const emits = defineEmits<{
  (
    e: 'submit',
    values: Pick<JOB_FILTERS_SCHEMA_TYPE, 'search' | 'period'>,
  ): void
  (e: 'reset'): void
}>()

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(
    JOB_FILTERS_SCHEMA.pick({ search: true, period: true }),
  ),
  initialValues: {
    search: '',
  },
})

const onSubmit = handleSubmit((values) => {
  console.log(values)

  emits('submit', values)
})
</script>

<template>
  <form @submit="onSubmit" class="inline-flex w-full gap-3">
    <FormField v-slot="{ componentField }" name="period">
      <FormItem>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger class="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="{ id, label } in FILTER_PERIODS"
                :key="id"
                :value="id"
                >{{ label }}</SelectItem
              >
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="search">
      <FormItem class="w-full">
        <FormControl>
          <Input
            type="text"
            placeholder="Write search query..."
            v-bind="componentField"
          />
        </FormControl>
      </FormItem>
    </FormField>
    <Button>Search</Button>
  </form>
</template>
