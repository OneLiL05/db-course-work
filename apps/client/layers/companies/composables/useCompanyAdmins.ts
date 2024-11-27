import type { CompanyAdmin } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCompanyAdmins = (id: number) => {
  return useQuery({
    queryKey: ['companies', id, 'admins'],
    queryFn: async () => {
      const result = await axiosClient.get<CompanyAdmin[]>(
        `/companies/${id}/admins`,
      )

      return result.data
    },
  })
}
