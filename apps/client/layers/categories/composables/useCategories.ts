import type { Category } from '@skill-swap/shared'

export const useCategories = () => {
  const config = useRuntimeConfig()

  return useAsyncData('categories', async () => {
    const url = `${config.public.apiUrl}/categories`

    const categories = await $fetch<Category[]>(url)

    return categories
  })
}
