<script lang="ts" setup>
import type { CompanyEmployee } from '@skill-swap/shared'

defineProps<{ employee: CompanyEmployee }>()

const { mutateAsync } = useDeleteEmployee()
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
      <DropdownMenuItem @click="mutateAsync(employee.id)">
        Fire
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
