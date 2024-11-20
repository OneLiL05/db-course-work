import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations } from 'drizzle-orm'
import { jobs } from './jobs.js'

export const cities = pgTable('cities', {
  ...baseSchemaAttrs,
  name: varchar().unique().notNull(),
})

export const citiesRelations = relations(cities, ({ many }) => ({
  jobs: many(jobs),
}))
