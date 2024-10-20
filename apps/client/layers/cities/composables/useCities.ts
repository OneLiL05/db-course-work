import type { City } from '@skill-swap/shared'

export const useCities = () => {
  const config = useRuntimeConfig()

  return useAsyncData('cities', async () => {
    const { value, addToCache } = await useDataCache<City[]>('cities')

    if (value) {
      return value
    }

    const url = `${config.public.apiUrl}/cities`

    const cities = await $fetch<City[]>(url)

    await addToCache(cities)

    return cities
  })
}
