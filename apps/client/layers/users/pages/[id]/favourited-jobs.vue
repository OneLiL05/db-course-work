<script lang="ts" setup>
useHead({
  title: 'My favourited jobs',
})

const { data: jobs } = useFavouritedJobs()

const query = ref('')

const filteredCities = computed(() => {
  if (!jobs.value) return []

  return jobs.value.filter((job) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return job.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <section class="w-[800px] mx-auto flex flex-col py-5 box-border">
    <Heading size="2">My favourited jobs</Heading>
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
    </div>
    <DataTable
      v-if="jobs"
      :data="filteredCities"
      :columns="favouritedJobsTableColumns"
    />
  </section>
</template>
