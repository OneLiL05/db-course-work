<script lang="ts" setup>
import CreateResumeDialog from '~/layers/resumes/components/CreateResumeDialog.vue'

useHead({
  title: 'My resumes',
})

const { data: resumes } = useUserResumes()

const query = ref('')

const filteredJobs = computed(() => {
  if (!resumes.value) return []

  return resumes.value.filter((resume) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return resume.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <section class="w-[800px] mx-auto flex flex-col py-5 box-border">
    <Heading size="2">My resumes</Heading>
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
      <CreateResumeDialog />
    </div>
    <DataTable
      v-if="resumes"
      :data="filteredJobs"
      :columns="resumesTableColumns"
    />
  </section>
</template>
