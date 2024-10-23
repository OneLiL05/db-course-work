<script lang="ts" setup>
import {
  CREATE_POSITION_SCHEMA,
  compareStrings,
  isStringEmpty,
  type Position,
} from '@skill-swap/shared'

const props = defineProps<{ position: Position }>()

const { mutateAsync, status, isPending } = useDeletePosition()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_POSITION_SCHEMA),
})

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.position.id, ...data })
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) ||
    !compareStrings(props.position.name, values.name),
)
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="ml-4" variant="destructive" size="icon">
        <Icon class="size-4" name="mynaui:trash" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete position</DialogTitle>
        <DialogDescription>
          To approve that you understand all risks connected with deletion of
          the position. Please write position name to input.
        </DialogDescription>
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
