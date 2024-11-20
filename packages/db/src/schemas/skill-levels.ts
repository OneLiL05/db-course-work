import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { jobSkills } from './job-skills.js'

export const skillLevels = pgTable('skill_levels', {
  ...baseSchemaAttrs,
  name: varchar().notNull().unique(),
})

export const skillLevelsRelations = relations(skillLevels, ({ many }) => ({
  jobs: many(jobSkills),
}))
