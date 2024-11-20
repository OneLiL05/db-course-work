import { integer, pgTable } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { users } from './users.js'
import { roles } from './roles.js'
import { relations } from 'drizzle-orm'

const { id } = baseSchemaAttrs

export const userRoles = pgTable('user_roles', {
  id,
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.userId],
    references: [roles.id],
  }),
}))
