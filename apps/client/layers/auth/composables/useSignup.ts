import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'
import type { CREATE_USER_SCHEMA_TYPE, CreatedUser } from '@skill-swap/shared'

export const useSignup = () => {
  const router = useRouter()

  return useMutation({
    mutationKey: ['signup'],
    async mutationFn(data: CREATE_USER_SCHEMA_TYPE) {
      const user = await axiosClient
        .post<CreatedUser>('/signup', data)
        .then((result) => result.data)

      return user
    },
    onSuccess() {
      router.push({ path: '/login' })
    },
  })
}
