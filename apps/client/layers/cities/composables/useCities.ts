import type { City } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const params = new URLSearchParams([
        ['order', 'asc'],
        ['sortBy', 'name'],
      ])

      const result = await axiosClient.get<City[]>('/cities', { params })

      return result.data
    },
  })
}
