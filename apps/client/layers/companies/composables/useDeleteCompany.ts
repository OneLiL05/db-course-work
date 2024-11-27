import type { Company } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteCompany = (id: number) => {
  const router = useRouter()

  const store = useAuthStore()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete', 'company'],
    mutationFn: async () => {
      const result = await axiosClient.delete<Company>(`/companies/${id}`, {
        headers,
      })

      return result.data
    },
    onSuccess() {
      router.push(`/${store.user?.id}/companies`)
    },
  })
}
