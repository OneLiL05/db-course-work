import type { Skill } from '@skill-swap/shared'

export const useSkills = () => {
  const config = useRuntimeConfig()

  return useAsyncData('skills', async () => {
    const url = `${config.public.apiUrl}/skills`

    const skills = await $fetch<Skill[]>(url)

    return skills
  })
}
