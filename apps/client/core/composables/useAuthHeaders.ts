import { ACCESS_TOKEN } from '@skill-swap/shared'

export const useAuthHeaders = () => {
  const cookie = useCookie(ACCESS_TOKEN)

  return { Authorization: toBearer(cookie.value) }
}
