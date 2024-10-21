import type { City } from '@skill-swap/shared'

export const useCitiesStore = defineStore(
  'cities',
  () => {
    const cities = ref<City[]>([])

    const addCity = (city: City) => {
      cities.value.push(city)
    }

    const updateCity = ({ id, name }: City) => {
      const city = cities.value.find((c) => c.id === id)

      if (city) {
        city.name = name
      }
    }

    const deleteCity = (id: number) => {
      cities.value = cities.value.filter((city) => city.id !== id)
    }

    return { cities, addCity, deleteCity, updateCity }
  },
  { persist: true },
)
