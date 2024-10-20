import {
  ACCESS_TOKEN,
  type AuthTokens,
  type LOGIN_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useLogin = () => {
  const router = useRouter()
  const cookie = useCookie(ACCESS_TOKEN)

  return useMutation({
    mutationKey: ['login'],
    async mutationFn(data: LOGIN_SCHEMA_TYPE) {
      const token = await axiosClient
        .post<AuthTokens>('/login', data)
        .then((result) => result.data)

      return token
    },
    onSuccess(data) {
      cookie.value = data.access_token
      router.push({ path: '/' })
    },
  })
}
