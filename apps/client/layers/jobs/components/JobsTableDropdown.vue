<script lang="ts" setup>
import type { Job } from '@skill-swap/shared'
import { buttonVariants } from '~/core/components/ui/button'

defineProps<{ job: Job }>()
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <Icon name="lucide:ellipsis" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem as-child>
        <NuxtLink
          :class="buttonVariants({ size: 'sm', variant: 'ghost' })"
          class="w-full !justify-start font-normal !px-2"
          :to="`/jobs/${job.id}`"
        >
          Visit
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink
          :class="buttonVariants({ size: 'sm', variant: 'ghost' })"
          class="w-full !justify-start font-normal !px-2"
          :to="`/jobs/${job.id}/edit`"
        >
          Edit
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <DeleteJobDialog :job />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
