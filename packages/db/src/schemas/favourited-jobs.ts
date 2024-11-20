import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { users } from './users.js'
import { jobs } from './jobs.js'
import { relations } from 'drizzle-orm'

const { id } = baseSchemaAttrs

export const favouritedJobs = pgTable('favourited_jobs', {
  id,
  favouritedAt: timestamp('favourited_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  jobId: integer('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})

export const favouritedJobsRelations = relations(favouritedJobs, ({ one }) => ({
  user: one(users, {
    fields: [favouritedJobs.userId],
    references: [users.id],
  }),
  job: one(jobs, {
    fields: [favouritedJobs.jobId],
    references: [jobs.id],
  }),
}))
