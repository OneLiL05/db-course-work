import type { City } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreateCity = () => {
  const { addCity } = useCitiesStore()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['create-city'],
    mutationFn: async (data: { name: string }) => {
      const city = await axiosClient.post<City>('/cities', data, { headers })

      return city.data
    },
    onSuccess(data) {
      addCity(data)
    },
  })
}
