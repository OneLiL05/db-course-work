import type { CompanyApplication, UserApplication } from '@skill-swap/shared'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { Checkbox } from '~/core/components/ui/checkbox'
import UserApplicationsTableDropdown from '../components/UserApplicationsTableDropdown.vue'
import { Button } from '~/core/components/ui/button'
import Badge from '~/core/components/ui/badge/Badge.vue'
import CompanyApplicationsTableDropdown from '../components/CompanyApplicationsTableDropdown.vue'

export const userApplicationsTableColumns: ColumnDef<UserApplication>[] = [
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
    accessorKey: 'jobName',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          class: 'text-left',
          size: 'sm',
          onClick: () => {
            console.log(1)
            column.toggleSorting(column.getIsSorted() === 'asc')
          },
        },
        () => ['Job name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
  },
  {
    accessorKey: 'companyName',
    header: () => h('div', { class: 'text-left' }, 'Company name'),
  },
  {
    accessorKey: 'stageName',
    header: () => h('div', { class: 'text-left' }, 'Stage'),
    cell: ({ row }) => h(Badge, () => [row.original.stageName]),
  },
  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      const application = row.original

      return h(
        'div',
        { class: 'text-right' },
        h(UserApplicationsTableDropdown, { application }),
      )
    },
  },
]

export const companyApplicationsTableColumns: ColumnDef<CompanyApplication>[] =
  [
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
      accessorKey: 'jobName',
      header: ({ column }) => {
        return h(
          Button,
          {
            variant: 'ghost',
            class: 'text-left',
            size: 'sm',
            onClick: () => {
              console.log(1)
              column.toggleSorting(column.getIsSorted() === 'asc')
            },
          },
          () => ['Job name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
        )
      },
    },
    {
      accessorKey: 'applierName',
      header: () => h('div', { class: 'text-left' }, 'Applier'),
    },
    {
      accessorKey: 'stageName',
      header: () => h('div', { class: 'text-left' }, 'Stage'),
      cell: ({ row }) => h(Badge, () => [row.original.stageName]),
    },
    {
      id: 'actions',
      enableHiding: true,
      cell: ({ row }) => {
        const application = row.original

        return h(
          'div',
          { class: 'text-right' },
          h(CompanyApplicationsTableDropdown, { application }),
        )
      },
    },
  ]
