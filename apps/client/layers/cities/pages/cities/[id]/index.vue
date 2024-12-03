<script lang="ts" setup>
import type { JOB_FILTERS_SCHEMA_TYPE } from '@skill-swap/shared'

const id = useRouteParams('id')

const searchParams = ref<JOB_FILTERS_SCHEMA_TYPE | undefined>(undefined)

const { data: city } = useCity(Number(id.value))
const { data: jobs } = useCityJobs(Number(id.value), searchParams)

const activeJobsFallback = computed(() => {
  return `${jobs.value?.length} active ${jobs.value?.length !== 1 ? 'jobs' : 'job'} in ${city.value?.name}`
})

const resetFilters = () => {
  searchParams.value = {
    ...searchParams.value,
    employmentTypes: undefined,
    salaryAmount: undefined,
    salaryCurrency: undefined,
    salaryPeriod: undefined,
  }
}
</script>

<template>
  <section class="flex flex-col size-full w-[1000px] mx-auto py-5 gap-4">
    <JobsSearch
      @submit="(values) => (searchParams = { ...searchParams, ...values })"
    />
    <div class="inline-flex w-full justify-between items-center">
      <p class="text-muted-foreground">{{ activeJobsFallback }}</p>
    </div>
    <div class="grid grid-cols-[80%_20%] gap-5">
      <div class="flex flex-col w-full gap-3">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="flex flex-col w-full border border-muted p-4 box-border rounded-lg gap-1"
        >
          <NuxtLink :to="`/jobs/${job.id}`" class="font-bold text-xl">{{
            job.name
          }}</NuxtLink>
          <div class="inline-flex w-full gap-2">
            <p>{{ job.company.name }}</p>
            |
            <p>{{ job.category.name }}</p>
            |
            <p>{{ job.position.name }}</p>
          </div>
          <p class="text-muted-foreground">{{ job.description }}</p>
          <div class="inline-flex w-full justify-end items-center">
            <Button variant="ghost">
              <Icon name="lucide:heart" />
              Favourite
            </Button>
          </div>
        </div>
      </div>
      <JobsFilter
        @submit="(values) => (searchParams = { ...searchParams, ...values })"
        @reset="resetFilters"
      />
    </div>
  </section>
</template>

<style lang="css">
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
