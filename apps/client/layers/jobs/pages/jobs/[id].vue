<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '~/core/components/ui/dropdown-menu'
import { Badge } from '~/core/components/ui/badge'

const route = useRoute()

const { data: job } = await useJob(+route.params.id)

const createdAt = computed(() =>
  new Date(job.value?.createdAt as unknown as string).toLocaleDateString('en'),
)
</script>

<template>
  <section class="flex size-full py-5">
    <div
      class="flex flex-col mx-auto w-[800px] border border-muted rounded-lg p-5 gap-4"
    >
      <div class="inline-flex justify-between w-full">
        <div class="inline-flex gap-3">
          <Button>
            <Icon name="lucide:sparkles" />
            Apply
          </Button>
          <Button variant="ghost">
            <Icon name="lucide:heart" />
            Favourite
          </Button>
        </div>
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
            <DropdownMenuItem>
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
      </div>
      <div class="flex flex-col gap-3">
        <p class="text-muted-foreground">Job vacancy from {{ createdAt }}</p>
        <div class="inline-flex gap-2">
          <Badge v-if="job?.isCvRequired">Apply without resume</Badge>
        </div>
        <Heading size="3">{{ job?.name }}</Heading>
      </div>
    </div>
  </section>
</template>
