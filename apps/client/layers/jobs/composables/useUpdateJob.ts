import type { UPDATE_JOB_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUpdateJob = (id: number) => {
  const router = useRouter()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['update', 'job', id],
    mutationFn: async (data: UPDATE_JOB_SCHEMA_TYPE) => {
      await axiosClient.put(`/jobs/${id}`, data, { headers })
    },
    onSuccess() {
      router.push(`/jobs/${id}`)
    },
  })
}
