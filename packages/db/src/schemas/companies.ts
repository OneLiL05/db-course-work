import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { applications } from './applications.js'
import { companyAdmins } from './company-admins.js'
import { jobs } from './jobs.js'

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
  applications: many(applications),
  admins: many(companyAdmins),
}))
