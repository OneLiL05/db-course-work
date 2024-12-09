<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

const { data: categoriesWithCount } = useCategoriesWithJobsCount()
const { data: topCategories } = useTopCategories()

const query = ref('')

const filteredCategories = computed(() => {
  if (!categoriesWithCount.value) return []

  return categoriesWithCount.value.filter((category) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return category.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <section class="flex flex-col size-full w-[800px] mx-auto py-5 gap-4">
    <div class="inline-flex">
      <NuxtLink to="/" :class="buttonVariants({ variant: 'ghost' })">
        <Icon name="lucide:chevron-left" />
        Back to home
      </NuxtLink>
    </div>
    <Heading size="2">Top categories by jobs</Heading>
    <div class="grid grid-cols-3 gap-3">
      <NuxtLink
        v-for="{ id, name, count } in topCategories"
        :key="id"
        :to="`/categories/${id}`"
        class="inline-flex w-full justify-between items-center p-4 border border-muted rounded-lg hover:border-white"
      >
        <p>{{ name }}</p>
        <p class="text-muted-foreground">
          {{ count }}
        </p>
      </NuxtLink>
    </div>
    <Heading size="2">Search jobs by categories</Heading>
    <Input v-model="query" placeholder="Search category..." />
    <div class="grid grid-cols-3 gap-3">
      <NuxtLink
        v-for="{ id, name, count } in filteredCategories"
        :key="id"
        :to="`/categories/${id}`"
        class="inline-flex w-full justify-between items-center p-4 border border-muted rounded-lg hover:border-white"
      >
        <p>{{ name }}</p>
        <p class="text-muted-foreground">
          {{ count }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>
