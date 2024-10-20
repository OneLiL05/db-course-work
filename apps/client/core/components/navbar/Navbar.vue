<script lang="ts" setup>
import { Text, textVariants } from '~/components/ui/text'
import { ThemeSwitcher } from '~/components/theme-switcher'

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
      <Button variant="outline">Login</Button>
      <Button variant="default">Sign up</Button>
    </div>
  </header>
</template>
