<script lang="ts" setup>
import { CREATE_CITY_SCHEMA } from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_CITY_SCHEMA),
})

const { mutateAsync, status, isError, error, isPending } = useCreateCity()

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
        <DialogTitle>Create city</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write city name..."
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
