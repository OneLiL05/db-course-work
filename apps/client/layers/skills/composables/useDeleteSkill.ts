import type { GET_BY_ID_SCHEMA_TYPE, Skill } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteSkill = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete-skill'],
    mutationFn: async ({ id }: GET_BY_ID_SCHEMA_TYPE) => {
      const result = await axiosClient.delete<Skill>(`/skills/${id}`, {
        headers,
      })

      return result.data
    },
  })
}
