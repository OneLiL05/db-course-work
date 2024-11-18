<script lang="ts" setup></script>

<template>
  <SidebarProvider>
    <main class="inline-flex size-full">
      <CompanySidebar />
      <SidebarInset>
        <section
          class="flex flex-col w-4/5 max-w-[800px] mx-auto py-10 gap-4 overflow-y-scroll ss"
        >
          <SidebarTrigger />
          <slot></slot>
        </section>
      </SidebarInset>
    </main>
  </SidebarProvider>
</template>

<style lang="css">
.ss {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.ss::-webkit-scrollbar {
  display: none;
}
</style>
