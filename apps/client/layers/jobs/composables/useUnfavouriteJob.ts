import type { Job } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUnfavouriteJob = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['unfavourite', 'job'],
    mutationFn: async (id: number) => {
      const result = await axiosClient.delete<Job>(`/jobs/${id}/unfavourite`, {
        headers,
      })

      return result.data
    },
  })
}
