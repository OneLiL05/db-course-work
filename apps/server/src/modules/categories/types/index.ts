import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { CategoriesModuleDependencies } from '../interfaces/index.js'

type CategoriesInjectableDependencies =
  InjectableDependencies<CategoriesModuleDependencies>
type CategoriesDiConfig = BaseDiConfig<CategoriesModuleDependencies>

export type { CategoriesInjectableDependencies, CategoriesDiConfig }
