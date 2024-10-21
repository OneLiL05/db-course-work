import type { Position } from '@skill-swap/shared'

export const usePositions = () => {
  const config = useRuntimeConfig()

  return useAsyncData('positions', async () => {
    const store = usePositionsStore()

    if (store.positions.length) {
      return store.positions
    }

    const url = `${config.public.apiUrl}/positions`

    const positions = await $fetch<Position[]>(url)

    store.positions = positions

    return positions
  })
}
