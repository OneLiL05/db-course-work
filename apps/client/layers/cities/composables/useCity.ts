import type { City } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCity = (id: number) => {
  return useQuery({
    queryKey: ['cities', id],
    queryFn: async () => {
      const result = await axiosClient.get<City>(`/cities/${id}`)

      return result.data
    },
  })
}
