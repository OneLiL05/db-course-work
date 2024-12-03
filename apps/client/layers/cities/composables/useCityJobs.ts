import type { JOB_FILTERS_SCHEMA_TYPE, Job } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCityJobs = (
  id: number,
  params: Ref<JOB_FILTERS_SCHEMA_TYPE | undefined>,
) => {
  return useQuery({
    queryKey: ['cities', id, 'jobs', params],
    queryFn: async () => {
      const result = await axiosClient.get<Job[]>(`/cities/${id}/jobs`, {
        params: {
          employmentTypes: params.value?.employmentTypes,
          salaryPeriod: params.value?.salaryPeriod,
          salaryCurrency: params.value?.salaryCurrency,
          salaryAmount: params.value?.salaryAmount,
          suitableFor: params.value?.suitableFor,
          search: params.value?.search,
          period: params.value?.period,
        },
        paramsSerializer: {
          indexes: null,
        },
      })

      return result.data
    },
  })
}
