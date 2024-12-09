<script lang="ts" setup>
definePageMeta({
  layout: 'employer',
})

const id = useRouteParams('id')
const query = ref('')

const { data: employees } = useCompanyEmployees(Number(id.value))

const filteredEmployee = computed(() => {
  if (!employees.value) return []

  return employees.value.filter((employees) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return employees.employeeName.toLowerCase().includes(comparableQuery)
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
  </div>
  <DataTable
    v-if="employees"
    :data="filteredEmployee"
    :columns="employeeTableColumns"
  />
</template>
