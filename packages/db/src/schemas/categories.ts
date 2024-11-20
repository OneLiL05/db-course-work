import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { jobs } from './jobs.js'

export const categories = pgTable('categories', {
  ...baseSchemaAttrs,
  name: varchar().notNull().unique(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  jobs: many(jobs),
}))
