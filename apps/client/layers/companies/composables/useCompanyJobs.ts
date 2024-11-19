import type { ViewableJob } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useCompanyJobs = (companyId: number) => {
  return useAsyncData(`companies/${companyId}/jobs`, async () => {
    const result = await axiosClient.get<ViewableJob[]>(
      `/companies/${companyId}/jobs`,
    )

    return result.data
  })
}
