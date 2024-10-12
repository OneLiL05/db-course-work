import { BaseDiConfig, InjectableDependencies } from 'types/index.js'
import { AuthModuleDependecies } from '../interfaces/index.js'

type AuthInjectableDependecies = InjectableDependencies<object>

type AuthDiConfig = BaseDiConfig<AuthModuleDependecies>

export type { AuthInjectableDependecies, AuthDiConfig }
