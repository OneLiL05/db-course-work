import { integer, pgTable } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { users } from './users.js'
import { companyRoles } from './company-roles.js'
import { companies } from './companies.js'
import { relations } from 'drizzle-orm'

const { id } = baseSchemaAttrs

export const companyAdmins = pgTable('company_admins', {
  id,
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  roleId: integer('company_role_id')
    .notNull()
    .references(() => companyRoles.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  companyId: integer('company_id')
    .notNull()
    .references(() => companies.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
})

export const companyAdminsRelations = relations(companyAdmins, ({ one }) => ({
  user: one(users, {
    fields: [companyAdmins.userId],
    references: [users.id],
  }),
  role: one(companyRoles, {
    fields: [companyAdmins.roleId],
    references: [companyRoles.id],
  }),
  company: one(companies, {
    fields: [companyAdmins.companyId],
    references: [companies.id],
  }),
}))
