import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { jobs } from './jobs.js'

export const positions = pgTable('positions', {
  ...baseSchemaAttrs,
  name: varchar().notNull().unique(),
})

export const positionsRelations = relations(positions, ({ many }) => ({
  jobs: many(jobs),
}))
