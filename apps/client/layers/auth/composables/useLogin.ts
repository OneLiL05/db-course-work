import {
  type AuthTokens,
  type JwtPayload,
  type LOGIN_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'
import { useAuthStore } from '../stores/auth'

export const useLogin = () => {
  const router = useRouter()
  const store = useAuthStore()

  return useMutation({
    mutationKey: ['login'],
    async mutationFn(values: LOGIN_SCHEMA_TYPE) {
      const data = await axiosClient
        .post<AuthTokens & { user: JwtPayload }>('/login', values)
        .then((result) => result.data)

      return data
    },
    onSuccess(data) {
      store.token = data.access_token
      store.user = data.user
      router.push({ path: '/' })
    },
  })
}
