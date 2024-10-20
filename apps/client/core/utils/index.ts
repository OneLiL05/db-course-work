import { AxiosError } from 'axios'

interface GetFormErrorArgs {
  error: Ref<Error | null>
  isError: Ref<boolean>
}

const getFormError = ({ error, isError }: GetFormErrorArgs) => {
  return computed(() => {
    if (isError.value && error.value instanceof AxiosError) {
      return error.value?.response?.data.message
    }

    return null
  })
}

const toBearer = (token: unknown) => `Bearer ${token}`

export { getFormError, toBearer }
