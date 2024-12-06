import { HttpError } from '@/interfaces/common.js'
import { Failure, Result, Success } from '@/utils/result.js'
import {
  DatabaseClient,
  applicationStages,
  applications,
  companies,
  jobs,
  resumes,
  users,
} from '@skill-swap/db'
import {
  APPLICATION_FILTERS_SCHEMA_TYPE,
  Application,
  ApplicationStage,
  CREATE_APPLICATION_SCHEMA_TYPE,
  CompanyApplication,
  UPDATE_APPLICATION_SCHEMA_TYPE,
  UserApplication,
} from '@skill-swap/shared'
import { SQL, and, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { IApplicationRepository } from '../interfaces/index.js'
import { ApplicationInjectableDependencies } from '../types/index.js'

export class ApplicationRepository implements IApplicationRepository {
  private readonly db: DatabaseClient

  constructor({ db }: ApplicationInjectableDependencies) {
    this.db = db.client
  }

  async findOne(id: number): Promise<Result<Application, HttpError>> {
    const result = await this.db
      .select()
      .from(applications)
      .where(eq(applicationStages.id, id))

    const application = result.at(0)

    if (!application) {
      return Failure<HttpError>({
        status: 404,
        message: 'Application with such id not found',
      })
    }

    return Success(application)
  }

  async findManyByUser(
    userId: number,
    query?: APPLICATION_FILTERS_SCHEMA_TYPE,
  ): Promise<UserApplication[]> {
    const columns = getTableColumns(applications)

    const expressions: SQL[] = [eq(resumes.userId, userId)]

    if (query && query.stage && query.stage !== 'All') {
      expressions.push(eq(applicationStages.name, query.stage))
    }

    return this.db
      .select({
        ...columns,
        stageName: applicationStages.name,
        companyId: companies.id,
        companyName: companies.name,
        jobName: jobs.name,
        jobId: jobs.id,
        resumePath: resumes.path,
      })
      .from(applications)
      .leftJoin(
        applicationStages,
        eq(applications.stageId, applicationStages.id),
      )
      .leftJoin(resumes, eq(applications.resumeId, resumes.id))
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(and(...expressions))
      .orderBy(desc(applications.appliedAt)) as unknown as UserApplication[]
  }

  async findManyByCompany(
    companyId: number,
    query?: APPLICATION_FILTERS_SCHEMA_TYPE,
  ): Promise<CompanyApplication[]> {
    const columns = getTableColumns(applications)

    const expressions: SQL[] = [eq(jobs.companyId, companyId)]

    if (query && query.stage && query.stage !== 'All') {
      expressions.push(eq(applicationStages.name, query.stage))
    }

    return this.db
      .select({
        ...columns,
        stageName: applicationStages.name,
        jobName: jobs.name,
        jobId: jobs.id,
        resumePath: resumes.path,
        applierId: users.id,
        applierName:
          sql<string>`concat(${users.firstName}, ' ', ${users.lastName})`.as(
            'applier_name',
          ),
      })
      .from(applications)
      .leftJoin(
        applicationStages,
        eq(applications.stageId, applicationStages.id),
      )
      .leftJoin(resumes, eq(applications.resumeId, resumes.id))
      .leftJoin(users, eq(users.id, resumes.userId))
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .where(and(...expressions)) as unknown as CompanyApplication[]
  }

  async findStages(): Promise<ApplicationStage[]> {
    return this.db
      .select()
      .from(applicationStages) as unknown as ApplicationStage[]
  }

  async createOne(data: CREATE_APPLICATION_SCHEMA_TYPE): Promise<void> {
    await this.db.insert(applications).values({ ...data, stageId: 1 })
  }

  async updateOne(
    id: number,
    { stageId }: UPDATE_APPLICATION_SCHEMA_TYPE,
  ): Promise<{ stageId: number }> {
    const result = await this.db
      .update(applications)
      .set({ stageId })
      .where(eq(applications.id, id))
      .returning()

    return result.at(0)?.stageId as unknown as { stageId: number }
  }

  async deleteOne(id: number): Promise<void> {
    await this.db.delete(applications).where(eq(applications.id, id))
  }
}
