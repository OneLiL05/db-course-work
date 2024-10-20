<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { LOGIN_SCHEMA } from '@skill-swap/shared'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { mutateAsync, isError, error } = useLogin()

const { handleSubmit, values, isSubmitting } = useForm({
  validationSchema: toTypedSchema(LOGIN_SCHEMA),
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

const formError = getFormError({ error, isError })
</script>

<template>
  <Card class="w-[350px] bg-primary-foreground">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>
        Don't have an accout?
        <NuxtLink to="/signup">Sign up</NuxtLink>
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit">
      <CardContent class="space-y-3">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                id="search"
                type="text"
                placeholder="Write email..."
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
        <Button class="w-full" :disabled="isDisabled">Login</Button>
      </CardFooter>
    </form>
  </Card>
</template>
