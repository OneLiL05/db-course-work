import type { CompanyAdmin } from '@skill-swap/shared'
import type { ColumnDef } from '@tanstack/vue-table'
import Checkbox from '~/core/components/ui/checkbox/Checkbox.vue'
import CompanyAdminsTableDropdown from '../components/CompanyAdminsTableDropdown.vue'

export const companyAdminsTableColumns: ColumnDef<CompanyAdmin>[] = [
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
    accessorKey: 'firstName',
    header: () => {
      return h('div', { class: 'text-left' }, 'First Name')
    },
    cell: ({ row }) =>
      h('div', { class: 'text-left' }, row.getValue('firstName')),
  },
  {
    accessorKey: 'lastName',
    header: () => {
      return h('div', { class: 'text-left' }, 'Last Name')
    },
    cell: ({ row }) =>
      h('div', { class: 'text-left' }, row.getValue('lastName')),
  },
  {
    accessorKey: 'role',
    header: () => {
      return h('div', { class: 'text-left' }, 'Role')
    },
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('role')),
  },
  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      const admin = row.original

      return h(
        'div',
        { class: 'text-right' },
        h(CompanyAdminsTableDropdown, { admin }),
      )
    },
  },
]
