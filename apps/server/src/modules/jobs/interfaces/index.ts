import { CREATE_JOB_SCHEMA_TYPE, Job } from '@skill-swap/shared'

interface IJobRepository {
  findMany: () => Promise<Job[]>
  findOne: (id: number) => Promise<Job | null>
  findCompanyJobs: (companyId: number) => Promise<Job[]>
  createOne: (companyId: number, data: CREATE_JOB_SCHEMA_TYPE) => Promise<void>
}

interface JobsModuleDependencies {
  jobRepository: IJobRepository
}

export type { JobsModuleDependencies, IJobRepository }
