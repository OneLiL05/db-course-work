import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { EmployersModuleDependencies } from '../interfaces/index.js'

type EmployersInjectableDependencies =
  InjectableDependencies<EmployersModuleDependencies>

type EmployersDiConfig = BaseDiConfig<EmployersModuleDependencies>

export type { EmployersInjectableDependencies, EmployersDiConfig }
