<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { CREATE_JOB_SCHEMA, isStringEmpty } from '@skill-swap/shared'
import { buttonVariants } from '~/core/components/ui/button'

definePageMeta({
  layout: 'employer',
})

const id = useRouteParams('id')

const { mutateAsync, isPending } = useCreateJob(Number(id))

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(CREATE_JOB_SCHEMA),
  initialValues: {
    isCvRequired: false,
    isFulltime: false,
    isRemote: false,
    areStudentsAllowed: false,
  },
})

const onSubmit = handleSubmit(async (data) => {
  console.log(data)
})

const isDisabled = computed(() => {
  return isStringEmpty(values.name)
})
</script>
<template>
  <Heading size="2">Create job</Heading>
  <form class="flex flex-col w-full space-y-3 mt-4" @submit="onSubmit">
    <div class="inline-flex w-full gap-5">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Write job name..."
              v-bind="componentField"
              autofocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="salary.amount">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Salary</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Write job salary..."
              v-bind="componentField"
              autofocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="salary.currency">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <CurrencySelect v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem v-auto-animate>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Write job description..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="inline-flex w-full gap-5">
      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <CategoriesSelect v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="positionId">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Position</FormLabel>
          <FormControl>
            <PositionsSelect v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="cityId">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>City</FormLabel>
          <FormControl>
            <CitiesSelect v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="isCvRequired"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Is CV required?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="isFulltime"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Is fulltime?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="isRemote">
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Is remote?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="areStudentsAllowed"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Are students allowed?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <div class="inline-flex w-full gap-4">
      <NuxtLink
        :class="buttonVariants({ variant: 'outline' })"
        :to="`/companies/${id}/settings/jobs`"
      >
        Back
      </NuxtLink>
      <Button type="submit" :disabled="isPending || isDisabled">
        Create
      </Button>
    </div>
  </form>
</template>
