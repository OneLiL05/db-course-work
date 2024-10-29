import type { Category, GET_BY_ID_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteCategory = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete-category'],
    mutationFn: async ({ id }: GET_BY_ID_SCHEMA_TYPE) => {
      const result = await axiosClient.delete<Category>(`/categories/${id}`, {
        headers,
      })

      return result.data
    },
  })
}
