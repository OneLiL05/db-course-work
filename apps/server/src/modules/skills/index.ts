import { asClass } from 'awilix'
import { SkillsDiConfig } from './types/index.js'
import { SkillRepository } from './repositories/SkillRepository.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveSkillsModule = (): SkillsDiConfig => ({
  skillRepository: asClass(SkillRepository, SINGLETON_CONFIG),
})
