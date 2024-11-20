import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { jobSkills } from './job-skills.js'

export const skills = pgTable('skills', {
  ...baseSchemaAttrs,
  name: varchar().notNull().unique(),
})

export const skillsRelations = relations(skills, ({ many }) => ({
  jobs: many(jobSkills),
}))
