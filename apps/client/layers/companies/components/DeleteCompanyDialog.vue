<script lang="ts" setup>
import type { Company } from '@skill-swap/shared'

const props = defineProps<{ company: Company | null }>()

const { mutateAsync, isPending } = useDeleteCompany(Number(props.company?.id))
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button type="button" variant="destructive">Delete</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete company</DialogTitle>
        <DialogDescription>
          To approve that you understand all risks connected with deletion of
          the "{{ company?.name }}" company. Please press the "Agree" button
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="inline-flex gap-3">
        <Button @click="mutateAsync" :disabled="isPending">
          Yes, I agree
        </Button>
        <DialogClose>No, I don't agree</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
