<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const query = ref('')

const { data: cities } = useCities()

const filteredCities = computed(() => {
  if (!cities.value) return []

  return cities.value.filter((city) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return city.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <Heading size="2">Cities</Heading>
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
    <CreateCityDialog />
  </div>
  <DataTable
    v-if="cities"
    :data="filteredCities"
    :columns="citiesTableColumns"
  />
</template>
