import { eq, getTableColumns, relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  pgView,
  text,
  varchar,
} from 'drizzle-orm/pg-core'
import { baseSchemaAttrs, jsonAgg, jsonBuildObject } from '../utils.js'
import { categories } from './categories.js'
import { cities } from './city.js'
import { companies } from './companies.js'
import { employees } from './employees.js'
import { jobSalaries } from './job-salaries.js'
import { jobSkills } from './job-skills.js'
import { positions } from './positions.js'
import { skillLevels } from './skill-levels.js'
import { skills } from './skills.js'

export const jobs = pgTable('jobs', {
  ...baseSchemaAttrs,
  name: varchar().notNull(),
  description: text().notNull(),
  isCvRequired: boolean('is_cv_required').notNull(),
  isFulltime: boolean('is_fulltime').notNull(),
  isRemote: boolean('is_remote').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  isHidden: boolean('is_hidden').notNull().default(false),
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

export const jobsView = pgView('jobs_view').as((qb) => {
  return qb
    .select({
      ...getTableColumns(jobs),
      company: jsonBuildObject({
        id: companies.id,
        name: companies.name,
        description: companies.description,
        img: companies.img,
        isVerified: companies.isVerified,
      }).as('company'),
      city: jsonBuildObject({
        id: cities.id,
        name: cities.name,
      }).as('city'),
      category: jsonBuildObject({
        id: categories.id,
        name: categories.name,
      }).as('category'),
      position: jsonBuildObject({
        id: positions.id,
        name: positions.name,
      }).as('position'),
      salary: jsonBuildObject({
        amount: jobSalaries.amount,
        currency: jobSalaries.currency,
        period: jobSalaries.period,
      }).as('salary'),
      skills: jsonAgg(
        jsonBuildObject({
          id: jobSkills.id,
          name: skills.name,
          skillId: skills.id,
          level: skillLevels.name,
          skillLevelId: skillLevels.id,
        }),
      ).as('skills'),
    })
    .from(jobs)
    .leftJoin(companies, eq(jobs.companyId, companies.id))
    .leftJoin(positions, eq(jobs.positionId, positions.id))
    .leftJoin(cities, eq(jobs.cityId, cities.id))
    .leftJoin(categories, eq(jobs.categoryId, categories.id))
    .leftJoin(jobSalaries, eq(jobs.id, jobSalaries.jobId))
    .leftJoin(jobSkills, eq(jobs.id, jobSkills.jobId))
    .leftJoin(skills, eq(jobSkills.skillId, skills.id))
    .leftJoin(skillLevels, eq(jobSkills.skillLevelId, skillLevels.id))
    .groupBy(
      jobs.id,
      jobSalaries.id,
      jobSalaries.amount,
      jobSalaries.currency,
      jobSalaries.period,
      companies.id,
      companies.name,
      companies.img,
      companies.description,
      positions.id,
      positions.name,
      cities.id,
      cities.name,
      categories.id,
      categories.name,
    )
})
