import {
  boolean,
  integer,
  pgTable,
  pgView,
  text,
  varchar,
} from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { categories } from './categories.js'
import { cities } from './city.js'
import { companies } from './companies.js'
import { positions } from './positions.js'
import { getTableColumns, relations, sql, eq } from 'drizzle-orm'
import { jobSalaries } from './job-salaries.js'
import { jobSkills } from './job-skills.js'
import { employees } from './employees.js'
import { skills } from './skills.js'
import { skillLevels } from './skill-levels.js'

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
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    categoryId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cityId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    companyId: cId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    positionId,
    ...rest
  } = getTableColumns(jobs)

  return qb
    .select({
      ...rest,
      company:
        sql`json_build_object('id', ${companies.id}, 'name', ${companies.name}, 'description', ${companies.description}, 'img', ${companies.img}, 'is_verified', ${companies.isVerified})`.as(
          'company',
        ),
      city: sql`json_build_object('id', ${cities.id}, 'name', ${cities.name})`.as(
        'city',
      ),
      category:
        sql`json_build_object('id', ${categories.id}, 'name', ${categories.name})`.as(
          'category',
        ),
      position:
        sql`json_build_object('id', ${positions.id}, 'name', ${positions.name})`.as(
          'position',
        ),
      salary:
        sql`json_build_object('amount', ${jobSalaries.amount}, 'currency', ${jobSalaries.currency})`.as(
          'salary',
        ),
      skills:
        sql`json_agg(json_build_object('name', ${skills.name}, 'level', ${skillLevels.name}))`.as(
          'skills',
        ),
    })
    .from(jobs)
    .leftJoin(companies, eq(jobs.companyId, companies.id))
    .leftJoin(positions, eq(jobs.positionId, positions.id))
    .leftJoin(cities, eq(jobs.cityId, cities.id))
    .leftJoin(categories, eq(jobs.categoryId, categories.id))
    .leftJoin(jobSalaries, eq(jobs.id, jobSalaries.jobId))
    .leftJoin(jobSkills, eq(jobs.id, jobSkills.id))
    .leftJoin(skills, eq(jobSkills.skillId, skills.id))
    .leftJoin(skillLevels, eq(jobSkills.skillLevelId, skillLevels.id))
    .groupBy(
      jobs.id,
      jobSalaries.amount,
      jobSalaries.currency,
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
