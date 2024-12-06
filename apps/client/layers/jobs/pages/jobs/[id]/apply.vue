<script lang="ts" setup>
import { CREATE_APPLICATION_SCHEMA, isStringEmpty } from '@skill-swap/shared'
import { buttonVariants } from '~/core/components/ui/button'

const id = useRouteParams('id')

const { data: resumes } = useUserResumes()

const resumeName = ref('')

const { mutateAsync, isPending } = useCreateApplication()

const { values, handleSubmit, setFieldValue } = useForm({
  validationSchema: toTypedSchema(CREATE_APPLICATION_SCHEMA),
  initialValues: {
    jobId: Number(id.value),
  },
})

const setResumeId = (value: string) => {
  const resumeId = resumes.value?.find((resume) => resume.name === value)?.id!

  setFieldValue('resumeId', resumeId)
}

const onSubmit = handleSubmit((values) => {
  mutateAsync(values)
})

const isDisabled = computed(() => {
  return isStringEmpty(values.coverLetter) || !values.resumeId
})
</script>

<template>
  <div class="flex flex-col w-[800px] mx-auto py-4 box-border">
    <Heading size="2">Apply for job</Heading>
    <form class="mt-4 space-y-3" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="coverLetter">
        <FormItem>
          <FormLabel>Cover letter</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write cover letter..."
              v-bind="componentField"
              autofocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="stageId">
        <FormItem>
          <FormLabel>Resume</FormLabel>
          <FormControl>
            <ResumesCombobox
              v-model="resumeName"
              :resumes
              @update:model-value="setResumeId"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="inline-flex gap-3">
        <NuxtLink
          :to="`/jobs/${id}`"
          :class="buttonVariants({ variant: 'outline' })"
        >
          Back
        </NuxtLink>
        <Button :disabled="isDisabled">
          {{ isPending ? 'Applying' : 'Apply' }}
        </Button>
      </div>
    </form>
  </div>
</template>
