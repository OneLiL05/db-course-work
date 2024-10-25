<script lang="ts" setup>
import { buttonVariants } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const authStore = useAuthStore()
const { user } = toRefs(authStore)

const items = [
  {
    name: 'Your profile',
    icon: 'lucide:user-round',
    to: `/${user.value?.id}`,
  },
  {
    name: 'Your resumes',
    icon: 'lucide:file',
    to: '/',
  },
  {
    name: 'Your applications',
    icon: 'lucide:briefcase-business',
    to: '/',
  },
  {
    name: 'Your favourited jobs',
    icon: 'lucide:heart',
    to: '/',
  },
  {
    name: 'Your companies',
    icon: 'lucide:building-2',
    to: `/${user.value?.id}/companies`,
  },
]
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Avatar>
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      </Avatar>
    </SheetTrigger>
    <SheetContent>
      <div class="flex flex-col w-full gap-2 mt-4">
        <NuxtLink
          v-for="({ name, icon, to }, index) in items"
          :key="index"
          :to
          :class="buttonVariants({ variant: 'ghost' })"
          class="w-full !justify-start gap-3"
        >
          <Icon class="size-5 text-muted-foreground" :name="icon" />
          {{ name }}
        </NuxtLink>
        <div class="border-b border-muted" />
        <NuxtLink
          v-if="user?.roles.includes('admin')"
          to="/admin"
          :class="buttonVariants({ variant: 'ghost' })"
          class="w-full !justify-start gap-3"
        >
          <Icon class="size-5 text-muted-foreground" name="lucide:crown" />
          Admin panel
        </NuxtLink>
      </div>
    </SheetContent>
  </Sheet>
</template>
