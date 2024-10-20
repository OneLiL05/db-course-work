<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/core/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/components/ui/table'
import { axiosClient } from '~/core/lib/axios'

definePageMeta({
  layout: 'admin',
})

const cities = ref<any[]>([])
const query = ref('')

const { data: positions } = usePositions()

const createFormSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'Position name is required' })
      .min(4)
      .max(128),
  }),
)

const {
  handleSubmit: createHandleSubmit,
  values: createValues,
  isSubmitting: isCreationSubmitting,
} = useForm({
  validationSchema: createFormSchema,
})

const { mutateAsync, status: creationStatus } = useMutation({
  mutationKey: ['create-position'],
  mutationFn: async (data: { name: string }) => {
    await axiosClient.post('/positions', data)
  },
})

const onCreateSubmit = createHandleSubmit(async (values) => {
  await mutateAsync(values)
})

const isCreateDisabled = computed(() => !createValues.name?.trim().length)

const filteredCities = computed(() => {
  if (!positions.value) return []

  return positions.value.filter((city) => {
    const comparableQuery = query.value.trim().toLowerCase()

    if (!comparableQuery.length) return true

    return city.name.toLowerCase().includes(comparableQuery)
  })
})
</script>

<template>
  <Heading size="2">Positions</Heading>
  <div class="inline-flex w-full my-4 gap-4">
    <div class="relative w-full max-w-sm items-center">
      <Input
        id="search"
        v-model="query"
        type="text"
        placeholder="Search..."
        class="pl-10"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon class="size-5" name="mynaui:search" />
      </span>
    </div>
    <Dialog>
      <DialogTrigger>
        <Button class="gap-2">
          <Icon class="size-5" name="mynaui:plus-circle" />
          New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create position</DialogTitle>
        </DialogHeader>
        <form @submit="onCreateSubmit" class="space-y-3">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem v-auto-animate>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Write positions name..."
                  v-bind="componentField"
                  autofocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <DialogFooter>
            <Button
              type="submit"
              :disabled="isCreateDisabled || isCreationSubmitting"
            >
              {{ creationStatus === 'pending' ? 'Creating...' : 'Create' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  <Table>
    <TableCaption>A list of all positions.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Id</TableHead>
        <TableHead>Name</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="positions">
        <TableRow v-for="(position, index) in filteredCities" :key="index">
          <TableCell class="font-medium">{{ position.id }}</TableCell>
          <TableCell>{{ position.name }}</TableCell>
          <TableCell class="text-right [&_button]:size-8">
            <Button variant="outline" size="icon" class="mr-2">
              <Icon class="size-4" name="mynaui:pencil" />
            </Button>
            <Button variant="destructive" size="icon">
              <Icon class="size-4" name="mynaui:trash" />
            </Button>
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>
