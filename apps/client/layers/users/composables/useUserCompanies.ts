import type { Company } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useUserCompanies = () => {
  const { user } = useAuthStore()
  const headers = useAuthHeaders()

  return useAsyncData(`${user}/companies`, async () => {
    const companies = await axiosClient.get<Company[]>(
      `/users/${user?.id}/companies`,
      { headers },
    )

    return companies.data
  })
}
