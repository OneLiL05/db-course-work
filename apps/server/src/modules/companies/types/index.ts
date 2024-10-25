import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { CompaniesModuleDependencies } from '../interfaces/index.js'

type CompaniesInjectableDependencies =
  InjectableDependencies<CompaniesModuleDependencies>

type CompaniesDiConfig = BaseDiConfig<CompaniesModuleDependencies>

export type { CompaniesInjectableDependencies, CompaniesDiConfig }
