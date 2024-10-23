import type { CREATE_POSITION_SCHEMA_TYPE } from '@skill-swap/shared'
import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreatePosition = () => {
  const headers = useAuthHeaders()
  const { addPosition } = usePositionsStore()

  return useMutation({
    mutationKey: ['create-position'],
    mutationFn: async (data: CREATE_POSITION_SCHEMA_TYPE) => {
      const position = await axiosClient.post('/positions', data, { headers })

      return position.data
    },
    onSuccess(data) {
      addPosition(data)
    },
  })
}
