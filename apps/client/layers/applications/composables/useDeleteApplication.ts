import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteApplications = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete', 'application'],
    mutationFn: async (id: number) => {
      await axiosClient.delete(`/applications/${id}`, { headers })
    },
  })
}
