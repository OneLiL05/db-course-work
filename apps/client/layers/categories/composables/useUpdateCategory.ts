import type { Category, UPDATE_CATEGORY_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUpdateCategory = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['update-category'],
    mutationFn: async ({ id, name }: UPDATE_CATEGORY_SCHEMA_TYPE) => {
      const result = await axiosClient.put<Category>(
        `/categories/${id}`,
        { name },
        { headers },
      )

      return result.data
    },
  })
}
