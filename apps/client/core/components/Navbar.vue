<script lang="ts" setup>
import { buttonVariants } from './ui/button'
import { textVariants } from './ui/text'

const links = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Jobs',
    to: '/',
  },
  {
    name: 'Companies',
    to: '/',
  },
]

const authStore = useAuthStore()
const { isAuthentificated } = toRefs(authStore)
</script>

<template>
  <header
    class="inline-flex items-center w-full px-5 bg-primary-foreground h-16 [&_div]:inline-flex [&_div]:items-center [&_div]:gap-3"
  >
    <NuxtLink to="/" :class="textVariants({ size: '2' })">SkillSwap</NuxtLink>
    <div class="justify-center mx-auto">
      <NuxtLink
        v-for="({ name, to }, index) in links"
        class="select-none touch-none"
        :key="index"
        :to
      >
        {{ name }}
      </NuxtLink>
    </div>
    <div class="justify-end">
      <!-- <ThemeSwitcher /> -->
      <template v-if="!isAuthentificated">
        <NuxtLink to="/login" :class="buttonVariants({ variant: 'outline' })">
          Login
        </NuxtLink>
        <NuxtLink to="/signup" :class="buttonVariants({ variant: 'default' })">
          Sign up
        </NuxtLink>
      </template>
      <template v-else>
        <Button variant="outline" size="icon">
          <Icon name="lucide:inbox" class="size-5" />
        </Button>
        <ProfileSheet />
      </template>
    </div>
  </header>
</template>
