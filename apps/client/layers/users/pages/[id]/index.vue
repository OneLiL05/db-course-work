<script lang="ts" setup>
const route = useRoute()

const { data: user } = await useUser(+route.params.id)

useHead({
  title: `${user.value?.username} (${user.value?.firstName} ${user.value?.lastName})`,
})
</script>

<template>
  <p>{{ user?.email }}</p>
</template>
