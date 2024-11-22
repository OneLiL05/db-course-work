import {
  DatabaseClient,
  jobSalaries,
  jobSkills,
  jobs,
  jobsView,
} from '@skill-swap/db'
import { CREATE_JOB_SCHEMA_TYPE, Job } from '@skill-swap/shared'
import { and, between, count, eq } from 'drizzle-orm'
import { IJobRepository } from '../interfaces/index.js'
import { JobsInjectableDependencies } from '../types/index.js'

export class JobRepository implements IJobRepository {
  private readonly db: DatabaseClient

  constructor({ db }: JobsInjectableDependencies) {
    this.db = db.client
  }

  async findMany(): Promise<Job[]> {
    return this.db.select().from(jobsView) as unknown as Job[]
  }

  async findOne(id: number): Promise<Job | null> {
    const result = this.db
      .select()
      .from(jobsView)
      .where(eq(jobsView.id, id)) as unknown as Job[]

    const job = result.at(0)

    if (!job) return null

    return job
  }

  async findCompanyJobs(companyId: number): Promise<Job[]> {
    return this.db
      .select()
      .from(jobsView)
      .where(eq(jobsView.companyId, companyId)) as unknown as Job[]
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
