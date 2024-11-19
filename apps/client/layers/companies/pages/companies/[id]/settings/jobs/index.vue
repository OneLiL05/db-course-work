<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

definePageMeta({
  layout: 'employer',
})

const id = useRouteParams('id')

const query = ref('')

const { data: jobs } = useCompanyJobs(Number(id.value))
const { data: latestJobs } = useCompanyLatestJobsCount(Number(id.value))
const { data: activeJobs } = useCompanyJobsCount(Number(id.value))
</script>

<template>
  <Heading size="2">Jobs</Heading>
  <div class="grid grid-cols-2 gap-2">
    <div
      class="inline-flex items-center justify-start rounded-lg border border-muted p-4 gap-5"
    >
      <Icon class="size-10" name="lucide:chart-spline" />
      <div>
        <p class="text-xs text-muted-foreground">Jobs created this month:</p>
        <p class="text-base text-foreground font-bold">
          {{ latestJobs?.count }}
        </p>
      </div>
    </div>
    <div
      class="inline-flex items-center justify-start rounded-lg border border-muted p-4 gap-5"
    >
      <Icon class="size-10" name="lucide:briefcase-business" />
      <div>
        <p class="text-xs text-muted-foreground">Active jobs count:</p>
        <p class="text-base text-foreground font-bold">
          {{ activeJobs?.count }}
        </p>
      </div>
    </div>
  </div>
  <div class="inline-flex w-full my-4 gap-4">
    <div class="relative w-full max-w-sm items-center">
      <Input
        id="search"
        v-model="query"
        type="text"
        placeholder="Search..."
        class="pl-10"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon class="size-5" name="mynaui:search" />
      </span>
    </div>
    <NuxtLink
      :to="`/companies/${id}/settings/jobs/new`"
      :class="buttonVariants({ variant: 'default' })"
    >
      New
    </NuxtLink>
  </div>
  <DataTable v-if="jobs" :data="jobs" :columns="jobsTableColumns" />
  <!-- <template v-if="jobs">
    <div
      v-for="job in jobs"
      :key="job.id"
      class="inline-flex w-full items-center justify-between bg-transparent border border-muted rounded-xl p-4"
    >
      <div class="inline-flex justify-start items-center gap-4">
        <div
          class="flex items-center justify-center size-8 rounded-lg bg-muted"
        >
          <Icon
            name="lucide:briefcase-business"
            class="text-muted-foreground"
          />
        </div>
        <p>{{ job.name }}</p>
      </div>
      <NuxtLink
        :to="`/jobs/${job.id}`"
        class="!size-8"
        :class="buttonVariants({ variant: 'outline', size: 'icon' })"
      >
        <Icon name="lucide:external-link" />
      </NuxtLink>
    </div>
  </template> -->
</template>
