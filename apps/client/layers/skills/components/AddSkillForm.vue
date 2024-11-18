<script lang="ts" setup>
import { isStringEmpty } from '@skill-swap/shared'
import { SKILL_LEVELS } from '../constants'
import type { SelectedSkill } from '../types'
import SkillsCombobox from './SkillsCombobox.vue'

defineProps<{ selectedSkills: SelectedSkill[] }>()

const emits = defineEmits<{
  add: [skill: SelectedSkill]
  remove: [skill: SelectedSkill]
}>()

const { data: skills } = useSkills()

const skillName = ref('')
const skillLevel = ref('')

const handleSubmit = () => {
  const selectedSkill: SelectedSkill = {
    skillId: skills.value?.find((skill) => skill.name === skillName.value)
      ?.id as number,
    skillLevelId: +skillLevel.value,
    label: skillName.value,
  }

  emits('add', selectedSkill)

  skillLevel.value = ''
  skillName.value = ''
}

const isDisabled = computed(() => {
  return isStringEmpty(skillLevel.value) || isStringEmpty(skillName.value)
})
</script>

<template>
  <div class="inline-flex w-full gap-2">
    <SkillsCombobox v-model="skillName" :skills />
    <SkillLevelsSelect v-model="skillLevel" />
    <Button
      type="button"
      class="!w-10"
      size="icon"
      @click="handleSubmit"
      :disabled="isDisabled"
    >
      <Icon name="lucide:plus" />
    </Button>
  </div>
  <div v-if="selectedSkills.length" class="flex flex-col w-full gap-2">
    <div
      v-for="skill in selectedSkills"
      :key="skill.label.toLowerCase()"
      class="inline-flex w-full items-center justify-between border border-muted p-3 box-border rounded-md"
    >
      <div class="inline-flex items-center gap-5 justify-start">
        <div
          aria-hidden="true"
          class="flex items-center justify-center size-10 rounded-md bg-muted"
        >
          <Icon name="lucide:test-tube" />
        </div>
        {{ skill.label }}
      </div>
      <div class="inline-flex items-center gap-5 justify-end">
        <Badge>Level: {{ SKILL_LEVELS[+skill.skillLevelId - 1] }}</Badge>
        <Button
          variant="destructive"
          size="icon"
          type="button"
          @click="$emit('remove', skill)"
        >
          <Icon name="lucide:trash" />
        </Button>
      </div>
    </div>
  </div>
</template>
