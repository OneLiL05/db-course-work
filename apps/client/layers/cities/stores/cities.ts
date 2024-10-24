import type { City } from '@skill-swap/shared'

export const useCitiesStore = defineStore(
  'cities',
  () => {
    const cities = ref<City[]>([])

    const addCity = (city: City) => {
      cities.value.push(city)
    }

    const updateCity = ({ id, name }: City) => {
      cities.value = cities.value.map((city) => {
        if (city.id === id) {
          city.name = name
        }

        return city
      })
    }

    const deleteCity = (id: number) => {
      cities.value = cities.value.filter((city) => city.id !== id)
    }

    return { cities, addCity, deleteCity, updateCity }
  },
  { persist: true },
)
