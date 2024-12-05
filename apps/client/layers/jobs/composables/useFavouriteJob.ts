import type { Job } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useFavouriteJob = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['favourite', 'job'],
    mutationFn: async (id: number) => {
      console.log(id)

      const result = await axiosClient.post<Job>(
        `/jobs/${id}/favourite`,
        {},
        {
          headers,
        },
      )

      return result.data
    },
  })
}
