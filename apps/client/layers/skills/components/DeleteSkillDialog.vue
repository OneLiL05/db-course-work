<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import {
  CREATE_SKILL_SCHEMA,
  compareStrings,
  isStringEmpty,
  type Skill,
} from '@skill-swap/shared'

const props = defineProps<{ skill: Skill }>()

const { mutateAsync, status, isPending } = useDeleteSkill()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_SKILL_SCHEMA),
})

const onSubmit = handleSubmit((data) => {
  mutateAsync({ id: props.skill.id, ...data })
})

const isDisabled = computed(
  () =>
    isStringEmpty(values.name) ||
    !compareStrings(props.skill.name, values.name),
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
        <DialogTitle>Delete position</DialogTitle>
        <DialogDescription>
          To approve that you understand all risks connected with deletion of
          the skill. Please write skill name to input.
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write skill name..."
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
