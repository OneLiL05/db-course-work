<script lang="ts" setup>
import type { Resume } from '@skill-swap/shared'

defineProps<{ resume: Resume }>()
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
      <DropdownMenuItem>
        <NuxtLink :to="resume.path" target="_blank">Preview</NuxtLink>
      </DropdownMenuItem>

      <DropdownMenuItem as-child>
        <UpdateResumeDialog :resume />
      </DropdownMenuItem>

      <DropdownMenuItem as-child>
        <DeleteResumeDialog :resume />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
