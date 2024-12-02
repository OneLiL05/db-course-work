<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

const { data: citiesWithCount } = useCitiesWithJobsCount()
</script>

<template>
  <section class="flex flex-col size-full w-[800px] mx-auto py-5 gap-4">
    <div class="inline-flex">
      <NuxtLink :class="buttonVariants({ variant: 'ghost' })">
        <Icon name="lucide:chevron-left" />
        Back to home
      </NuxtLink>
    </div>
    <Heading size="2">Search jobs by cities</Heading>
    <div class="grid grid-cols-3 gap-3">
      <NuxtLink
        v-for="city in citiesWithCount"
        :key="city.id"
        :to="`/cities/${city.id}`"
        class="inline-flex w-full justify-between items-center p-4 border border-muted rounded-lg hover:border-white"
      >
        <p>{{ city.name }}</p>
        <p class="text-muted-foreground">
          {{ city.count }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>
