import type { City } from '@skill-swap/shared'

export const useCities = () => {
  const store = useCitiesStore()
  const config = useRuntimeConfig()

  return useAsyncData('cities', async () => {
    if (store.cities.length) {
      return store.cities
    }

    const url = `${config.public.apiUrl}/cities`

    const cities = await $fetch<City[]>(url)

    store.cities = cities

    return cities
  })
}
