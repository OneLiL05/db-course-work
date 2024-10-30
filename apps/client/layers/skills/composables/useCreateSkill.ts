import type { CREATE_SKILL_SCHEMA_TYPE, Skill } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreateSkill = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['create-skill'],
    mutationFn: async (data: CREATE_SKILL_SCHEMA_TYPE) => {
      const result = await axiosClient.post<Skill>('/skills', data, { headers })

      return result.data
    },
  })
}
