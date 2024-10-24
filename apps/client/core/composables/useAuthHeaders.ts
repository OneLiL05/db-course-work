export const useAuthHeaders = () => {
  const authStore = useAuthStore()
  const { token } = toRefs(authStore)

  return { Authorization: toBearer(token.value) }
}
