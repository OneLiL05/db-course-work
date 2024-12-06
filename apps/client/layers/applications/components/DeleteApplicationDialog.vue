<script lang="ts" setup>
import type { Application } from '@skill-swap/shared'

const props = defineProps<{ application: Application }>()

const { mutateAsync, isPending } = useDeleteApplications()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="xs" class="w-full justify-start">
        Delete
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete application</DialogTitle>
      </DialogHeader>
      <template v-if="props.application.stageId === 1">
        <DialogDescription>
          Remember, after deleting application HR department will not be able to
          process it
        </DialogDescription>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">Back</Button>
          </DialogClose>
          <Button
            variant="destructive"
            @click="mutateAsync(props.application.id)"
          >
            {{ isPending ? 'Deleting...' : 'Delete' }}
          </Button>
        </DialogFooter>
      </template>
      <template v-else>
        <DialogDescription>
          Since your application is proccessing by HR department, you cannot
          delete it
        </DialogDescription>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">Back</Button>
          </DialogClose>
        </DialogFooter>
      </template>
    </DialogContent>
  </Dialog>
</template>
