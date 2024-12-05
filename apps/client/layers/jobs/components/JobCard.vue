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
</script>

<template>
  <div
    class="flex flex-col w-full border border-muted p-4 box-border rounded-lg gap-1"
  >
    <NuxtLink :to="`/jobs/${job.id}`" class="font-bold text-xl">{{
      job.name
    }}</NuxtLink>
    <div class="inline-flex w-full gap-2">
      <p>{{ job.company.name }}</p>
      |
      <p>{{ job.category.name }}</p>
      |
      <p>{{ job.position.name }}</p>
    </div>
    <p class="text-muted-foreground">{{ job.description }}</p>
    <div class="inline-flex w-full justify-end items-center">
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
