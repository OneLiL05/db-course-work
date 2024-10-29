<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import { CREATE_CATEGORY_SCHEMA } from '@skill-swap/shared'

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_CATEGORY_SCHEMA),
})

const { mutateAsync, status, isError, error, isPending } = useCreateCategory()

const formError = getFormError({ isError, error })

const isDisabled = computed(() => !values.name?.trim().length)

const onSubmit = handleSubmit((data) => {
  mutateAsync(data)
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="gap-2">
        <Icon class="size-5" name="mynaui:plus-circle" />
        New
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create category</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write category name..."
                v-bind="componentField"
                autofocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter>
          <Button
            type="submit"
            :disabled="isDisabled || isSubmitting || isPending"
          >
            {{ status === 'pending' ? 'Creating...' : 'Create' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
