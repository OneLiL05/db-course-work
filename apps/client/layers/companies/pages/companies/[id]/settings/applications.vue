<script lang="ts" setup>
import type { ApplicationStages } from '@skill-swap/shared'

definePageMeta({
  layout: 'employer',
})

const id = useRouteParams('id')
const query = ref('')
const stage = ref<ApplicationStages>('All')

const { data: applications } = useCompanyApplications(Number(id.value), stage)

const filteredApplications = computed(() => {
  if (!applications.value) return []

  return applications.value.filter((application) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return application.jobName.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <Heading size="2">Applications</Heading>
  <div class="inline-flex w-full my-4 gap-4 justify-between">
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
    <ApplicationStagesFilterSelect v-model="stage" />
  </div>
  <DataTable
    v-if="applications"
    :data="filteredApplications"
    :columns="companyApplicationsTableColumns"
  />
</template>
