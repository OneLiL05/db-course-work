import { asClass } from 'awilix'
import { JobsDiConfig } from './types/index.js'
import { JobRepository } from './repositories/JobRepository.js'
import { SINGLETON_CONFIG } from 'constants/config.js'

export const resolveJobsModule = (): JobsDiConfig => ({
  jobRepository: asClass(JobRepository, SINGLETON_CONFIG),
})
