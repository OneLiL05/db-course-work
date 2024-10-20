<script lang="ts" setup>
import { Navbar } from '~/core/components/navbar'
</script>

<template>
  <Navbar />
  <main class="flex flex-col size-full">
    <slot></slot>
  </main>
</template>
