import {
  DatabaseClient,
  categories,
  cities,
  companies,
  jobSalaries,
  jobSkills,
  jobs,
  jobsView,
  jsonAgg,
  jsonBuildObject,
  positions,
  skillLevels,
  skills,
} from '@skill-swap/db'
import {
  CREATE_JOB_SCHEMA_TYPE,
  Job,
  AvgSalary,
  UPDATE_JOB_SCHEMA_TYPE,
} from '@skill-swap/shared'
import {
  SQL,
  and,
  between,
  count,
  eq,
  getTableColumns,
  gte,
  ilike,
  inArray,
  lte,
  sql,
} from 'drizzle-orm'
import {
  FindAvgSalaryArgs,
  FindByArgs,
  IJobRepository,
} from '../interfaces/index.js'
import { JobsInjectableDependencies } from '../types/index.js'
import { Failure, Result, Success } from '@/utils/result.js'
import { HttpError } from '@/interfaces/common.js'

export class JobRepository implements IJobRepository {
  private readonly db: DatabaseClient

  constructor({ db }: JobsInjectableDependencies) {
    this.db = db.client
  }

  async findMany(): Promise<Job[]> {
    return this.db.select().from(jobsView) as unknown as Job[]
  }

  async findOne(id: number): Promise<Result<Job, HttpError>> {
    const result = await this.db
      .select()
      .from(jobsView)
      .where(eq(jobsView.id, id))

    const job = result.at(0) as Job

    if (!job) {
      return Failure({ status: 404, message: 'Job with such id not found' })
    }

    return Success(job)
  }

  async findJobsBy({ where, query }: FindByArgs): Promise<Job[]> {
    const expressions: SQL[] = [where, eq(jobs.isHidden, false)]

    if (query) {
      const {
        employmentTypes,
        salaryAmount,
        salaryCurrency,
        salaryPeriod,
        suitableFor,
        search,
        period,
      } = query

      if (employmentTypes && employmentTypes.length) {
        if (employmentTypes.includes('full-time')) {
          expressions.push(eq(jobs.isFulltime, true))
        }

        if (employmentTypes.includes('part-time')) {
          expressions.push(eq(jobs.isFulltime, false))
        }
      }

      if (salaryAmount) {
        if (salaryAmount.min) {
          expressions.push(gte(jobSalaries.amount, salaryAmount.min.toString()))
        }

        if (salaryAmount.max) {
          expressions.push(lte(jobSalaries.amount, salaryAmount.max.toString()))
        }
      }

      if (search) {
        expressions.push(ilike(jobs.name, `%${search}%`))
      }

      if (period && period !== 'all-time') {
        const currentDate = new Date()

        if (period === 'day') {
          const yesterday = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1,
          )

          expressions.push(between(jobs.createdAt, currentDate, yesterday))
        }

        if (period === '7-days') {
          const lastWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 7,
          )

          expressions.push(between(jobs.createdAt, currentDate, lastWeek))
        }

        if (period === '14-days') {
          const twoWeeksAgo = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 7,
          )

          expressions.push(between(jobs.createdAt, currentDate, twoWeeksAgo))
        }

        if (period === 'month') {
          const lastMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate(),
          )

          expressions.push(between(jobs.createdAt, currentDate, lastMonth))
        }
      }

      if (suitableFor && suitableFor.length) {
        if (suitableFor.includes('remote')) {
          expressions.push(eq(jobs.isRemote, true))
        }

        if (suitableFor.includes('without-cv')) {
          expressions.push(eq(jobs.isCvRequired, false))
        }

        if (suitableFor.includes('student')) {
          expressions.push(eq(jobs.areStudentsAllowed, true))
        }
      }

      if (salaryCurrency && salaryCurrency.length) {
        expressions.push(inArray(jobSalaries.currency, [...salaryCurrency]))
      }

      if (salaryPeriod && salaryPeriod.length) {
        expressions.push(inArray(jobSalaries.period, [...salaryPeriod]))
      }
    }

    return this.db
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
      .where(and(...expressions))
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
      ) as unknown as Job[]
  }

  async findAvgSalaryBy({
    where,
    currency,
    period,
  }: FindAvgSalaryArgs): Promise<AvgSalary | null> {
    const result = await this.db
      .select({ avg: sql<number>`cast(${jobSalaries.amount} as int)` })
      .from(jobs)
      .leftJoin(jobSalaries, eq(jobs.id, jobSalaries.jobId))
      .where(
        and(
          where,
          eq(jobSalaries.currency, currency),
          eq(jobSalaries.period, period),
        ),
      )

    const avgSalary = result.at(0)

    if (!avgSalary) return null

    return {
      ...avgSalary,
      currency,
      period,
    }
  }

  async findLatestCount(companyId: number): Promise<{ count: number } | null> {
    const currentDate = new Date()
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    )

    const result = await this.db
      .select({ count: count(jobs.id) })
      .from(jobs)
      .where(
        and(
          eq(jobs.companyId, companyId),
          between(jobs.createdAt, startDate, endDate),
          eq(jobs.isActive, true),
        ),
      )

    const jobsCount = result.at(0)

    if (!jobsCount) return null

    return { count: jobsCount.count }
  }

  async findCompanyJobsCount(
    companyId: number,
  ): Promise<{ count: number } | null> {
    const result = await this.db
      .select({ count: count(jobs.id) })
      .from(jobs)
      .where(and(eq(jobs.companyId, companyId), eq(jobs.isActive, true)))

    const jobsCount = result.at(0)

    if (!jobsCount) return null

    return { count: jobsCount.count }
  }

  async createOne(
    companyId: number,
    data: CREATE_JOB_SCHEMA_TYPE,
  ): Promise<void> {
    const {
      name,
      description,
      isCvRequired,
      isFulltime,
      isRemote,
      areStudentsAllowed,
      salary,
      categoryId,
      positionId,
      cityId,
      skills,
    } = data

    await this.db.transaction(
      async (tx) => {
        const result = await tx
          .insert(jobs)
          .values({
            name,
            description,
            isCvRequired,
            isFulltime,
            isRemote,
            areStudentsAllowed,
            companyId,
            positionId,
            categoryId,
            cityId,
          })
          .returning()

        const job = result.at(0)

        if (!job) return null

        await tx.insert(jobSalaries).values({
          jobId: job.id,
          amount: salary.amount.toString(),
          currency: salary.currency,
          period: salary.period,
        })

        const mappedSkills = skills.map(({ skillId, skillLevelId }) => {
          return { jobId: job.id, skillId, skillLevelId }
        })

        await tx.insert(jobSkills).values(mappedSkills)
      },
      {
        isolationLevel: 'serializable',
      },
    )
  }

  async updateOne(id: number, data: UPDATE_JOB_SCHEMA_TYPE): Promise<void> {
    const { addSkills, removeSkills, ...rest } = data

    await this.db.transaction(async (tx) => {
      await tx
        .update(jobs)
        .set({ ...rest })
        .where(eq(jobs.id, id))

      if (addSkills.length) {
        const mappedSkills = addSkills.map(({ skillId, skillLevelId }) => {
          return { jobId: id, skillId, skillLevelId }
        })

        await tx.insert(jobSkills).values(mappedSkills)
      }

      if (removeSkills.length) {
        const mappedSkills = removeSkills.map(({ id }) => id)

        await tx.delete(jobSkills).where(inArray(jobSkills.id, mappedSkills))
      }
    })
  }

  async deleteOne(id: number): Promise<void> {
    await this.db
      .update(jobs)
      .set({ isHidden: true, isActive: false })
      .where(eq(jobs.id, id))
  }
}
