export default defineNuxtRouteMiddleware(() => {
  const { data: user } = useCurrentUser()

  console.log(user)
})
