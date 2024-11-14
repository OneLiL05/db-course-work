<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

const links = [
  {
    name: 'Cities',
    icon: 'lucide:building',
    to: '/admin/cities',
  },
  {
    name: 'Categories',
    icon: 'lucide:layout-dashboard',
    to: '/admin/categories',
  },
  {
    name: 'Positions',
    icon: 'lucide:book-user',
    to: '/admin/positions',
  },
  {
    name: 'Skills',
    icon: 'lucide:flask-conical',
    to: '/admin/skills',
  },
]
</script>

<template>
  <header
    class="flex flex-col w-1/5 h-full bg-primary-foreground p-4 box-border gap-5"
  >
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon class="size-5" name="lucide:search" />
      </span>
    </div>
    <div class="flex flex-col w-full">
      <NuxtLink
        to="/admin"
        :class="buttonVariants({ variant: 'ghost' })"
        class="!justify-start gap-3"
      >
        <Icon
          class="size-5 text-muted-foreground"
          name="lucide:square-chart-gantt"
        />
        Dashboard
      </NuxtLink>
    </div>
    <div class="border-b border-b-muted"></div>
    <div class="flex flex-col w-full gap-2">
      <NuxtLink
        v-for="({ name, icon, to }, index) in links"
        :key="index"
        :to
        :class="buttonVariants({ variant: 'ghost' })"
        class="!justify-start gap-3"
      >
        <Icon class="size-5 text-muted-foreground" :name="icon" />
        {{ name }}
      </NuxtLink>
    </div>
    <div class="mt-auto w-full">
      <NuxtLink
        to="/"
        :class="buttonVariants({ variant: 'ghost' })"
        class="!justify-start gap-3 w-full"
      >
        <Icon class="size-5 text-muted-foreground" name="lucide:arrow-left" />
        Back to website
      </NuxtLink>
    </div>
  </header>
</template>
