import { asClass } from 'awilix'
import { ApplicationDiConfig } from './types/index.js'
import { ApplicationRepository } from './repositories/ApplicationRepository.js'

export const resolveApplicationsModule = (): ApplicationDiConfig => ({
  applicationRepository: asClass(ApplicationRepository),
})
