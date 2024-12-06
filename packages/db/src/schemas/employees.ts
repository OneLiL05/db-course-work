import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { jobs } from './jobs.js'
import { users } from './users.js'

const { id } = baseSchemaAttrs

export const employees = pgTable('employees', {
  id,
  employedAt: timestamp('employed_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  firedAt: timestamp('fired_at', { withTimezone: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  jobId: integer('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'restrict', onUpdate: 'restrict' }),
})

export const employeesRelations = relations(employees, ({ one }) => ({
  user: one(users, {
    fields: [employees.userId],
    references: [users.id],
  }),
  job: one(jobs, {
    fields: [employees.jobId],
    references: [jobs.id],
  }),
}))
