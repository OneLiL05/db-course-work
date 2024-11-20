import { boolean, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { categories } from './categories.js'
import { cities } from './city.js'
import { companies } from './companies.js'
import { positions } from './positions.js'
import { relations } from 'drizzle-orm'
import { jobSalaries } from './job-salaries.js'
import { jobSkills } from './job-skills.js'
import { employees } from './employees.js'

export const jobs = pgTable('jobs', {
  ...baseSchemaAttrs,
  name: varchar().notNull(),
  description: text().notNull(),
  isCvRequired: boolean('is_cv_required').notNull(),
  isFulltime: boolean('is_fulltime').notNull(),
  isActive: boolean('is_active').notNull(),
  isHidden: boolean('is_hidden').notNull(),
  areStudentsAllowed: boolean('are_students_allowed').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  cityId: integer('city_id').references(() => cities.id, {
    onDelete: 'restrict',
    onUpdate: 'cascade',
  }),
  companyId: integer('company_id')
    .notNull()
    .references(() => companies.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  positionId: integer('position_id')
    .notNull()
    .references(() => positions.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
})

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  category: one(categories, {
    fields: [jobs.categoryId],
    references: [categories.id],
  }),
  city: one(cities, {
    fields: [jobs.cityId],
    references: [cities.id],
  }),
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  position: one(positions, {
    fields: [jobs.positionId],
    references: [positions.id],
  }),
  salary: one(jobSalaries),
  skills: many(jobSkills),
  employees: many(employees),
}))
