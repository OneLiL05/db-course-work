import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import {
  CREATE_JOB_SCHEMA_TYPE,
  Job,
  AvgSalary,
  SalaryPeriod,
  SalaryCurrency,
  UPDATE_JOB_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { SQL } from 'drizzle-orm'

interface FindAvgSalaryArgs {
  where: SQL
  period: SalaryPeriod
  currency: SalaryCurrency
}

interface IJobRepository {
  findMany: () => Promise<Job[]>
  findOne: (id: number) => Promise<Result<Job, HttpError>>
  findLatestCount: (companyId: number) => Promise<{ count: number } | null>
  findJobsBy: (where: SQL) => Promise<Job[]>
  findCompanyJobsCount: (companyId: number) => Promise<{ count: number } | null>
  findAvgSalaryBy: (args: FindAvgSalaryArgs) => Promise<AvgSalary | null>
  createOne: (companyId: number, data: CREATE_JOB_SCHEMA_TYPE) => Promise<void>
  deleteOne: (id: number) => Promise<void>
  updateOne: (id: number, data: UPDATE_JOB_SCHEMA_TYPE) => Promise<void>
}

interface JobsModuleDependencies {
  jobRepository: IJobRepository
}

export type { JobsModuleDependencies, IJobRepository, FindAvgSalaryArgs }
