import { ACCESS_TOKEN, type JwtPayload } from '@skill-swap/shared'
import { toBearer } from '~/core/utils'

export const useCurrentUser = () => {
  const config = useRuntimeConfig()

  return useAsyncData('current_user', async () => {
    const { value, addToCache } = await useDataCache<JwtPayload>('current-user')

    if (value) return value

    const cookie = useCookie(ACCESS_TOKEN)
    const url = `${config.public.apiUrl}/me`

    const user = await $fetch<JwtPayload>(url, {
      headers: {
        Authorization: toBearer(cookie.value),
      },
    })

    await addToCache(user)

    return user
  })
}
