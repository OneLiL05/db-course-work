import type { JwtPayload } from '@skill-swap/shared'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const user = ref<JwtPayload | null>(null)

    const isAuthentificated = computed(() => !!token && !!user)

    return { token, isAuthentificated, user }
  },
  { persist: true },
)
