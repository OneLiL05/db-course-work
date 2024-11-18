import type { SkillLevel } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useSkillsLevels = () => {
  return useQuery({
    queryKey: ['skill-levels'],
    queryFn: async () => {
      const result = await axiosClient.get<SkillLevel[]>('/skills/levels')

      return result.data
    },
  })
}
