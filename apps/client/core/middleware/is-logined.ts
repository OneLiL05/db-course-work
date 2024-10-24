export default defineNuxtRouteMiddleware(() => {
  const { isAuthentificated } = useAuthStore()

  if (isAuthentificated.value) {
    return navigateTo('/')
  }
})
