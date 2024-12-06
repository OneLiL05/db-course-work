<script lang="ts" setup>
import type { Job } from '@skill-swap/shared'

const props = defineProps<{ job: Job }>()

const { generateJobReportPdf } = useJobPdf()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        More
        <Icon name="lucide:chevron-down" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>
        <Icon name="lucide:file-text" />
        Find similar
      </DropdownMenuItem>
      <DropdownMenuItem @click="generateJobReportPdf(job)">
        <Icon name="lucide:printer" />
        Print
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Icon name="lucide:triangle-alert" />
        Report
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
