<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import {
  CREATE_CATEGORY_SCHEMA,
  compareStrings,
  isStringEmpty,
  type Category,
} from '@skill-swap/shared'

const props = defineProps<{ category: Category }>()

const { mutateAsync, isPending, status } = useUpdateCategory()

const name = ref(props.category.name)

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(CREATE_CATEGORY_SCHEMA),
  initialValues: {
    name: name.value,
  },
})

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.category.id, ...data })
  console.log(data)
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) ||
    compareStrings(props.category.name, values.name),
)
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="xs" class="w-full justify-start">
        Edit
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit category</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write city name..."
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
            {{ status === 'pending' ? 'Editing...' : 'Edit' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
