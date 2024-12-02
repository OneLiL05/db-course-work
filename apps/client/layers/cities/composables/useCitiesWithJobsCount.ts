import type { CityWithCount } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCitiesWithJobsCount = () => {
  return useQuery({
    queryKey: ['cities', 'jobs', 'count'],
    queryFn: async () => {
      const params = new URLSearchParams([
        ['order', 'asc'],
        ['sortBy', 'name'],
      ])

      const result = await axiosClient.get<CityWithCount[]>(
        '/cities/jobs/count',
        { params },
      )

      return result.data
    },
  })
}
