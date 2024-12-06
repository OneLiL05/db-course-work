import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { applicationStages } from './application-stages.js'
import { jobs } from './jobs.js'
import { resumes } from './resumes.js'

const { id } = baseSchemaAttrs

export const applications = pgTable('applications', {
  id,
  appliedAt: timestamp('applied_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  coverLetter: text('cover_letter').notNull(),
  jobId: integer('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  resumeId: integer('resume_id')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  stageId: integer('stage_id')
    .notNull()
    .references(() => applicationStages.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
})

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  resume: one(resumes, {
    fields: [applications.resumeId],
    references: [resumes.id],
  }),
  stage: one(applicationStages, {
    fields: [applications.stageId],
    references: [applicationStages.id],
  }),
}))
