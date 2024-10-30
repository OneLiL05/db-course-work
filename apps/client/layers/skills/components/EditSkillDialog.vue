<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import {
  CREATE_POSITION_SCHEMA,
  compareStrings,
  isStringEmpty,
  type Skill,
} from '@skill-swap/shared'

const props = defineProps<{ skill: Skill }>()

const { mutateAsync, isPending, status } = useUpdateSkill()

const name = ref(props.skill.name)

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(CREATE_POSITION_SCHEMA),
  initialValues: {
    name: name.value,
  },
})

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.skill.id, ...data })
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) || compareStrings(props.skill.name, values.name),
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
        <DialogTitle>Edit skill</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write skill name..."
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
