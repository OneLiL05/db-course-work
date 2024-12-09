import type { PositionWithCount } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useTopPositions = () => {
  return useQuery({
    queryKey: ['positions', 'top', 5, 'jobs'],
    queryFn: async () => {
      const result =
        await axiosClient.get<PositionWithCount[]>('/positions/top')

      return result.data
    },
  })
}
