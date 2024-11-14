<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const query = ref('')

const { data: categories } = useCategories()

const filteredCategories = computed(() => {
  if (!categories.value) return []

  return categories.value.filter((category) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return category.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <Heading size="2">Categories</Heading>
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
    <CreateCategoryDialog />
  </div>
  <DataTable
    v-if="categories"
    :data="filteredCategories"
    :columns="categoriesTableColumns"
  />
</template>
