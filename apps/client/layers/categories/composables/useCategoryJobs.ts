import type { JOB_FILTERS_SCHEMA_TYPE, Job } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCategoryJobs = (
  id: number,
  params: Ref<JOB_FILTERS_SCHEMA_TYPE | undefined>,
) => {
  return useQuery({
    queryKey: ['categories', id, 'jobs', params],
    queryFn: async () => {
      const result = await axiosClient.get<Job[]>(`/categories/${id}/jobs`, {
        params: params.value,
        paramsSerializer: {
          indexes: null,
        },
      })

      return result.data
    },
  })
}
