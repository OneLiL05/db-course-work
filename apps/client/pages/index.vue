<script lang="ts" setup>
useHead({
  title: 'Home',
})

const { data, status } = await useFetch<{ message: string }>(
  'http://localhost:8080/ping',
)

const fallback = computed(() =>
  status.value === 'pending' ? 'Loading...' : data.value?.message,
)
</script>

<template>
  <div class="size-full items-center justify-center flex">
    <p>{{ fallback }}</p>
  </div>
</template>
