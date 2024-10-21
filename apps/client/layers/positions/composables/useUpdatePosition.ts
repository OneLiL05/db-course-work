import { useMutation } from '@tanstack/vue-query'
import type { Position, UPDATE_POSITION_SCHEMA_TYPE } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useUpdatePosition = () => {
  const store = usePositionsStore()
  const headers = useAuthHeaders()

  return useMutation({
    mutationKey: ['update-position'],
    async mutationFn({ id, name }: UPDATE_POSITION_SCHEMA_TYPE) {
      const position = await axiosClient.put<Position>(
        '/positions',
        { name },
        {
          params: {
            id,
          },
          headers,
        },
      )

      return position.data
    },
    onSuccess(data) {
      store.updatePosition(data)
    },
  })
}
