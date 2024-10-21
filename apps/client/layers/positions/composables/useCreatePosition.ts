import { useMutation } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'

export const useCreatePosition = () => {
  const { addPosition } = usePositionsStore()

  return useMutation({
    mutationKey: ['create-position'],
    mutationFn: async (data: { name: string }) => {
      const position = await axiosClient.post('/positions', data)

      return position.data
    },
    onSuccess(data) {
      addPosition(data)
    },
  })
}
