import type { Job } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useJob = (jobId: number) => {
  return useAsyncData(`jobs/${jobId}`, async () => {
    const result = await axiosClient.get<Job>(`/jobs/${jobId}`)

    return result.data
  })
}
