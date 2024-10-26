import type { Job } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useCompanyJobs = (companyId: number) => {
  return useAsyncData(`companies/${companyId}/jobs`, async () => {
    const result = await axiosClient.get<Job[]>(`/companies/${companyId}/jobs`)

    return result.data
  })
}
