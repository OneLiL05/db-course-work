import { integer, pgTable } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { jobs } from './jobs.js'
import { skillLevels } from './skill-levels.js'
import { skills } from './skills.js'
import { relations } from 'drizzle-orm'

const { id } = baseSchemaAttrs

export const jobSkills = pgTable('job_skills', {
  id,
  jobId: integer('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  skillId: integer('skill_id')
    .notNull()
    .references(() => skills.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  skillLevelId: integer('skill_level_id')
    .notNull()
    .references(() => skillLevels.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
})

export const jobSkillsRelations = relations(jobSkills, ({ one }) => ({
  job: one(jobs, {
    fields: [jobSkills.jobId],
    references: [jobs.id],
  }),
  skill: one(skills, {
    fields: [jobSkills.skillId],
    references: [skills.id],
  }),
  skillLevel: one(skillLevels, {
    fields: [jobSkills.skillLevelId],
    references: [skillLevels.id],
  }),
}))
