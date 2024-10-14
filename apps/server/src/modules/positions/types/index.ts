import { BaseDiConfig, InjectableDependencies } from 'types/index.js'
import { PositionsModuleDependencies } from '../interfaces/index.js'

type PositionsInjectableDependencies =
  InjectableDependencies<PositionsModuleDependencies>

type PositionsDiConfig = BaseDiConfig<PositionsModuleDependencies>

export type { PositionsInjectableDependencies, PositionsDiConfig }
