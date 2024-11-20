import { check, integer, numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { jobs } from './jobs.js'
import { relations, sql } from 'drizzle-orm'

const { id } = baseSchemaAttrs

export const jobSalaries = pgTable(
  'job_salaries',
  {
    id,
    amount: numeric({ precision: 10, scale: 4 }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    period: varchar().notNull(),
    jobId: integer('job_id')
      .notNull()
      .references(() => jobs.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  },
  (table) => ({
    currencyCheck: check(
      'job_salary_currency_check',
      sql`${table.currency} in ('USD', 'EUR', 'UAH')`,
    ),
    periodCheck: check(
      'job_salary_period_check',
      sql`${table.period} in ('one-time', 'weekly', 'monthly', 'yearly')`,
    ),
  }),
)

export const jobSalariesRelations = relations(jobSalaries, ({ one }) => ({
  job: one(jobs, {
    fields: [jobSalaries.jobId],
    references: [jobs.id],
  }),
}))
