<script lang="ts" setup>
import { compareStrings, type Job } from '@skill-swap/shared'
import { z } from 'zod'

const props = defineProps<{ job: Job }>()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string(),
    }),
  ),
})

const { mutateAsync, isPending, status } = useDeleteJob(props.job.id)

const onSubmit = handleSubmit(async () => {
  mutateAsync()
})

const isDisabled = computed(() => {
  return !compareStrings(props.job.name, values.name)
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="xs" class="w-full justify-start">
        Delete
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete category</DialogTitle>
        <DialogDescription>
          To approve that you understand all risks connected with deletion of
          the "{{ job.name }}" job. Please write category name to input.
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write job name..."
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
            variant="destructive"
            type="submit"
            :disabled="isDisabled || isSubmitting || isPending"
          >
            {{ status === 'pending' ? 'Deleting...' : 'Delete' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
