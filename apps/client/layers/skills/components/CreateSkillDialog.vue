<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import { CREATE_SKILL_SCHEMA } from '@skill-swap/shared'

const { mutateAsync, status, isError, error, isPending } = useCreateSkill()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_SKILL_SCHEMA),
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
        <DialogTitle>Create skill</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write skill name..."
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
