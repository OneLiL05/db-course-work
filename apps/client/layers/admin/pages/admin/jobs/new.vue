<script lang="ts" setup>
import { useMutation, useQuery } from '@tanstack/vue-query'
import { axiosClient } from '~/core/lib/axios'
import { Textarea } from '~/core/components/ui/textarea'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { Checkbox } from '~/core/components/ui/checkbox'
import { buttonVariants } from '~/core/components/ui/button'
import { z } from 'zod'

definePageMeta({
  layout: 'admin',
})

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    description: z.string().min(15).max(256),
    isCvRequired: z.boolean().default(false),
    isFulltime: z.boolean().default(false),
    areStudentsAllowed: z.boolean().default(false),
    areRetireesAllowed: z.boolean().default(false),
    areDisabledAllowed: z.boolean().default(false),
    categoryId: z.coerce.number().min(1),
    positionId: z.coerce.number().min(1),
    employerId: z.coerce.number().min(1),
    cityId: z.coerce.number(),
    salary: z.object({
      amount: z.number().min(100),
      currency: z.enum(['USD', 'UAH', 'EUR']),
    }),
  }),
)

const {
  handleSubmit: createHandleSubmit,
  values: createValues,
  isSubmitting: isCreationSubmitting,
} = useForm({
  validationSchema: formSchema,
})

const { mutateAsync, status: creationStatus } = useMutation({
  mutationKey: ['create-city'],
  mutationFn: async (data: { name: string }) => {
    await axiosClient.post('/jobs', data)
  },
  onSuccess: () => {
    router.push({ path: '/admin/jobs' })
  },
})

const onCreateSubmit = createHandleSubmit(async (values) => {
  await mutateAsync(values)
})

const { data: categories } = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const result = await axiosClient.get('/categories')

    return result.data
  },
})

const { data: cities } = useQuery({
  queryKey: ['cities'],
  queryFn: async () => {
    const result = await axiosClient.get('/cities')

    return result.data
  },
})

const { data: positions } = useQuery({
  queryKey: ['positions'],
  queryFn: async () => {
    const result = await axiosClient.get('/positions')

    return result.data
  },
})

const { data: employers } = useQuery({
  queryKey: ['employers'],
  queryFn: async () => {
    const result = await axiosClient.get('/employers')

    return result.data
  },
})
</script>
<template>
  <Heading size="2">Create job</Heading>
  <form class="flex flex-col w-full space-y-3 mt-4" @submit="onCreateSubmit">
    <div class="inline-flex w-full gap-5">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Write job name..."
              v-bind="componentField"
              autofocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="salary.amount">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Salary</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Write job salary..."
              v-bind="componentField"
              autofocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="salary.currency">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currency</SelectLabel>
                  <SelectItem value="UAH">UAH</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem v-auto-animate>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Write job description..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="inline-flex w-full gap-5">
      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <template v-if="categories">
                    <SelectItem
                      v-for="(category, index) in categories"
                      :key="index"
                      :value="category.id.toString()"
                    >
                      {{ category.name }}
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="positionId">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Position</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Positions</SelectLabel>
                  <template v-if="positions">
                    <SelectItem
                      v-for="(position, index) in positions"
                      :key="index"
                      :value="position.id.toString()"
                    >
                      {{ position.name }}
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="employerId">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>Employer</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select an employer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Employers</SelectLabel>
                  <template v-if="employers">
                    <SelectItem
                      v-for="(employer, index) in employers"
                      :key="index"
                      :value="employer.id.toString()"
                    >
                      {{ employer.name }}
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="cityId">
        <FormItem class="w-full" v-auto-animate>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  <template v-if="cities">
                    <SelectItem
                      v-for="(city, index) in cities"
                      :key="index"
                      :value="city.id.toString()"
                    >
                      {{ city.name }}
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="isCvRequired"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Is CV required?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="isFulltime"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Is fulltime?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="areStudentsAllowed"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Are students allowed?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="areRetireesAllowed"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Are retiress allowed?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="areDisabledAllowed"
    >
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Are people with disabilities allowed?</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <div class="inline-flex w-full gap-4">
      <Button>Create</Button>
      <NuxtLink
        :class="buttonVariants({ variant: 'outline' })"
        to="/admin/jobs"
      >
        Back
      </NuxtLink>
    </div>
  </form>
</template>
