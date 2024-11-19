import type { ViewableJob } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useJob = (jobId: number) => {
  return useAsyncData(`jobs/${jobId}`, async () => {
    const result = await axiosClient.get<ViewableJob>(`/jobs/${jobId}`)

    return result.data
  })
}
