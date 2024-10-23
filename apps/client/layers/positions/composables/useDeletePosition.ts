import type { GET_BY_ID_SCHEMA_TYPE, Position } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useDeletePosition = () => {
  const store = usePositionsStore()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['delete-position'],
    async mutationFn({ id }: GET_BY_ID_SCHEMA_TYPE) {
      const city = await axiosClient.delete<Position>(`/positions/${id}`, {
        headers,
      })

      return city.data
    },
    onSuccess({ id }) {
      store.deletePosition(id)
    },
  })
}
