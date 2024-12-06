import { asClass } from 'awilix'
import { EmployeeDiConfig } from './types/index.js'
import { EmployeeRepository } from './repositories/EmployeeRepository.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveEmployeesModule = (): EmployeeDiConfig => ({
  employeeRepository: asClass(EmployeeRepository, SINGLETON_CONFIG),
})
