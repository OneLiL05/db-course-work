import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { companyAdmins } from './company-admins.js'

export const companyRoles = pgTable('company_roles', {
  ...baseSchemaAttrs,
  name: varchar().notNull().unique(),
})

export const companyRolesRelations = relations(companyRoles, ({ many }) => ({
  admins: many(companyAdmins),
}))
