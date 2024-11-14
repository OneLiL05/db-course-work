<script lang="ts" setup>
import type { Position } from '@skill-swap/shared'

defineProps<{ position: Position }>()
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
        <EditPositionDialog :position />
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <DeletePositionDialog :position />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
