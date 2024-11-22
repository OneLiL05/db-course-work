import type { Skill } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const params = new URLSearchParams([
        ['order', 'asc'],
        ['sortBy', 'name'],
      ])

      const result = await axiosClient.get<Skill[]>('/skills', { params })

      return result.data
    },
  })
}
