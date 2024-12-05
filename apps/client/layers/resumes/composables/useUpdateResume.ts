import type { Resume } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUpdateResume = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationFn: async ({
      id,
      name,
      file,
    }: {
      id: number
      name: string
      file: File | null
    }) => {
      const result = await axiosClient.put<Resume>(
        `/resumes/${id}`,
        { name, file },
        { headers: { 'content-type': 'multipart/form-data', ...headers } },
      )

      return result.data
    },
  })
}
