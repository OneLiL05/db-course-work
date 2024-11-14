<script lang="ts" setup>
import {
  CREATE_CITY_SCHEMA,
  compareStrings,
  isStringEmpty,
  type City,
} from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps<{ city: City }>()

const { mutateAsync, isPending, status } = useUpdateCity()

const name = ref(props.city.name)

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(CREATE_CITY_SCHEMA),
  initialValues: {
    name: name.value,
  },
})

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.city.id, ...data })
  console.log(data)
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) || compareStrings(props.city.name, values.name),
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
        <DialogTitle>Edit city</DialogTitle>
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
