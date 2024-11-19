<script lang="ts" setup>
import { Alert, AlertDescription, AlertTitle } from '@/core/components/ui/alert'
import { buttonVariants } from '~/core/components/ui/button'

const id = useRouteParams('id')

const { data: job } = await useJob(Number(id.value))

const createdAt = computed(() =>
  new Date(job.value?.createdAt as unknown as string).toLocaleDateString('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
)

onMounted(() => {
  console.log(job.value)
})
</script>

<template>
  <section class="flex size-full py-5">
    <main
      class="flex flex-col mx-auto w-[800px] border border-muted rounded-lg p-5 gap-4"
    >
      <div class="inline-flex justify-between w-full">
        <div class="inline-flex gap-3">
          <Button>
            <Icon name="lucide:sparkles" />
            Apply
          </Button>
          <Button variant="ghost">
            <Icon name="lucide:heart" />
            Favourite
          </Button>
        </div>
        <JobDropdown />
      </div>
      <Alert v-if="job?.isCvRequired">
        <AlertTitle>CV is required!</AlertTitle>
        <AlertDescription>
          To apply for this job you need to attach your CV.
        </AlertDescription>
      </Alert>
      <div class="flex flex-row gap-3 justify-between items-center">
        <div class="flex flex-col">
          <p class="text-muted-foreground">Job vacancy from {{ createdAt }}</p>
          <Heading size="3">{{ job?.name }}</Heading>
        </div>
        <Heading size="4">{{ formatSalary(job?.salary!) }}</Heading>
      </div>
      <div class="flex flex-col w-full gap-3">
        <div class="inline-flex gap-3">
          <Badge v-for="{ name, level } in job?.skills">
            {{ `${name}: ${level}` }}
          </Badge>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <NuxtLink
            class="inline-flex gap-2 items-center"
            :to="`/companies/${job?.company.id}`"
          >
            <Icon
              class="size-4 text-muted-foreground"
              name="lucide:building-2"
            />
            {{ job?.company.name }}
          </NuxtLink>
          <NuxtLink
            class="inline-flex gap-2 items-center"
            :to="`/cities/${job?.city.id}`"
          >
            <Icon class="size-4 text-muted-foreground" name="lucide:house" />
            {{ job?.city.name }}
          </NuxtLink>
          <NuxtLink
            class="inline-flex gap-2 items-center"
            :to="`/positions/${job?.position.id}`"
          >
            <Icon
              class="size-4 text-muted-foreground"
              name="lucide:user-round"
            />
            {{ job?.position.name }}
          </NuxtLink>
          <NuxtLink
            class="inline-flex gap-2 items-center"
            :to="`/positions/${job?.category.id}`"
          >
            <Icon
              class="size-4 text-muted-foreground"
              name="lucide:book-copy"
            />
            {{ job?.category.name }}
          </NuxtLink>
          <p
            v-if="job?.areStudentsAllowed"
            class="inline-flex gap-2 items-center"
            :to="`/cities/${job?.city.id}`"
          >
            <Icon class="size-4 text-muted-foreground" name="lucide:check" />
            Job is fulltime
          </p>
          <p
            v-if="job?.areStudentsAllowed"
            class="inline-flex gap-2 items-center"
            :to="`/cities/${job?.city.id}`"
          >
            <Icon
              class="size-4 text-muted-foreground"
              name="lucide:graduation-cap"
            />
            Job is opened for students
          </p>
        </div>
        <Heading size="3">Description</Heading>
        <p>{{ job?.description }}</p>
      </div>
      <div
        class="inline-flex w-full p-4 border border-muted mt-auto rounded-md items-center justify-between"
      >
        <div class="inline-flex justify-start items-center gap-4">
          <div
            class="flex items-center justify-center size-10 rounded-md bg-muted"
            aria-hidden="true"
          >
            <Icon name="lucide:building-2" />
          </div>
          <p>{{ job?.company.name }}</p>
        </div>
        <NuxtLink
          :to="`/companies/${job?.company.id}`"
          class="!size-8"
          :class="buttonVariants({ variant: 'outline', size: 'icon' })"
        >
          <Icon name="lucide:external-link" />
        </NuxtLink>
      </div>
    </main>
  </section>
</template>
