<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/components/ui/table'
import { useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'
import { buttonVariants } from '~/core/components/ui/button'

definePageMeta({
  layout: 'admin',
})

const cities = ref<any[]>([])
const query = ref('')

const { data } = useQuery({
  queryKey: ['admin', 'jobs'],
  queryFn: async () => {
    const result = await axiosClient.get('/jobs')

    cities.value = result.data

    return result.data
  },
})

const filteredCities = computed(() => {
  if (!data) return []

  return data.value.filter((city) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return city.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <Heading size="2">Jobs</Heading>
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
      :class="buttonVariants({ variant: 'default' })"
      to="/admin/jobs/new"
      class="gap-2"
    >
      <Icon class="size-5" name="mynaui:plus-circle" />
      New
    </NuxtLink>
  </div>
  <Table>
    <TableCaption>A list of all cities.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Id</TableHead>
        <TableHead>Name</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="data">
        <TableRow v-for="(city, index) in data" :key="index">
          <TableCell class="font-medium">{{ city.id }}</TableCell>
          <TableCell>{{ city.name }}</TableCell>
          <TableCell class="text-right [&_button]:size-8">
            <Button variant="outline" size="icon" class="mr-2">
              <Icon class="size-4" name="mynaui:pencil" />
            </Button>
            <Button variant="destructive" size="icon">
              <Icon class="size-4" name="mynaui:trash" />
            </Button>
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>
