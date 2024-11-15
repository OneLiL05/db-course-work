<script lang="ts" setup></script>

<template>
  <SidebarProvider>
    <main class="inline-flex size-full">
      <AdminSidebar />
      <SidebarInset>
        <section class="flex flex-col w-4/5 max-w-[800px] mx-auto py-10 gap-4">
          <SidebarTrigger />
          <slot></slot>
        </section>
      </SidebarInset>
    </main>
  </SidebarProvider>
</template>
