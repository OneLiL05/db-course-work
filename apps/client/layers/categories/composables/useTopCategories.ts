import type { CategoryWithCount } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useTopCategories = () => {
  return useQuery({
    queryKey: ['categories', 'top', 5, 'jobs'],
    queryFn: async () => {
      const result =
        await axiosClient.get<CategoryWithCount[]>('/categories/top')

      return result.data
    },
  })
}
