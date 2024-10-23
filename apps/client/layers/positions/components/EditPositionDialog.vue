<script lang="ts" setup>
import {
  CREATE_POSITION_SCHEMA,
  compareStrings,
  isStringEmpty,
  type Position,
} from '@skill-swap/shared'

const props = defineProps<{ position: Position }>()

const { mutateAsync, isPending, status } = useUpdatePosition()

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(CREATE_POSITION_SCHEMA),
  initialValues: {
    name: props.position.name,
  },
})

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.position.id, ...data })
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) ||
    compareStrings(props.position.name, values.name),
)
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button variant="outline" size="icon" class="mr-2">
        <Icon class="size-4" name="mynaui:pencil" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit position</DialogTitle>
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
            {{ status === 'pending' ? 'Updating...' : 'Update' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
