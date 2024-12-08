<script lang="ts" setup>
import type { JOB_FILTERS_SCHEMA_TYPE } from '@skill-swap/shared'

const id = useRouteParams('id')

const searchParams = ref<JOB_FILTERS_SCHEMA_TYPE | undefined>(undefined)

const { data: position } = usePosition(Number(id.value))
const { data: jobs } = usePositionJobs(Number(id.value), searchParams)
const { data: favouritedJobs } = useFavouritedJobs()

const activeJobsFallback = computed(() => {
  return `${jobs.value?.length} active ${jobs.value?.length !== 1 ? 'jobs' : 'job'} in ${position.value?.name}`
})

const resetFilters = () => {
  searchParams.value = {
    ...searchParams.value,
    employmentTypes: undefined,
    minAmount: undefined,
    maxAmount: undefined,
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
        <JobCard
          v-for="job in jobs"
          :key="job.id"
          :job
          :is-favourited="
            favouritedJobs?.some((fJob) => fJob.id === job.id) ?? false
          "
        />
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
