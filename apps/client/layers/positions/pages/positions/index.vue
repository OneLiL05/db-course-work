<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

const { data: positionsWithCount } = usePositionsWithJobsCount()

const query = ref('')

const filteredPositions = computed(() => {
  if (!positionsWithCount.value) return []

  return positionsWithCount.value.filter((position) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return position.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <section class="flex flex-col size-full w-[800px] mx-auto py-5 gap-4">
    <div class="inline-flex">
      <NuxtLink :class="buttonVariants({ variant: 'ghost' })">
        <Icon name="lucide:chevron-left" />
        Back to home
      </NuxtLink>
    </div>
    <Heading size="2">Search jobs by positions</Heading>
    <Input v-model="query" placeholder="Search position..." />
    <div class="grid grid-cols-3 gap-3">
      <NuxtLink
        v-for="{ id, name, count } in filteredPositions"
        :key="id"
        :to="`/positions/${id}`"
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
