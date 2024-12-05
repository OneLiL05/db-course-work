import type { FavouritedJob } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useFavouritedJobs = () => {
  const headers = useAuthHeaders()
  const store = useAuthStore()
  const { user, isAuthentificated } = toRefs(store)

  return useQuery({
    queryKey: ['users', user.value?.id as number, 'favourited-jobs'],
    queryFn: async () => {
      const result = await axiosClient.get<FavouritedJob[]>(
        '/jobs/favourited',
        { headers },
      )

      return result.data
    },
    enabled: isAuthentificated.value,
  })
}
