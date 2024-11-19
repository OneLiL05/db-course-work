import type { ViewableJob } from '@skill-swap/shared'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import Button from '~/core/components/ui/button/Button.vue'
import Checkbox from '~/core/components/ui/checkbox/Checkbox.vue'
import JobsTableDropdown from '../components/JobsTableDropdown.vue'

export const jobsTableColumns: ColumnDef<ViewableJob>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          class: 'text-left',
          size: 'sm',
          onClick: () => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          },
        },
        () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('name')),
  },
  {
    accessorKey: 'position',
    header: () => h('div', { class: 'text-left' }, 'Position'),
    cell: ({ row }) =>
      h('div', { class: 'text-left' }, row.original.position.name),
  },
  {
    accessorKey: 'city',
    header: () => h('div', { class: 'text-left' }, 'City'),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.original.city.name),
  },
  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      const job = row.original

      return h('div', { class: 'text-right' }, h(JobsTableDropdown, { job }))
    },
  },
]
