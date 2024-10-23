<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const query = ref('')

const { data: positions } = usePositions()

const filteredCities = computed(() => {
  if (!positions.value) return []

  return positions.value.filter((city) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return city.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <Heading size="2">Positions</Heading>
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
    <CreatePositionDialog />
  </div>
  <Table>
    <TableCaption>A list of all positions.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">#</TableHead>
        <TableHead>Name</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="positions">
        <TableRow v-for="(position, index) in filteredCities" :key="index">
          <TableCell class="font-medium">{{ index + 1 }}</TableCell>
          <TableCell>{{ position.name }}</TableCell>
          <TableCell class="text-right [&_button]:size-8">
            <EditPositionDialog :position />
            <DeletePositionDialog :position />
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>
