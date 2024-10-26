import type { Company } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useCompany = (id: number) => {
  return useAsyncData(`companies/${id}`, async () => {
    const result = await axiosClient.get<Company>(`/companies/${id}`)

    return result.data
  })
}
