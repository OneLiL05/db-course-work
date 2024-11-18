<script lang="ts" setup></script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        More
        <Icon name="lucide:chevron-down" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>
        <Icon name="lucide:file-text" />
        Find similar
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Icon name="lucide:printer" />
        Print
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Icon name="lucide:triangle-alert" />
        Report
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
