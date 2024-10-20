import { ACCESS_TOKEN } from '@skill-swap/shared'

// TODO: re-write to someting more reliable when backend will be fixed
export default defineNuxtRouteMiddleware(() => {
  const cookie = useCookie(ACCESS_TOKEN)

  if (cookie.value) {
    return navigateTo('/')
  }
})
