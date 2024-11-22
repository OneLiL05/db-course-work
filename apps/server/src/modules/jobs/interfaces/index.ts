import {
  CREATE_JOB_SCHEMA_TYPE,
  Job,
  AvgSalary,
  SalaryPeriod,
  SalaryCurrency,
} from '@skill-swap/shared'
import { SQL } from 'drizzle-orm'

interface FindAvgSalaryArgs {
  where: SQL
  period: SalaryPeriod
  currency: SalaryCurrency
}

interface IJobRepository {
  findMany: () => Promise<Job[]>
  findOne: (id: number) => Promise<Job | null>
  findLatestCount: (companyId: number) => Promise<{ count: number } | null>
  findJobsBy: (where: SQL) => Promise<Job[]>
  findCompanyJobsCount: (companyId: number) => Promise<{ count: number } | null>
  findAvgSalaryBy: (args: FindAvgSalaryArgs) => Promise<AvgSalary | null>
  createOne: (companyId: number, data: CREATE_JOB_SCHEMA_TYPE) => Promise<void>
}

interface JobsModuleDependencies {
  jobRepository: IJobRepository
}

export type { JobsModuleDependencies, IJobRepository, FindAvgSalaryArgs }
