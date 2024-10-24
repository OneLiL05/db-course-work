export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuthStore()

  if (!user?.roles.includes('admin')) {
    navigateTo('/')
  }
})
