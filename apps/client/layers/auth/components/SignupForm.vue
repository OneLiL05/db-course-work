<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { CREATE_USER_SCHEMA } from '@skill-swap/shared'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { mutateAsync, isError, error } = useSignup()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(CREATE_USER_SCHEMA),
  initialValues: {
    img: '/',
  },
})

const { eyeIcon, inputType, toggleVisibility } = usePasswordVisibility()

const onSubmit = handleSubmit((values) => {
  mutateAsync(values)
})

const isDisabled = computed(
  () =>
    !values.email?.trim().length ||
    !values.password?.trim().length ||
    isSubmitting.value,
)

const isEyeVisible = computed(() => values.password?.trim().length)

const formError = getFormError({ isError, error })
</script>

<template>
  <Card class="w-[450px] bg-primary-foreground">
    <CardHeader>
      <CardTitle>Signup</CardTitle>
      <CardDescription>
        Already have an account?
        <NuxtLink to="/login">Login</NuxtLink>
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit">
      <CardContent class="space-y-3">
        <div class="inline-flex w-full gap-3">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem v-auto-animate>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  class="w-full"
                  placeholder="Write first name..."
                  v-bind="componentField"
                  :disabled="isSubmitting"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem v-auto-animate>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  class="w-full"
                  placeholder="Write last name..."
                  v-bind="componentField"
                  :disabled="isSubmitting"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                class="w-full"
                placeholder="Write email..."
                v-bind="componentField"
                :disabled="isSubmitting"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="username">
          <FormItem v-auto-animate>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                class="w-full"
                placeholder="Write username..."
                v-bind="componentField"
                :disabled="isSubmitting"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div class="relative w-full max-w-sm items-center">
                <Input
                  :type="inputType"
                  class="w-full"
                  placeholder="Write password..."
                  v-bind="componentField"
                  :disabled="isSubmitting"
                />
                <span
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
                >
                  <Button
                    v-show="isEyeVisible"
                    size="xs"
                    variant="ghost"
                    type="button"
                    @click="toggleVisibility"
                  >
                    <Icon :name="eyeIcon" />
                  </Button>
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="inline-flex w-full" v-show="isError">
          <p class="text-destructive">{{ formError }}</p>
        </div>
      </CardContent>
      <CardFooter class="flex flex-col w-full gap-3">
        <Button type="submit" class="w-full" :disabled="isDisabled">
          Signup
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
