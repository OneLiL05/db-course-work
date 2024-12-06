<script lang="ts" setup>
const id = useRouteParams('id')

const { data: company } = useCompany(Number(id.value))

const links = [
  {
    name: 'Jobs',
    icon: 'lucide:briefcase-business',
    to: `/companies/${id.value}/settings/jobs`,
  },
  {
    name: 'Applications',
    icon: 'lucide:user-round-search',
    to: `/companies/${id.value}/settings/applications`,
  },
  {
    name: 'Employees',
    icon: 'lucide:users-round',
    to: `/companies/${id.value}/settings/employees`,
  },
  {
    name: 'Administrators',
    icon: 'lucide:crown',
    to: `/companies/${id.value}/settings/administrators`,
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
            <NuxtLink :to="`/companies/${id}/settings/edit`">
              <Icon class="text-muted-foreground" name="lucide:settings" />
              Settings
            </NuxtLink>
          </SidebarMenuButton>
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
