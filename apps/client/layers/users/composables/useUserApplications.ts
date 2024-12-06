import type { ApplicationStages, UserApplication } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useUserApplications = (stage: Ref<ApplicationStages>) => {
  const headers = useAuthHeaders()

  const store = useAuthStore()
  const { user } = toRefs(store)

  return useQuery({
    queryKey: ['users', user.value?.id, 'applications', stage],
    queryFn: async () => {
      const result = await axiosClient.get<UserApplication[]>(
        `/users/${user.value?.id}/applications`,
        { params: { stage: stage.value }, headers },
      )

      return result.data
    },
  })
}
