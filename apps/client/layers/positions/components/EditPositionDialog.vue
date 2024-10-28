<script lang="ts" setup>
import {
  CREATE_POSITION_SCHEMA,
  compareStrings,
  isStringEmpty,
  type Position,
} from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps<{ position: Position }>()

const { mutateAsync, isPending, status } = useUpdatePosition()

const name = ref(props.position.name)

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(CREATE_POSITION_SCHEMA),
  initialValues: {
    name: name.value,
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
    <DialogTrigger as-child>
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
                :disabled="isSubmitting"
                v-bind="componentField"
                v-model="name"
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
