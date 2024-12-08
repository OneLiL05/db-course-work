<script setup lang="ts">
import {
  JOB_FILTERS_SCHEMA,
  type JOB_FILTERS_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  EMPLOYMENT_TYPES,
  SALARY_CURRENCIES,
  SALARY_PERIODS,
  SUITABLE_FOR,
} from '../constants'
import { z } from 'zod'

const emits = defineEmits<{
  (
    e: 'submit',
    values: Omit<JOB_FILTERS_SCHEMA_TYPE, 'period' | 'search'>,
  ): void
  (e: 'reset'): void
}>()

const { handleSubmit, handleReset, values } = useForm({
  validationSchema: toTypedSchema(
    JOB_FILTERS_SCHEMA.omit({ search: true, period: true }).superRefine(
      (value, ctx) => {
        if (
          value &&
          value.maxAmount &&
          value.minAmount &&
          value.minAmount > value.maxAmount
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Min value can't be more than max one`,
          })
        }
      },
    ),
  ),
  initialValues: {
    employmentTypes: [],
    suitableFor: [],
    salaryPeriod: [],
    salaryCurrency: [],
  },
})

const onSubmit = handleSubmit((values) => {
  emits('submit', values)
})

const onReset = () => {
  handleReset()
  emits('reset')
}

const isDisabled = computed(() => {
  return (
    !values.employmentTypes?.length &&
    !values?.maxAmount &&
    !values?.minAmount &&
    !values.salaryCurrency?.length &&
    !values.salaryPeriod?.length &&
    !values.suitableFor?.length
  )
})
</script>

<template>
  <form class="w-full space-y-2" @submit="onSubmit">
    <FormField name="employmentTypes">
      <FormItem>
        <div class="mb-2">
          <FormLabel class="text-base">Employment types:</FormLabel>
        </div>
        <FormField
          v-for="item in EMPLOYMENT_TYPES"
          v-slot="{ value, handleChange }"
          :key="item.id"
          type="checkbox"
          :value="item.id"
          :unchecked-value="false"
          name="employmentTypes"
        >
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="value.includes(item.id)"
                @update:checked="handleChange"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="suitableFor">
      <FormItem>
        <div class="mb-2">
          <FormLabel class="text-base">Suitable for:</FormLabel>
        </div>
        <FormField
          v-for="item in SUITABLE_FOR"
          v-slot="{ value, handleChange }"
          :key="item.id"
          type="checkbox"
          :value="item.id"
          :unchecked-value="false"
          name="suitableFor"
        >
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="value.includes(item.id)"
                @update:checked="handleChange"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="salaryPeriod">
      <FormItem>
        <div class="mb-2">
          <FormLabel class="text-base">Salary period:</FormLabel>
        </div>
        <FormField
          v-for="item in SALARY_PERIODS"
          v-slot="{ value, handleChange }"
          :key="item.id"
          type="checkbox"
          :value="item.id"
          :unchecked-value="false"
          name="salaryPeriod"
        >
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="value.includes(item.id)"
                @update:checked="handleChange"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="salaryCurrency">
      <FormItem>
        <div class="mb-2">
          <FormLabel class="text-base">Salary currency:</FormLabel>
        </div>
        <FormField
          v-for="item in SALARY_CURRENCIES"
          v-slot="{ value, handleChange }"
          :key="item"
          type="checkbox"
          :value="item"
          :unchecked-value="false"
          name="salaryCurrency"
        >
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="value.includes(item)"
                @update:checked="handleChange"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="salaryAmount">
      <FormItem>
        <div class="mb-2">
          <FormLabel class="text-base">Salary currency:</FormLabel>
        </div>
        <FormField v-slot="{ componentField }" name="minAmount">
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Input placeholder="Min" type="number" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>
        <FormField v-slot="{ componentField }" name="maxAmount">
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Input placeholder="Max" type="number" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex flex-col gap-2 w-full justify-start">
      <Button type="submit" class="w-full" :disabled="isDisabled"
        >Submit</Button
      >
      <Button
        variant="outline"
        type="button"
        class="w-full"
        @click="onReset"
        :disabled="isDisabled"
      >
        Reset
      </Button>
    </div>
  </form>
</template>
