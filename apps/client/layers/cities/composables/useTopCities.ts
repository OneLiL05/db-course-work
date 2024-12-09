import type { CityWithCount } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useTopCities = () => {
  return useQuery({
    queryKey: ['cities', 'top', 5, 'jobs'],
    queryFn: async () => {
      const result = await axiosClient.get<CityWithCount[]>('/cities/top')

      return result.data
    },
  })
}
