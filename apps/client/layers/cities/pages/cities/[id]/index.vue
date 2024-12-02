<script lang="ts" setup>
import type { JOB_FILTERS_SCHEMA_TYPE } from '@skill-swap/shared'

const id = useRouteParams('id')

const searchParams = ref<JOB_FILTERS_SCHEMA_TYPE | undefined>(undefined)

const { data: city } = useCity(Number(id.value))
const { data: jobs } = useCityJobs(Number(id.value), searchParams)

const activeJobsFallback = computed(() => {
  return `${jobs.value?.length} active ${jobs.value?.length !== 1 ? 'jobs' : 'job'} in ${city.value?.name}`
})
</script>

<template>
  <section class="flex flex-col size-full w-[1000px] mx-auto py-5 gap-4">
    <div class="inline-flex w-full justify-between items-center">
      <p class="text-muted-foreground">{{ activeJobsFallback }}</p>
      <Select>
        <SelectTrigger class="w-[150px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Per month</SelectItem>
          <SelectItem value="14-days">Per 14 days</SelectItem>
          <SelectItem value="7-days">Per 7 days</SelectItem>
          <SelectItem value="day">Per 1 day</SelectItem>
        </SelectContent>
      </Select>
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
        @submit="(values) => (searchParams = values)"
        @reset="() => (searchParams = undefined)"
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
