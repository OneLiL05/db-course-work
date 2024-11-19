import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCompanyJobsCount = (companyId: number) => {
  return useQuery({
    queryKey: ['companies', companyId, 'jobs', 'count'],
    queryFn: async () => {
      const result = await axiosClient.get<{ count: number }>(
        `/companies/${companyId}/jobs/count`,
      )

      return result.data
    },
  })
}
