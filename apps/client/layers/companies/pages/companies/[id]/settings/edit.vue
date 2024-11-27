<script lang="ts" setup>
import {
  CREATE_COMPANY_SCHEMA,
  isStringEmpty,
  compareStrings,
} from '@skill-swap/shared'

definePageMeta({
  layout: 'employer',
})

const id = useRouteParams('id')

const { data: company } = useCompany(Number(id.value))

const { mutateAsync, isPending } = useUpdateCompany(Number(id.value))

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(CREATE_COMPANY_SCHEMA),
  initialValues: company.value,
})

const isDisabled = computed(() => {
  return (
    (compareStrings(values.name, company.value?.name) &&
      compareStrings(values.description, company.value?.description)) ||
    (isStringEmpty(values.name) && isStringEmpty(values.description)) ||
    isPending.value
  )
})

const onSubmit = handleSubmit(async (data) => {
  console.log(data)

  mutateAsync(data)
})
</script>

<template>
  <Heading size="2">Edit company</Heading>
  <form class="flex flex-col w-full space-y-3" @submit="onSubmit">
    <FormField name="name" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Write company name..."
            v-bind="componentField"
            autofocus
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="description" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            type="text"
            placeholder="Write company description..."
            v-bind="componentField"
            autofocus
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="inline-flex w-full mt-4 gap-4">
      <Button :disabled="isDisabled">
        {{ isPending ? 'Editing' : 'Edit' }}
      </Button>
      <DeleteCompanyDialog :company />
    </div>
  </form>
</template>
