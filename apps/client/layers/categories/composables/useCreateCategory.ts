import type { CREATE_CATEGORY_SCHEMA_TYPE, Category } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreateCategory = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (data: CREATE_CATEGORY_SCHEMA_TYPE) => {
      const result = await axiosClient.post<Category>('/categories', data, {
        headers,
      })

      return result.data
    },
  })
}
