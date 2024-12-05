import type { Resume } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUserResumes = () => {
  const headers = useAuthHeaders()

  const store = useAuthStore()
  const { user, isAuthentificated } = toRefs(store)

  return useQuery({
    queryKey: ['users', user.value?.id, 'resumes'],
    queryFn: async () => {
      const result = await axiosClient.get<Resume[]>(
        `/users/${user.value?.id}/resumes`,
        { headers },
      )

      return result.data
    },
    enabled: isAuthentificated,
  })
}
