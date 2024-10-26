import type { CREATE_JOB_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreateJob = (companyId: number) => {
  const router = useRouter()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['create-job'],
    mutationFn: async (data: CREATE_JOB_SCHEMA_TYPE) => {
      await axiosClient.post(`/companies/${companyId}/jobs`, data, { headers })
    },
    onSuccess() {
      router.push({ path: `/companies/${companyId}/settings/jobs` })
    },
    onError(error) {
      console.log(error)
    },
  })
}
