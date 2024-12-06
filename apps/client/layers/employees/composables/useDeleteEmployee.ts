import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteEmployee = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete', 'employee'],
    mutationFn: async (id: number) => {
      await axiosClient.delete(`/employees/${id}`, { headers })
    },
  })
}
