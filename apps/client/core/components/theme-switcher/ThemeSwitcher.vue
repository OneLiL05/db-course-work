<script lang="ts" setup>
const { toggleTheme, themeIcon } = useThemeSwitcher()
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleTheme">
    <Icon :name="themeIcon" />
  </Button>
</template>
