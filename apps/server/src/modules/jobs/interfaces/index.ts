import { Job } from 'schemas/models/job.js'
import { CreateJob } from '../schemas/index.js'

interface IJobRepository {
  findMany: () => Promise<Job[]>
  createOne: (data: CreateJob) => Promise<void>
}

interface JobsModuleDependencies {
  jobRepository: IJobRepository
}

export type { JobsModuleDependencies, IJobRepository }
