import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { ApplicationsModuleDependencies } from '../interfaces/index.js'

type ApplicationInjectableDependencies =
  InjectableDependencies<ApplicationsModuleDependencies>

type ApplicationDiConfig = BaseDiConfig<ApplicationsModuleDependencies>

export type { ApplicationDiConfig, ApplicationInjectableDependencies }
