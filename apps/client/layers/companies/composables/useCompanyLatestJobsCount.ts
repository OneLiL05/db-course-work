import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCompanyLatestJobsCount = (companyId: number) => {
  return useQuery({
    queryKey: ['companies', companyId, 'jobs', 'latest', 'count'],
    queryFn: async () => {
      const result = await axiosClient.get<{ count: number }>(
        `/companies/${companyId}/jobs/latest/count`,
      )

      return result.data
    },
  })
}
