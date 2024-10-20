import type { Position } from '@skill-swap/shared'

export const usePositions = () => {
  const config = useRuntimeConfig()

  return useAsyncData('positions', async () => {
    const { value, addToCache } = await useDataCache<Position[]>('positions')

    if (value) {
      return value
    }

    const url = `${config.public.apiUrl}/positions`

    const positions = await $fetch<Position[]>(url)

    await addToCache(positions)

    return positions
  })
}
