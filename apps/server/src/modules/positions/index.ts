import { asClass } from 'awilix'
import { PositionsDiConfig } from './types/index.js'
import { PositionRepository } from './repositories/PositionRepository.js'
import { SINGLETON_CONFIG } from '@/constants/index.js'

export const resolvePositionsModule = (): PositionsDiConfig => ({
  positionRepository: asClass(PositionRepository, SINGLETON_CONFIG),
})
