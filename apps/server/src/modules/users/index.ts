import { asClass } from 'awilix'
import { UserDiConfig } from './types/index.js'
import { UserRepository } from './repositories/UserRepository.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveUsersModule = (): UserDiConfig => ({
  userRepository: asClass(UserRepository, SINGLETON_CONFIG),
})
