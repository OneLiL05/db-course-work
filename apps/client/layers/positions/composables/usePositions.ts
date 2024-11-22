import type { Position } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const usePositions = () => {
  return useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const params = new URLSearchParams([
        ['order', 'asc'],
        ['sortBy', 'name'],
      ])

      const result = await axiosClient.get<Position[]>('/positions', { params })

      return result.data
    },
  })
}
