<script lang="ts" setup>
import { buttonVariants } from '~/core/components/ui/button'

const route = useRoute()

const { data: company } = useCompany(+route.params.id)

const links = [
  {
    name: 'Jobs',
    icon: 'lucide:briefcase-business',
    to: `/companies/${route.params.id}/settings/jobs`,
  },
  {
    name: 'Applications',
    icon: 'lucide:users-round',
    to: `/companies/${route.params.id}/settings/applications`,
  },
  {
    name: 'Administrators',
    icon: 'lucide:crown',
    to: `/companies/${route.params.id}/settings/administrators`,
  },
]
</script>

<template>
  <Sidebar variant="inset">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Company Panel</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="{ to, name, icon } in links" :key="name">
              <SidebarMenuButton asChild>
                <NuxtLink :to>
                  <Icon class="text-muted-foreground" :name="icon" />
                  <span>{{ name }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NuxtLink to="/">
              <Icon class="text-muted-foreground" name="lucide:arrow-left" />
              Back to website
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
