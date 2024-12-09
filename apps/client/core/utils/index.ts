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

const formatSalary = (salary: {
  amount: number
  currency: 'USD' | 'UAH' | 'EUR'
}): string => {
  const locale =
    salary.currency === 'UAH'
      ? 'uk-UK'
      : salary.currency === 'EUR'
        ? 'de-DE'
        : 'en-US'

  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: salary.currency,
    maximumFractionDigits: 0,
  }).format(salary.amount)
}

export { getFormError, toBearer, formatSalary }
