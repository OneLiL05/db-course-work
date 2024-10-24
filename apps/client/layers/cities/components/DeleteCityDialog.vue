<script lang="ts" setup>
import {
  CREATE_CITY_SCHEMA,
  compareStrings,
  isStringEmpty,
  type City,
} from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps<{ city: City }>()

const { mutateAsync, status, isPending } = useDeleteCity()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_CITY_SCHEMA),
})

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
      <Button class="ml-4" variant="destructive" size="icon">
        <Icon class="size-4" name="mynaui:trash" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete position</DialogTitle>
        <DialogDescription>
          To approve that you understand all risks connected with deletion of
          the city. Please write position name to input.
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
