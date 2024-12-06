<script lang="ts" setup>
import type { CompanyApplication } from '@skill-swap/shared'

defineProps<{ application: CompanyApplication }>()

const { generateReport } = useCompanyApplicationPdf()
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
        <NuxtLink :to="`/jobs/${application.jobId}`">View job</NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NuxtLink :to="`/${application.applierId}`">View applier</NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem @click="generateReport(application)">
        Print
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <EditApplicationDialog :application />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
