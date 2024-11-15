<script lang="ts" setup>
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
  <Sidebar variant="inset">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
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
