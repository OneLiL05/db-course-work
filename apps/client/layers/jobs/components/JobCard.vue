<script lang="ts" setup>
import type { Job } from '@skill-swap/shared'

const props = defineProps<{ job: Job; isFavourited: boolean }>()

const store = useAuthStore()
const { isAuthentificated } = toRefs(store)

const favouriteBtnFallback = computed(() => {
  return props.isFavourited ? 'Unfavourite' : 'Favourite'
})

const { mutateAsync: favourite } = useFavouriteJob()
const { mutateAsync: unfavourite } = useUnfavouriteJob()

const onClick = () => {
  if (props.isFavourited) {
    unfavourite(props.job.id)
  } else {
    favourite(props.job.id)
  }
}

const salary = computed(() => {
  return `${formatSalary(props.job.salary)}/${props.job.salary.period}`
})
</script>

<template>
  <div
    class="flex flex-col w-full border border-muted p-4 box-border rounded-lg gap-1 dark:hover:border-white dark:hover:bg-primary-foreground"
  >
    <NuxtLink :to="`/jobs/${job.id}`" class="font-bold text-xl">
      {{ job.name }}
    </NuxtLink>
    <div class="inline-flex w-full gap-2">
      <p>{{ job.company.name }}</p>
      |
      <p>{{ job.category.name }}</p>
      |
      <p>{{ job.position.name }}</p>
    </div>
    <p class="text-muted-foreground">{{ job.description }}</p>
    <p>{{ salary }}</p>
    <div class="inline-flex w-full justify-between items-center">
      <div class="inline-flex gap-3">
        <Badge v-if="job.isFulltime">Full-time</Badge>
        <Badge v-if="job.isRemote">Remote</Badge>
        <Badge v-if="job.isCvRequired">CV required</Badge>
        <Badge v-if="job.areStudentsAllowed">Students allowed</Badge>
      </div>
      <Button
        v-if="isAuthentificated"
        variant="ghost"
        :class="{
          'text-red-400 hover:bg-red-500 hover:text-white': isFavourited,
        }"
        @click="onClick"
      >
        <Icon name="lucide:heart" />
        {{ favouriteBtnFallback }}
      </Button>
    </div>
  </div>
</template>
