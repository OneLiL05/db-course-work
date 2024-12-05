<script lang="ts" setup>
import { compareStrings, isStringEmpty, type Resume } from '@skill-swap/shared'

const props = defineProps<{ resume: Resume }>()

const name = ref(props.resume.name)
const file = ref<File | null>(null)

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement

  file.value = target.files ? target.files[0] : null
}

const { mutateAsync, isPending } = useUpdateResume()

const onSubmit = (e: Event) => {
  e.preventDefault()

  mutateAsync({ id: props.resume.id, name: name.value, file: file.value })
}

const isDisabled = computed(() => {
  return (
    (isStringEmpty(name.value) && file.value === null) ||
    (compareStrings(props.resume.name, name.value) && file.value === null)
  )
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="xs" class="w-full justify-start">
        Update
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update resume</DialogTitle>
      </DialogHeader>
      <form class="space-y-3" @submit="onSubmit" enctype="multipart/form-data">
        <div class="grid w-full items-center gap-1.5">
          <Label for="name">Name</Label>
          <Input
            v-model="name"
            id="name"
            type="text"
            placeholder="Write name..."
            autofocus
          />
        </div>
        <div class="grid w-full items-center gap-1.5">
          <Label for="file">File</Label>
          <Input id="file" type="file" accept=".pdf" @change="onFileChange" />
        </div>
        <DialogFooter>
          <Button :disabled="isDisabled">
            {{ isPending ? 'Updating...' : 'Update' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
