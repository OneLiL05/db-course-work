import { type City, type UPDATE_CITY_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { useAuthHeaders } from '~/core/composables/useAuthHeaders'
import { axiosClient } from '~/core/lib/axios'

export const useUpdateCity = () => {
  const store = useCitiesStore()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['update-city'],
    async mutationFn({ id, name }: UPDATE_CITY_SCHEMA_TYPE) {
      const city = await axiosClient.put<City>(
        `/cities/${id}`,
        { name },
        {
          headers,
        },
      )

      return city.data
    },
    onSuccess(data) {
      store.updateCity(data)
    },
  })
}
