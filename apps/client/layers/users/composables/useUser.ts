import type { User } from '@skill-swap/shared'
import { axiosClient } from '~/core/lib/axios'

export const useUser = (id: number) => {
  return useAsyncData(`users/${id}`, async () => {
    const result = await axiosClient.get<User>(`/users/${id}`)

    if (result.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    console.log(result.status)

    return result.data
  })
}
