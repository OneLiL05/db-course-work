import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { ResumeModuleDependencies } from '../interfaces/index.js'

type ResumeInjectableDependencies =
  InjectableDependencies<ResumeModuleDependencies>

type ResumeDiConfig = BaseDiConfig<ResumeModuleDependencies>

export type { ResumeInjectableDependencies, ResumeDiConfig }
