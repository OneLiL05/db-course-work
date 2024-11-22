import type { Category } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const params = new URLSearchParams([
        ['order', 'asc'],
        ['sortBy', 'name'],
      ])

      const result = await axiosClient.get<Category>('/categories', { params })

      return result.data
    },
  })
}
