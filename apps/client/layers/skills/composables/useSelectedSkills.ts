import type { SelectedSkill } from '../types'

export const useSelectedSkills = () => {
  const selectedSkills = ref<SelectedSkill[]>([])

  const addSkill = (skill: SelectedSkill) => {
    selectedSkills.value.push(skill)
  }

  const removeSkill = (skill: SelectedSkill) => {
    const index = selectedSkills.value.indexOf(skill)

    if (index > -1) {
      selectedSkills.value.splice(index, 1)
    }
  }

  return { selectedSkills, addSkill, removeSkill }
}
