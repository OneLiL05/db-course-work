<script lang="ts" setup>
import {
  CREATE_CITY_SCHEMA,
  compareStrings,
  isStringEmpty,
  type City,
} from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps<{ city: City }>()

const { mutateAsync, status, isPending, error, isError } = useDeleteCity()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_CITY_SCHEMA),
})

const formError = getFormError({ error, isError })

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.city.id, ...data })
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) || !compareStrings(props.city.name, values.name),
)
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
        <DialogTitle>Delete city</DialogTitle>
        <DialogDescription>
          To approve that you understand all risks connected with deletion of
          the "{{ city.name }}" city. Please write city name to input.
        </DialogDescription>
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
        <p v-if="formError" class="text-destructive">{{ formError }}</p>
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
