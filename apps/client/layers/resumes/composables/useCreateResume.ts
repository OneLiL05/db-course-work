import type { Resume } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreateResume = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationFn: async ({ name, file }: { name: string; file: File }) => {
      const result = await axiosClient.post<Resume>(
        '/resumes',
        { name, file },
        { headers: { 'content-type': 'multipart/form-data', ...headers } },
      )

      return result.data
    },
  })
}
