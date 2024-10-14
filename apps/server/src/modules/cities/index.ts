import { asClass } from 'awilix'
import { CitiesDiConfig } from './types/index.js'
import { CityRepository } from './repositories/CityRepository.js'
import { SINGLETON_CONFIG } from 'constants/config.js'

export const resolveCitiesModule = (): CitiesDiConfig => ({
  cityRepository: asClass(CityRepository, SINGLETON_CONFIG),
})
