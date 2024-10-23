import { asClass } from 'awilix'
import { CategoriesDiConfig } from './types/index.js'
import { CategoryRepository } from './repositories/CategoryRepository.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveCategoriesModule = (): CategoriesDiConfig => ({
  categoryRepository: asClass(CategoryRepository, SINGLETON_CONFIG),
})
