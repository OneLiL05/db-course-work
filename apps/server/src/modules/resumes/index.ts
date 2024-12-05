import { asClass } from 'awilix'
import { ResumeDiConfig } from './types/index.js'
import { ResumeRepository } from './repositories/ResumeRepository.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveResumesModule = (): ResumeDiConfig => ({
  resumeRepository: asClass(ResumeRepository, SINGLETON_CONFIG),
})
