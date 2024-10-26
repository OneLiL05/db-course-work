<script lang="ts" setup>
import CompanySidebar from '~/layers/companies/components/CompanySidebar.vue'
</script>

<template>
  <main class="inline-flex size-full">
    <CompanySidebar />
    <section class="flex flex-col w-4/5 max-w-[800px] mx-auto py-10">
      <slot></slot>
    </section>
  </main>
</template>
