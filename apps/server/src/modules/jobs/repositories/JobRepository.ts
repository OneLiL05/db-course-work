import {
  DatabaseClient,
  categories,
  cities,
  companies,
  jobSalaries,
  jobSkills,
  jobs,
  positions,
  skillLevels,
  skills,
} from '@skill-swap/db'
import { CREATE_JOB_SCHEMA_TYPE, Job } from '@skill-swap/shared'
import { IJobRepository } from '../interfaces/index.js'
import { JobsInjectableDependencies } from '../types/index.js'
import { eq, getTableColumns, sql, count, and, between } from 'drizzle-orm'
import { SqlClient } from '@/types/index.js'

export class JobRepository implements IJobRepository {
  private readonly db: DatabaseClient
  private readonly sql: SqlClient

  constructor({ db, sql }: JobsInjectableDependencies) {
    this.db = db.client
    this.sql = sql
  }

  async findMany(): Promise<Job[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, cityId, companyId, positionId, ...rest } =
      getTableColumns(jobs)

    return this.db
      .select({
        ...rest,
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
      .leftJoin(jobSalaries, eq(jobs.id, jobSalaries.jobId))
      .leftJoin(jobSkills, eq(jobs.id, jobSkills.id))
      .leftJoin(skills, eq(jobSkills.skillId, skills.id))
      .leftJoin(skillLevels, eq(jobSkills.skillLevelId, skillLevels.id))
      .groupBy(
        jobs.id,
        jobSalaries.amount,
        jobSalaries.currency,
      ) as unknown as Job[]
  }

  async findOne(id: number): Promise<Job | null> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, cityId, companyId, positionId, ...rest } =
      getTableColumns(jobs)

    // TODO: Move this query to the separate view
    const result = this.db
      .select({
        ...rest,
        company:
          sql`json_build_object('id', ${companies.id}, 'name', ${companies.name}, 'description', ${companies.description}, 'img', ${companies.img}, 'is_verified', ${companies.isVerified})`.as(
            'company',
          ),
        city: sql`json_build_object('id', ${cities.id}, 'name', ${cities.name})`.as(
          'category',
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
      .where(eq(jobs.id, id))
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
      ) as unknown as Job[]

    const job = result.at(0)

    if (!job) return null

    return job
  }

  async findCompanyJobs(companyId: number): Promise<Job[]> {
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

    return this.db
      .select({
        ...rest,
        company:
          sql`json_build_object('id', ${companies.id}, 'name', ${companies.name}, 'description', ${companies.description}, 'img', ${companies.img}, 'is_verified', ${companies.isVerified})`.as(
            'company',
          ),
        city: sql`json_build_object('id', ${cities.id}, 'name', ${cities.name})`.as(
          'category',
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
      .where(eq(jobs.companyId, companyId))
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
      ) as unknown as Job[]
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

    await this.db.transaction(async (tx) => {
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
          isActive: true,
          isHidden: false,
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
    })
  }
}
