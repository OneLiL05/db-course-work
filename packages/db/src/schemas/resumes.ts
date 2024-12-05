import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { users } from './users.js'
import { relations } from 'drizzle-orm'
import { applications } from './applications.js'

export const resumes = pgTable('resumes', {
  ...baseSchemaAttrs,
  path: varchar().notNull(),
  name: varchar().notNull(),
  fileId: varchar().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
})

export const resumesRelations = relations(resumes, ({ one, many }) => ({
  user: one(users, {
    fields: [resumes.userId],
    references: [users.id],
  }),
  applications: many(applications),
}))
