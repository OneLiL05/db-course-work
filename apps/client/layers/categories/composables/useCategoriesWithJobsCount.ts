import type { CategoryWithCount } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCategoriesWithJobsCount = () => {
  return useQuery({
    queryKey: ['categories', 'jobs', 'count'],
    queryFn: async () => {
      const params = new URLSearchParams([
        ['order', 'asc'],
        ['sortBy', 'name'],
      ])

      const result = await axiosClient.get<CategoryWithCount[]>(
        '/categories/jobs/count',
        { params },
      )

      return result.data
    },
  })
}
