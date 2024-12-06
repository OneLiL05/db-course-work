import type { CompanyEmployee } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCompanyEmployees = (id: number) => {
  return useQuery({
    queryKey: ['companies', id, 'employees'],
    queryFn: async () => {
      const result = await axiosClient.get<CompanyEmployee[]>(
        `/companies/${id}/employees`,
      )

      return result.data
    },
  })
}
