<script lang="ts" setup>
import { CREATE_POSITION_SCHEMA } from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'

const { mutateAsync, status, isError, error, isPending } = useCreatePosition()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_POSITION_SCHEMA),
})

const onSubmit = handleSubmit((data) => {
  mutateAsync(data)
})

const isDisabled = computed(() => !values.name?.trim().length)

const formError = getFormError({ isError, error })
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
        <DialogTitle>Create position</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write positions name..."
                v-bind="componentField"
                :disabled="isSubmitting"
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
