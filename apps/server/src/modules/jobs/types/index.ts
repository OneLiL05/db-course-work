import { BaseDiConfig, InjectableDependencies } from 'types/index.js'
import { JobsModuleDependencies } from '../interfaces/index.js'

type JobsInjectableDependencies = InjectableDependencies<JobsModuleDependencies>

type JobsDiConfig = BaseDiConfig<JobsModuleDependencies>

export type { JobsInjectableDependencies, JobsDiConfig }
