import type { City, GET_BY_ID_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeleteCity = () => {
  const store = useCitiesStore()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete-city'],
    async mutationFn({ id }: GET_BY_ID_SCHEMA_TYPE) {
      const city = await axiosClient.delete<City>('/cities', {
        params: {
          id,
        },
        headers,
      })

      return city.data
    },
    onSuccess({ id }) {
      store.deleteCity(id)
    },
  })
}
