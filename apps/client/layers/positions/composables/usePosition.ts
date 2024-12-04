import type { Position } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const usePosition = (id: number) => {
  return useQuery({
    queryKey: ['positions', id],
    queryFn: async () => {
      const result = await axiosClient.get<Position>(`/positions/${id}`)

      return result.data
    },
  })
}
