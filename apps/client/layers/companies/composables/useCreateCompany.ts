import type { CREATE_COMPANY_SCHEMA_TYPE, Company } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreateCompany = () => {
  const headers = useAuthHeaders()
  const { user } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationKey: ['create-company'],
    mutationFn: async (data: CREATE_COMPANY_SCHEMA_TYPE) => {
      const company = await axiosClient.post<Company>('/companies', data, {
        headers,
      })

      return company.data
    },
    onSuccess() {
      router.push(`/${user?.id}/companies`)
    },
  })
}
