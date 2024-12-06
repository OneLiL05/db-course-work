import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { EmployeesModuleDependencies } from '../interfaces/index.js'

type EmployeeInjectableDependencies =
  InjectableDependencies<EmployeesModuleDependencies>

type EmployeeDiConfig = BaseDiConfig<EmployeesModuleDependencies>

export type { EmployeeDiConfig, EmployeeInjectableDependencies }
