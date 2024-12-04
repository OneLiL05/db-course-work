import type { PositionWithCount } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const usePositionsWithJobsCount = () => {
  return useQuery({
    queryKey: ['positions', 'jobs', 'count'],
    queryFn: async () => {
      const params = new URLSearchParams([
        ['order', 'asc'],
        ['sortBy', 'name'],
      ])

      const result = await axiosClient.get<PositionWithCount[]>(
        '/positions/jobs/count',
        { params },
      )

      return result.data
    },
  })
}
