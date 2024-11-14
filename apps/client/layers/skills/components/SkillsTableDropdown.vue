<script lang="ts" setup>
import type { Skill } from '@skill-swap/shared'

defineProps<{ skill: Skill }>()
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
        <EditSkillDialog :skill />
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <DeleteSkillDialog :skill />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
