<script lang="ts" setup>
import {
  UPDATE_JOB_SCHEMA,
  isStringEmpty,
  type JobSkill,
} from '@skill-swap/shared'
import { vAutoAnimate } from '@formkit/auto-animate'
import EditSkilsForm from '~/layers/skills/components/EditSkilsForm.vue'

const id = useRouteParams('id')

const { data: job } = await useJob(Number(id.value))

const existedSkills = ref(job.value?.skills!)
const skillsToRemove = ref<{ id: number }[]>([])
const { selectedSkills, addSkill, removeSkill } = useSelectedSkills()

const { mutateAsync, isPending, error, isError } = useUpdateJob(
  Number(id.value),
)

const { handleSubmit, values, errors, setFieldError } = useForm({
  validationSchema: toTypedSchema(UPDATE_JOB_SCHEMA),
  initialValues: {
    ...job.value,
    removeSkills: [],
    addSkills: [],
  },
})

const onSubmit = handleSubmit(async (data) => {
  mutateAsync({
    ...data,
    removeSkills: skillsToRemove.value,
    addSkills: selectedSkills.value,
  })
})

const isDisabled = computed(() => {
  return isStringEmpty(values.name)
})

const removeExisted = (skill: JobSkill) => {
  const index = existedSkills.value.indexOf(skill)

  if (index > -1) {
    existedSkills.value.splice(index, 1)
    skillsToRemove.value.push({ id: skill.id })
  }
}
</script>

<template>
  <div class="flex flex-col w-[1000px] mx-auto py-4 box-border">
    <Heading size="2">Edit job</Heading>
    <form class="flex flex-col w-full space-y-3 mt-4" @submit="onSubmit">
      <div class="inline-flex w-full gap-5">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="w-full" v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Write job name..."
                v-bind="componentField"
                autofocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="salary.amount">
          <FormItem class="w-full" v-auto-animate>
            <FormLabel>Salary</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Write job salary..."
                v-bind="componentField"
                autofocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="salary.currency">
          <FormItem class="w-full" v-auto-animate>
            <FormLabel>Currency</FormLabel>
            <FormControl>
              <CurrencySelect v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="salary.period">
          <FormItem class="w-full" v-auto-animate>
            <FormLabel>Period</FormLabel>
            <FormControl>
              <PeriodSelect v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem v-auto-animate>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write job description..."
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="inline-flex w-full gap-5">
        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem class="w-full" v-auto-animate>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <CategoriesSelect v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="positionId">
          <FormItem class="w-full" v-auto-animate>
            <FormLabel>Position</FormLabel>
            <FormControl>
              <PositionsSelect v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="cityId">
          <FormItem class="w-full" v-auto-animate>
            <FormLabel>City</FormLabel>
            <FormControl>
              <CitiesSelect
                v-bind="componentField"
                v-model="componentField.modelValue"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField
        v-slot="{ value, handleChange }"
        type="checkbox"
        name="isCvRequired"
      >
        <FormItem
          class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>Is CV required?</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ value, handleChange }"
        type="checkbox"
        name="isFulltime"
      >
        <FormItem
          class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>Is fulltime?</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ value, handleChange }"
        type="checkbox"
        name="isRemote"
      >
        <FormItem
          class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>Is remote?</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ value, handleChange }"
        type="checkbox"
        name="areStudentsAllowed"
      >
        <FormItem
          class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>Are students allowed?</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <div class="flex flex-col w-full gap-3 pt-2 border-t border-muted">
        <Heading size="4">Skills</Heading>
        <EditSkilsForm
          :existed-skills
          :selected-skills
          @add-selected="addSkill"
          @remove-selected="removeSkill"
          @remove-existed="removeExisted"
        />
        <!-- <AddSkillForm
        :selected-skills="selectedSkills"
        @add="addSkill"
        @remove="removeSkill"
      />
      <p v-if="errors.skills" class="text-sm font-medium text-destructive">
        {{ errors.skills }}
      </p> -->
      </div>
      <div class="inline-flex w-full gap-4">
        <Button type="submit" :disabled="isPending || isDisabled">
          Create
        </Button>
      </div>
    </form>
  </div>
</template>
