import type { Category } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: async () => {
      const result = await axiosClient.get<Category>(`/categories/${id}`)

      return result.data
    },
  })
}
