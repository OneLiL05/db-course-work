import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { userRoles } from './user-roles.js'
import { resumes } from './resumes.js'
import { employees } from './employees.js'
import { companyAdmins } from './company-admins.js'

export const users = pgTable('users', {
  ...baseSchemaAttrs,
  username: varchar().notNull().unique(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  img: varchar().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
  resumes: many(resumes),
  employees: many(employees),
  companies: many(companyAdmins),
}))
