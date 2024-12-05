<script lang="ts" setup>
import type { FavouritedJob } from '@skill-swap/shared'

defineProps<{ favouritedJob: FavouritedJob }>()

const { mutateAsync } = useUnfavouriteJob()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <Icon name="lucide:ellipsis" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <NuxtLink :to="`/jobs/${favouritedJob.id}`"> Visit </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem @click="mutateAsync(favouritedJob.id)">
          Remove
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
