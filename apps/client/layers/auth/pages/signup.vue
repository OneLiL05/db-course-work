<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: 'is-logined',
})
</script>

<template>
  <SignupForm />
</template>
