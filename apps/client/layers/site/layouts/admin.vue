<script lang="ts" setup></script>

<template>
  <main class="inline-flex size-full">
    <AdminSidebar />
    <section class="flex flex-col w-4/5 max-w-[800px] mx-auto py-10">
      <slot></slot>
    </section>
  </main>
</template>
