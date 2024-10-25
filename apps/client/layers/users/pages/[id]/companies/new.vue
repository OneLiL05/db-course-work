<script lang="ts" setup>
import { CREATE_COMPANY_SCHEMA, isStringEmpty } from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'
import { buttonVariants } from '~/core/components/ui/button'

useHead({
  title: 'Create company',
})

const { user } = useAuthStore()

const { mutateAsync, isPending } = useCreateCompany()

const { values, isSubmitting, handleSubmit } = useForm({
  validationSchema: toTypedSchema(CREATE_COMPANY_SCHEMA),
})

const onSubmit = handleSubmit((data) => {
  mutateAsync(data)
})

const isDisabled = computed(
  () => isStringEmpty(values.name) || isStringEmpty(values.description),
)
</script>

<template>
  <section class="flex flex-col w-[800px] mx-auto py-5 box-border">
    <Heading size="2">Create company</Heading>
    <form class="space-y-3 my-5" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem v-auto-animate>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Write company name..."
              v-bind="componentField"
              autofocus
              :disabled="isSubmitting"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem v-auto-animate>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write company description..."
              v-bind="componentField"
              :disabled="isSubmitting"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="inline-flex gap-4">
        <NuxtLink
          :to="`/${user?.id}/companies`"
          :class="buttonVariants({ variant: 'secondary' })"
        >
          Back
        </NuxtLink>
        <Button :disabled="isDisabled || isSubmitting || isPending">
          {{ isPending ? 'Creating...' : 'Create' }}
        </Button>
      </div>
    </form>
  </section>
</template>
