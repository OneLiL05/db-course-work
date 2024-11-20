import { check, pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations, sql } from 'drizzle-orm'
import { userRoles } from './user-roles.js'

export const roles = pgTable(
  'roles',
  {
    ...baseSchemaAttrs,
    name: varchar().notNull().unique(),
  },
  (table) => ({
    nameCheck: check(
      'role_name_check',
      sql`${table.name} in ('admin', 'employer', 'user')`,
    ),
  }),
)

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(userRoles),
}))
