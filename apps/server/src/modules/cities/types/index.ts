import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { CitiesModuleDependencies } from '../interfaces/index.js'

type CitiesInjectableDependencies =
  InjectableDependencies<CitiesModuleDependencies>
type CitiesDiConfig = BaseDiConfig<CitiesModuleDependencies>

export type { CitiesDiConfig, CitiesInjectableDependencies }
