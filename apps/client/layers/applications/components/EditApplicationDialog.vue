<script lang="ts" setup>
import { UPDATE_APPLICATION_SCHEMA, type Application } from '@skill-swap/shared'

const props = defineProps<{ application: Application }>()

const stage = ref<string>((props.application.stageId - 1).toString())

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: toTypedSchema(UPDATE_APPLICATION_SCHEMA),
  initialValues: {
    stageId: props.application.stageId,
  },
})

const { mutateAsync, isPending } = useUpdateApplication()

const setStageId = (value: string) => {
  setFieldValue('stageId', +value + 1)
}

const onSubmit = handleSubmit((values) => {
  mutateAsync({ id: props.application.id, ...values })
})

const isDisabled = computed(() => values.stageId === props.application.stageId)
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
        <DialogTitle>Edit application</DialogTitle>
      </DialogHeader>
      <form class="space-y-3" @submit="onSubmit">
        <FormField name="stageId">
          <FormItem>
            <FormLabel>Stage</FormLabel>
            <FormControl>
              <ApplicationStagesSelect
                v-model="stage"
                @update:model-value="setStageId"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter>
          <Button :disabled="isDisabled">
            {{ isPending ? 'Editing' : 'Edit' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
