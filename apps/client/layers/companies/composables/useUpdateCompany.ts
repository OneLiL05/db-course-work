import type { CREATE_COMPANY_SCHEMA_TYPE, Company } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUpdateCompany = (id: number) => {
  const router = useRouter()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['update', 'company'],
    mutationFn: async (data: CREATE_COMPANY_SCHEMA_TYPE) => {
      const result = await axiosClient.put<Company>(`/companies/${id}`, data, {
        headers,
      })

      return result.data
    },
    onSuccess: () => {
      router.push(`/companies/${id}/settings`)
    },
  })
}
