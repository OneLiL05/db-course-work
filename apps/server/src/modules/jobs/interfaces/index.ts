import { CREATE_JOB_SCHEMA_TYPE, Job } from '@skill-swap/shared'

interface IJobRepository {
  findMany: () => Promise<Job[]>
  findOne: (id: number) => Promise<Job | null>
  findLatestCount: (companyId: number) => Promise<{ count: number } | null>
  findCompanyJobs: (companyId: number) => Promise<Job[]>
  findCompanyJobsCount: (companyId: number) => Promise<{ count: number } | null>
  createOne: (companyId: number, data: CREATE_JOB_SCHEMA_TYPE) => Promise<void>
}

interface JobsModuleDependencies {
  jobRepository: IJobRepository
}

export type { JobsModuleDependencies, IJobRepository }
