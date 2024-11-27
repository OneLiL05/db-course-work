<script lang="ts" setup>
definePageMeta({
  layout: 'employer',
})

const id = useRouteParams('id')

const { data: admins } = useCompanyAdmins(Number(id.value))
</script>

<template>
  <Heading size="2">Administrators</Heading>
  <DataTable
    v-if="admins"
    :data="admins"
    :columns="companyAdminsTableColumns"
  />
</template>
