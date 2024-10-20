<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

const links = [
  {
    name: 'Jobs',
    icon: 'mynaui:briefcase',
    to: '/admin/jobs',
  },
  {
    name: 'Cities',
    icon: 'mynaui:briefcase',
    to: '/admin/cities',
  },
  {
    name: 'Positions',
    icon: 'mynaui:bookmark-user',
    to: '/admin/positions',
  },
]
</script>

<template>
  <main class="inline-flex size-full">
    <header
      class="flex flex-col w-1/5 h-full bg-primary-foreground p-4 box-border gap-5"
    >
      <div class="relative w-full max-w-sm items-center">
        <Input id="search" type="text" placeholder="Search..." class="pl-10" />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Icon class="size-5" name="mynaui:search" />
        </span>
      </div>
      <div class="flex flex-col w-full">
        <NuxtLink
          to="/admin"
          :class="buttonVariants({ variant: 'ghost' })"
          class="!justify-start gap-3"
        >
          <Icon class="size-5" name="mynaui:activity-square" />
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
          <Icon class="size-5" :name="icon" />
          {{ name }}
        </NuxtLink>
      </div>
      <div class="mt-auto w-full">
        <NuxtLink
          to="/"
          :class="buttonVariants({ variant: 'ghost' })"
          class="!justify-start gap-3 w-full"
        >
          <Icon class="size-5" name="mynaui:arrow-left" />
          Back to website
        </NuxtLink>
      </div>
    </header>
    <section class="flex flex-col w-4/5 max-w-[800px] mx-auto py-10">
      <slot></slot>
    </section>
  </main>
</template>
