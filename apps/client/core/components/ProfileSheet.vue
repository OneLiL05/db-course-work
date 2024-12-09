<script lang="ts" setup>
import { buttonVariants } from './ui/button'

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
    to: `/${user.value?.id}/resumes`,
  },
  {
    name: 'Your applications',
    icon: 'lucide:briefcase-business',
    to: `/${user.value?.id}/applications`,
  },
  {
    name: 'Your favourited jobs',
    icon: 'lucide:heart',
    to: `/${user.value?.id}/favourited-jobs`,
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
        <SheetClose as-child>
          <NuxtLink
            v-for="({ name, icon, to }, index) in items"
            :key="index"
            :to
            :class="buttonVariants({ variant: 'ghost', size: 'sm' })"
            class="w-full !justify-start gap-3"
          >
            <Icon class="size-4 text-muted-foreground" :name="icon" />
            {{ name }}
          </NuxtLink>
        </SheetClose>
        <template v-if="user?.roles.includes('admin')">
          <div class="border-b border-muted" />
          <SheetClose as-child>
            <NuxtLink
              to="/admin/cities"
              :class="buttonVariants({ variant: 'ghost', size: 'sm' })"
              class="w-full !justify-start gap-3"
            >
              <Icon class="size-4 text-muted-foreground" name="lucide:crown" />
              Admin panel
            </NuxtLink>
          </SheetClose>
        </template>
        <div class="border-b border-muted" />
        <SheetClose @click="authStore.signout" as-child>
          <NuxtLink
            to="/"
            :class="buttonVariants({ variant: 'ghost', size: 'sm' })"
            class="w-full !justify-start gap-3"
          >
            <Icon class="size-4 text-muted-foreground" name="lucide:log-out" />
            Sign out
          </NuxtLink>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
</template>
