import { boolean, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { jobs } from './jobs.js'
import { employees } from './employees.js'
import { applications } from './applications.js'
import { companyAdmins } from './company-admins.js'

export const companies = pgTable('companies', {
  ...baseSchemaAttrs,
  name: varchar().notNull().unique(),
  description: text().notNull(),
  img: varchar().notNull(),
  isVerified: boolean('is_verified').notNull().default(false),
  isDeleted: boolean('is_deleted').notNull().default(false),
})

export const companiesRelations = relations(companies, ({ many }) => ({
  jobs: many(jobs),
  employees: many(employees),
  applications: many(applications),
  admins: many(companyAdmins),
}))
