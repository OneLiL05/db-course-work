<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { CREATE_JOB_SCHEMA, isStringEmpty } from '@skill-swap/shared'
import { useQuery } from '@tanstack/vue-query'
import { buttonVariants } from '~/core/components/ui/button'
import { axiosClient } from '~/core/lib/axios'

definePageMeta({
  layout: 'employer',
})

const route = useRoute()

const { mutateAsync, isPending } = useCreateJob(+route.params.id)

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(CREATE_JOB_SCHEMA),
  initialValues: {
    isCvRequired: false,
    isFulltime: false,
    isRemote: false,
    areStudentsAllowed: false,
  },
})

const onSubmit = handleSubmit(async (data) => {
  await mutateAsync(data)
})

const { data: categories } = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const result = await axiosClient.get('/categories')

    return result.data
  },
})

const { data: cities } = useCities()

const { data: positions } = usePositions()

const isDisabled = computed(() => {
  return isStringEmpty(values.name)
})
</script>
<template>
  <Heading size="2">Create job</Heading>
  <form class="flex flex-col w-full space-y-3 mt-4" @submit="onSubmit">
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
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="isRemote">
      <FormItem
        class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Is remote?</FormLabel>
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
    <div class="inline-flex w-full gap-4">
      <NuxtLink
        :class="buttonVariants({ variant: 'outline' })"
        to="/admin/jobs"
      >
        Back
      </NuxtLink>
      <Button type="submit" :disabled="isPending || isDisabled">
        Create
      </Button>
    </div>
  </form>
</template>
