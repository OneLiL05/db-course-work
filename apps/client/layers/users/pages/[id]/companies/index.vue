<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

useHead({
  title: 'My companies',
})

const query = ref('')

const { user } = useAuthStore()
const { data: companies, status } = useUserCompanies()

const filteredCities = computed(() => {
  if (!companies.value) return []

  return companies.value.filter((company) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return company.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <section class="w-[800px] mx-auto flex flex-col py-5 box-border">
    <Heading size="2">My companies</Heading>
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
        :to="`/${user?.id}/companies/new`"
        :class="buttonVariants({ variant: 'default' })"
      >
        New
      </NuxtLink>
    </div>
    <template v-if="status === 'pending'">
      <Spinner />
    </template>
    <template v-if="companies">
      <section class="flex flex-col w-full gap-4">
        <div
          v-for="company in filteredCities"
          :key="company.id"
          class="inline-flex w-full items-center justify-between bg-transparent border border-muted rounded-xl p-4"
        >
          <div class="inline-flex justify-start items-center gap-4">
            <div
              class="flex items-center justify-center size-8 rounded-lg bg-muted"
            >
              <Icon name="lucide:building-2" class="text-muted-foreground" />
            </div>
            <p>{{ company.name }}</p>
          </div>
          <NuxtLink
            :to="`/companies/${company.id}/settings/jobs`"
            class="!size-8"
            :class="buttonVariants({ variant: 'outline', size: 'icon' })"
          >
            <Icon name="lucide:external-link" />
          </NuxtLink>
        </div>
      </section>
    </template>
  </section>
</template>
