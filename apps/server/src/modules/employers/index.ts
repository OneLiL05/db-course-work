import { asClass } from 'awilix'
import { EmployersDiConfig } from './types/index.js'
import { EmployerRepository } from './repositories/EmployerRepository.js'
import { SINGLETON_CONFIG } from 'constants/config.js'

export const resolveEmployersModule = (): EmployersDiConfig => ({
  employerRepository: asClass(EmployerRepository, SINGLETON_CONFIG),
})
