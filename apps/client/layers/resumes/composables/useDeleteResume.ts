import type { Resume } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteResume = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete', 'resume'],
    mutationFn: async (id: number) => {
      const result = await axiosClient.delete<Resume>(`/resumes/${id}`, {
        headers,
      })

      return result.data
    },
  })
}
