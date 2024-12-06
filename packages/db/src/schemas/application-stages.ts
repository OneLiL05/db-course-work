import { check, pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { relations, sql } from 'drizzle-orm'
import { applications } from './applications.js'

export const applicationStages = pgTable(
  'application_stages',
  {
    ...baseSchemaAttrs,
    name: varchar().notNull().unique(),
  },
  (table) => ({
    nameCheck: check(
      'application_stage_name_check',
      sql`${table.name} in ('New', 'HR Review', 'Interview', 'Offer', 'Declined')`,
    ),
  }),
)

export const applicationStagesRelations = relations(
  applicationStages,
  ({ many }) => ({
    applications: many(applications),
  }),
)
