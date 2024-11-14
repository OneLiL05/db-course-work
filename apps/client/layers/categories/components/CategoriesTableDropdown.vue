<script lang="ts" setup>
import type { Category } from '@skill-swap/shared'

defineProps<{ category: Category }>()
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
        <EditCategoryDialog :category />
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <DeleteCategoryDialog :category />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
