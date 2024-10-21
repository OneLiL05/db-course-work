import type { City } from '@skill-swap/shared'

export const useCitiesStore = defineStore(
  'cities',
  () => {
    const cities = ref<City[]>([])

    const addCity = (city: City) => {
      cities.value.push(city)
    }

    return { cities, addCity }
  },
  { persist: true },
)
