import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { ResumesModuleDependencies } from '../interfaces/index.js'

type ResumeInjectableDependencies =
  InjectableDependencies<ResumesModuleDependencies>

type ResumeDiConfig = BaseDiConfig<ResumesModuleDependencies>

export type { ResumeInjectableDependencies, ResumeDiConfig }
