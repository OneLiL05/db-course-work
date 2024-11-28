import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteJob = (id: number) => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete', 'job'],
    mutationFn: async () => {
      await axiosClient.delete(`/jobs/${id}`, { headers })
    },
  })
}
