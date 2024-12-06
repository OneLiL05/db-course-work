import type { ApplicationStages, CompanyApplication } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCompanyApplications = (
  id: number,
  stage: Ref<ApplicationStages>,
) => {
  const headers = useAuthHeaders()

  return useQuery({
    queryKey: ['companies', id, 'applications', stage],
    queryFn: async () => {
      const result = await axiosClient.get<CompanyApplication[]>(
        `/companies/${id}/applications`,
        {
          params: { stage: stage.value },
          headers,
        },
      )

      return result.data
    },
  })
}
