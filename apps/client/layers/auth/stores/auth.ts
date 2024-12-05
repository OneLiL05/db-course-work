import type { JwtPayload } from '@skill-swap/shared'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const user = ref<JwtPayload | null>(null)

    const isAuthentificated = computed(() => !!token.value && !!user.value)

    const signout = () => {
      user.value = null
      token.value = null
    }

    return { token, isAuthentificated, user, signout }
  },
  { persist: true },
)
