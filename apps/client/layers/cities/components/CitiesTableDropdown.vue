<script lang="ts" setup>
import type { City } from '@skill-swap/shared'

defineProps<{ city: City }>()
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
        <EditCityDialog :city />
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <DeleteCityDialog :city />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
