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

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(CREATE_CITY_SCHEMA),
  initialValues: {
    name: props.city.name,
  },
})

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.city.id, ...data })
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) || compareStrings(props.city.name, values.name),
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
            {{ status === 'pending' ? 'Editing...' : 'Edit' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
