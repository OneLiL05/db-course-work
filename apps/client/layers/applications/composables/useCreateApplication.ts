import type { CREATE_APPLICATION_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreateApplication = () => {
  const router = useRouter()
  const headers = useAuthHeaders()

  const store = useAuthStore()
  const { user } = toRefs(store)

  return useMutation({
    mutationKey: ['create', 'application'],
    mutationFn: async (data: CREATE_APPLICATION_SCHEMA_TYPE) => {
      await axiosClient.post('/applications', data, { headers })
    },
    onSuccess() {
      router.push(`/${user.value?.id}/applications`)
    },
  })
}
