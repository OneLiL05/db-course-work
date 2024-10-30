import type { Skill, UPDATE_SKILL_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUpdateSkill = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['update-skill'],
    mutationFn: async ({ id, name }: UPDATE_SKILL_SCHEMA_TYPE) => {
      const result = await axiosClient.put<Skill>(
        `/skills/${id}`,
        { name },
        { headers },
      )

      return result.data
    },
  })
}
