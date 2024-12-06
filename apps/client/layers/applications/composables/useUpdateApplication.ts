import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUpdateApplication = () => {
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['update', 'application'],
    mutationFn: async ({ id, stageId }: { id: number; stageId: number }) => {
      await axiosClient.put(`/applications/${id}`, { stageId }, { headers })
    },
  })
}
